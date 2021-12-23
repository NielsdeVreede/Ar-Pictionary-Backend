import { Injectable } from '@nestjs/common';
import { player } from './models/game-config.schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Pictionary backend';
  }

  broadcastMessage(players: player[], event: string, payload: any) {
    players.forEach(player => {
      player.client.emit(event, payload)
    });
  }
}
