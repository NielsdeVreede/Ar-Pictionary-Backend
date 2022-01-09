import { Socket } from 'socket.io';

export type player = {
  client: Socket;
  name: string;
  id: string;
};

export default class GameConfig {
  gameID: string;
  timeLimitInSeconds: number = 15;
  timeRemaining: number = this.timeLimitInSeconds;
  started: boolean = false;
  guesses: string[] = [];
  guessableWord: string;
  currentPlayerTurn: string;
  players: player[];
  anchors: any[] = [];

  constructor(
    gameID: string,
    guessableWord: string,
    currentPlayerTurn: string,
    players: player[],
  ) {
    this.gameID = gameID;
    this.guessableWord = guessableWord;
    this.currentPlayerTurn = currentPlayerTurn;
    this.players = players;
  }

  getInitValues() {
    return {
      gameID: this.gameID,
      timeLimitInSeconds: this.timeLimitInSeconds,
      timeRemaining: this.timeRemaining,
      started: this.started,
      guesses: this.guesses,
      guessableWord: this.guessableWord,
      currentPlayerTurn: this.currentPlayerTurn,
      players: [{id: this.players[0].id, name: this.players[0].name}, {id: this.players[1].id, name: this.players[1].name}],
      anchors: this.anchors,
    };
  }
}
