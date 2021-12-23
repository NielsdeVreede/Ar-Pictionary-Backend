import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';
import { GameService } from './game.service';
import GameConfig, { player } from './models/game-config.schema';
import GameData from './models/game-data.schema';

@WebSocketGateway(80)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  queue: player[];
  activeGames: GameConfig[];

  constructor(
    private readonly appService: AppService,
    private readonly gameService: GameService,
  ) {
    this.queue = [];
    this.activeGames = [];
  }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('New client is connected');
  }

  handleDisconnect(client) {
    this.queue.forEach((player, index) => {
      if (player.client.id === client.id) {
        this.queue.splice(index, 1);
      }
    });
  }

  @SubscribeMessage('search_opponent')
  handle_search_opponent(client: Socket, payload: any[]) {
    if (this.queue.length > 0) {
      const opponent = this.queue[0];
      const players = [
        { client: client, name: payload[0], id: payload[1] },
        opponent,
      ];
      const gameConfig = this.gameService.createNewGame(players);

      this.activeGames.push(gameConfig);
      this.appService.broadcastMessage(
        players,
        'game_created',
        gameConfig.getInitValues(),
      );

      this.queue.shift();
    } else {
      this.queue.push({ client: client, name: payload[0], id: payload[1] });
    }
  }

  @SubscribeMessage('leave')
  handle_leave(client: Socket) {}

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
