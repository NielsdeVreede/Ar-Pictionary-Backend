export default class GameConfig {
  gameID: number;
  word: string;
  timeLimitInSeconds: number;
  timeRemaining: number;
  started: boolean;
  guesses: string[];
  guessableWord: string;
  currentPlayerTurn: number
  players: string[];
}