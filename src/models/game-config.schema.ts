import { Socket } from 'net';

export default class GameConfig {
  gameID: string;
  timeLimitInSeconds: number = 15;
  timeRemaining: number = this.timeLimitInSeconds;
  started: boolean = false;
  guesses: string[] = [];
  guessableWord: string;
  currentPlayerTurn: Socket
  players: Socket[];

  constructor(gameID: string, guessableWord: string, currentPlayerTurn: Socket, players: Socket[]){
    this.gameID = gameID
    this.guessableWord = guessableWord
    this.currentPlayerTurn = currentPlayerTurn
    this.players = players
  }
}