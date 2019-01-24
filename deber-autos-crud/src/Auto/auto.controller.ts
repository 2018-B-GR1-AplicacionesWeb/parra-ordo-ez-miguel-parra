
import { AutoService } from './auto.service';
import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { AutoEntity } from './auto.entity';
import { FindManyOptions, Like } from 'typeorm';

@Controller('auto')
export class AutoController {
  constructor(private readonly _autoService: AutoService) {
  }
  @Get('inicio-auto')
  async inicio_auto(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('idAuto') idAuto: string,
  ){
    let mensaje = undefined;
    if (accion && idAuto){
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${idAuto} eliminado`;
          break;
        case 'actualizar':
          mensaje = `Registro ${idAuto} actualizado`;
          break;
        case 'crear':
          mensaje = `Registro ${idAuto} creado`;
      }
    }
    let autos: AutoEntity[];
    if (busqueda){
      const consulta: FindManyOptions <AutoEntity> = {
        where: [
          {
            marca: Like(`%${busqueda}%`),
          },
          {
            modelo: Like(`%${busqueda}%`),
          },
        ],
      };
      autos = await this._autoService.buscar(consulta);
    }else{
      autos = await  this._autoService.buscar();
    }
    response.render(
      'inicio-auto',
      {
        arreglo: autos,
        mensaje: mensaje,
      },
    );
  }
  @Get('crear-auto')
  crearAutoRuta(
    @Res() response,
  ) {
    response.render(
      'crear-auto',
    );
  }
  @Post('crear-auto')
  async crearAutoFuncion(
    @Res() response,
    @Body() auto: Auto,
  ) {
    console.log(auto);
    const respuesta = await this._autoService.crear(auto);
    console.log(respuesta);
    const parametroConsulta = `?accion=crear&idAuto=${respuesta.id}`;
    response.redirect(
      '/auto/inicio-auto/' + parametroConsulta,
    );
  }
  @Get('actualizar-auto/:idAuto')
  async actualizarAutoVista(
    @Res() response,
    @Param('idAuto') idAuto: string,
  ){
    const autoEncontrado = await this._autoService.buscarPorId(+idAuto);
    response
      .render('crear-auto', { auto: autoEncontrado});
  }

  @Post('actualizar-auto/:idAuto')
  async actualizarAutoMetodo(
    @Res() response,
    @Param('idAuto') idAuto: string,
    @Body() auto: Auto,
  ){
    const autoActualizar = await this._autoService.buscarPorId(+idAuto);
    auto.id = +idAuto;
    await this._autoService.actualizar(auto);
    const parametroConsulta = `?accion=actualizar&idAuto=${autoActualizar.id}`;
    response.redirect('/auto/inicio-auto/' + parametroConsulta);
  }
  @Post('eliminar-auto/:idAuto')
  async eliminarAuto(
    @Res() response,
    @Param('idAuto') idAuto: string,
  ){
    const auto = await this._autoService.buscarPorId(+idAuto);
    await this._autoService.eliminar(Number(idAuto));
    const parametroConsulta = `?accion=borrar&idAuto=${auto.id}`;
    response.redirect('/auto/inicio-auto/' + parametroConsulta);
  }

}
export interface Auto {
  id?: number;
  marca: string;
  modelo: string;
  color: string;
  anio: string;
  puertas: number;
}