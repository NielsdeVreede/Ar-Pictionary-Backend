import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { GameService } from './game.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GameService, AppGateway],
})
export class AppModule {}
