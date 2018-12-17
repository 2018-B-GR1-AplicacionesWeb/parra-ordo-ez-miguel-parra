import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // esto o es un paquete solo dice que va usar de la carpeta
//const http_server = require('http-server'); // Forma de importar en JS
import * as cookieParser from 'cookie-parser';
import * as httpserver from 'http-server';
import * as ejs from 'ejs';

console.log(httpserver);
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser(
        'me gustan los tacos', //secreto
        { //opciones

        }
    ));
    app.set('view engine','ejs');
    await app.listen(3001);
}
bootstrap();
