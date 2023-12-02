/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const shopControllers = {
    shop: (req, res ) => res.send('Ruta para la vista Shop'),
    item: (req, res ) => res.send(`Ruta para la vista de un Item dependiendo el ID especificado.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),
    itemAdd: (req, res ) => res.send(`Ruta para agregar un Item al Carrito dependiendo el ID especificado.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),
    cart: (req, res ) => res.send('Ruta para la vista Carrito'),
    payment: (req, res ) => res.send('Ruta para ir a la parte de pagos del Carrito'),
  };

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = shopControllers;
