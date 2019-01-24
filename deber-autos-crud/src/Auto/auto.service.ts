import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AutoEntity} from "./auto.entity";
import { FindManyOptions, Repository } from 'typeorm';
import { Auto } from './auto.controller';

@Injectable()
export class AutoService {
    constructor(
        @InjectRepository(AutoEntity)
        private readonly _autoRepository: Repository<AutoEntity>
    ) {
    }
    crear(auto: Auto): Promise<AutoEntity>{
        const autoEntity: AutoEntity = this._autoRepository
          .create(auto);
        return this._autoRepository.save(autoEntity);
    }
    actualizar(nuevoAuto: Auto): Promise<AutoEntity>{
        const autoEntity: AutoEntity = this._autoRepository
          .create(nuevoAuto);
        return this._autoRepository.save(autoEntity);
    }
    buscarPorId(idAuto: number): Promise<AutoEntity>{
        return this._autoRepository.findOne(idAuto);
    }
    eliminar(idAuto: number ): Promise <AutoEntity>{
        const autoEliminado: AutoEntity = this._autoRepository
          .create({
              id: idAuto,
          });
        return this._autoRepository.remove(autoEliminado);
    }
    buscar(parametrosBusqueda?: FindManyOptions <AutoEntity>): Promise<AutoEntity[]>{
        return this._autoRepository.find(parametrosBusqueda);
    }
}
