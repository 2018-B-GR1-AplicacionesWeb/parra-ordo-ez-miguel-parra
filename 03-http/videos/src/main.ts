import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

// const http_server = require('http-server'); // JS
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';
import * as session from 'express-session';
import * as FileSession from 'session-file-store';
import * as express from 'express';

const FileStore = FileSession(session);


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: false},
            name: 'server-session-id',
            store: new FileStore()
        })
    );

    app.use(cookieParser(
        'me gustan los tacos', // secreto
        {  // opciones

        }
    ));

    app.set('view engine', 'ejs');

    app.use(
        express.static('publico')
    );

    // /publico/texto.txt
    // /publico/ejemplo/texto.txt

    // localhost:3000/texto.txt
    // localhost:3000/ejemplo/texto.txt


    await app.listen(3000);
}

bootstrap();



/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // esto o es un paquete solo dice que va usar de la carpeta
//const http_server = require('http-server'); // Forma de importar en JS
import * as cookieParser from 'cookie-parser';
import * as httpserver from 'http-server';
import * as ejs from 'ejs';
import * as session from 'express-session';
import * as express from 'express';
import * as FileSession from 'session-file-store'; //importar
const FileStore=FileSession(session); //Mndar como parametro el session de express

console.log(httpserver);
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            Secret: 'No sera de tomar un traguito',
            resave: false,
            saveUnitialized: true,
            cookie: {secure: false
            },
            name: 'server-seesion-id',
            store: new FileStore()

        })
    );



    app.use(cookieParser(
        'me gustan los tacos', //secreto
        { //opciones

        }
    ));
    app.set('view engine','ejs');
    app.use(
        express.static('publico')
    ); //para el servidor estatico
    //publico/texto.txt

    await app.listen(3001);
}
bootstrap();*/