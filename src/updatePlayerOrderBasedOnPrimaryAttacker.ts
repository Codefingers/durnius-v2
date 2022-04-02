import { Player, Role } from "./types";

export const updatePlayerOrderBasedOnPrimaryAttacker = (newPrimaryAttacker: Player, players: Player[]): Player[] => {
    const updatedPlayers = [...players]
    const positionOfStartingPlayer = updatedPlayers.findIndex(({playerId}) => playerId === newPrimaryAttacker.playerId)
    updatedPlayers.splice(positionOfStartingPlayer, 1, {...newPrimaryAttacker, role: Role.PRIMARY_ATTACKER})

    const order: Player[] = [{...updatedPlayers[positionOfStartingPlayer]}]
    let loopedRound = false
    let counter = positionOfStartingPlayer+1
    while (!loopedRound) {
        const role: Role = counter === positionOfStartingPlayer+1 ? Role.DEFENDER : Role.ATTACKER
        if (counter > updatedPlayers.length-1) {
            counter = 0
        }

        if (counter === positionOfStartingPlayer) {
            loopedRound = true
        } else {
            order.push({...updatedPlayers[counter], role})
            counter++
        }
    }

    return order
}