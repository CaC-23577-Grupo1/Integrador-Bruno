/* La responsabilidad de este archivo es unicamente atender la solicitud de la ruta, nada mas que ello (la logica que respondera en dicha ruta provendra de los controladores) */
/* Este archivo maneja las solicitudes de rutas, delegando la lógica de respuesta a los controladores. */

/* Requerimos la libreria "Express" para disponer de sus metodos */
const express = require('express');

/*  No debemos instanciar nuevamente express ya que se hace en "app.js" aqui solo utilizaremos sus metodos/funcionalidades
    ahora utilizamos el metodo "router" para definir rutas en forma separada de "app.js" */
const router = express.Router();

/* importamos nuestro objeto "errorControllers" de la capa de controladores para tener disponible sus propiedades que serian las "funciones" */
const errorControllers = require('../controllers/errorControllers');

/* Definimos las rutas de "ERRORES" */
router.use(errorControllers.error404);      // Esto me salio mirando la clase 29 de Pablo, pero no logro comprender del todo como logra funciona (uni lo de pablo con lo demas que ya tenia, para respetar la separacion em capas)

/* exportamos el "enrrutador" que hemos creado para tenerlo disponible donde querramos importarlo */
module.exports = router;