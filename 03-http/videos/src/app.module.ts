import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from './noticia.service';

@Module({
  imports: [], //importan modulos
  controllers: [AppController], // importan controladores
  providers: [AppService,NoticiaService], // importan servicios
})
export class AppModule {}
