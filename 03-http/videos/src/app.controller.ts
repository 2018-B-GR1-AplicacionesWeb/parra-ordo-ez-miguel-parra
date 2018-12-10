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
    UnauthorizedException, Req, Res
} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";

@Controller() //decoradores
// Controller('usuario') aqui esta recibiendo un string como parametro
export class AppController {
    //http://localhost:3000
    //public servicio:AppService;
    constructor(private readonly _appService:AppService) { // NO ES UN CONSTRUCTOR NORMAL, solo es para importar servicios
    //this.servicio = servicio;
    }

    @Get() //http:ip:puerto
    //@Get ('crear')
    //http://localhost:3000/usuario/crear
    //@HttpCode(204) //status
    raiz( @Query() todosQueryParams:any,
          @Query('nombre') nombre: string,)
        : string {
        console.log(todosQueryParams);
        return 'Hola mundo' + nombre;
    }

    @Get('segmentoUno/segmentoDos/:idUsuario') //PARAMETRO RUTA
    //http://localhost:3000/usuario/segmentoUno/segmentoDos/:idUsuario
    parametroRuta(
        @Param('idUsuario') id
    ){
        return id;
    }

    @Get('adiosMundo') //url
    adiosMundo():string{
        return 'Adios Mundo'
    }
    @Post('adiosMundo') //url
    adiosMundoPost():string{
        return 'Adios Mundo POST'
    }
    @Get('adiosMundoPromesa') //url
    adiosMundoPromesa():Promise<string>{ //devolviendo una promesa de tipo string
        const promesaAdios=():Promise<string>=>{
            return new Promise(
                (resolve)=>{
                    resolve("Adios Mundo Promesa");

                }
            )
        };
        return promesaAdios();
    }

    @Get('adiosMundoAsinc') //url
    @HttpCode(201) // si es que sale bien responde el codigo 201
    async adiosMundoAsync(){ //devolviendo una promesa de tipo string
        const promesaAdios=():Promise<string>=>{
            return new Promise(
                (resolve,reject)=>{
                    reject("Adios Mundo Promesa");
                }
            )
        };
        try{
            const respuesta:string = await promesaAdios();
            return respuesta;
        } catch (e){
            console.log(e);
            throw new InternalServerErrorException({mensaje: 'Error del sevidor'})
        }
    }

    @Get('adiosMundoObservable')
    adiosMundoObservable():Observable<string>{ //estamos tipando lo que vamos a devolver
        const respuesta$ = of('Adios Mundo Observable');
        return respuesta$;
    }

    // ######################################################################//
    @Post('crearUsuario')
    @HttpCode(200) // Cuando sale bien
    crearUsuario(
        @Body() usuario : Usuario,
        @Body('nombre') nombre : string,
        @Headers() cabeceras, //cabeceras de peticion
        @Headers('seguridad') codigo, // cabeceras de peticion
        @Res() res,
        @Req() req
    ){
        // crear usuario
        console.log('Cookies', req.cookies); //leido
        console.log('Cookies',req.secret); //accediendo al secreto
        console.log('Cookies Seguras', req.signedCookies);
        console.log(usuario);
        console.log(cabeceras);
        if(codigo === '1234') {
            const bdd = this._appService.crearUsuario(usuario);
            res.append('token','5678'); // la peticion se queda qui
            res.cookie("app", "web"); //primero es el nombre de la cookie y despues el valor
            res.cookie("segura","secreto",{
                signed:true
            });
            res.json(bdd);
        }else{
            throw new UnauthorizedException({ //Algo malo paso
                mensaje:'Error de autorizacion',
                error: 401
            })
        }
    }
    @Get('inicio')
    inicio(
        @Res()response,
    ){ response.render ('inicio',{
        usuario:'Adrian',
        arreglo:[
            {
                titulo:'A',
                descripcion: 'Noticia A'
            },
            {
                titulo:'B',
                descripcion: 'Noticia B'
            },
            {
                titulo:'C',
                descripcion: 'Noticia C'
            }
        ],
        booleano:true,
    }) //con esta funcion le ponemos el nombre del archivo que hicimos
    }
}



export interface Usuario {
    nombre : string;
}

