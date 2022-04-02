import { Player, Role } from "../../types"
import { getNextPlayersTurn } from "../getNextPlayersTurn"

const player1: Player = {
    playerId: 'player-id-123',
    cards: [],
    name: 'Bart',
    role: Role.PRIMARY_ATTACKER
}

const player2: Player = {
    playerId: 'player-id-456',
    cards: [],
    name: 'Homer',
    role: Role.DEFENDER
}
const player3: Player = {
    playerId: 'player-id-789',
    cards: [],
    name: 'Lisa',
    role: Role.ATTACKER
}
const player4: Player = {
    playerId: 'player-id-012',
    cards: [],
    name: 'Marge',
    role: Role.ATTACKER
}

const dataProvider = [
    // no players skipped
    {
        currentPlayer: player1,
        players: [player1, player2, player3, player4],
        playersSkipped: [],
        expectedPlayerId: player3.playerId
    },
    // 1 player skipped
    {
        currentPlayer: player3,
        players: [player1, player2, player3, player4],
        playersSkipped: [player1],
        expectedPlayerId: player4.playerId
    },
    // 1 player skipped, 3 players
    {
        currentPlayer: player3,
        players: [player1, player2, player3],
        playersSkipped: [player1],
        expectedPlayerId: player2.playerId
    },
    // all players skipped
    {
        currentPlayer: player4,
        players: [player1, player2, player3, player4],
        playersSkipped: [player1, player3],
        expectedPlayerId: player2.playerId
    },
    // all players skipped, but only 2 players
    {
        currentPlayer: player1,
        players: [player1, player2],
        playersSkipped: [],
        expectedPlayerId: player2.playerId
    }
]

describe('getNextPlayersTurn', () => {
    it.each(dataProvider)('should return the expected next player when given different inputs', ({currentPlayer, players, playersSkipped, expectedPlayerId}) => {
        expect(getNextPlayersTurn(currentPlayer, players, playersSkipped).playerId).toBe(expectedPlayerId)
    })
})