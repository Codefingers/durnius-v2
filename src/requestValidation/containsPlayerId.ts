import { ValidationResponse } from "../types"

export const containsPlayerId = (req): ValidationResponse => {
  let error
  if (!("playerId" in req.body)) {
    error = {
      message: 'No player id given',
      statusCode: 400
    }
  }

  return {
    validatedValue: req.body.playerId,
    error
  }
}