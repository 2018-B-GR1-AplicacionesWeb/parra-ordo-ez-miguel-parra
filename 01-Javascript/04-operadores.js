
/*function ejemplo(){}
var ejemploDos = function () {}; //Anonymous function
var miguel = {
    trabajar: function() {
        return 'Trabajando';
    }
};
var ArregloFunciones =[function(){}];

console.log(typeof ejemplo); //Tipo de dato que en este caso es function
console.log(ejemplo); /// la definicion de la funcion
console.log(ejemplo ()); // aqui usamos la ejecucion de la funcion

///OPERADORES
var arregloDeNombres = ['A','b','C'];

arregloDeNombres.forEach( //Escribir codigo que se entienda
    function (valorActual, indiceActual, arreglo){ //la funcion se ejecuta en cada iteracion del for, los forEach son menos rapidos que el for
//el primer parametro es el valor actual de esa operacion
        console.log('Valor actual', valorActual)
        console.log('Indice actual', indiceActual)
        console.log('Arreglo', arreglo)
    }
)

// DEFINIR VARIABLES

var variableUno; //NUNCA USAR
let variableDOS=2; //USAR MUTABLE
const pi=3.1416; //INTENTAR USAR CONST SIEMPRE

const vicente = {
    nombre: "Vicente"
};

vicente.nombre="Adrian";
vicente.edad=24;

// fat arrow functons
var arregloDeNombres = ['A','b','C'];

arregloDeNombres.forEach( //Escribir codigo que se entienda
    (valorActual, indiceActual, arreglo) => { //la funcion se ejecuta en cada iteracion del for, los forEach son menos rapidos que el for
//el primer parametro es el valor actual de esa operacion
        console.log('Valor actual', valorActual)
        console.log('Indice actual', indiceActual)
        console.log('Arreglo', arreglo)
    }
)


const sumarDosNumeros = (numUno, numDos)=>{
    return numUno+numDos
};

const sumarDosNumeros = (numUno, numDos) => numUno+numDos; //ya estan implicitamente el return
const elevarAlCuadrado = numero => numero*numero; //Omitir parentesis funciona cuando se usa un solo parametro
const elevarAlCuadradoV2 = (numero) => numero*numero;
const arregloNombresDos = ['E','F','G','H'];
const resutado = arregloDeNombres

.map ( //mutar cada elemento del arreglo
    (valorActual) => {
        return valorActual+'.';
    }
    ) // con esta funcion devolvemos un arreglo

.forEach( //devuelve undefined
    (valorNUevo) => console.log(valorNuevo)
);

console.log (resultado);

//////////////////////////////////////////////////////////
const arregloNumeros =[2,3,1,5,6,4,7,8,9,10];
// si se quiere solo los numeros mayores a numero 3
/*const resultadoFilter = arregloNumeros
.filter(
    valorActual => {
        return valorActual>3 //expresion
    }
);
consoloe.log(resultadoFilter);*/
/*

const resultadoFilter = arregloNumeros.filter(n => (n%2)==0); //el filter devuelve un arreglo
consoloe.log(resultadoFilter);

if('1' === 1) { //falso
    console.log('Es verdad');
}else{
    console.log("Es falso");
}

constresultadoEvery = arregloNumeros
.evry (n ==> n>1); si todos cumple entonces tru sino false

//Some
const resultadoSome = arregloDeNumeros
.some (n=> n<2); //si uno cumple entonces true sino false
console.log(resultadoSome);\

//buscar al numero 7
const resultadoFinIndex = arregloNumeros
.findIndex (n => n ===7) //se puede buscar por diferentes cosas que tiene nuestro objeto


//find
const resultadoFind = arregloNumeros
.find (n => n ===7) //se puede buscar por diferentes cosas que tiene nuestro objeto

*/

/*
/// si queremos hacer una operacion en el arreglo
//reduce

const resultadoReduce = arregloNumeros
.reduce(
(valorActualDelNumero,valorActualDelArreglo)=> {//1er parametro una funcion
return valorActualDelNumero - valor ActualDelArreglo;
},
100 //acepta valor

const resultadoReduceV2 = arregloNumeros
.reduce((a,b)=>a+b,0)
//sumar los 5 primeros
const resultadoReduceV3 = arregloNumeros.reduceRight ((a,b, indice) => {
if (indice > 4){
return a + b;
]else[
return a;
}
}, 0}
);
//sort

const resultadoSort = arreglosNumros.sort ((a,b) => a-b);

// const clonArregloNumeros = JSON.parse(JSON.stringify(arregloNumeros)); //clonar arreglos u objetos para no tenete problemas


 */

//proyecto de javascript usando navegador, registro de libros de estudiantes pero usando javascript
//para obtener parametros de los usuarios usaremos  promp
//consola de javascript , escribir la logica sin meter los archivos de navegador.

función  ejemplo () {
}

var  ejemploDos  =  function () {
}; // Función anónima

var adrian = {
    trabajar :  function () { // Función anónima
        volver  ' Trabajando ' ;
    }
};

