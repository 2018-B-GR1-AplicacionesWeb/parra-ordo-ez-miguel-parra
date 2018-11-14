"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaMenu = ['Ingresar', 'Buscar', 'Actualizar', 'Eliminar'];
const listaMarca = ['Audi', 'Chevrolet', 'Fiat', 'Hyundai', 'Kia', 'Mazda', 'Mercedes-Benz', 'Nissan', 'Toyota', 'Otra'];
const listaColor = ['Blanco', 'Cafe', 'Crema', 'Gris', 'Negro', 'Plata', 'Rojo', 'Verde', 'Vino',];
const listaAnio = ['2018', '2017', '2016', '2015', '2014', '2013'];
exports.preguntaMenu = [{ type: 'list', name: 'seleccion', message: '¿Qué deseas hacer?', choices: exports.listaMenu },];
exports.preguntasIngresar = [
    { type: 'input', name: 'numMotor', message: 'Ingrese el número de motor: ' },
    { type: 'list', name: 'marcaAuto', message: 'Seleccione la marca del auto:', choices: listaMarca },
    { type: 'input', name: 'modeloAuto', message: 'Ingrese el modelo del auto:  ' },
    { type: 'list', name: 'color', message: 'Seleccione el color: ', choices: listaColor },
    { type: 'list', name: 'anio', message: 'Seleccione el año: ', choices: listaAnio },
];
exports.preguntasBuscar = [
    { type: 'input', name: 'numMotor', message: 'Ingrese el número de motor del auto a buscar: ' },
];
