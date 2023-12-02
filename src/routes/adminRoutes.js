/* La responsabilidad de este archivo es unicamente atender la solicitud de la ruta, nada mas que ello (la logica que respondera en dicha ruta provendra de los controladores) */
/* Este archivo maneja las solicitudes de rutas, delegando la lógica de respuesta a los controladores. */

/* Requerimos la libreria "Express" para disponer de sus metodos */
const express = require('express');

/*  No debemos instanciar nuevamente express ya que se hace en "app.js" aqui solo utilizaremos sus metodos/funcionalidades
    ahora utilizamos el metodo "router" para definir rutas en forma separada de "app.js" */
const router = express.Router();

/* importamos nuestro objeto "adminControllers" de la capa de controladores para tener disponible sus propiedades que serian las "funciones" */
const adminControllers = require('../controllers/adminControllers');

/* Definimos las rutas de "ADMIN" */
router.get('/admin', adminControllers.admin);               // para la ruta "/admin" la respuesta sera la contenida en el objeto "adminControllers" en la propiedad "admin" y asi sucesivamente
router.get('/admin/create', adminControllers.create);
router.post('/admin/create', adminControllers.createAdd);
router.get('/admin/edit/:id', adminControllers.edit);
router.put('/admin/edit/:id', adminControllers.editSave);
router.delete('/admin/delete/:id', adminControllers.delete);

/* exportamos el "enrrutador" que hemos creado para tenerlo disponible donde querramos importarlo */
module.exports = router;