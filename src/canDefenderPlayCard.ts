import { Card, CardPlayed, Role } from "./types";

export const canDefenderPlayCard = (
    cardToPlay: Card, 
    cardsInPlay: CardPlayed[], 
    powerSuit: string
): boolean => {
    const unbeatenCards = cardsInPlay.filter((cardPlayed) => !cardPlayed.defendersCard)
    if (!unbeatenCards.length) {
        return false
    }

    const attackersCard = unbeatenCards[0].attackersCard
    // if the suits do not match and the card is not a power card
    if (cardToPlay.suit !== attackersCard.suit && cardToPlay.suit !== powerSuit) {
        return false
    }

    // if the suits are the same but the rank is less/equal
    if (cardToPlay.suit === attackersCard.suit && cardToPlay.rank <= attackersCard.rank) {
        return false
    }

    return cardToPlay.suit === powerSuit
}