import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import {UsuarioService} from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly _usuarioService: UsuarioService){

    }
    @Get('crear-usuario')
    crearNoticiaMostrar(
      @Res() response,
      @Query('idUsuario') idUsuario,
    ){
        let mensaje = undefined;
        if (idUsuario){
            mensaje = `Usuario ${idUsuario} creado`;
        }
        response.render('crear-usuario', {
            mensaje: mensaje,
        });
    }
    @Post('crear-usuario')
    async crearUsuarioMetodo(
      @Res() response,
      @Body() usuario: Usuario,
    ){
        const respuesta = await this._usuarioService.crear(usuario);
        console.log(respuesta);
        const parametrosConsulta = `?idUsuario=${respuesta.id}`;
        response.redirect('/usuario/crear-usuario/' + parametrosConsulta);
    }
}
export interface Usuario {
    id?: number;
    nombre: string;
    password: string;
    correo: string;
    edad: string;
    telefono: string;

}