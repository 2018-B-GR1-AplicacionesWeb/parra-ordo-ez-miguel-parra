"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const fs = require('fs');
const paqueteRecursos_1 = require("./paqueteRecursos");
console.log("Hola, bienvenido al concesionario ");
const questions = [
    { type: "list", name: "marcaDelAuto", message: "Escoge lo que desear realizar: ", choise: paqueteRecursos_1.opcionesMenu },
];
inquirer
    .prompt(questions, (respuesta) => {
    console.log(respuesta);
});
/*
{ type: "input ", name: "modeloDelAuto", message:"Ingrese el modelo del auto"},
{ type: "input ", name: "colorDelAuto", message:"Ingrese el color"},
{ type: "input", name: "numPuertas", message:"Ingrese el numero de puertas"},

inquirer.prompt( questions, function( answers ) {
    console.log("\nOrder receipt:");
    console.log( JSON.stringify(answers, null, "  ") );
});
/*
inquirer
    .prompt(["Ingresa la marca del auto"])
    .then()
*/
/*
declare var require;

const console_menu = require('console-menu');
const inquirer = require('inquirer');
const funcionCrearJuego = require('CrearJuego.ts');

const arregloJuegos = [];

const ejecutarMenuPrincipal = ()=>{
    const menuSeleccion =[
        { hotkey: '1', title: 'Ingresar al Sistema', data: { nombre: 'IngresarAlSistema' } },
        { hotkey: '2', title: 'Salir del Sistema', data: { nombre: 'SalirDelSistema' } },
    ];

    const configuracionesMenuPrincipal = {
        header: 'Bienvenidos a GameOver',
        border: true,
    };

    return console_menu(menuSeleccion,configuracionesMenuPrincipal)
        .then((itemSeleccionado)=>{
            switch (itemSeleccionado.hotkey) {
                case '1':
                    const respuestaDeLoEscrito = {nombre:'edwin'};
                    funcionCrearJuego.crearJuego(arregloJuegos,respuestaDeLoEscrito)
                        .then(
                            (respuestaPromesa)=>{
                                console.log(respuestaPromesa);
                            }
                        )
                        .catch((respuuestaPromesaError)=>{
                            console.log(respuuestaPromesaError);
                        });
                    break;
                case '2':
                    console.log('Escogió la Opcion 2 \n Salir \n Gracias por Usar Nuestro Sistema');
                    break;

                default:
                    console.log('Opcion Invalida');
            }
        });
};

ejecutarMenuPrincipal()
*/ 
