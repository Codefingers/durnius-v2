import { containsGameId } from "../requestValidation/containsGameId"
import { containsPlayerId } from "../requestValidation/containsPlayerId"
import { HttpErrorResponse, SkipRequest } from "../types"

export const validateSkipRequest = (req): SkipRequest|HttpErrorResponse => {
    const playerIdResponse = containsPlayerId(req)
    if (playerIdResponse.error) {
      return playerIdResponse.error
    }

    const gameIdResponse = containsGameId(req)
    if (gameIdResponse.error) {
      return gameIdResponse.error
    }
  
    return {
      playerId: playerIdResponse.validatedValue,
      gameId: gameIdResponse.validatedValue,
    }
  }