/*const fs =require('fs');
/*console.log('inicio');
fs.readFile('04-operadores.js', 'utf-8',
    (error,contenidoArchivo)=>{
    if (error){
        console.error(error); //al usarlo no termina abruptamente el programa
        try {
            throw new Error(error);
        }catch (e){
            console.log('Extra')
        }
        //console.log('Extra') //imprime si solo esta el console error y no el throw next
    }else{
        console.log('Si sirvio',contenidoArchivo);
    }
});
console.log('FIN');*/

//que pasa si yo quiero leer un archivo y despues escribir un archivo
/*const contenidoAAgregar= 'Miguel\n';
const nombreArchivo='05-texto.txt';

console.log('inicio');

fs.readFile(nombreArchivo, 'utf-8',
    (error,contenidoArchivo)=> {
        if (error){
            console.error(error); //al usarlo no termina abruptamente el programa
            try {
                throw new Error(error);
            }catch (e){
                console.log('Extra')
            }
            //console.log('Extra') //imprime si solo esta el console error y no el throw next
        }else{
            fs.writeFile(nombreArchivo,contenidoArchivo+contenidoAAgregar,(err) => {
                if (err) throw err;
                console.log('Archivo completado')
            })

        }
    });



console.log('FIN');
*/

const fs = require('fs');

const contenidoAAgregar = 'Adrian\n';
const nombreArchivo = '05-texto.txt';

console.log('Inicio');

fs.readFile(nombreArchivo,
    'utf-8',
    (error, contenidoArchivo) => {  // Callback
        if (error) {
            console.error(error);
            try {
                throw new Error(error);
            } catch (e) {
                console.log(e);
            }
            console.log('Extra')
        } else {
            // Callback Hell!
            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                if (err) throw err;
                console.log('Archivo completado!');
                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                    if (err) throw err;
                    console.log('Archivo completado!');
                    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                        if (err) throw err;
                        console.log('Archivo completado!');
                        fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                            if (err) throw err;
                            console.log('Archivo completado!');
                            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                if (err) throw err;
                                console.log('Archivo completado!');
                                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                    if (err) throw err;
                                    console.log('Archivo completado!');
                                    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                        if (err) throw err;
                                        console.log('Archivo completado!');
                                        fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                            if (err) throw err;
                                            console.log('Archivo completado!');
                                            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                if (err) throw err;
                                                console.log('Archivo completado!');
                                                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                    if (err) throw err;
                                                    console.log('Archivo completado!');
                                                    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                        if (err) throw err;
                                                        console.log('Archivo completado!');
                                                        fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                            if (err) throw err;
                                                            console.log('Archivo completado!');
                                                            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                if (err) throw err;
                                                                console.log('Archivo completado!');
                                                                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                    if (err) throw err;
                                                                    console.log('Archivo completado!');
                                                                    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                        if (err) throw err;
                                                                        console.log('Archivo completado!');
                                                                        fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                            if (err) throw err;
                                                                            console.log('Archivo completado!');
                                                                            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                                if (err) throw err;
                                                                                console.log('Archivo completado!');
                                                                                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                                    if (err) throw err;
                                                                                    console.log('Archivo completado!');

                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

        }
    });


console.log('Fin');