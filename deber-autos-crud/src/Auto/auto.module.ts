import {Module} from "@nestjs/common";
import {AutoController} from "./auto.controller";
import {AutoService} from "./auto.service";
import {NoticiaEntity} from "../../../03-http/videos/src/noticia/noticia-entity";
import {TypeOrmModule} from '@nestjs/typeorm'
import {AutoEntity} from "./auto.entity";

@Module(
    {
        imports: [TypeOrmModule.forFeature([AutoEntity])],
        controllers: [AutoController],
        providers:[AutoService],
        exports: [AutoService] //exportar servicios o modulos
    }
)

export class AutoModule {
    
}