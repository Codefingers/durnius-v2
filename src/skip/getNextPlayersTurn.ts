import { Player, Role } from "../types"

export const getNextPlayersTurn = (currentPlayer: Player, players: Player[], playersSkipped: Player[]): Player => {
    const attackersLength = players.filter((player) => player.role !== Role.DEFENDER)
    const updatedPlayersSkipped = [...playersSkipped, currentPlayer]
    const currentPlayerIndex = players.findIndex((player) => player.playerId = currentPlayer.playerId)

    // if all the attackers have skipped, then the defender has won
    if (updatedPlayersSkipped.length === attackersLength.length) {
        return players.find((player) => player.role === Role.DEFENDER)
    }

    let loopedRound = false
    let counter = currentPlayerIndex + 1
    while (!loopedRound) {
        if (counter > players.length-1) {
            counter = 0
        }

        if (counter === currentPlayerIndex) {
            loopedRound = true
        } else {
            if (updatedPlayersSkipped.includes(players[counter]) || players[counter].role === Role.DEFENDER) {
                counter++
            } else {
                return players[counter]
            }
        }
    }
}