/* La responsabilidad de este archivo es unicamente atender la solicitud de la ruta, nada mas que ello (la logica que respondera en dicha ruta provendra de los controladores) */
/* Este archivo maneja las solicitudes de rutas, delegando la lógica de respuesta a los controladores. */

/* Requerimos la libreria "Express" para disponer de sus metodos */
const express = require('express');

/*  No debemos instanciar nuevamente express ya que se hace en "app.js" aqui solo utilizaremos sus metodos/funcionalidades
    ahora utilizamos el metodo "router" para definir rutas en forma separada de "app.js" */
const router = express.Router();

/* importamos nuestro objeto "maincontrollers" de la capa de controladores para tener disponible sus propiedades que serian las "funciones" */
const mainControllers = require('../controllers/mainControllers');

/* Definimos las rutas de "MAIN" */
router.get('/', mainControllers.indexpage);         // para la ruta "/" la respuesta sera la contenida en el objeto "mainControllers" en la propiedad "indexpage" y asi sucesivamente
router.get('/home', mainControllers.home);
router.get('/contact', mainControllers.contact);
router.post('/contact', mainControllers.contactSend);
router.get('/about', mainControllers.about);
router.get('/faqs', mainControllers.faqs);

/* exportamos el "enrrutador" que hemos creado para tenerlo disponible donde querramos importarlo */
module.exports = router;