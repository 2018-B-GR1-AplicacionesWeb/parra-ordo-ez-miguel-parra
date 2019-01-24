import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AutoEntity} from "./Auto/auto.entity";
import {AutoModule} from "./Auto/auto.module";
import {VentaModule} from "./Venta/venta.module";
import {UsuarioModule} from "./Usuario/usuario.module";
import {VentaEntity} from "./Venta/venta.entity";
import {UsuarioEntity} from "./Usuario/usuario.entity";


@Module({
  imports: [
      TypeOrmModule.forRoot(
          {
            type: 'mysql',
            host: 'localhost',
            port: 32769,
            database: 'deber',
            username: 'miguel',
            password: '182025',
            synchronize: true,
            dropSchema: false,
            entities: [AutoEntity, VentaEntity, UsuarioEntity]
          }
      ), AutoModule, UsuarioModule, VentaModule
  ], //Modulos --> tiene controladores y servicios (providers)
  controllers: [AppController], //Controllers
  providers: [AppService], //Servicios
})
export class AppModule {}