var arregloFunciones = [ función () { // función anónima

}];

/ * no se puede usar funciones anonimas sin igualar o enviar como paraemtro
función (a, b, c) {
}
* /

consola . log ( typeof EJEMPLO); // Tipo de dato -> función
consola . log (ejemplo); // Definicion de la funcion
consola . log ( ejemplo ()); // Ejecucion funcion

var variableUno; // USAR NUNCA
dejar variableDos =  2 ; // USAR MUTABLE (este se asigna a otro valor)
variableDos = variableDos +  1 ;
const  pi  =  3.1416 ;  // INTENTEN USAR CONST SIEMPRE

// operadores

const  arregloDeNombres  = [ ' A ' , ' b ' , ' C ' ];

arregloDeNombres [ 1 ] =  ' B ' ;

arregloDeNombres . empuje ( ' D ' );

// arregloDeNombres = {};

// arregloDeNombres = [];


const  vicente  = {
    nombre :  ' vicente '
};

borrar  vicente . nombre ;

const  casado  =  true ;

// casado = falso; Cambiar booleanos

const  apellido  =  ' ' ;

// apellido = '123'; Cambiar cuerdas

const  edad  =  29 ;
// edad = 30; Cambiar número

const  variableNull  =  null ;

// variableNull = 1; Cambiar nulo

vicente . nombre  =  ' Adrian ' ;
vicente . edad  =  24 ;

consola . log (arregloDeNombres);
consola . registro (vicente);

arregloDeNombres . forEach (   // Escribir codigo que se entienda
    función ( valorActual , indiceActual , arreglo ) {
    consola . log ( ' Valor real ' , valorActual);
    consola . log ( ' Indice Actual ' , indiceActual);
    consola . log ( ' Arreglo ' , arreglo);
}
);

// función con nombre
// función anonimas
// funciones de la flecha grasa -> =>

arregloDeNombres . forEach (   // Escribir codigo que se entienda
    ( valorActual , indiceActual , arreglo ) => {
        consola . log ( ' Valor real ' , valorActual);
        consola . log ( ' Indice Actual ' , indiceActual);
        consola . log ( ' Arreglo ' , arreglo);
    }
);

const  sumarDosNumeros  = ( numUno , numDos ) => {
    devuelve numUno + numDos
};

const  sumarDosNumerosV2  = ( numUno , numDos ) => numUno + numDos;

const  elevarAlCuadrado  = ( numero ) => numero * numero;

const  elevarAlCuadradoV2  =  numero  => numero * numero;

const  arregloNombresDos  = [ ' E ' , ' F ' , ' G ' , ' H ' ];

const  resultado  = arregloDeNombres
    . mapa ( // mutar cada elemento del arreglo
        valorActual  => {
            devolver valorActual +  ' . ' ;
        }
    )   // Devolver un ARREGLO
    . forEach (
        ( valorNuevo ) =>  consola . log (valorNuevo)
    ); // indefinido

consola . log (resultado);

const  arregloNumeros  = [ 2 , 3 , 1 , 5 , 6 , 4 , 7 , 8 , 9 , 10 ];


const  resultadoFilter  = arregloNumeros
    . filtro ( n  => (n %  2 ) ===  0 );

consola . log (resultadoFilter);

// Triple igual

si ( ' '  ===  0 ) {
    consola . log ( ' Es verdad ' );
} else {
    consola . log ( ' Es falso ' );
}

// Cada

const  resultadoEvery  = arregloNumeros
    . cada ( n  => n >  1 ); // Si cumple TODOS VERDADERO / FALSO

consola . log (resultadoEvery);

// algunos

const  resultadoSome  = arregloNumeros
    . algunos ( n  => n <  0 ); // Si uno cumple la condicion TRUE / FALSE

consola . log (resultadoSome);

// findIndex

const  resultadoFindIndex  = arregloNumeros
    . findIndex ( n  => n ===  7 );

consola . log (resultadoFindIndex);
consola . log ( arregloNumeros . indexOf ( 7 ));

// encontrar

const  resultadoFind  = arregloNumeros
    . encontrar ( n  => n ===  7 );

// reducir

const  resultadoReduce  = arregloNumeros
    . reducir (
        ( valorActualDelNumero , valorActualDelArreglo ) => {   // 1er parametro una funcion
            return valorActualDelNumero - valorActualDelArreglo;
        }
100   // Acepta un valor
);
consola . log (resultadoReduce);

const  resultadoReduceV2  =  arregloNumeros . reduceRight (( a , b , indice ) => {
    si (indice >  4 ) {
        devuelve a + b;
    } else {
        devuelve un
    }
}, 0 );

consola . log (resultadoReduceV2);

// ORDEN

const  clonArregloNumeros  =  JSON . parse ( JSON . stringify (arregloNumeros));

const  resultadoSort  =  arregloNumeros . sort (( a , b ) => a - b);

const  resultadoSortV2  =  clonArregloNumeros . sort (( a , b ) => b - a);

consola . log (resultadoSort);
consola . log (resultadoSortV2);