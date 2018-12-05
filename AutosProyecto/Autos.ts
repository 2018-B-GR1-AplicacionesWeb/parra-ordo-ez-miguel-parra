const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap; //usando el operador mergemap
const map = require('rxjs/operators').map;
//declare var Promise;

const listaMarca=['Chevrolet', 'Hyundai','Nissan', 'Toyota','Kia','Mercedes-Benz'];
const listaColor=['Blanco','Gris','Negro','Rojo', 'Vino',];

const preguntaMenu = { type: 'list',  name: 'opcionMenu',  message: 'Elige una opción:', choices: ['Crear', 'Buscar', 'Actualizar', 'Borrar',]};
const preguntasBuscar = {type: 'input', name: 'numMotor', message: 'Ingrese el número de motor del auto a buscar: '};
const preguntasEliminar = {type: 'input', name: 'numMotor', message: 'Ingrese el número de motor del auto a eliminar: '};
const preguntasActualizar = {type: 'input', name: 'numMotor', message: 'Ingrese el número de motor del auto a actualizar: '};

const preguntasIngresar = [
    { type: 'input',  name: 'idMotor',  message: 'Ingrese el numero de motor: '},
    { type: 'list',  name: 'marca',  message: 'Cual es tu marca del auto: ', choices: listaMarca },
    { type: 'input',  name: 'modelo',  message: 'Ingrese el modelo de auto: ' },
    { type: 'list',  name: 'color',  message: 'Selecciome el color: ', choices: listaColor},
    { type: 'input', name: 'anio', message: 'Ingrese el año: '}
];

function main() {
    console.log('################  BIENVENIDO AL CONCENSIONARIO  ###############');

    //vamos a correr primero la funcion iniciaizarBase
    inicializarBase() //$ aqui tenemos un observable
        .pipe(
            mergeMap( // ##### 1. PREGUNTAR OPCION #### //concatenamos con otro observable  con las de preguntas
                //EN este merge map tenemos la respuesta del usuario y de la base
                (respuestasBDD: RespuestaBDD) => { //recibimos la respuesta de la base de datos
                    return preguntarMenu() //recibimos opcion menu, aqui ejecutamos esa funcion
                        .pipe(
                            map(
                                (respuesta: OpcionesPregunta) => { //respuesta del tipo opciones pregunta
                                    //ya estamos dentro del observable aqui por lo tanto esto ya es una respuesta normal
                                    // el man se lo hizo para mandar un nuevo objeto que va a tener lo que esta en return
                                    console.log("Su opcion es " , respuesta);
                                    return {
                                        respuestaUsuario: respuesta,
                                        respuestasBDD: respuestasBDD
                                    }
                                } ) ) } ), // dependiendo de la opcion PREGUNTAMOS DEPENDIENDO LAS OPCIONES

            mergeMap( //####DEPENDIENDO DE LA OPCION HACER ALGO (crear, borrar, eliminar)
                (respuesta: RespuestasUsuario) => {
                    console.log( "Se" , respuesta);
                    switch (respuesta.respuestaUsuario.opcionMenu) {
                        case 'Crear':
                            return rxjs.from(inquirer.prompt(preguntasIngresar))
                                .pipe(
                                    map(
                                        (Auto) => {
                                            respuesta.Autos = Auto; //a la respuesta recibida antes le agrego la respuesta del
                                            // usuario a las preguntas hechas
                                            return respuesta
                                        } ) )
                                .pipe(
                                    map( //###### EJECUTAR LA ACCION #########
                                        //ya no necesitamos promesas ni observables por que ya sabemos datos y lo que queremos hacer
                                        (respuesta: RespuestasUsuario) => { //recibimos la respuesta del tipo RespuestasUsuario
                                            console.log('respuesta en accion', respuesta);
                                            switch (respuesta.respuestaUsuario.opcionMenu) {
                                                case 'Crear':
                                                    const AutoNuevo = respuesta.Autos;
                                                    respuesta.respuestasBDD.bdd.AutosActuales.push(AutoNuevo);
                                                    return respuesta;
                                            } } ),

                                    // ###### Guardar Base de Datos
                                    mergeMap(
                                        (respuesta: RespuestasUsuario) => {
                                            return guardarBase(respuesta.respuestasBDD.bdd);
                                        } ) );

                            break;


                        case 'Buscar':
                            return rxjs.from(inquirer.prompt(preguntasBuscar))
                                .pipe(
                                    map(
                                        (respuestaIngresada)=>{
                                            respuesta.motor=respuestaIngresada.numMotor;
                                            return respuesta
                                        }))
                                .pipe(
                                    map(
                                        (respuesta : RespuestasUsuario)=>{
                                            const bdd =  respuesta.respuestasBDD.bdd.AutosActuales;
                                            const autoEncontrado= bdd
                                                .find(
                                                    (motorObtenido)=>{
                                                        return motorObtenido.idMotor===respuesta.motor
                                                    }
                                                );
                                            return autoEncontrado;
                                        }

                                    ));

                            break;

                        case 'Borrar':
                            return rxjs.from(inquirer.prompt(preguntasEliminar))
                                .pipe(
                                    map(
                                        (respuestaIngresada)=>{
                                            respuesta.motor=respuestaIngresada.numMotor;
                                            return respuesta
                                        })
                                )
                                .pipe(
                                    map(
                                        (respuesta : RespuestasUsuario)=>{
                                            const bdd =  respuesta.respuestasBDD.bdd.AutosActuales;
                                            const autoEncontrado= bdd
                                                .findIndex(
                                                    (motorObtenido)=>{
                                                        return motorObtenido.idMotor===respuesta.motor
                                                    }
                                                );

                                            respuesta.respuestasBDD.bdd.AutosActuales.splice(autoEncontrado,1)
                                            return respuesta
                                        }

                                    ),
                                    mergeMap(
                                        (respuesta: RespuestasUsuario) => {
                                            return guardarBase(respuesta.respuestasBDD.bdd);
                                        } )
                                );

                            break


                        case 'Actualizar':
                            return rxjs.from(inquirer.prompt(preguntasActualizar))
                                .pipe(
                                    map(
                                        (respuestaIngresada)=>{
                                            respuesta.motor=respuestaIngresada.numMotor;
                                            return respuesta
                                        })
                                )
                                .pipe(
                                    map(
                                        (respuesta : RespuestasUsuario)=>{
                                            const bdd =  respuesta.respuestasBDD.bdd.AutosActuales;
                                            const autoEncontrado= bdd
                                                .find(
                                                    (motorObtenido)=>{
                                                        return motorObtenido.idMotor===respuesta.motor
                                                    }
                                                );

                                        }

                                    )
                                );
                            break;

                    }})
            )





    /* default:
    respuesta.Autos = {
        idMotor: null,
        marca: null,
        modelo: null,
        color: null,
        anio : null,
    };
    rxjs.of(respuesta)  //devolviendo la respuesta para agregar al usuario
    */


.subscribe( // el subscribe es como el ultimo paso que dice ya ahora si ejecutate todo

    (mensaje) => {
        console.log(mensaje);
    },
    (error) => {
        console.log(error);
    }, () => {
        console.log('Completado');
        main();
    } ) }



