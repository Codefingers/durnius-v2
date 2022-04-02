import { Card, Player, Role } from "./types";

export const dealCards = (
  players: Player[],
  deck: Card[]
  ): {players: Player[], deck: Card[]} => {
    if (!deck.length) {
      return {players, deck: []}
    }

    if (!players.length) {
      throw new Error('No players to deal cards for')
    }

    const playerOrderToDeal = [...players]
    const defenderIndex = playerOrderToDeal.findIndex((player) => player.role === Role.DEFENDER)
    const defender = playerOrderToDeal.splice(defenderIndex, 1)[0]
    playerOrderToDeal.push(defender)

    console.log('Dealing cards...')
    const deckToDeal = [...deck]
    for (let i = 0; i < playerOrderToDeal.length; i++) {
      const playerCards = playerOrderToDeal[i].cards ? [...playerOrderToDeal[i].cards] : []

      for (let y = playerCards.length; y < 6; y++) {
        if (!deckToDeal.length) {
          playerOrderToDeal[i].cards = playerCards

          return {players: playerOrderToDeal, deck: []}
        }

        playerCards.push(deckToDeal.pop())
      }

      playerOrderToDeal[i].cards = playerCards
    }

    return {players: playerOrderToDeal, deck: deckToDeal}
}