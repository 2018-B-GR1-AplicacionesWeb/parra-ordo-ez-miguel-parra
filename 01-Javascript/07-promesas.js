// 07-promesas.js
const fs = require('fs');
const nuevaPromesaLectura = new Promise(
    (resolve) => {
        fs.readFile('06-texto23.txt', 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    });

const nuevaPromesaEscritura = (contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {
            const contenido = contenidoLeido ? contenidoLeido + 'Otro ola' : 'Otro ola';
            fs.writeFile('06-texto23.txt', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(contenido);
                    }
                });
        }
    ); };

nuevaPromesaLectura
    .then(
        (contenidoDelArchivo) => {
            console.log('Todo bien', contenidoDelArchivo);
            return nuevaPromesaEscritura(contenidoDelArchivo)
        }
    )
    .then(
        (cCompleto) => {
            console.log('Contenido completo ', cCompleto);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );


///////////////////////////////////////////////////

/*
const nuevaPromesaAppendFile = new Promise(
    (nombreArchivo, textoNuevo) => {
        fs.readFile('nombreArchivo.txt', 'utf-8',
            (err, contenidoArchivoLeido) => {
                if (err) {
                    resolve(err, textoNuevo);
                } else {
                    resolve(contenidoLeido, textoNuevo);
                }
            });
    }
);*/

/*
const nuevaPromesaEscritura = (contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {

            const contenido = contenidoLeido ? contenidoLeido + 'Otro ola' : 'Otro ola';

            fs.writeFile('06-texto23.txt', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(contenido);
                    }
                });
        }
    );
};*/
/*
nuevaPromesaLectura
    .then(
        (contenidoArchivo) => {
            console.log('Todo bien', contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo)
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log('Contenido completo', contenidoCompleto);
        }
    )

    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );*/

const promesaForEach= (arregloStrings)=>{
return new Promise((resolve, reject)=>{
    const arregloRespuestas=[];
    arregloStrings
        .forEach(
            (string, indice)=>{
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
                            resolve(arregloRespuestas);
                        }
                    });
            }
        );
            });

    }

    const arregloStrings = ['A', 'B', 'C'];


promesaForEach (arregloStrings)
    .then((respuesta)=>{
        console.log("Los archivos son: ", respuesta)
        }
    );
