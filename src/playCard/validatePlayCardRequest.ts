import { containsCard } from "../requestValidation/containsCard"
import { containsGameId } from "../requestValidation/containsGameId"
import { containsPlayerId } from "../requestValidation/containsPlayerId"
import { HttpErrorResponse, PlayCardRequest } from "../types"

export const validatePlayCardRequest = (req): PlayCardRequest|HttpErrorResponse => {
    const playerIdResponse = containsPlayerId(req)
    if (playerIdResponse.error) {
      return playerIdResponse.error
    }

    const gameIdResponse = containsGameId(req)
    if (gameIdResponse.error) {
      return gameIdResponse.error
    }

    const cardResponse = containsCard(req)
    if (cardResponse.error) {
      return cardResponse.error
    }
  
    return {
      playerId: playerIdResponse.validatedValue,
      gameId: gameIdResponse.validatedValue,
      card: cardResponse.validatedValue
    }
  }