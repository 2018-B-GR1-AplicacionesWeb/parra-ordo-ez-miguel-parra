//06-callback-propio.js
//necesitamos hacer una funcion donde enviemos dos cosa el nombre del archivo y el texto a a;adirse
/*const fs=require('fs'); //NO TENGO QUE ESPERAR NADA, ASIGNAR LA VARIABLLE A UN VALOR ES EN ESE MOMENTO
const totalArchivo='INICIO';
function appendFile(nombreArchivo, contenidoArchivo,callback){

    //buscar si es que existe el archivo
    //si existe leer el contenido
    //sobreescribir con el nuevo contenido
fs.readFile(nombreArchivo,'utf-8',
(error,contenidoArchivoLeido)=>{
    if (error){
        fs.writeFile(nombreArchivo, contenidoArchivo,
            (err)=> {
            if(err) {
                console.error("Error escribiendo");
                totalArchivo= 'ERROR';
            }else{
                console.error("Archivo creado");
                return contenidoArchivo
            }
            });

    }else{
        fs.writeFile(nombreArchivo, contenidoArchivoLeido+
            contenidoArchivo,
            (err)=> {
                if(err) {
                    console.error("Error escribiendo");
                    return 'ERROR'
                }else{
                    console.error("Archivo creado")
                    return contenidoArchivoLeido+contenidoArchivo
                }
            });

    }

    }
}

const resultadoAppendFile=appendFile('06-texto.txt','Hola mundo');
console.log(resultadoAppendFile);

appendFile('06-text')*/
// 06-callback-propio.js

/*const fs = require('fs');

let totalArchivo = 'INICIO';

function appendFile(nombreArchivo, contenidoArchivo, callback) { //esta funcion no existe en el fs

    fs.readFile(nombreArchivo, 'utf-8',
        (error, contenidoArchivoLeido) => {
            if (error) {
                fs.writeFile(nombreArchivo, contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            callback(undefined, err);
                        } else {
                            console.log('Archivo creado');
                            callback(contenidoArchivo)
                        }
                    }
                );
            } else {
                fs.writeFile(
                    nombreArchivo,
                    contenidoArchivoLeido + contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            totalArchivo = 'ERROR';
                        } else {
                            console.log('Archivo creado');
                            callback(contenidoArchivoLeido+contenidoArchivo)
                        }
                    }
                );
            }
        }
    );
}
//la unica manera de devolver, cuando se exite callback

appendFile('06-texto2.txt',
    '\n Adios mundo',
    (contenidoArchivo) => {
    if (error) {
        console.log('Error',error);
    }else{

    }
    }
);

//recibimos un arreglo, crear archivos dependiendo del indice y su contenido y despues un
//arreglo de respuestas con este formati

// devolver el nombre del archivo , el contenido del archivo
//const respuesta={
  //  nombre Archivo:'',

function ejercicioDeArchivos(arregloString, callback){
    const arregloRespuestas=[];
    arregloString.forEach(
        (string, indice)=>{
            const archivo ='${indice}-${string}.txt';
            const contenido= String;
            fs.writeFile(archivo,
                contenido,
                (err)=>{
                const respuesta={
                    nombreArchivo: archivo,
                    contenidoArchivo:contenido,
                    error: err
                };
                arregloRespuestas.push(respuesta);

                const tamanoRespuestas= arregloRespuestas.length;
                if(tamanoRespuestas===arregloString.length){
                    callback(arregloRespuestas)
                }

                });



        }

    );

}
const arregloStrings =['A','B','C'];
ejercicioDeArchivos()

//ESTE EJEMPLO ES UNA DE LAS MEJORAS MANERAS PARA USAR UN FOR CON COSAS ASINCRONAS
*/

// 06-callback-propio.js

// 06-callback-propio.js

const fs = require('fs');
let totalArchivo = 'INICIO';


function appendFile(nombreArchivo, contenidoArchivo, callback) {

    fs.readFile(nombreArchivo, 'utf-8',
        (error, contenidoArchivoLeido) => {
            if (error) {
                fs.writeFile(nombreArchivo, contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            callback(err);
                        } else {

                            console.log('Archivo creado');
                            callback(contenidoArchivo, undefined);
                        }
                    }
                );
            } else {
                fs.writeFile(
                    nombreArchivo,
                    contenidoArchivoLeido + contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            callback(err);
                        } else {
                            console.log('Archivo creado 222');
                            callback(contenidoArchivoLeido + contenidoArchivo, undefined );
                        }
                    }
                );
            }
        }
    );
}

appendFile('06-texto.txt',
    '\n Adios mundo',
    (contenidoArchivo, error) => {
        if (error) {
            console.log('Error', error);
        } else {
            //console.log (contenidoArchivo);
        }

    }
);


// ['A','B','C']

// 0-A.txt 'A'
// 1-B.txt 'B'
// 2-C.txt 'C'


// [respuesta,respuesta,respuesta,respuesta,respuesta]

function ejercicioDeArchivos(arregloStrings, callback) {
    const arregloRespuestas = [];
    arregloStrings
        .forEach(
            (string, indice) => {
                const archivo = `${indice}-${string}.txt`;//template
                const contenido = string;
                fs.writeFile(archivo,
                    contenido,
                    (err) => {
                        const respuesta = {
                            nombreArchivo: archivo,
                            contenidoArchivo: contenido,
                            error: err
                        };
                        arregloRespuestas.push(respuesta);
                        const tamanoRespuestas = arregloRespuestas.length;
                        if (tamanoRespuestas === arregloStrings.length) {
                            callback(arregloRespuestas)
                        }
                    });
            }
        );
    /*
        for (let i = 0; i < arregloStrings.length; i++) {
            ;
            fs.writeFile(`${i}-${arregloStrings[i]}.txt`,
                contenido,
                (err) => {
                    const respuesta = {
                        nombreArchivo: archivo,
                        contenidoArchivo: contenido,
                        error: err
                    };
                    arregloRespuestas.push(respuesta);
                    const tamanoRespuestas = arregloRespuestas.length;
                    if (tamanoRespuestas === arregloStrings.length) {
                        callback(arregloRespuestas)
                    }
                });
        }
        */
}

const arregloStrings = ['A', 'B', 'C'];
ejercicioDeArchivos(arregloStrings,
    (arregloRespuestas) => {
        console.log("Hola",arregloRespuestas);
    });