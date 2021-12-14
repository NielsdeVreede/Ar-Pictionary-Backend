import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { Server } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway {
  constructor(private readonly appService: AppService) {}

  @WebSocketServer()
  server: Server;

  clients: Map<Socket, string>;
  anchors: GameData[];
  hostClient: Socket;
  gameConfig: GameConfig;

  @SubscribeMessage('join')
  handle_join(client: Socket, payload: any) {
    console.log(payload, 'has joined');
    this.clients.set(client, payload);
  }

  @SubscribeMessage('leave')
  handle_leave(client: Socket) {
    this.clients.delete(client);
  }

  @SubscribeMessage('start_game')
  handle_start_game(client: Socket, payload: GameConfig) {
    if (this.clients.get(client)) {
      this.hostClient = client;
      payload.started = true;
      for (const gameClient of this.clients.entries()) {
        console.log(gameClient[0], gameClient[1]);
      }
    }
  }

  @SubscribeMessage('new_anchor')
  handle_new_anchor(client: Socket, payload: GameData) {
    this.anchors.push(payload);
    this.appService.broadcastMessage(
      Array.from(this.clients.keys()),
      'new_anchor',
      payload,
      this.hostClient,
    );
  }

  @SubscribeMessage('guess_word')
  handle_guess_word(client: Socket, payload: any) {
    if (this.gameConfig.word == payload) {
      this.appService.broadcastMessage(
        Array.from(this.clients.keys()),
        'guessed_correct',
        payload,
      );
    }
  }
}
