import { canDefenderPlayCard } from "../canDefenderPlayCard"
import { Card, CardPlayed, Role } from "../types"

describe('canDefenderPlayCard', () => {
    const player = {
        playerId: 'playerId',
        cards: [],
        name: 'Ernest',
        role: Role.PRIMARY_ATTACKER
    }

    const dataProvider: { cardToPlay: Card, cardsInPlay: CardPlayed[], expected: boolean }[] = [
        {
            cardToPlay: {
                rank: 'A',
                suit: 'SPADE',
            },
            cardsInPlay: [
                {
                    attackersCard: {
                        rank: 'A',
                        suit: 'HEART',
                    },
                }
            ],
            expected: true
        },
        {
            cardToPlay: {
                rank: '6',
                suit: 'HEART',
            },
            cardsInPlay: [
                {
                    attackersCard: {
                        rank: 'A',
                        suit: 'HEART',
                    },
                }
            ],
            expected: false
        },
        {
            cardToPlay: {
                rank: 'A',
                suit: 'SPADE',
            },
            cardsInPlay: [
                {
                    attackersCard: {
                        rank: 'A',
                        suit: 'HEART',
                    },
                    defendersCard: {
                        rank: 'J',
                        suit: 'SPADE',
                    },
                },
                {
                    attackersCard: {
                        rank: '6',
                        suit: 'HEART',
                    },
                    defendersCard: {
                        rank: '6',
                        suit: 'SPADE',
                    },
                },
                {
                    attackersCard: {
                        rank: '7',
                        suit: 'HEART',
                    },
                    defendersCard: {
                        rank: '7',
                        suit: 'SPADE',
                    },
                },
                {
                    attackersCard: {
                        rank: '8',
                        suit: 'HEART',
                    },
                    defendersCard: {
                        rank: '8',
                        suit: 'SPADE',
                    },
                },
                {
                    attackersCard: {
                        rank: '9',
                        suit: 'HEART',
                    },
                    defendersCard: {
                        rank: '9',
                        suit: 'SPADE',
                    },
                },
                {
                    attackersCard: {
                        rank: '10',
                        suit: 'HEART',
                    },
                    defendersCard: {
                        rank: '10',
                        suit: 'SPADE',
                    },
                },
            ],
            expected: false
        }
    ]

    it.each(dataProvider)('should return the expected result given different inputs', ({ cardToPlay, cardsInPlay, expected }) => {
        expect(canDefenderPlayCard(cardToPlay, cardsInPlay, 'SPADE')).toEqual(expected)
    })
})