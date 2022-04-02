import { getCardValue } from "./getCardValue";
import { Player } from "./types";
import { updatePlayerOrderBasedOnPrimaryAttacker } from "./updatePlayerOrderBasedOnPrimaryAttacker";

export const getStartingPlayer = (players: Player[], powerSuit: string): Player|undefined => {
    let startingPlayer: Player | undefined
    let smallestCardValue: number
    for (let i = 0; i < players.length; i++) {
        const cards = players[i].cards.filter((card) => card.suit === powerSuit) || []

        for (let y = 0; y < cards.length; y++) {
            const cardValue = getCardValue(cards[y])

            if (!smallestCardValue) {
                smallestCardValue = cardValue
                startingPlayer = players[i]
            } else {
                if (cardValue < smallestCardValue) {
                    smallestCardValue = cardValue
                    startingPlayer = players[i]
                }
            }
        }
    }

    return startingPlayer
}