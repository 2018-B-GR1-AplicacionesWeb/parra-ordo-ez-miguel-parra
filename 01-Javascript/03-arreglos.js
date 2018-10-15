var arreglo = [];

arreglo = [
    1,
    "Miguel",
    false,
    null,
    new Date(),
    {
        nombre: "Angel"
    },
    [1,2,false,true]
];

console.log(arreglo);
arreglo.push (3);
console.log(arreglo);
arreglo.pop();
console.log(arreglo);
var arregloNumeros= [1,2,3,4,5];
arregloNumeros.splice(1,0,1.1);
console.log(arregloNumeros);

arregloNumeros.splice(4,1);
console.log(arregloNumeros);

arregloNumeros.indexOf();

var indiceDelNumeroDos= arregloNumeros.indexOf(2);
console.log(indiceDelNumeroDos);

arregloNumeros.splice(indiceDelNumeroDos,0,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9);
console.log(arregloNumeros);

var indiceUnoSiete= arregloNumeros.indexOf(1.7);
console.log(arregloNumeros[indiceUnoSiete]);
console.log(arregloNumeros[0]);

//// eliminar del 1.1 al 1.9
var posicionInicialUnoUno=arregloNumeros.indexOf(1.1);
var posicionInicialUnoNueve = arregloNumeros.indexOf(1.9);
var desdeUnoUnoAlUnoNueve = (posicionInicialUnoNueve-posicionInicialUnoUno+1);
arregloNumeros.splice(posicionInicialUnoUno,desdeUnoUnoAlUnoNueve);
console.log(arregloNumeros);

//// unir dos o mas arreglos al realizar la
// Destructuracion de arreglos
var arregloUno= [1,2,3];
var arregloDos= [4,5,6];
console.log(...arregloUno); //se destructura a esta forma 1 2 3
var arregloCompleto= [...arregloUno, ...arregloDos];
console.log(arregloCompleto);

var arregloArgumentos = [posicionInicialUnoUno,desdeUnoUnoAlUnoNueve];
arregloNumeros.splice(...arregloArgumentos);

// Destructuracion de objetos

var miguel = {
    nombre: "Miguel",
    apellido:"Parra",
    direccion:"Quito",
    casado:false,
    edad: 23
};

var angel= {
    mascota:{
        nombre: "Mili"
},
fechaNacimiento: new Date('1995-01-22')
};

var datosDelUsuario ={...miguel,
    ...angel};
console.log(datosDelUsuario);

// saber que tipos de valores tienen las variables
var atributosDelObjeto= Object.keys(datosDelUsuario);

console.log(atributosDelObjeto); //se imprimira como arreglo de strings
console.log(datosDelUsuario['nombre']); //hacer mas programaticamente
console.log(datosDelUsuario[atributosDelObjeto[0]]);
