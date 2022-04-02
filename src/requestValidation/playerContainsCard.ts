import { ValidationResponse } from "../types"

export const playerContainsCards = (player, card): ValidationResponse => {
  let error
  const cardFound = player.cards.find((playerCard) => {
    return playerCard.rank === card.rank && playerCard.suit === card.suit
  })
  
  if (!cardFound) {
    error = {
      message: 'Given card doesn\'t belong to the given player',
      statusCode: 400
    }
  }

  return {
    validatedValue: card,
    error
  }
}