declare var  require;
const inquirer = require('inquirer');
const fs = require ('fs');
import {listaMenu, preguntaEliminar, preguntasActualizar, preguntasBuscar, preguntasIngresar} from "./recursoPreguntas";
declare var Promise : any;
const arregloAutosJSON= [];


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
                                                arregloAutosJSON.push(JSON.parse(arregloStrings[indiceActual]));
                                            }
                                            //arregloAutosJSON.push(JSON.parse(arregloStrings[indiceActual]));

                                        }

                                    );
                                   // console.log(arregloAutosJSON);


                                    arregloAutosJSON.forEach(( valorActual,indiceActual)=>{

                                        if(valorActual.numMotor===datoIngresado.numMotor){
                                            console.log(valorActual)
                                        }

                                    });

                                  // console.log(arregloAutosJSON);

                                })
                        });
                    break;


                case 'Actualizar':
                    inquirer.prompt(preguntasActualizar)
                        .then((datoIngresado)=>{

                        })


                    break;


                case 'Eliminar':
                    inquirer.prompt(preguntaEliminar)
                        .then((datoIngresado)=>{

                        })


                    break;

            }


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

})


    /*function arregloAutos(arreglo){
        const arregloAutos=[];
        arreglo.forEach((elemento)=>{
            arregloAutos.push(elemento.numMotor)


        })

    }*/

}
menuAutos();






