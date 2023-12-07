// Este archivo pertenece a la capa de modelos y es el encargado de....
// ¿interactuar con la base de datos para traer la infoamacion y entregarsela al controlador segun sus requerimentos?

const fs = require('fs');
const path = require('path');


// Creamos una "funcion" que traera TODOS producto del JSON en base a un ID de producto recibido
const traerTodosLosProductos = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/products.json'));     // Inicialmente leemos el JSON
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                  // Parseamos la Dara recibida para que su estructura/formato nos sea util

    return datosJsonParseados;                                                                                  // Retornamos la data completa a quien "requirio" esta funcion

};



// Creamos una "funcion" que traera SOLO UN producto del JSON en base a un ID de producto recibido
const traerUnSoloProducto = async (idBuscado) => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/products.json'));     // Inicialmente leemos el JSON
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                  // Parseamos la Dara recibida para que su estructura/formato nos sea util

    const productoSeleccionado = datosJsonParseados.filter(producto => producto.prod_id == idBuscado);          // Dentro de la data recibida filtraremos 1 solo producto con el ID recibido
                                                                                                                // En caso de no existir coincidencias obtendremos un Array vacio

    return productoSeleccionado;                                                                                // Retornamos la data a quien "requirio" esta funcion

};



// Exportamos estas "funciones" para que esten disponibles por quien requiera este modulo de la capa modelos
module.exports = {
    traerTodosLosProductos,
    traerUnSoloProducto
};