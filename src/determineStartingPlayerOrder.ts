import { getCardValue } from "./getCardValue";
import { getStartingPlayer } from "./getStartingPlayer";
import { Player } from "./types";
import { updatePlayerOrderBasedOnPrimaryAttacker } from "./updatePlayerOrderBasedOnPrimaryAttacker";

export const determineStartingPlayerOrder = (players: Player[], powerSuit: string): Player[] => {
    console.log('Determing starting order...')

    if (!players.length) {
        throw new Error('No players given')
    }
    
    let startingPlayer = getStartingPlayer(players, powerSuit)
    if (!startingPlayer) {
        const randomPosition = Math.floor(Math.random() * (players.length + 1))
        startingPlayer = players[randomPosition]
    }

    
    return updatePlayerOrderBasedOnPrimaryAttacker(startingPlayer, players)
}