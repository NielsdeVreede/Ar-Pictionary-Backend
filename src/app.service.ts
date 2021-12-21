import { Injectable } from '@nestjs/common';
import { Socket } from 'net';
import GameConfig from './models/game-config.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Pictionary backend';
  }

  broadcastMessage(
    clients: Socket[],
    header: string,
    payload: any,
    exception?: Socket,
  ) {
    for (let i = 0; i < clients.length; ) {
      if (clients[i] != exception) {
        clients[i].emit(header, payload);
      }
    }
  }

  createNewGame(clients){
    //Replace "Boerderij with random word from list of words"
    const randomStarter = clients[Math.floor(Math.random()*clients.length)];
    return new GameConfig(uuid(), "Boerderij", randomStarter, clients)
  }
}
