import { NestFactory } from '@nestjs/core'; //esto si es un paquete
import { AppModule} from './app.module'; //esto es para entrar a una carpeta
//const http_server=require('http-server'); //importar en javascript
//import {} from 'http-server'; //importar en typescript pero no esta echo en typescrip
import * as httpserver from 'http-server'; //importar en javascript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
