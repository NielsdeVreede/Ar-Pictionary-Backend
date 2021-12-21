import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { Server } from 'socket.io';
import { AppService } from './app.service';
import GameConfig, { player } from './models/game-config.schema';
import GameData from './models/game-data.schema';

@WebSocketGateway()
export class AppGateway {
  constructor(private readonly appService: AppService) {}

  @WebSocketServer()
  server: Server;

  queue: player[]
  activeGames: GameConfig[]

  @SubscribeMessage('search_opponent')
  handle_search_opponent(client: Socket, payload: string) {
    if(this.queue.length > 0){
      const opponent = this.queue[0]
      this.activeGames.push(this.appService.createNewGame([{client: client, name: payload}, opponent]))
      this.queue.shift()
    }
    else{
      this.queue.push({client: client, name: payload})
    }
  }

  @SubscribeMessage('leave')
  handle_leave(client: Socket) {

  }

  @SubscribeMessage('start_game')
  handle_start_game(client: Socket, payload: GameConfig) {
    
  }

  @SubscribeMessage('new_anchor')
  handle_new_anchor(client: Socket, payload: GameData) {
    // this.anchors.push(payload);
    // this.appService.broadcastMessage(
    //   Array.from(this.clients.keys()),
    //   'new_anchor',
    //   payload,
    //   this.hostClient,
    // );
  }

  @SubscribeMessage('guess_word')
  handle_guess_word(client: Socket, payload: any) {
    // if (this.gameConfig.word == payload) {
    //   this.appService.broadcastMessage(
    //     Array.from(this.clients.keys()),
    //     'guessed_correct',
    //     payload,
    //   );
    // }
  }
}
