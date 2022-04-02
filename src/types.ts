export interface GameData {
    gameId: string
    deck: Card[]
    gameState: GameState
    players: Player[]
    playerTurn: string
    powerSuit: string
    cardsInPlay: CardPlayed[]
    cardsDiscarded: Card[]
    playersSkipped: Player[]
}

export interface Card {
    suit: string
    rank: string
  }

export interface Player {
    playerId: string
    name: string
    cards: Card[]
    role: Role
}

export enum Role {
    DEFENDER,
    ATTACKER,
    PRIMARY_ATTACKER
}

export enum GameState {
    NEW_GAME,
    IN_PROGRESS,
    ENDED
}

export interface CardPlayed {
    attackersCard: Card
    defendersCard?: Card
}

export interface PlayCardRequest {
    gameId: string
    playerId: string
    card: Card
}

export interface SkipRequest {
    gameId: string
    playerId: string
}

export interface ValidationResponse {
    validatedValue: any
    error: HttpErrorResponse
}

export interface HttpErrorResponse {
    message: string
    statusCode: number
}