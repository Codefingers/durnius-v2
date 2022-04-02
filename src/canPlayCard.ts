import { canAttackerPlayCard } from "./canAttackerPlayCard";
import { canDefenderPlayCard } from "./canDefenderPlayCard";
import { Card, CardPlayed, Role } from "./types";

export const canPlayCard = (
    cardToPlay: Card,
    cardsInPlay: CardPlayed[], 
    role: Role,
    powerSuit: string
): boolean => {
    if (role === Role.PRIMARY_ATTACKER && !cardsInPlay?.length) {
        return true
    }

    if (!cardsInPlay.length) {
        throw new Error('This role cannot play a card')
    }

    const allCardsBeaten = cardsInPlay.filter((cardPlayed) => cardPlayed.defendersCard !== undefined)?.length === 6
    if (allCardsBeaten) {
        return false
    }

    if ([Role.ATTACKER, Role.PRIMARY_ATTACKER].includes(role)) {
        return canAttackerPlayCard(cardToPlay, cardsInPlay)
    }

    return canDefenderPlayCard(cardToPlay, cardsInPlay, powerSuit)
}