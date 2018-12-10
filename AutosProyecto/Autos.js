//import {MergeMapOperator} from "rxjs/internal/operators/mergeMap";
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap; //usando el operador mergemap
const map = require('rxjs/operators').map;
//declare var Promise;
const listaMarca = ['Chevrolet', 'Hyundai', 'Nissan', 'Toyota', 'Kia', 'Mercedes-Benz'];
const listaColor = ['Blanco', 'Gris', 'Negro', 'Rojo', 'Vino',];
const preguntaMenu = { type: 'list', name: 'opcionMenu', message: 'Elige una opción:', choices: ['Crear', 'Buscar', 'Actualizar', 'Borrar',] };
const preguntasBuscar = { type: 'input', name: 'numMotor', message: 'Ingrese el número de motor del auto a buscar: ' };
const preguntasEliminar = { type: 'input', name: 'numMotor', message: 'Ingrese el número de motor del auto a eliminar: ' };
const preguntasActualizar = { type: 'input', name: 'numMotor', message: 'Ingrese el número de motor del auto a actualizar: ' };
const colorCambiar = { type: 'input', name: 'nuevoColor', message: 'Ingrese el nuevo color: ' };
const preguntasIngresar = [
    { type: 'input', name: 'idMotor', message: 'Ingrese el numero de motor: ' },
    { type: 'list', name: 'marca', message: 'Cual es tu marca del auto: ', choices: listaMarca },
    { type: 'input', name: 'modelo', message: 'Ingrese el modelo de auto: ' },
    { type: 'list', name: 'color', message: 'Selecciome el color: ', choices: listaColor },
    { type: 'input', name: 'anio', message: 'Ingrese el año: ' }
];
function main() {
    console.log('################  BIENVENIDO AL CONCENSIONARIO  ###############');
    //vamos a correr primero la funcion iniciaizarBase
    inicializarBase() //$ aqui tenemos un observable
        .pipe(preguntarOpciones(), mergeMap(//####DEPENDIENDO DE LA OPCION HACER ALGO (crear, borrar, eliminar)
    (respuesta) => {
        switch (respuesta.respuestaUsuario.opcionMenu) {
            case 'Crear':
                return rxjs.from(inquirer.prompt(preguntasIngresar))
                    .pipe(map((Auto) => {
                    respuesta.Autos = Auto; //a la respuesta recibida antes le agrego la respuesta del
                    // usuario a las preguntas hechas
                    return respuesta;
                }))
                    .pipe(map(//###### EJECUTAR LA ACCION #########
                //ya no necesitamos promesas ni observables por que ya sabemos datos y lo que queremos hacer
                (respuesta) => {
                    console.log('respuesta en accion', respuesta);
                    switch (respuesta.respuestaUsuario.opcionMenu) {
                        case 'Crear':
                            const AutoNuevo = respuesta.Autos;
                            respuesta.respuestasBDD.bdd.AutosActuales.push(AutoNuevo);
                            return respuesta;
                    }
                }), 
                // ###### Guardar Base de Datos
                mergeMap((respuesta) => {
                    return guardarBase(respuesta.respuestasBDD.bdd);
                }));
                break;
            case 'Buscar':
                return rxjs.from(inquirer.prompt(preguntasBuscar))
                    .pipe(map((respuestaIngresada) => {
                    const bdd = respuesta.respuestasBDD.bdd.AutosActuales;
                    const autoEncontrado = bdd
                        .find((motorObtenido) => {
                        return motorObtenido.idMotor === respuestaIngresada.numMotor;
                    });
                    respuesta.Autos = autoEncontrado;
                    return respuesta;
                }));
                break;
            case 'Borrar':
                return rxjs.from(inquirer.prompt(preguntasEliminar))
                    .pipe(map((respuestaIngresada) => {
                    respuesta.motor = respuestaIngresada.numMotor;
                    return respuesta;
                }))
                    .pipe(map((respuesta) => {
                    const bdd = respuesta.respuestasBDD.bdd.AutosActuales;
                    const autoEncontrado = bdd
                        .findIndex((motorObtenido) => {
                        return motorObtenido.idMotor === respuesta.motor;
                    });
                    respuesta.respuestasBDD.bdd.AutosActuales.splice(autoEncontrado, 1);
                    return respuesta;
                }), mergeMap((respuesta) => {
                    return guardarBase(respuesta.respuestasBDD.bdd);
                }));
                break;
            case 'Actualizar':
                return rxjs.from(inquirer.prompt(preguntasActualizar))
                    .pipe(map((respuestaIngresada) => {
                    const bdd = respuesta.respuestasBDD.bdd.AutosActuales;
                    const autoEncontrado = bdd
                        .find((motorObtenido) => {
                        return motorObtenido.idMotor === respuestaIngresada.numMotor;
                    });
                    const indice = bdd
                        .findIndex((motorObtenido) => {
                        return motorObtenido.idMotor === respuestaIngresada.numMotor;
                    });
                    respuesta.Autos = autoEncontrado;
                    respuesta.motor = indice;
                    //console.log(respuesta.Autos);
                    return respuesta;
                }), mergeMap((respuesta) => {
                    return rxjs.from(inquirer.prompt(colorCambiar))
                        .pipe(map((respuestaColor) => {
                        respuesta.Autos.color = respuestaColor.nuevoColor;
                        //respuesta.respuestasBDD.bdd.AutosActuales.;
                        const AutoModificado = respuesta.Autos;
                        // console.log(AutoModificado);
                        respuesta.respuestasBDD.bdd.AutosActuales[respuesta.motor] = AutoModificado;
                        return respuesta;
                    }), map((respuesta) => {
                        return guardarBase(respuesta.respuestasBDD.bdd);
                    }));
                }));
                break;
        }
    }))
        .subscribe(// el subscribe es como el ultimo paso que dice ya ahora si ejecutate todo
    (mensaje) => {
        console.log(mensaje);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('Completado');
        main();
    });
}
/***************************************************************/
/*************************************************************/
function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDD()); //1. creamos un observable para leer la base de datos usando promesa leeRBDD()
    return leerBDD$
        .pipe(//Para poder hacer trabajos con este observable
    mergeMap((RespuestaDeLeerBDD) => {
        if (RespuestaDeLeerBDD.bdd) {
            // truty / {}
            return rxjs.of(RespuestaDeLeerBDD); //devolviendo un observable
        }
        else {
            // falsy / null
            return rxjs.from(crearBDD()); //devolviendo un observable
        }
    }));
}
//leer un archivo
function leerBDD() {
    return new Promise((resolve) => {
        fs.readFile('bdd.json', 'utf-8', (error, contenidoLeido) => {
            if (error) {
                resolve({
                    mensaje: 'Base de datos vacia',
                    bdd: null
                });
            }
            else {
                resolve({
                    mensaje: 'Si existe la Base',
                    bdd: JSON.parse(contenidoLeido)
                });
            }
        });
    });
}
function crearBDD() {
    const contenidoInicialBDD = '{"AutosActuales":[]}';
    return new Promise((resolve, reject) => {
        fs.writeFile('bdd.json', contenidoInicialBDD, (err) => {
            if (err) {
                reject({
                    mensaje: 'Error creando Base',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD creada',
                    bdd: JSON.parse('{"AutosActuales":[]}')
                });
            }
        });
    });
}
/***********************************************************************/
///////////////////////////// OPCIONES MAIN ////////////////////////
/**********************************************************************/
function preguntarOpciones() {
    return mergeMap(// ##### 1. PREGUNTAR OPCION #### //concatenamos con otro observable  con las de preguntas
    //EN este merge map tenemos la respuesta del usuario y de la base
    (respuestasBDD) => {
        return preguntarMenu() //recibimos opcion menu, aqui ejecutamos esa funcion
            .pipe(map((respuesta) => {
            //ya estamos dentro del observable aqui por lo tanto esto ya es una respuesta normal
            // el man se lo hizo para mandar un nuevo objeto que va a tener lo que esta en return
            //console.log("Su opcion es ", respuesta);
            return {
                respuestaUsuario: respuesta,
                respuestasBDD: respuestasBDD
            };
        }));
    }); // dependiendo de la opcion PREGUNTAMOS DEPENDIENDO LAS OPCIONES
}
function preguntarMenu() {
    return rxjs.from(inquirer.prompt(preguntaMenu)); //transformando en observable la respuesta de lo que haya escogido
    //en preguntarMenu
}
function guardarBase(bdd) {
    return new Promise((resolve, reject) => {
        fs.writeFile('bdd.json', JSON.stringify(bdd), (err) => {
            if (err) {
                reject({
                    mensaje: 'Error guardando BDD',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'Cambio realizados satisfactoriamente'
                });
            }
        });
    });
}
main();
