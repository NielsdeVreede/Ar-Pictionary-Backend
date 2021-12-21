import { Socket } from 'net';

export type player = {
  client: Socket,
  name: string;
}

export default class GameConfig {
  gameID: string;
  timeLimitInSeconds: number = 15;
  timeRemaining: number = this.timeLimitInSeconds;
  started: boolean = false;
  guesses: string[] = [];
  guessableWord: string;
  currentPlayerTurn: Socket
  players: player[];
  anchors: any[] = []

  constructor(gameID: string, guessableWord: string, currentPlayerTurn: Socket, players: player[]){
    this.gameID = gameID
    this.guessableWord = guessableWord
    this.currentPlayerTurn = currentPlayerTurn
    this.players = players
  }
}