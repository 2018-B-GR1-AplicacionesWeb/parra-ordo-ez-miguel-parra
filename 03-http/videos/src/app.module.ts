import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from './noticia/noticia.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia-entity";
import {NoticiaModule} from "./noticia/noticia.module";
import {PaginaEntity} from "./pagina/pagina.entity";
import {ArticuloEntity} from "./articulo/articulo.entity";
import {UsuarioEntity} from "./Usuario/usuario.entity";
import {UsuarioService} from "./Usuario/usuario.service";
import {UsuarioModule} from "./Usuario/usario.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'miguel',
      password: '182025',
      database: 'web',
      // BDD Ya existe -> synchronized: false
      synchronize: true,
      dropSchema: true, //borra la base y se vuelve a crear, buena idea para pruebas pero no para produccion
      entities: [
          NoticiaEntity,
          PaginaEntity,
          ArticuloEntity,
          UsuarioEntity
      ]
    }),
      NoticiaModule,
      UsuarioModule,
  ], //importan modulos que nos ayuda a conectarnos a la base de datos
  controllers: [AppController], // importan el controlador principal
  providers: [AppService], // importan el servicio principal
})
export class AppModule {}
