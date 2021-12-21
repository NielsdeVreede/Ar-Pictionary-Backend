import { Injectable } from '@nestjs/common';
import { Socket } from 'net';
import GameConfig, { player } from './models/game-config.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Pictionary backend';
  }

  broadcastMessage(players: player[], header: string, payload: any) {
    players.forEach(player => {
      player.client.emit(header, payload)
    });
  }

  createNewGame(players) {
    //Replace "Boerderij with random word from list of words"
    const randomStarter = players[Math.floor(Math.random() * players.length)];
    return new GameConfig(uuid(), 'Boerderij', randomStarter, players);
  }
}
