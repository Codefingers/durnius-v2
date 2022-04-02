import express from 'express'
import { getDefaultPlayers } from './getDefaultPlayers'
import { GameData, GameState } from './types';
import { dealCards } from './dealCards';
import { shuffleDeck } from './shuffleDeck';
import { getStartingDeck } from './getStartingDeck';
import { determinePowerSuit } from './determinePowerSuit';
import { determineStartingPlayerOrder } from './determineStartingPlayerOrder';
import bodyParser from 'body-parser';
import { updateGameData } from './updateGameData';
import { playCard } from './playCard/playCard';
import { skip } from './skip/skip';

const app = express();
app.use(bodyParser.json())
const port = 3000;

app.get('/', async (req, res) => {
  const defaultPlayers = getDefaultPlayers()
  const shuffledDeck = shuffleDeck(getStartingDeck())
  const powerSuit = determinePowerSuit(shuffledDeck).suit
  const {players: updatedPlayers, deck: updatedDeck} = dealCards(defaultPlayers, shuffledDeck)
  const orderedPlayers = determineStartingPlayerOrder(updatedPlayers, powerSuit)

  const gameData: GameData = {
    players: orderedPlayers, 
    deck: updatedDeck, 
    gameState: GameState.NEW_GAME, 
    playerTurn: orderedPlayers[0].playerId, 
    powerSuit, 
    gameId: 'game-id-123',
    cardsDiscarded: [],
    cardsInPlay: [],
    playersSkipped: []
  }

  await updateGameData(gameData)
  
  res.send(JSON.stringify(gameData))
})

playCard(app)
skip(app)

app.get('/players', (req, res) => {
  res.send(JSON.stringify(getDefaultPlayers()));
})


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
})
