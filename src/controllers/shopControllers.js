/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

const path = require('path');

const { traerTodosLosProductos, traerUnSoloProducto, traerProductosSlider } = require('../models/itemsModel');
//const { param } = require('../routes/mainRoutes');      //  No recuerdo haber escrito esta linea, ni veo que este utiliazada, ni tampoco tiene sentido aqui dentro
//const { log } = require('console');                     //  Mucho menos recuerdo haber escrito esta linea (habra sido en alguno de los intentos de auto escribir "console.log")


/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const shopControllers = {



  // Definimos la "funcion" que cumplira el controlador de la ruta SHOP como asincrona ya que debemos aguardar recibir datos desde el JSON mediante el Modelo
  // aqui traeremos todos los productos y los enviaremos a la vista
  shop: async (req, res) => {

    const dataRecibida = await traerTodosLosProductos();  // invocamos la "funcion" que hemos definido dentro del modelo para taer todos los productos que hay en el JSON
    
    res.render('./shop/shop', {
      title: "Shop | Funkoshop",
      dataRecibida
    });
  },


  
   // Definimos la "funcion" que cumplira el controlador de la ruta items como asincrona ya que debemos aguardar recibir datos desde el JSON mediante el Modelo
   // aqui traeremos un solo producto y lo enviaremos a la vista
   item: async (req, res) => {
     
    const dataRecibidaItem = await traerUnSoloProducto(req.params.id);    // invocamos la "funcion" definida en el modelo pasandole como argumento el ID del Path Params que nos entrega la ruta
    const dataRecibidaSlider = await traerProductosSlider();


    res.render('./shop/item',
      {
        title: "Item | Funkoshop",
        dataRecibidaItem,
        dataRecibidaSlider
      });
  },



  itemAdd: (req, res) => res.send(`Ruta para agregar un Item al Carrito dependiendo el ID especificado.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),



  cart: (req, res) => res.render('./shop/cart', {
    title: "Carrito | Funkoshop"
  }),

  

  payment: (req, res) => res.send('Ruta para ir a la parte de pagos del Carrito'),

};

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = shopControllers;
