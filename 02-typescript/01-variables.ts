//02-typescript/01-variables
 //npm install
const nombre: string ="2312";
const edad:number =12;
const nada:null;
const casado: boolean =false;
let loQueSea: any ={};
loQueSea=1;
loQueSea='Facil';
loQueSea=true;
const fechaDeNacimiento:Date =new Date(); //para asignar una clase


const identificador= 1;


////// Definicion de un objeto
//objeto json =
//tipo :
const usuario:{
    nombre:string;
    apellido:string;
    edad?:number | string; //el signo de pregunta dice que el parametro es opcional
}=
{
    nombre:'Miguel',
    apellido='Parra'
};
usuario.edad='12';
//tsc nombreArchivo --target es3


interface UsuarioInterface{
    nombre:string;
    apellido:string;
    edad?:number | string;
}

class Usuario{
    public nombre:string;
    public apellido:string;
    public edad? :number | string
}

function sumarDosNumeros(
    numeroUno:number,
    numeroDos: number
){
    return numeroUno+numeroDos;
}
sumarDosNumeros(2,2);

const saludar=(nombre:string,
               apellido?:string,
               ...infinito:number[]): any =>{ //con el void no devolvemos algun tipo
    return 2
    };
let respuesta = <string> saludar('nombre', //haciendo un casteo
    'equez',
    1,2,3,4);
respuesta = respuesta.toUpperCase();

let nombreDos='adrian'; //duck typing


