import { Injectable } from '@nestjs/common';
import { Socket } from 'net';

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
}
