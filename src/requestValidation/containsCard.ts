import { ValidationResponse } from "../types"

export const containsCard = (req): ValidationResponse => {
  let error
  if (!("card" in req.body) || !("rank" in req.body.card) || !("suit" in req.body.card)) {
    error = {
      message: 'No card given',
      statusCode: 400
    }
  }

  return {
    validatedValue: req.body.card,
    error
  }
}