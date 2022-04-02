import { determineStartingPlayerOrder } from "../determineStartingPlayerOrder"
import { Player, Role } from "../types"

describe('determineStartingPlayerOrder', () => {
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
                suit: 'HEART'
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
        // smallest heart starts
        {
            players: [
                player1,
                player2,
                player3,
                player4
            ],
            powerSuit: 'HEART',
            expectedOrder: [
                {...player2, role: Role.PRIMARY_ATTACKER},
                {...player3, role: Role.DEFENDER},
                {...player4, role: Role.ATTACKER},
                {...player1, role: Role.ATTACKER}
            ]
        },
        // // smallest heart starts, mixed suits
        {
            players: [
                {...player1, cards: [ { rank: 'A', suit: 'SPADE'} ]},
                player2,
                {...player3, cards: [ { rank: '10', suit: 'SPADE'} ]},
            ],
            powerSuit: 'HEART',
            expectedOrder: [
                {...player2, role: Role.PRIMARY_ATTACKER},
                {...player3, cards: [ { rank: '10', suit: 'SPADE'} ], role: Role.DEFENDER},
                {...player1, cards: [ { rank: 'A', suit: 'SPADE'} ], role: Role.ATTACKER},
            ]
        },
        // player 1 starts, no smallest heart
        {
            players: [
                {...player1, cards: [ { rank: 'A', suit: 'SPADE'} ]},
                {...player2, cards: [ {  rank: 'A', suit: 'CLUB'} ]},
                {...player3, cards: [ { rank: 'A', suit: 'SPADE'} ]},
            ],
            powerSuit: 'HEART',
            expectedOrder: [
                {...player1, cards: [ { rank: 'A', suit: 'SPADE'} ], role: Role.PRIMARY_ATTACKER},
                {...player2, cards: [ {  rank: 'A', suit: 'CLUB'} ], role: Role.DEFENDER},
                {...player3, cards: [ { rank: 'A', suit: 'SPADE'} ], role: Role.ATTACKER},
            ]
        },
        // 2 players
        {
            players: [
                player1,
                player2,
            ],
            powerSuit: 'HEART',
            expectedOrder: [
                {...player2, role: Role.PRIMARY_ATTACKER},
                {...player1, role: Role.DEFENDER}
            ]
        },
    ]

    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
    });

    it.each(dataProvider)('should return the expected starting order', ({players, powerSuit, expectedOrder}) => {
        const order = determineStartingPlayerOrder(players, powerSuit)
        expect(order).toEqual(expectedOrder)
    })
})