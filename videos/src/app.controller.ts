import {Get, Controller, HttpCode, Query, InternalServerErrorException, Post, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";


@Controller() //ejecutan una funcion, decoradores es una duncion la cual se ejecuta antes de crear la clase,
export class AppController {
  constructor(private readonly appService: AppService) {}
/*
  //@Get()
  @Get ()//cuando me hagan un request con el metodo get ejecuto esta funcion,la cual acepta la url a la que va
  //a visitar el usuario http://ip:puertp/url la cual no es necesario poner lo primero porque ya esta en main
  @HttpCode(204) //cuando no se define un status code el 200 pero con esto cambiamos el status a 204
  raiz(): string { //metodo de una clase que devuelve un string
    return 'Hola Mundo'      //this.appService.root();
  }

  @Get('adiosMundoPromesa')//url
  async adiosMundoAsync():{
    const promesaAdios=(): Promise<string>=>{
      return new Promise(resolve)=>{
        resolve('Adios Mundo');
        }
      )
    };
    return promesaAdios();
  }



} //export para de otros archivos importarle en esta clase */






    @Get() // http://ip:puerto
    @HttpCode(204) // status
    raiz(
         @Query() todosQueryParams:any,//quiero recibir un nombre del tipo string
        @Query('nombre') nombre: string,

    ): string {
        return 'Hola Mundo';
    }

    @Get('adiosMundo') // url
    adiosMundo(): string {
        return 'Adios Mundo';
    }

    @Post('adiosMundo') // url
    adiosMundoPOST(): string {
        return 'Adios Mundo POST';
    }


    @Get('segmentoUno/segmentoDos/:idUsuario') //parametro de ruta con dos puntos
    parametroRuta(
        @Param('idUsuario') id
    ){
      return id;
    }



    @Get('adiosMundoPromesa') // url
    adiosMundoPromesa(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve) => {
                    resolve('Adios Mundo');
                }
            )
        };
        return promesaAdios();
    }


    @Get('adiosMundoAsync') // url
    @HttpCode(201)
    async adiosMundoAsync() {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject('Adios Mundo');
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje: 'Error servidor'})
        }

    }





    @Get('adiosMundoObservable') //url, una promesa me devuelve un arreglo en string y si quier devolver comojson
    //entonces observable
  adiosMundoObservable():Observable<string>{
      const respuesta$ = of('Adios Mundo');
        return respuesta$
    }





}
