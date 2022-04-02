import { ValidationResponse } from "../types"

export const isPlayersTurn = (playerId, playerTurn): ValidationResponse => {
  let error
  if (playerTurn !== playerId) {
    error = {
      message: 'Invalid player turn',
      statusCode: 400
    }
  }
    
  return { 
      validatedValue: playerTurn,
      error
    }
  }