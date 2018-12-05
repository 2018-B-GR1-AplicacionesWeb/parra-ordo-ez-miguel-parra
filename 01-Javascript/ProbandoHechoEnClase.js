holaMundo(); // Hola mundo

function holaMundo() {
    console.log("Funcion 1 ");
    console.log('Hola mundo ');
}

console.log(holaMundo()); //una funcion sin return devuelve undefined
//siempre validar ya que javascript es no tipado

function sumarDosNumeros(numeroUno, numeroDos) {
    console.log("\nFuncion 2");
    var esNumeroUnoNumber = typeof numeroUno == 'number';
    var esNumeroDosNumber = typeof numeroDos == 'number';
    if (esNumeroUnoNumber && esNumeroDosNumber) {
        return numeroUno + numeroDos;
    } else {
        console.error('No envia numeros');
        return 0;
    }
}
console.log(sumarDosNumeros(1, 2));
console.log(sumarDosNumeros(false,true,null,{},5,6,7));
console.log(sumarDosNumeros("adrian", true, 3, 4, 5, 6, 7));


//////############################destructurar argumentos
function sumarNNumeros(...numeros) {

    var respuesta = sumarNumerosDesdeUnArreglo(numeros);

    if (respuesta.noEsNumber) {
        console.error('No envia numeros');
        return 0;
    } else {
        return respuesta.resultado;
    }
}

function sumarNumerosDesdeUnArreglo(numeros) {
    var tieneUnParametroDiferenteDeNumber = false;
    var resultado = 0;
    for (var i = 0; i < numeros.length; i++) {
        var esNumeroNumber = typeof numeros[i] == 'number';
        if (!esNumeroNumber) {
            tieneUnParametroDiferenteDeNumber = true;
        } else {
            resultado = resultado + numeros[i]
        }
    }

    var respuesta = {
        noEsNumber: tieneUnParametroDiferenteDeNumber,
        resultado: resultado
    };

    return respuesta;
}
console.log(sumarNNumeros(1, 2, 3, 4, 5));
console.log(sumarNNumeros(1, 2, 3, 4, "asd"));
 //################################################################

function saludarEnUpperCase(nombre, funcion) {
    return `Hola ${funcion(nombre)}`; // template strings
}

console.log(saludarEnUpperCase("adrian", convertirStringEnMayuscula));
console.log(saludarEnUpperCase("VICENTE", convertirStringEnMinuscula));
console.log(saludarEnUpperCase("Buen dia", anadirPuntoAlFinal));

function convertirStringEnMayuscula(texto) {
    return texto.toUpperCase();
}

function convertirStringEnMinuscula(texto) {
    return texto.toLowerCase();
}

function anadirPuntoAlFinal(texto) {
    return texto + ".";
}

function primeraLetraEnMayuscula(texto) {
    var primeraLetraMayuscula = texto[0].toUpperCase();
    var restoPalabra = texto.slice(1, texto.length);
    return primeraLetraMayuscula + restoPalabra;
}
console.log(saludarEnUpperCase("adrian",primeraLetraEnMayuscula));



function saludar(callback) {
var saludo= 'hola';
    callback(saludo)
}

saludar(
    function (saludo) {
        console.log(saludo+'miguel');
    }
);



const promesaCreacionArchivo = (indice, string) => {
    return new Promise(
        (resolve, reject) => {
            const archivo = `${indice}-${string}.txt`;
            const contenido = string;
            fs.writeFile(archivo,contenido,
                (err,) => {
                    if(err) {
                        reject(err);
                    } else {
                        const respuesta = {
                            nombreArchivo: archivo,
                            contenidoArchivo: contenido,
                            error: err
                        };

                        resolve(respuesta);
                    }
                })
        }
    )
};
const arregloStrings = ['A', 'B', 'C'];
const arregloFinal = [];

arregloStrings.forEach(
    (string, index) => {
        promesaCreacionArchivo(index, string)
            .then(
                (respuesta) => {
                    arregloFinal.push(respuesta);
                }
            )
            .catch(
                (error) => {
                    console.log('Error', error);
                }
            );
    }
);

const  fs = require('fs');

const respuesta = {
    nombreArchivo :'',
    contenidoArchivo :'',
    erroe : ''
};

const ejercicioDeArchivos = (arregloString, callback)=>{
    console.log('Inicio');
    return new Promise(
        (resolve, reject) => {
            const arregloRespuestas = [];
            arregloString
                .forEach(
                    (string, indice) => {
                        const archivo = ${indice} - ${string}.txt;
                        const contenido = string;
                        fs.writeFile(archivo,
                            contenido,
                            (error) => {
                                const respuesta = {
                                    nombreArchivo: archivo,
                                    contenidoArchivo: contenido,
                                    erroe: error
                                };
                                arregloRespuestas.push(respuesta);
                                const tamañoRespuesta = arregloRespuestas.length;

                                if (tamañoRespuesta === arregloString.length) {
                                    //console.log(arregloRespuestas);
                                    //callback(arregloRespuestas);
                                    resolve(arregloRespuestas);
                                }
                            }
                        );
                    }
                )
        }
    )
}

const arregloStrings =['A','B','C'];

// ejercicioDeArchivos(arregloStrings,
//     (arregloRespuestas) => {
//         console.log(arregloRespuestas);
//     }
// )
ejercicioDeArchivos(arregloStrings)
    .then(
        (arregloRespuestas) => {
            console.log('Todo bien', arregloRespuestas);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );