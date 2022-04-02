import { canSkip } from "../canSkip"
import { Role } from "../types"

describe('canSkip', () => {
    const dataProvider = [
        // primary attacker, but card has been played
        {
            cardsInPlay: [
                {
                    attackersCard: {
                        rank: '6',
                        suit: 'HEART',
                    },
                    defendersCard: {
                        rank: 'A',
                        suit: 'HEART',
                    },
                }
            ],
            role: Role.PRIMARY_ATTACKER,
            expected: true
        },
        // primary attacker, no cards have been played
        {
            cardsInPlay: [],
            role: Role.PRIMARY_ATTACKER,
            expected: false
        },
        // defender
        {
            cardsInPlay: [],
            role: Role.DEFENDER,
            expected: false
        },
        // attack
        {
            cardsInPlay: [],
            role: Role.ATTACKER,
            expected: true
        }
    ]

    it.each(dataProvider)('should return true when it is the first turn in the round', ({cardsInPlay, role, expected}) => {
        expect(canSkip(cardsInPlay, role)).toBe(expected)
    })
})