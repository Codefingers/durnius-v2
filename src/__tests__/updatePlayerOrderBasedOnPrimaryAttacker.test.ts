import { Player, Role } from "../types"
import { updatePlayerOrderBasedOnPrimaryAttacker } from "../updatePlayerOrderBasedOnPrimaryAttacker"

describe('updatePlayerOrderBasedOnPrimaryAttacker', () => {
    const player1: Player = {
        playerId: 'player-id-123',
        cards: [],
        name: 'player_name',
        role: Role.DEFENDER
    }

    const player2: Player = {
        playerId: 'player-id-456',
        cards: [],
        name: 'player_name_2',
        role: Role.ATTACKER
    }

    const player3: Player = {
        playerId: 'player-id-789',
        cards: [],
        name: 'player_name_3',
        role: Role.PRIMARY_ATTACKER
    }

    const player4: Player = {
        playerId: 'player-id-012',
        cards: [],
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
            nextPrimaryAttacker: player1,
            expectedOrder: [
                {...player1, role: Role.PRIMARY_ATTACKER},
                {...player2, role: Role.DEFENDER},
                {...player3, role: Role.ATTACKER},
                {...player4, role: Role.ATTACKER}
            ]
        },
        {
            players: [
                player1,
                player2,
                player3,
                player4
            ],
            nextPrimaryAttacker: player2,
            expectedOrder: [
                {...player2, role: Role.PRIMARY_ATTACKER},
                {...player3, role: Role.DEFENDER},
                {...player4, role: Role.ATTACKER},
                {...player1, role: Role.ATTACKER},
            ]
        },
        {
            players: [
                player1,
                player2,
                player3,
                player4
            ],
            nextPrimaryAttacker: player3,
            expectedOrder: [
                {...player3, role: Role.PRIMARY_ATTACKER},
                {...player4, role: Role.DEFENDER},
                {...player1, role: Role.ATTACKER},
                {...player2, role: Role.ATTACKER},
            ]
        },
        {
            players: [
                player1,
                player2,
                player3,
                player4
            ],
            nextPrimaryAttacker: player4,
            expectedOrder: [
                {...player4, role: Role.PRIMARY_ATTACKER},
                {...player1, role: Role.DEFENDER},
                {...player2, role: Role.ATTACKER},
                {...player3, role: Role.ATTACKER},
            ]
        },
        {
            players: [
                player2,
                player3,
                player4,
                player1
            ],
            nextPrimaryAttacker: player4,
            expectedOrder: [
                {...player4, role: Role.PRIMARY_ATTACKER},
                {...player1, role: Role.DEFENDER},
                {...player2, role: Role.ATTACKER},
                {...player3, role: Role.ATTACKER},
            ]
        },
        {
            players: [
                player4,
                player1,
                player2,
                player3,
            ],
            nextPrimaryAttacker: player3,
            expectedOrder: [
                {...player3, role: Role.PRIMARY_ATTACKER},
                {...player4, role: Role.DEFENDER},
                {...player1, role: Role.ATTACKER},
                {...player2, role: Role.ATTACKER},
            ]
        },
        {
            players: [
                player1,
                player2,
            ],
            nextPrimaryAttacker: player2,
            expectedOrder: [
                {...player2, role: Role.PRIMARY_ATTACKER},
                {...player1, role: Role.DEFENDER},
            ]
        },
    ]

    it.each(dataProvider)('should return the expected starting order', ({players, nextPrimaryAttacker, expectedOrder}) => {
        const order = updatePlayerOrderBasedOnPrimaryAttacker(nextPrimaryAttacker, players)
        expect(order).toEqual(expectedOrder)
    })
})