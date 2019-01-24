import {Injectable} from "@nestjs/common";
import {Noticia} from "../app.controller";
import {NoticiaEntity} from "./noticia-entity";

import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class NoticiaService {
    arreglo: Noticia[] = [
        {
            id: 1,
            titulo: 'A',
            descripcion: 'Descripcion de a'
        },
        {
            id: 2,
            titulo: 'B',
            descripcion: 'Descripcion de b '
        },
        {
            id: 3,
            titulo: 'C',
            descripcion: 'Descripcion de c '
        },
        {
            id: 4,
            titulo: 'D',
            descripcion: 'Descripcion de d'
        }
    ];
    numeroRegistro = 5;

    constructor(
        @InjectRepository(NoticiaEntity)
        private readonly _noticiaRepository: Repository<NoticiaEntity>
    ){
    }

    buscar(parametroBusqueda?: FindManyOptions<NoticiaEntity>) // es un parametro de busqueda opcional por que esta con el signo de interrogacion
        : Promise<NoticiaEntity[]>{ //devuelve un arreglo de tipo promesa de la entidad
        return this._noticiaRepository.find(parametroBusqueda) //promesa de entidad
    }

    crear(noticia: Noticia): Promise<NoticiaEntity>{

        //metodo Create es como un CONSTRUCTOR de la Entidad
        const noticiaEntity: NoticiaEntity = this._noticiaRepository
            .create(noticia); //este no devuelve una promesa

        // Metodo Save guarda en la base
        return  this._noticiaRepository.save(noticiaEntity); // necesitamos enviar una noriciaEntity

    }

    eliminar(idNoticia: number): Promise<NoticiaEntity>{

        const noticiaAEliminar: NoticiaEntity = this._noticiaRepository
            .create({
                id: idNoticia,
            });

        return this._noticiaRepository.remove(noticiaAEliminar);
    }

    actualizar(nuevaNoticia:Noticia) : Promise <NoticiaEntity>{

        const noticiaEntity: NoticiaEntity = this._noticiaRepository
            .create(nuevaNoticia);

        return  this._noticiaRepository.save(noticiaEntity) //necesitamos enviar una noriciaEntity

    }

    buscarPorId(idNoticia: number): Promise <NoticiaEntity> {
        return this._noticiaRepository.findOne(idNoticia);
    }


}