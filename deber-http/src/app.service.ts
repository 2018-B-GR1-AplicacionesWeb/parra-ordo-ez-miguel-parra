import { Injectable } from '@nestjs/common';
import {Auto, Marca } from './app.controller';
const fs = require('fs');
const mergeMap = require ('rxjs/operators').mergeMap; // usando el operador mergemap
const map = require ('rxjs/operators').map;
import {Observable, of, from} from 'rxjs';

@Injectable()
export class AppService {
  /*root(): string {
    return 'Hello World!';
  }*/

  inicializarBase() {
    const leerBDD$ = from(this.leerBDD()); // 1. creamos un observable para leer la base de datos usando promesa leeRBDD()
    return leerBDD$
      .pipe( // Para poder hacer trabajos con este observable
        mergeMap((RespuestaDeLeerBDD: RespuestaBDD) => { // recibe la respuesta del observable anterior
          if (RespuestaDeLeerBDD.bdd) {
            // truty / {}
            return of(RespuestaDeLeerBDD); // devolviendo un observable
          } else {
            // falsy / null
            return from(this.crearBDD()); // devolviendo un observable
          }
        }));
  }

  leerBDD(): Promise <RespuestaBDD> {
    return new Promise(
      (resolve) => {
        fs.readFile( 'bdd.json', 'utf-8', (error, contenidoLeido) => {
          if (error) {
            resolve({
              bdd: null,
            });
          } else {
            resolve({
              bdd: JSON.parse(contenidoLeido),
            });
          } }); },
    );
  }


  crearMarca(marca: Marca){
    /*console.log(' ####################################################### ');
    return marca;*/
    (this.inicializarBase())
      .pipe(
        map(
          (respuesta: RespuestaBDD) => {
            respuesta.bdd.MarcasActuales.push(marca);
            return respuesta;
          },
        ),
        mergeMap(
          (respuesta: RespuestaBDD) => {
            return this.guardarBase(respuesta.bdd);
          } ))
  .subscribe(
      (mensaje) => {
        console.log(mensaje);
      },
      (error) => {
        console.log(error);
      }, () => {
        console.log('Completado');
      },
    );
  }
  crearBDD() {
    const contenidoInicialBDD = '{"MarcasActuales":[],"AutosActuales":[]}';
    return new Promise(
      (resolve, reject) => {
        fs.writeFile( 'bdd.json',  contenidoInicialBDD, (err) => {
          if (err) {
            reject({
              mensaje: 'Error creando Base',
              error: 500 });
          } else {
            resolve({
              bdd: JSON.parse('{"MarcasActuales":[],"AutosActuales":[]}'),
            });
          } } ); } ); }

  guardarBase(bdd: BaseDeDatos) { // bdd de tipo base de datos
    return new Promise((resolve, reject) => {
      fs.writeFile(
        'bdd.json',  JSON.stringify(bdd),  (err) => {
          if (err) {
            reject({
              mensaje: 'Error guardando BDD',
              error: 500,
            });
          } else {
            resolve({
              mensaje: 'Cambio realizados satisfactoriamente',
            });
          } } ); } ); }

}
interface BaseDeDatos {
  MarcasActuales: Marca[];
  AutosActuales: Auto[];
}
interface RespuestaBDD {
  bdd: BaseDeDatos;
}