import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoService } from './auto.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AutoService],
})
export class AppModule {}
