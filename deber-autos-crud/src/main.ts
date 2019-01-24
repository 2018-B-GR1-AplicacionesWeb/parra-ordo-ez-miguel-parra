import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ejs} from 'ejs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.set('view engine', 'ejs');
  await app.listen(3003);
}
bootstrap();
