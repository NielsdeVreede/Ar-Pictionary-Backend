import { Injectable } from '@nestjs/common';
import GameConfig from './models/game-config.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GameService {
  createNewGame(players) {
    //Replace "Boerderij with random word from list of words"
    const randomStarter = players[Math.floor(Math.random() * players.length)];
    return new GameConfig(uuid(), 'Boerderij', randomStarter.id, players);
  }
}
