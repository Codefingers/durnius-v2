import { canAttackerPlayCard } from "../canAttackerPlayCard"
import { Card, CardPlayed, Role } from "../types"

describe('canAttackerPlayCard', () => {
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
                },
                {
                    attackersCard: {
                        rank: '6',
                        suit: 'HEART',
                    },
                },
                {
                    attackersCard: {
                        rank: '7',
                        suit: 'HEART',
                    },
                },
                {
                    attackersCard: {
                        rank: '8',
                        suit: 'HEART',
                    },
                },
                {
                    attackersCard: {
                        rank: '9',
                        suit: 'HEART',
                    },
                },
                {
                    attackersCard: {
                        rank: '10',
                        suit: 'HEART',
                    },
                },
            ],
            expected: false
        }
    ]

    it.each(dataProvider)('should return the expected result given different inputs', ({ cardToPlay, cardsInPlay, expected }) => {
        expect(canAttackerPlayCard(cardToPlay, cardsInPlay)).toEqual(expected)
    })
})