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
                            buscarAuto(datoIngresado);
                        });
                    break;

                case 'Actualizar':
                    inquirer.prompt(preguntasActualizar)
                        .then((datoIngresado)=>{

                        });
                    break;


                case 'Eliminar':
                    inquirer.prompt(preguntaEliminar)
                        .then((datoIngresado)=>{

                        });
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


            function buscarAuto(autoABuscar){
                promesaLectura
                    .then((contenidoDelArchivo)=>{
                        const arregloAutosString=contenidoDelArchivo.split(/\r?\n/);
                        const longitudArreglo=arregloAutosString.length-1;
                        arregloAutosString.map(
                            (valorActual, indiceActual)=> {
                                if(longitudArreglo!==indiceActual) {
                                    arregloAutosJSON.push(JSON.parse(arregloAutosString[indiceActual]));
                                }
                            }
                        );


                        arregloAutosJSON.forEach(( valorActual)=>{
                            if(valorActual.numMotor===autoABuscar.numMotor){
                                console.log(valorActual)
                            }
                        });
                    })

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



    const preguntaEliminar = [
        {type: 'input', name: 'numMotor', message: 'Ingrese el número de motor del auto a eliminar: '},
    ];

}
menuAutos();






