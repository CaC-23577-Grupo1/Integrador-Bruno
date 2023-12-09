// Este archivo pertenece a la capa de modelos y es el encargado de....
// ¿interactuar con la base de datos para traer la infoamacion y entregarsela al controlador segun sus requerimentos?

const fs = require('fs');
const path = require('path');


// Creamos una "funcion" que traera TODOS producto del JSON
const traerTodosLosProductos = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/products.json'));     // Inicialmente leemos el JSON
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                  // Parseamos la Dara recibida para que su estructura/formato nos sea util

    return datosJsonParseados;                                                                                  // Retornamos la data completa a quien "requirio" esta funcion

};



// Creamos una "funcion" que traera SOLO UN producto del JSON en base a un ID de producto recibido
const traerUnSoloProducto = async (idBuscado) => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/products.json'));     // Inicialmente leemos el JSON
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                  // Parseamos la Data recibida para que su estructura/formato sea util

    const productoSeleccionado = datosJsonParseados.filter(producto => producto.prod_id == idBuscado);          // Dentro de la data recibida filtraremos 1 solo producto con el ID recibido
                                                                                                                // En caso de no existir coincidencias obtendremos un Array vacio

    return productoSeleccionado;                                                                                // Retornamos la data a quien "requirio" esta funcion

};



// Creamos una "funcion" que traera aquellos productos del JSON que coincidan con el "Valor Buscado"
const traerProductosFiltradosAdmin = async (valorBusqueda) => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/products.json'));     // Inicialmente leemos el JSON
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                  // Parseamos la Data recibida para que su estructura/formato sea util
    
    const productosFiltrados = datosJsonParseados.filter(producto =>                            // Dentro de la data recibida filtraremos por los siguientes criterios
            (producto.prod_sku.toLowerCase()).includes(valorBusqueda.toLowerCase()) ||          // que el valor buscado este incluido en el SKU
            (producto.prod_nombre.toLowerCase()).includes(valorBusqueda.toLowerCase()) ||       // que el valor buscado este incluido en el NOMBRE
            (producto.prod_licencia.toLowerCase()).includes(valorBusqueda.toLowerCase())        // que el valor buscado este incluido en la LICENCIA
        );                                                                                      // En caso de no existir coincidencias obtendremos un Array vacio

    return productosFiltrados;                                                                  // Retornamos la data a quien "requirio" esta funcion

};



// Creamos una "funcion" que traera aquellos productos del JSON que coincidan con los criterios de busqueda o filtrado
const traerProductosFiltradosShop = async (nombreQueryParam, valorQueryParam) => {

    const dataDelJson = await fs.readFileSync(path.resolve(__dirname, '../../public/data/products.json'));
    const datosJsonParseados = await JSON.parse(dataDelJson);

    let productosFiltrados = "";
    
    switch (nombreQueryParam) {
        case "newProducts":
            productosFiltrados = datosJsonParseados.filter(producto => producto.prod_nuevo == true);
            break;
        case "license":
            productosFiltrados = datosJsonParseados.filter(producto => producto.prod_licencia.toLowerCase() == valorQueryParam.toLowerCase());
            break;
        case "category":
            productosFiltrados = datosJsonParseados.filter(producto => producto.prod_categoria.toLowerCase() == valorQueryParam.toLowerCase());
            break;
        case "buscar":
            productosFiltrados = datosJsonParseados.filter(producto => 
                (producto.prod_nombre.toLowerCase()).includes(valorQueryParam.toLowerCase()) ||
                (producto.prod_licencia.toLowerCase()).includes(valorQueryParam.toLowerCase())
            );
            break;
        default:
            productosFiltrados = datosJsonParseados;
            break;
    }

    return productosFiltrados;

};



// Creamos una "funcion" que traera SOLO aquellos productos del JSON que tengan la propiedad "prod_sliderincluir" definida como TRUE
const traerProductosSlider = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/products.json'));     // Inicialmente leemos el JSON
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                  // Parseamos la Data recibida para que su estructura/formato sea util

    const productosSeleccionados = datosJsonParseados.filter(producto => producto.prod_sliderincluir == true);  // Dentro de la data recibida filtraremos solo aquellos que cumplan esta condicion
                                                                                                                // En caso de no existir coincidencias obtendremos un Array vacio                                                                                                        

    return productosSeleccionados;                                                                                // Retornamos la data a quien "requirio" esta funcion

};



// Creamos una "funcion" que traera Todas las Colecciones del JSON
const traerColecciones = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/collections.json'));      // Inicialmente leemos el JSON
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                      // Parseamos la Data recibida para que su estructura/formato sea util                                                                                                   

    return datosJsonParseados;                                                                                      // Retornamos la data a quien "requirio" esta funcion

};



// Creamos una "funcion" que traera los items cargados en el carrito
const traerContenidoCarrito = async () => {

    const dataDelJson =  await fs.readFileSync(path.resolve(__dirname, '../../public/data/cartContent.json'));      // Inicialmente leemos el JSON
    const datosJsonParseados =  await JSON.parse(dataDelJson);                                                      // Parseamos la Data recibida para que su estructura/formato sea util                                                                                                   

    return datosJsonParseados;                                                                                      // Retornamos la data a quien "requirio" esta funcion

};



// Exportamos estas "funciones" para que esten disponibles por quien requiera este modulo de la capa modelos
module.exports = {
    traerTodosLosProductos,
    traerUnSoloProducto,
    traerProductosFiltradosAdmin,
    traerProductosFiltradosShop,
    traerProductosSlider,
    traerColecciones,
    traerContenidoCarrito
};