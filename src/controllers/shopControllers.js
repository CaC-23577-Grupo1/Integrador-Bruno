/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

const path = require('path');

const { traerTodosLosProductos } = require('../models/itemsModel');
const { param } = require('../routes/mainRoutes');


/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const shopControllers = {



  shop: (req, res) => res.render('./shop/shop', {
    title: "Shop | Funkoshop"
  }),



  // Definimos la "funcion" que cumplira el controlador de la ruta items en funcion asincrona ya que debemos aguardar recibir datos desde el JSON mediante el Modelo
  item: async (req, res) => {

    const { id } = req.params;  // Guardamos en una variable el ID recibido por la ruta
    const dataRecibida = await traerTodosLosProductos();  // Recibimos un array  con la data recibida desde el Modelo proveniente del JSON y lo guardamos en "dataRecibida"
    const posicionArray = dataRecibida.findIndex(productosRecibidos => productosRecibidos.prod_id == id); // Identificamos el Inidice del array que contiene el Producto que buscamos segun la ID
    const dataParaVista = [dataRecibida[posicionArray]];  // Aislamos la data de ese solo elemento del array que nos interesa, ademas lo encerramos en corchetes para que sea un array y poder enviarlo a la vista como array

    //  NOTA:  Ahora falta el manejo de errores para cuando un ID no existe, mensaje de error y todo ello                <--------------------------------------------------------

    //  NOTA EXTRA:   este metodo si bien es funcional, luego de ver las clases 26 y 27 de la comision 23567 he descubierto que no es el mas practico, por lo cual procedere ahora a modificar el codigo
    //                para obtener en la capa modelos diferentes "funciones" que podremos llamar y nos devolveran la data completa o filtrada dependiendo a que "funcion" llamemos.

    res.render('./shop/item',
      {
        title: "Item | Funkoshop",
        dataParaVista
      })
  },



  itemAdd: (req, res) => res.send(`Ruta para agregar un Item al Carrito dependiendo el ID especificado.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),



  cart: (req, res) => res.render('./shop/cart', {
    title: "Carrito | Funkoshop"
  }),

  

  payment: (req, res) => res.send('Ruta para ir a la parte de pagos del Carrito'),

};

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = shopControllers;
