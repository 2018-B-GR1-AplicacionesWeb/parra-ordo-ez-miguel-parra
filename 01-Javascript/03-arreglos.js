var arreglo = [];
arreglo.push(8);
console.log(arreglo);
arreglo = [1, "Miguel", false, null, new Date(), { nombre: "Angel", edad: 85}, [1,2,false,true]];
console.log(arreglo);
console.log("aqui estoy aplicando un push");
arreglo.push (4); //coloca al final el 3
console.log(arreglo);
console.log("aqui estoy aplicando un pop");
arreglo.pop();
console.log(arreglo);
console.log("aqui termine con el primer ejemplo");
console.log("#############################################\n");




var arregloNumeros= [1,2,3,4,5];
console.log(arregloNumeros);
console.log("Aqui aplico un splice para agregar");
arregloNumeros.splice(1,0,1.1); //pos Agregar,cuantos borrar, que se va a agregar
console.log(arregloNumeros);
console.log("Aqui aplico un splice para borrar");
arregloNumeros.splice(4,1); //posicion a borrar, numero de elementos
console.log(arregloNumeros);
console.log("Aqui imprimo la posicion donde se encuentra el numero 2");
var indiceDelNumeroDos= arregloNumeros.indexOf(2);
console.log(indiceDelNumeroDos);
console.log("Aqui aplico un splice para agregar varios elementos desde la posicion 2");
arregloNumeros.splice(indiceDelNumeroDos,0,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9);
console.log(arregloNumeros);
console.log("Aqui hago la llamada arregloNumero[7]");
var indiceUnoSiete= arregloNumeros.indexOf(1.7);
console.log(arregloNumeros[indiceUnoSiete]);
console.log('Aqui imprimo el elemento en la posicion 0');
console.log(arregloNumeros[0]);

//// eliminar del 1.1 al 1.9
console.log('Aqui borro desde la posicion 1 hasta la 9');
var posicionInicialUnoUno=arregloNumeros.indexOf(1.1);
var posicionInicialUnoNueve = arregloNumeros.indexOf(1.9);
var desdeUnoUnoAlUnoNueve = (posicionInicialUnoNueve-posicionInicialUnoUno+1);
arregloNumeros.splice(posicionInicialUnoUno,desdeUnoUnoAlUnoNueve);
console.log(arregloNumeros);
console.log('\n#########Aqui se hace una destructuracion de arreglos para unir arreglos ########\n');
//// unir dos o mas arreglos al realizar la
// Destructuracion de arreglos

var arregloUno= [1,2,3];
console.log('Arreglo 1: ',arregloUno);
var arregloDos= [4,5,6];
console.log('Arreglo 2: ',arregloDos);
console.log('Destructuracion del arreglo 1: ', ...arregloUno); //se destructura a esta forma 1 2 3
console.log('Union ambos arreglos con destructuracion ');
var arregloCompleto= [...arregloUno, ...arregloDos];
console.log(arregloCompleto);

var arregloArgumentos = [posicionInicialUnoUno,desdeUnoUnoAlUnoNueve];
arregloNumeros.splice(...arregloArgumentos);




// Destructuracion de objetos
console.log('########## Ahora se hace la destructuracion de Objetos ############');
var miguel = {
    nombre: "Miguel",
    apellido:"Parra",
    direccion:"Quito",
    casado:false,
    edad: 23
};
console.log('OBJETO 1\n', miguel);
var angel= {
    mascota:{
        nombre: "Miliaaaa"
},
fechaNacimiento: new Date('1995-01-22')
};
console.log('OBJETO Angel\n', angel);

console.log("UNION DE OBJETOS MIGUEL Y ANGEL MEDIANTE DESTRUCTURACION");
var datosDelUsuario ={...miguel, ...angel};
console.log("hola", datosDelUsuario);
console.log("####### ver atributos de un objeto usando Object.keys ######");
// saber que tipos de valores tienen las variables
var atributosDelObjeto= Object.keys(datosDelUsuario);
console.log(atributosDelObjeto); //se imprimira como arreglo de strings
console.log('Imprimir mas programaticamente Ejemplo: datosDelUsuario[\'nombre\']');
console.log(datosDelUsuario['nombre']); //hacer mas programaticamente
console.log('Imprimir usando: datosDelUsuario[atributosDelObjeto[0]] ');
console.log(datosDelUsuario[atributosDelObjeto[0]]);
