import { Get, Controller, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AutoService } from './auto.service';
import { stringify } from 'querystring';
import { from, of } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService,
              private readonly _autoService: AutoService) {
  }

  @Get('Inicio')
  inicio(
    @Res() response){
    this._autoService.inicializarBase();
    console.log('hghhghgjgjh ', this._autoService.contenidoAuto);
    response.render('inicio', {
      contenido: this._autoService.contenidoAuto,
    }  );
  }
}

export interface Auto {
  numeroMotor: number;
  marca: string;
  modelo: string;
  color: string;
  anio: number;
}