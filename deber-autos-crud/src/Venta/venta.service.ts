import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import {VentaEntity} from "./venta.entity";
import { AutoEntity } from '../Auto/auto.entity';
import { Venta } from './venta.controller';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(VentaEntity)
    private readonly _ventaRepository: Repository<VentaEntity>
  ){

  }
  buscar(parametrosBusqueda?: FindManyOptions <VentaEntity>): Promise<VentaEntity[]>{
    const auto = AutoEntity;
    return this._ventaRepository.find(parametrosBusqueda);
    /*{
      relations: ['auto'],
  }*/
  }
  crear(venta: Venta): Promise<VentaEntity>{
    const ventaEntity: VentaEntity = this._ventaRepository
      .create(venta);
    return this._ventaRepository.save(ventaEntity);
  }

}