//import * as rxjs from 'rxjs';
declare var require:any; //cuando no entiende lo que queremo usar entonces por eso declaramos una nueva variable
//declare var module:any;
const rxjs = require('rxjs');
const observableUno$ = rxjs.of(1); //la funcion of acepta un infinito numero de parametros
console.log(observableUno$);


observableUno$
.subscribe(
    (ok)=>{
        console.log(ok);
    }, (error)=>{
        console.log(error)
}
);