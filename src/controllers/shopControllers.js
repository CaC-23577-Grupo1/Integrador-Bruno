/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

const { traerTodosLosProductos, traerUnSoloProducto, traerProductosSlider, traerContenidoCarrito } = require('../models/itemsModel');
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
  
  
  
  cart: async (req, res) => {
    
    const contenidoCarrito = await traerContenidoCarrito();
    const todosLosProductos = await traerTodosLosProductos();
   
    const detalleProductosEnCarrito = contenidoCarrito.map(itemDelCarrito => {    // Hacemos un MAP para recorrer cada ITEM que existe en el carrito y a cada ITEM aplicarle una funcion
      
        // La funcion nos permitira recorrer todos los productos buscando aquel cuyo ID coincida con el ID proveniente del ITEM que estamos analizando con el MAP
        const detalleProductoEncontrado = todosLosProductos.find(producto => producto.prod_id === itemDelCarrito.cart_prod_id);
        
        if (detalleProductoEncontrado) {  // Si el FIND encontro un producto cuyo ID coincide con el ID del item que estamos recorriendo del contenido carrito
          return {                        // usamos "spread syntax" (sintaxis de propagación) para retornar la union de 2 objetos
            ...itemDelCarrito,            // el primero que contendra las propiedades del ITEM que estamos recorriendo en "contenidoCarrito"
            ...detalleProductoEncontrado  // y el segundo que contendra las propiedades del Producto cuyo ID coincidio en FIND con el Item de "contenidoCarrito"
          };
        } else {
          return null;  // Si el FIND no encontro coincidencias retornaremos un NULL para evitar que el UNDEFINED nos cause problemas en el MAP
        }

    });

    const dataParaListarCarrito = detalleProductosEnCarrito.filter(Boolean); // Aplicamos este metodo filter para quitar el elemento de valor NULL del array
    
    //console.log(dataParaListarCarrito);

    res.render('./shop/cart', {
      title: "Carrito | Funkoshop",
      dataParaListarCarrito
    })
  },

  

  payment: (req, res) => res.send('Ruta para ir a la parte de pagos del Carrito'),

};

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = shopControllers;
