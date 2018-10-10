//tipados Int edad=1;
var edad =1.01;
var nombre="Miguel";
var nombre1='Miguel';
var casado=false;
var hijos=null;
var cuatroBrazos;  //undefined
var fecha =new Date(); //object

var miguelJson = {
    "nombre":"Miguel",
    "edad":12,
    "sueldo":12.2,
    "casado":false,
    "hijos": null,
    "mascotas":{
        "nombre":"Mili"
    }

};


var miguel={
    'nombre': "Miguel",
    'edad':29,
    'sueldo':12.2,
    hijos: null,
    deberes:undefined,
    mascota: {
        "nombre":'Cachetes'
},
}; //object
console.log(miguel.nombre)
console.log('fecha', fecha);
console.log(typeof fecha);

//Truthy
//falsy
if("") {
    console.log("Si")
}else{
    console.log("No")
}
/////////////////////////////////
if(1) {
    console.log("Si")
}else{
    console.log("No")
}
////////////////////////////////
if(-1) {
    console.log("Si")
}else{
    console.log("No")
}
/////////////////////////////////////
if(0) {
    console.log("Si")
}else{
    console.log("No")
}
//////////////////////////
if(new Date()) {
    console.log("Si")
}else{
    console.log("No")
}
//////////////////////////
if(undefined) {
    console.log("Si")
}else{
    console.log("No")
}


