import { dealCards } from "../dealCards"
import { Player, Role } from "../types"
import deck from "./fixtures/deck.json"

describe('dealCards', () => {
    const player1: Player = {
        playerId: '__PLAYER_ID_123__',
        cards: [
            {
                rank: '10',
                suit: 'Heart',
            }
        ],
        name: '__PLAYER_NAME__',
        role: Role.PRIMARY_ATTACKER
    }

    const player2: Player = {
        playerId: '__PLAYER_ID_456__',
        cards: [
            {
                suit: 'Club',
                rank: '10',
            }
        ],
        name: '__PLAYER_NAME_B__',
        role: Role.DEFENDER
    }

    const player3: Player = {
        playerId: '__PLAYER_ID_789__',
        cards: [
            {
                suit: 'Spade',
                rank: '6',
            },
            {
                suit: 'Spade',
                rank: '7',
            },
            {
                suit: 'Spade',
                rank: '8',
            },
            {
                suit: 'Spade',
                rank: '9',
            },
            {
                suit: 'Spade',
                rank: '10',
            },
            {
                suit: 'Spade',
                rank: 'J',
            }
        ],
        name: '__PLAYER_NAME_C__',
        role: Role.ATTACKER
    }

    it('should not deal when there are no cards left', () => {
        const dealtCards = dealCards([player1], [])

        expect(dealtCards).toEqual({players: [player1], deck: []})
    })

    it('should throw an error when there are no players', () => {
        expect(
            () => dealCards(
                [], 
                [{
                    suit: 'Heart',
                    rank: '9',
                }]))
            .toThrow(new Error('No players to deal cards for'))
    })

    it('should deal cards in priority order', () => {
        const dealtCards = dealCards(
            [
                {...player1}, 
                {...player2}, 
                { ...player3, cards: [player3.cards[0], player3.cards[1], player3.cards[2], player3.cards[3]] }
            ], 
            [
                deck[0], deck[1], deck[2], deck[3], deck[4], deck[5], deck[6], deck[7], deck[8], deck[9], deck[10],  
            ]
        )

        expect(dealtCards).toEqual(
            {
                players: [
                    { ...player1, cards: [ ...player1.cards, deck[10], deck[9], deck[8], deck[7], deck[6] ]},
                    { ...player3, cards: [ player3.cards[0], player3.cards[1], player3.cards[2], player3.cards[3], deck[5], deck[4] ]},
                    { ...player2, cards: [ ...player2.cards, deck[3], deck[2], deck[1], deck[0] ]},
                ], 
                deck: []
            }
        )
    })

    it('should deal cards enough to ensure each player has 6 cards', () => {
        const dealtCards = dealCards(
            [
                {...player1}, 
                {...player2}, 
                {...player3}
            ], 
            [...deck]
        )

        expect(dealtCards.players).toEqual(
            
                [
                    {...player1, cards: [...player1.cards, deck[35], deck[34], deck[33], deck[32], deck[31]]}, 
                    player3,
                    {...player2, cards: [...player2.cards, deck[30], deck[29], deck[28], deck[27], deck[26]]}, 
              
                ]
        )
    })
})