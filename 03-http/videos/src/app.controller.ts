import {
    Headers,
    Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Query,
    Param,
    Body,
    UnauthorizedException, Req, Res, Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";
import {NoticiaService} from "./noticia/noticia.service";
import {UsuarioEntity} from "./Usuario/usuario.entity";
import {UsuarioService} from "./Usuario/usuario.service";


@Controller() //decoradores
// Controller('usuario') aqui esta recibiendo un string como parametro
export class AppController {

    arreglo: Noticia[] = [
        {
            id: 1,
            titulo: 'A',
            descripcion: 'asd asd asd asd asd '
        },
        {
            id: 2,
            titulo: 'B',
            descripcion: 'asd asd asd asd asd '
        },
        {
            id: 3,
            titulo: 'C',
            descripcion: 'asd asd asd asd asd '
        },
        {
            id: 4,
            titulo: 'D',
            descripcion: 'asd asd asd asd asd '
        }
    ]
    numeroRegistro = 5; // numero de registro para crear en la base

    //http://localhost:3000
    //public servicio:AppService;
    constructor(private readonly _appService: AppService,
                private readonly _noticiaService: NoticiaService,
                private readonly _usuarioService: UsuarioService) { // NO ES UN CONSTRUCTOR NORMAL, solo es para importar servicios

        //this.servicio = servicio;
    }

    @Get() //http:ip:puerto
    //@Get ('crear')
    //http://localhost:3000/usuario/crear
    //@HttpCode(204) //status
    raiz(@Query() todosQueryParams: any,
         @Query('nombre') nombre: string,)
        : string {
        console.log(todosQueryParams);
        return 'Hola mundo' + nombre;
    }

    @Get('segmentoUno/segmentoDos/:idUsuario') //PARAMETRO RUTA
    //http://localhost:3000/usuario/segmentoUno/segmentoDos/:idUsuario
    parametroRuta(
        @Param('idUsuario') id
    ) {
        return id;
    }

    @Get('adiosMundo') //url
    adiosMundo(): string {
        return 'Adios Mundo'
    }

    /*@Post('adiosMundo') //url
    adiosMundoPost():string{
        return 'Adios Mundo POST'
    } */

    @Post('adiosMundo') // url
    adiosMundoPOST(
        @Res() response,
    ) {
        response.render(
            'inicio',
            {
                usuario: 'Adrian',
                arreglo: [],
                booleano: true,
            }
        );
    }

    @Get('adiosMundoPromesa') //url
    adiosMundoPromesa(): Promise<string> { //devolviendo una promesa de tipo string
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve) => {
                    resolve("Adios Mundo Promesa");

                }
            )
        };
        return promesaAdios();
    }

    @Get('adiosMundoAsinc') //url
    @HttpCode(201) // si es que sale bien responde el codigo 201
    async adiosMundoAsync() { //devolviendo una promesa de tipo string
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject("Adios Mundo Promesa");
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException({mensaje: 'Error del sevidor'})
        }
    }

    @Get('adiosMundoObservable')
    adiosMundoObservable(): Observable<string> { //estamos tipando lo que vamos a devolver
        const respuesta$ = of('Adios Mundo Observable');
        return respuesta$;
    }

    // ######################################################################//
    @Post('crearUsuario')
    @HttpCode(200) // Cuando sale bien
    crearUsuario(
        @Body() usuario: Usuario,
        @Body('nombre') nombre: string,
        @Headers() cabeceras, //cabeceras de peticion
        @Headers('seguridad') codigo, // cabeceras de peticion
        @Res() res,
        @Req() req
    ) {
        // crear usuario
        console.log('Cookies', req.cookies); //leido
        console.log('Cookies', req.secret); //accediendo al secreto
        console.log('Cookies Seguras', req.signedCookies);
        console.log(usuario);
        console.log(cabeceras);
        if (codigo === '1234') {
            const bdd = this._appService.crearUsuario(usuario);
            res.append('token', '5678'); // la peticion se queda qui
            res.cookie("app", "web"); //primero es el nombre de la cookie y despues el valor
            res.cookie("segura", "secreto", {
                signed: true
            });
            res.json(bdd);
        } else {
            throw new UnauthorizedException({ //Algo malo paso
                mensaje: 'Error de autorizacion',
                error: 401
            })
        }
    }

    @Get('inicio')
    inicio(
        @Res() response,
        @Query('accion') accion: string,
        @Query('titulo') titulo: string
    ) {
        let mensaje = undefined;
        if (accion && titulo) {
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${titulo} eliminado`;
                case 'crear':
                    mensaje = `Registro ${titulo} creado`;
                case 'actualizar':
                    mensaje = `Registro ${titulo} actualizado`;
            }
        }

        response.render(
            'inicio',
            {
                usuario: 'Adrian',
                arreglo: this._noticiaService.arreglo, // AQUI!
                booleano: false,
                mensaje: mensaje
            }
        );
    }

    @Post('eliminar/:idNoticia')
    async eliminar(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
    ) {

        const noticiaBorrada = await this._noticiaService
            .eliminar(Number(idNoticia));

        const parametrosConsulta = `?accion=borrar&titulo=${
            noticiaBorrada.titulo
            }`;

        response.redirect('/inicio' + parametrosConsulta)
    }

    @Get('crear-noticia')
    crearNoticiaRuta(
        @Res() response
    ) {
        response.render(
            'crear-noticia'
        )
    }

    @Post('crear-noticia')
    async crearNoticiaFuncion(
        @Res() response,
        @Body() noticia: Noticia
    ) {

        const noticiaCreada = await this._noticiaService.crear(noticia);
        const parametrosConsulta = `?accion=crear&titulo=${
            noticiaCreada.titulo
            }`;

        response.redirect('/inicio' + parametrosConsulta)



        response.redirect(
            '/inicio'
        )
    }

    //app.controller.ts
    @Get('login')
    mostrarLogin(
        @Res() res
    ){
        res.redirect('login')
    }

    @Post('login')
    @HttpCode(200)
   async ejecutarLogin(
        @Body('username') username:string,
        @Body('password') password:string,
        @Res () res,
        @Session() sesion,
    ){
        const respuesta= await this._usuarioService
            .autenticar(username, password);
        console.log(sesion);
        if (respuesta){
            sesion.usuario=username;
            res.send('ok');
        }else{
            res.redirect('login')
        }
    }

    @Get('logot')
    logout(
        @Res() res,
        @Session() sesion,
    ){
        sesion.username = undefined;
        sesion.destroy();
        res.redirect('login')
    }
/*
    @Get('actualizar-noticia/:idNoticia')
    actualizarNoticiaVista(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
    ) {
        // El "+" le transforma en numero a un string
        // numerico
        const noticiaEncontrada = this._noticiaService
            .buscarPorId(+idNoticia);

        response
            .render(
                'crear-noticia',
                {
                    noticia: noticiaEncontrada
                }
            )


    }

    @Post('actualizar-noticia/:idNoticia')
    actualizarNoticiaMetedo(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
        @Body() noticia: Noticia
    ) {

        noticia.id = +idNoticia;
       let  noticiaActualizada =this._noticiaService.actualizar(+idNoticia, noticia);

        const parametrosConsulta = `?accion=borrar&titulo=${
            noticiaActualizada.titulo
            }`;

        response.redirect('/inicio' + parametrosConsulta);

    }
*/
}


export interface Usuario {
    nombre: string;
}

export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}