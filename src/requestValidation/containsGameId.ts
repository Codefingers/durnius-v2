import { ValidationResponse } from "../types"

export const containsGameId = (req): ValidationResponse => {
  let error
  if (!("gameId" in req.body)) {
    error = {
      message: 'No game id given',
      statusCode: 400
    }
  }

  return {
    validatedValue: req.body.gameId,
    error
  }
}