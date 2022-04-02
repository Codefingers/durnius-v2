import { QueryCommandOutput } from "@aws-sdk/lib-dynamodb"
import { Request, Response } from "express"
import { canPlayCard } from "../canPlayCard"
import { getGameData } from "../getGameData"
import { isPlayersTurn } from "../requestValidation/isPlayersTurn"
import { isValidPlayer } from "../requestValidation/isValidPlayer"
import { playerContainsCards } from "../requestValidation/playerContainsCard"
import { GameData, HttpErrorResponse, PlayCardRequest, Role } from "../types"
import { updateGameData } from "../updateGameData"
import { validatePlayCardRequest } from "./validatePlayCardRequest"

export const playCard = (app) => {
app.post('/playCard', async (req: Request, res: Response) => {
    // TODO: give players a token to send with requests
    const validationResponse: PlayCardRequest|HttpErrorResponse = validatePlayCardRequest(req)
    if ("message" in validationResponse) {
      res.status(validationResponse.statusCode)
      return res.send(validationResponse.message)
    }
  
    const { gameId, playerId, card } = validationResponse
    let gameDataResult: QueryCommandOutput
      gameDataResult = await getGameData(validationResponse.gameId)
  
    if (!gameDataResult?.Items || !gameDataResult.Items[0]) {
      throw new Error('No game data found')
    }
  
    const { players, gameState, deck, playerTurn, cardsInPlay = [], cardsDiscarded = [], powerSuit } = gameDataResult.Items[0] as GameData
  
    const isValidPlayerResponse = isValidPlayer(playerId, players)
    if (isValidPlayerResponse?.error) {
      res.status(isValidPlayerResponse.error.statusCode)
      return res.send(isValidPlayerResponse.error.message)
    }
  
    const isPlayersTurnResponse = isPlayersTurn(playerId, playerTurn)
    if (isPlayersTurnResponse?.error) {
      res.status(isPlayersTurnResponse.error.statusCode)
      return res.send(isPlayersTurnResponse.error.message)
    } 

    const currentPlayerIndex = players.findIndex((player) => player.playerId === playerId)
    const currentPlayer = players[currentPlayerIndex]
  
    const doesPlayerContainCardResponse = playerContainsCards(currentPlayer, card)
    if (doesPlayerContainCardResponse?.error) {
      res.status(doesPlayerContainCardResponse.error.statusCode)
      return res.send(doesPlayerContainCardResponse.error.message)
    }

    const canPlay = canPlayCard(card, cardsInPlay, currentPlayer.role, powerSuit)
    if (!canPlay) {
      res.status(400)
      res.send('Cannot play card')
    }
      
    const cardIndex = currentPlayer.cards.findIndex((card) => card.rank === card.rank && card.suit === card.suit)
    currentPlayer.cards.splice(cardIndex, 1)
      
    const updatedPlayers = [...players]
    updatedPlayers.splice(currentPlayerIndex, 1, currentPlayer)
  
    if ([Role.PRIMARY_ATTACKER, Role.ATTACKER].includes(currentPlayer.role)) {
      await updateGameData({
        players: updatedPlayers, 
        gameState, 
        deck, 
        playerTurn: players.find((player) => player.role === Role.DEFENDER)?.playerId, 
        cardsInPlay: [...cardsInPlay, { attackersCard: card }], 
        cardsDiscarded, 
        powerSuit,
        gameId: gameId,
        playersSkipped: [],
      })
  
      
      return res.send()
    }

    // TODO, find out if the defender has just beaten all cards
  
    const unbeatenCardIndex = cardsInPlay.findIndex((cardInPlay) => !cardInPlay.defendersCard)
    const updatedCardsInPlay = [...cardsInPlay]
    updatedCardsInPlay.splice(unbeatenCardIndex, 1, {
      attackersCard: cardsInPlay[unbeatenCardIndex].attackersCard,
      defendersCard: card
    })
    
    await updateGameData({
      players: updatedPlayers, 
      gameState, 
      deck, 
      playerTurn: players.find((player) => player.role === Role.PRIMARY_ATTACKER)?.playerId, 
      cardsInPlay: updatedCardsInPlay, 
      cardsDiscarded, 
      powerSuit,
      gameId: gameId,
      playersSkipped: []
    })
  
    return res.send()
  })
}