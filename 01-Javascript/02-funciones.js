holaMundo();

function holaMundo(){
    console.log("Hola mundo");
}

console.log(holaMundo()); //una funcion sin return devuelve undefined
 //siempre validar ya que javascript es no tipado
function sumarDosNumeros(numeroUno,numeroDos){
   var esNumberNumeroUnoNumber =typeof numeroUno == 'number';
   var esNumberNumeroDosNumber = typeof numeroDos == 'number';
    if (esNumberNumeroUnoNumber && esNumberNumeroDosNumber){
        return numeroUno+numeroDos;
    }else{
        console.error('No envia numeros');
        return 0;
    }

}
console.log(sumarDosNumeros(1,2));
console.log(sumarDosNumeros(false,true,null,{},5,6,7));
console.log(sumarDosNumeros('Adrian',true,null,{},5,6,7));


//////destructiurar argumentos

function sumarNNumeros(...numeros){
    var tieneUnParametroDiferenteDeNumber = false;
    var resultado = 0;
    for (var i=0; i < numeros.length; i++){
        var esNumeroNumber = typeof numeros[i]=='number';
        if (!EsNumeroNumber)
        {
            tieneUnParametroDiferenteDeNumber = true;
        }else{
       resultado=resultado+numeros[i]
    }
}
if(tieneUnParametroDiferenteDeNumber){
console.error('No envia numeros');
return 0;
}else{
return resultado;
}}
console.log(sumarNNumeros(1,2,3, 4,5));



///////
function saludaEnUpperCase(nombre, funcion){
    return `Hola ${funcion(nombre)}`; //template Strings
}
console.log(saludaEnUpperCase("miguel",convertirStringMayuscula()));//hola mundo enviando sola la definicion de la funcion
console.log(saludaEnUpperCase("MIKE",convertirStringMinuscula()));
console.log(saludaEnUpperCase("miguel",coanadirPuntoAlFinal()));

function convertirStringMayuscula (texto) {
    return texto.toUpperCase();
}

function convertirStringMinuscula (texto) {
    return texto.toLowerCase();
}
function coanadirPuntoAlFinal (texto) {
    return texto + ".";
}

function primeraLetraEnMayuscula(texto){
    var primeraLetra =texto[0].toUpperCase();
    var restoPalabra= texto.slice(1,texto.length);

    return primeraLetra+restoPalabra;
}
console.log(saludaEnUpperCase("miguel",primeraLetraEnMayuscula());