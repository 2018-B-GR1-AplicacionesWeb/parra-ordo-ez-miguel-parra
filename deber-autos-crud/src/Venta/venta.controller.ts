import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import {VentaService} from './venta.service';
import { VentaEntity } from './venta.entity';
import { AutoEntity } from '../Auto/auto.entity';
import { FindManyOptions } from 'typeorm';
import { UsuarioEntity } from '../Usuario/usuario.entity';

@Controller('venta')

export class VentaController {
 constructor( private readonly _ventaService: VentaService){
 }
 @Get('inicio-venta/:idUsuario')
 async mostrarVenta(
   @Res() response,
   @Param('idUsuario') idUser,
 ){

  let ventas: VentaEntity[];
  ventas = await  this._ventaService.buscar(idUser);
  console.log(ventas);
  response.render('inicio-venta', {
   arreglo: ventas,
  });
 }

@Get('crear-venta')
crearVentaRuta(
  @Res() response,
)
{
 response.render(
   'crear-venta',
 );
}

 @Post('crear-venta')
 async ventaFuncion(
   @Res() response,
   @Body() venta: Venta,
 ){
  const respuesta = await this._ventaService.crear(venta);
  console.log(respuesta);
  const parametrosConsulta = `?idVenta=${respuesta.id}`;
  response.redirect('venta/inicio-venta/1');
 }

}

export interface Venta{
 id?: number;
 fecha: string;
 lugar: string;
 precio: string;
 auto: AutoEntity;
 usuario: UsuarioEntity;

}