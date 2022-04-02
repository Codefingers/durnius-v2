import { Player, Role } from "./types";

export const getDefaultPlayers = ():Player[] => [
    {
      playerId: 'player-id-123',
      name: 'Ernest',
      cards: [],
      role: Role.DEFENDER
    },
    {
      playerId: 'player-id-456',
      name: 'Richard',
      cards: [],
      role: Role.ATTACKER
    },
    {
      playerId: 'player-id-789',
      name: 'Jolita',
      cards: [],
      role: Role.ATTACKER
    },
    {
      playerId: 'player-id-012',
      name: 'Callie',
      cards: [],
      role: Role.PRIMARY_ATTACKER
    }
  ]