/*
function buscarAuto(numMotor){
    return new Promise((resolve, reject)=>
    {
        fs.readFile('bdd.json','utf-8',
            (err,contenido)=>{
                if (err) {
                    reject({
                        mensaje:'Error leyendo'
                    });
                } else {
                    const bdd = JSON.parse(contenido);
                    const indiceMotor=bdd.AutosActuales
                        .findIndex(
                            (motor)=>{
                                return motor.idMotor=numMotor
                            }
                        );
                    resolve(indiceMotor)

                }

            })


    })
}
*/

/*
function buscaraAuto(idMotorRespuesta) { //devuelve una promesa de tipo Respuesta BDD (UN OBJETO)
return new Promise(
   (resolve, reject) => {
       fs.readFile( 'bdd.json', 'utf-8', (error, contenidoLeido) => {
           if (error) {
               reject({
                   mensaje: "Error al leer la BDD",
                   error: 500
               });
           } else {
               const arregloAutos=JSON.parse(contenidoLeido);
               const respuestaFind=arregloAutos.AutosActuales
                   .find(
                       (auto)=> {
                           console.log(auto+"Hola");
                           return auto.idMotor === idMotorRespuesta;
                       });
               resolve (respuestaFind);
           } } ); } );
}*/



function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDD()); //1. creamos un observable para leer la base de datos usando promesa leeRBDD()
    return leerBDD$
        .pipe( //Para poder hacer trabajos con este observable
            mergeMap((RespuestaDeLeerBDD: RespuestaBDD) => { //recibe la respuesta del observable anterior
                if (RespuestaDeLeerBDD.bdd) {
                    // truty / {}
                    return rxjs.of(RespuestaDeLeerBDD) //devolviendo un observable
                } else {
                    // falsy / null
                    return rxjs.from(crearBDD()) //devolviendo un observable
                }
            }));
}
//leer un archivo
function leerBDD(): Promise<RespuestaBDD> { //devuelve una promesa de tipo Respuesta BDD (UN OBJETO)
    return new Promise(
        (resolve) => {
            fs.readFile( 'bdd.json', 'utf-8', (error, contenidoLeido) => {
                if (error) {
                    resolve({
                        mensaje: 'Base de datos vacia',
                        bdd: null
                    });
                } else {
                    resolve({
                        mensaje: 'Si existe la Base',
                        bdd: JSON.parse(contenidoLeido)
                    });
                } } ); } );
}


function crearBDD() {
    const contenidoInicialBDD = '{"AutosActuales":[]}';
    return new Promise(
        (resolve, reject) => {
            fs.writeFile( 'bdd.json',  contenidoInicialBDD, (err) => {
                if (err) {
                    reject({
                        mensaje: 'Error creando Base',
                        error: 500 });
                } else {
                    resolve({
                        mensaje: 'BDD creada',
                        bdd: JSON.parse('{"AutosActuales":[]}')

                    });
                } } ) } ) }


function preguntarMenu() {
    return rxjs.from(inquirer.prompt(preguntaMenu)) //transformando en observable la respuesta de lo que haya escogido
    //en preguntarMenu
}


function guardarBase(bdd: BaseDeDatos) { //bdd de tipo base de datos
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',  JSON.stringify(bdd),  (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error guardando BDD',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'Cambio realizados satisfactoriamente'
                        })
                    } } ) } );}


main();


//#################################  INTERFACES #####################################
//con esto tipamos, lo que esta dentro de cada uno es lo que nos devuelve.
interface AutoA {
    idMotor: number,
    marca: string,
    modelo: string,
    color: string,
    anio: number,
}

interface BaseDeDatos {
    AutosActuales: AutoA[];
}
interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDeDatos
}

interface elemento{
    mensaje: string,
    contenido:AutoA,
}


interface RespuestasUsuario {
    respuestaUsuario: OpcionesPregunta,
    respuestasBDD: RespuestaBDD,
    Autos?: AutoA,
    motor?: number
}

interface OpcionesPregunta {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar'
}

