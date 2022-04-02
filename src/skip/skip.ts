import { Request, Response } from "express"
import { canSkip } from "../canSkip"
import { getGameData } from "../getGameData"
import { isPlayersTurn } from "../requestValidation/isPlayersTurn"
import { isValidPlayer } from "../requestValidation/isValidPlayer"
import { GameData, Role } from "../types"
import { updateGameData } from "../updateGameData"
import { getNextPlayersTurn } from "./getNextPlayersTurn"
import { validateSkipRequest } from "./validateSkipRequest"

export const skip = (app) => {
  app.get('/skip', async (req: Request, res: Response) => {
    const validationResponse = validateSkipRequest(req)
    if ("message" in validationResponse) {
        res.status(validationResponse.statusCode)
        return res.send(validationResponse.message)
    }

    const { gameId, playerId } = validationResponse
    let gameDataResult
    gameDataResult = await getGameData(validationResponse.gameId)
  
    if (!gameDataResult?.Items || !gameDataResult.Items[0]) {
      throw new Error('No game data found')
    }

    const gameData = gameDataResult.Items[0] as GameData
    const { players, playerTurn, playersSkipped } = gameData

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

    const currentPlayer = players.find((player) => player.playerId === playerId)
    if (canSkip(gameData.cardsInPlay, currentPlayer.role)) {
        return res.send()
    }

    // TODO: 
    // All players skipped?
    // if yes, then defender has won the round
    // then start new round, get the new winner
    // Check if end of round
    // clear the board
    // set defender as new primary attacker
    // deal cards to all
    const nextPlayer = getNextPlayersTurn(currentPlayer, players, playersSkipped)
    if (nextPlayer.role === Role.DEFENDER) {
        // start new round
    }

    await updateGameData({
        ...gameData,
        playersSkipped: [...playersSkipped, currentPlayer],
        playerTurn: nextPlayer.playerId
    })

    res.status(400)
    return res.send('Player cannot skip turn')
  })
}