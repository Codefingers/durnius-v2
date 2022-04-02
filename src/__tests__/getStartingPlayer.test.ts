import { getStartingPlayer } from "../getStartingPlayer"
import { Player, Role } from "../types"

describe('getStartingPlayer', () => {
    const player1: Player = {
        playerId: 'player-id-123',
        cards: [
            {
                rank: '10',
                suit: 'HEART'
            }
        ],
        name: 'player_name',
        role: Role.DEFENDER
    }

    const player2: Player = {
        playerId: 'player-id-456',
        cards: [
            {
                rank: '6',
                suit: 'HEART'
            }
        ],
        name: 'player_name_2',
        role: Role.ATTACKER
    }

    const player3: Player = {
        playerId: 'player-id-789',
        cards: [
            {
                rank: 'A',
                suit: 'CLUB'
            }
        ],
        name: 'player_name_3',
        role: Role.PRIMARY_ATTACKER
    }

    const player4: Player = {
        playerId: 'player-id-012',
        cards: [
            {
                rank: '8',
                suit: 'HEART'
            }
        ],
        name: 'player_name_4',
        role: Role.ATTACKER
    }

    const dataProvider = [
        {
            players: [
                player1,
                player2,
                player3,
                player4
            ],
            powerSuit: 'HEART',
            expectedPlayer: player2,
        },
        {
            players: [
                player2,
                player1,
                player3,
                player4
            ],
            powerSuit: 'HEART',
            expectedPlayer: player2,
        },
        {
            players: [
                player2,
                player1,
                player3,
                player4
            ],
            powerSuit: 'CLUB',
            expectedPlayer: player3,
        },
        {
            players: [
                player2,
                player1,
                player3,
                player4
            ],
            powerSuit: 'DIAMOND',
            expectedPlayer: undefined,
        },
    ]

    it.each(dataProvider)('should return the player with the smallest card', ({players, powerSuit, expectedPlayer}) => {
        expect(getStartingPlayer(players, powerSuit)).toEqual(expectedPlayer)
    })
})