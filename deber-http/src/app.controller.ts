import {Get, Controller, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  root(): string {
    return 'HolaMundo';
  }
  @Post('crearMarca')
  crearMarca(
      @Body() marca: Marca,
  ){
    console.log(marca);
    // const bdd = this._appService.inicializarBase();
    const aMarca = this._appService.crearMarca(marca);
    // const respuesta$ = of(JSON.stringify(marca));
    //console.log(aMarca);
    return (aMarca);
  }
}

export interface Auto{
  numMotor: number;
  idMarca: number;
  modelo: string;
  color: string;
  fechaLanzamiento: Date;
}

export interface Marca{
  idMarca: number;
  nombre: string;
  pais: string;
  fechaFundacion: string;
}
