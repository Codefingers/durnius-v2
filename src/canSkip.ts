import { CardPlayed, Role } from "./types";

export const canSkip = (
    cardsInPlay: CardPlayed[], 
    role: Role
): boolean => {
    if (role === Role.DEFENDER) {
        return false
    }

    if (role == Role.PRIMARY_ATTACKER && !cardsInPlay?.length) {
        return false
    }

    return true
}