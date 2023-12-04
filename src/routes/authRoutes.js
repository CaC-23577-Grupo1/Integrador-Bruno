/* La responsabilidad de este archivo es unicamente atender la solicitud de la ruta, nada mas que ello (la logica que respondera en dicha ruta provendra de los controladores) */
/* Este archivo maneja las solicitudes de rutas, delegando la lógica de respuesta a los controladores. */

/* Requerimos la libreria "Express" para disponer de sus metodos */
const express = require('express');

/*  No debemos instanciar nuevamente express ya que se hace en "app.js" aqui solo utilizaremos sus metodos/funcionalidades
    ahora utilizamos el metodo "router" para definir rutas en forma separada de "app.js" */
const router = express.Router();

/* importamos nuestro objeto "authControllers" de la capa de controladores para tener disponible sus propiedades que serian las "funciones" */
const authControllers = require('../controllers/authControllers');

/* Definimos las rutas de "AUTENTICACION" */
router.get('/login', authControllers.loginView);           // para la ruta "/auth/login" la respuesta sera la contenida en el objeto "authControllers" en la propiedad "loginView" y asi sucesivamente
router.post('/login', authControllers.loginSend);
router.get('/register', authControllers.registerView);
router.post('/register', authControllers.registerSend);
router.get('/logout', authControllers.logout);

/* exportamos el "enrrutador" que hemos creado para tenerlo disponible donde querramos importarlo */
module.exports = router;