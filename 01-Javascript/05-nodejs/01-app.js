//const calculadora = require('./02-caculadora'); //permite exportar lo que queramos ahora String
const util = require('../05-nodejs-02/01-util'); //permite exportar lo que queramos ahora numero
const calculadora = require('./02-caculadora');
const tiempo = require('./tiempo/tiempo'); //permite exportar lo que queramos ahora numero
const fs= require('fs'); //darse cuenta que aqui no apuntamos la carpeta
const pepito=require('express');

//console.log('calculadora',calculadora);
console.log('calculadora',calculadora.nombreCalculadora);
console.log('calculadora',calculadora.sumarDosNumeros());
console.log('util',util);
console.log('tiempo',tiempo);
console.log('fs',fs);
console.log('express',pepito);