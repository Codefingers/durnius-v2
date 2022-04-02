import { canPlayCard } from "../canPlayCard"
import { Role } from "../types"

describe('canPlayCard', () => {
    it('should return true when it is the first turn in the round', () => {
        expect(canPlayCard({ rank: '6', suit: 'HEART' }, [], Role.PRIMARY_ATTACKER, 'HEART')).toBe(true)
    })

    it('should throw an error when there are no cards and the player is not a primary attacker', () => {
        expect(() => canPlayCard({ rank: '6', suit: 'HEART' }, [], Role.DEFENDER, 'HEART')).toThrow('This role cannot play a card')
    })
})