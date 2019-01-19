import {Module} from "@nestjs/common";
import {NoticiaController} from "./noticia.controller";
import {NoticiaService} from "./noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia-entity";

@Module(
    {
        imports: [TypeOrmModule.forFeature([NoticiaEntity])],//para importar modulos
        controllers:[NoticiaController],
        providers:[NoticiaService],
        exports: [NoticiaService] //exportar los servicios que quiero compartir, en este caso coloco porque quiero usar en
        //el modulo principal
    }
)
export class NoticiaModule{
}

