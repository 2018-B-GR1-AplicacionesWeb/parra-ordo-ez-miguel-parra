declare var  require;
const inquirer = require('inquirer');
const fs = require ('fs');
import {listaMenu, preguntasBuscar, preguntasIngresar} from "./recursoPreguntas";
declare var Promise : any;
const arregloJSON= [];


function menuAutos() {
    console.log("BIENVENIDO A LA CONCESIONARIA");
    const opcionesMenu = [ {type: 'list', name: 'seleccion', message: '¿Qué deseas hacer?', choices: listaMenu},];


    inquirer
        .prompt(opcionesMenu)
        .then((opcionElegida) => {
            switch (opcionElegida.seleccion){
                case 'Ingresar':
                    inquirer.prompt(preguntasIngresar)
                        .then((datosIngresados)=>{
                            ingresarAuto(JSON.stringify(datosIngresados))
                        });
                    break;

                case 'Buscar':
                    inquirer.prompt(preguntasBuscar)
                        .then((datoIngresado)=>{
                            promesaLectura
                                .then((contenidoDelArchivo)=>{

                                   const arregloStrings=contenidoDelArchivo.split(/\r?\n/);
                                   const longitudArreglo=arregloStrings.length-1;
                                   //console.log(longitudArreglo);
                                    arregloStrings.map(  // Escribir codigo que se entienda
                                        (valorActual, indiceActual)=> {
                                            if(longitudArreglo!==indiceActual) {
                                                //console.log(JSON.parse(arregloStrings[indiceActual]));
                                                arregloJSON.push(JSON.parse(arregloStrings[indiceActual]));
                                            }
                                            //arregloJSON.push(JSON.parse(arregloStrings[indiceActual]));

                                        }

                                    );
                                   // console.log(arregloJSON);


                                    arregloJSON.forEach(( valorActual,indiceActual)=>{

                                        if(valorActual.numMotor===datoIngresado.numMotor){
                                            console.log(valorActual)
                                        }

                                    });

                                  // console.log(arregloJSON);

                                })
                        });
                    break;


                case 'Actualizar':


                    break;


                case 'Eliminar':


                    break;








            }





            /*
             if (opcionElegida.opciones == 'Eliminar') {
                 const preguntaParaBorrar = [
                     {
                         type: 'input',
                         name: 'numMotor',
                         message: 'Ingresa el numero de motor del auto que quieres borrar:'
                     }];
                 inquirer
                     .prompt(preguntaParaBorrar)
                     .then((respuestaParaBorrar) => {
                             funcionBorrar(respuestaParaBorrar.numMotor);
                         }
                     )
             }
         });
         */

            const promesaLectura= new Promise(
                (resolve, reject)=>{
                    fs.readFile('Autos.txt','utf-8', (error,contenidoAutos)=>{
                        if(!error){
                            resolve(contenidoAutos);
                        } else{
                            resolve('');
                        }
                    })
                }
            );

            const promeEscritura = (contenidoAutos, nuevoAuto) => {
                return new Promise(
                    (resolve, reject) => {
                        const contAutos = contenidoAutos? contenidoAutos + nuevoAuto : nuevoAuto;
                        fs.writeFile('Autos.txt', contAutos+'\n', (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                console.log("Auto ingresado con exito");
                                //console.log(JSON.parse(contenidoAutos))
                                menuAutos();

                            }
                        })
                    }
                )};


            function  ingresarAuto(nuevoAuto) {
                promesaLectura
                    .then(
                        (contenidoAutos) => {
                            return promeEscritura(contenidoAutos, nuevoAuto);
                        }
                    )
                    .catch(
                        (resultadoError) => {
                            console.log('Algo malo paso', resultadoError);
                        }
                    );

            }




            const promesaEscritura = (nombreDelArchivo, respuestasDeLasPreguntas) => {
                fs.writeFile(nombreDelArchivo, respuestasDeLasPreguntas, (error) => {
                    return new Promise(
                        (resolve, reject) => {
                            if (error) {
                                reject({
                                    mensaje: 'ERROR DE CREAR ARCHIVO',
                                })
                            } else {
                                resolve({
                                    mensaje: 'SE CREO EXITOSAMENTE'
                                })
                            }
                        }
                    )
                });
            };


            const funcionBorrar = (nombreDelArchivo) => {
                fs.unlink(nombreDelArchivo, (err) => {
                    return new Promise(
                        (resolve, reject) => {
                            if (err) {
                                reject({
                                    mensaje: 'ERROR AL ELIMINAR'
                                })
                            } else {
                                resolve({
                                    mensaje: 'SE ELIMINO EXITOSAMENTE'
                                });
                            }
                        });
                });
            }


        })


    function arregloAutos(arreglo){
        const arregloAutos=[];
        arreglo.forEach((elemento)=>{
            arregloAutos.push(elemento.numMotor)


        })

    }

}
menuAutos();






