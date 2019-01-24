import { Get, Controller, Res, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioService } from './Usuario/usuario.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService,
              private readonly _usuarioService: UsuarioService) {}
  @Get('login')
  mostrarLogin(
    @Res() res,
  ){
    res.render('login');
  }
  @Post('login')
  async LoginFunction(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() response,
  ){
    const respuesta = await this._usuarioService
      .autenticar(username, password);
    const parametroConsulta = `?idAuto=${respuesta}`;
    if (respuesta){
      response.redirect('venta/inicio-venta/' + respuesta);
    }else{
      response.redirect('login');
    }

  }
}
