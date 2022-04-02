import { Card, CardPlayed, Role } from "./types";

export const canAttackerPlayCard = (
    cardToPlay: Card, 
    cardsInPlay: CardPlayed[]
): boolean => {
    // if we have 6 cards in play, we have attacked a max of 6 times
    if (cardsInPlay.length === 6) {
        return false
    }

    const ranks = []
    cardsInPlay.forEach((cardPlayed) => {
        ranks.push(cardPlayed.attackersCard.rank, cardPlayed.defendersCard?.rank)
    })

    return ranks.includes(cardToPlay.rank)
}