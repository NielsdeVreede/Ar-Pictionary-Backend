import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  clients: Array<Socket>;
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_point')
  handleMessage(client: Socket, payload: any): string {
    console.log(payload);
    client.emit('event', 'payload');
    return 'hai';
  }
}
