import { Card } from "./types";

export const shuffleDeck = (deck: Card[]) => {
    console.log('Shuffling deck...')

    for (let i = 0; i < deck.length; i++) {
        const randomPositionOfAnotherCard = Math.floor(Math.random() * (i + 1))
        const card = deck[i]
        deck[i] = deck[randomPositionOfAnotherCard]
        deck[randomPositionOfAnotherCard] = card
    }

    return deck
}