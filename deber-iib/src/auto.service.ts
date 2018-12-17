import { Injectable } from '@nestjs/common';
import {from, of} from 'rxjs';
import {Auto} from './app.controller';
import {readFile, writeFile} from 'fs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class AutoService {
  contenidoAuto: BDD;
  inicializarBase(){
    const leerBDD$ = from(this.leerBDD());
    return leerBDD$
      .pipe (
        mergeMap((respuestaBDD: BDD) => {
          if (respuestaBDD.bdd){
            return of(respuestaBDD);
          } else {
            return from(this.crearBDD());
          }
        }))
      .subscribe((cont: BDD) => {
        console.log(cont);
        console.log(this.contenidoAuto, 'hola');
        return cont;
        });
  }

  leerBDD(): Promise<BDD> {
    return new Promise(
      (resolve) => {
        readFile('bdd.json', 'utf-8',
          (error, contenidoLeido) => {
            if (error){
              resolve({
                bdd: null,
              });
            }else{
              this.contenidoAuto = JSON.parse(contenidoLeido);
              
              resolve({
                bdd: JSON.parse(contenidoLeido),
              });
            }});
      },
    );
  }
  crearBDD(){
    console.log('hhhhhhhhhhh');
    const contenidoInicialBDD = '{"Autos":[]}';
    return new Promise(
      (resolve, reject) => {
        writeFile('bdd.json', contenidoInicialBDD, (error) => {
          if (error){
            reject({
              mensaje: 'Error al crear la Base',
              error: 500,
            });
          }
          else{
            resolve({
                bdd: JSON.parse(contenidoInicialBDD),
              },
            );
          }
        });
      },
    );
  }
}

interface ContenidoBDD {
  Autos: Auto[];
}
interface BDD {
  bdd: ContenidoBDD;
}
