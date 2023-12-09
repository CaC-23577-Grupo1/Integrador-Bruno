/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */



const { traerColecciones, traerProductosSlider } = require('../models/itemsModel');




/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const mainControllers = {
  

    indexpage: (req, res) => res.redirect('/home'),



    home: async (req, res) => {

      const dataRecibidaColecciones = await traerColecciones();
      const dataRecibidaSlider = await traerProductosSlider();

      res.render('shop/home', { 
        title: "Home | Funkoshop",
        dataRecibidaColecciones,
        dataRecibidaSlider
      });
    },



    contact: (req, res) => {

      res.render('contact',
      {
       title: "Contacto | Funkoshop" 
      });
    },



    contactSend: (req, res) => {

      const messageTitle = "Información";
      const messageDescript = `El usuario ha presionado el Boton "Enviar" en el formulario de contacto \nDicha accion genero una consulta HTTP mediante el metodo POST.`;
      const messageData = `Data Recibida en el Body del POST: \n${JSON.stringify(req.body, null, 4)}`;

      res.render('messages',
      {
        title: "Producto Guardado | Funkoshop",
        messageTitle,
        messageDescript,
        messageData
      });
    },



    about: (req, res) => res.send('Ruta para la vista Sobre Nosotros.'),



    faqs: (req, res) => res.send('Ruta para la vista FAQs.'),



  };

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = mainControllers;