import { Card } from "./types"

export const getCardValue = (card: Card): number => {
  const valueMap = {
    '6': 10,
    '7': 20,
    '8': 30,
    '9': 40,
    '10': 50,
    'J': 60,
    'Q': 70,
    'K': 80,
    'A': 90,
  }

  return valueMap[card.rank]
}