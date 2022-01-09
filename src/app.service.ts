import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { player } from './models/game-config.schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Pictionary backend';
  }

  broadcastMessage(players: player[], event: string, payload: any, stringify?: boolean) {
    let load = payload

    if(stringify !== undefined && stringify === true){
      load = JSON.stringify(payload)
    }

    players.forEach(player => {
      player.client.emit(event, load)
    });
  }
}
