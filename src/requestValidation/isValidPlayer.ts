import { ValidationResponse } from "../types"

export const isValidPlayer = (playerId, players): ValidationResponse => {
    let error
    const currentPlayerIndex = players.findIndex((player) => player.playerId === playerId)
    if (!currentPlayerIndex) {
      error = {
        message: 'Given player doesn\'t exist',
        statusCode: 400
      }
    }
  
    return { 
      validatedValue: playerId,
      error
    }
  }