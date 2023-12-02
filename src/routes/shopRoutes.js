/* La responsabilidad de este archivo es unicamente atender la solicitud de la ruta, nada mas que ello (la logica que respondera en dicha ruta provendra de los controladores) */
/* Este archivo maneja las solicitudes de rutas, delegando la lógica de respuesta a los controladores. */

/* Requerimos la libreria "Express" para disponer de sus metodos */
const express = require('express');

/*  No debemos instanciar nuevamente express ya que se hace en "app.js" aqui solo utilizaremos sus metodos/funcionalidades
    ahora utilizamos el metodo "router" para definir rutas en forma separada de "app.js" */
const router = express.Router();

/* importamos nuestro objeto "shopControllers" de la capa de controladores para tener disponible sus propiedades que serian las "funciones" */
const shopControllers = require('../controllers/shopControllers');

/* Definimos las rutas de "SHOP" */
router.get('/shop', shopControllers.shop);                  // para la ruta "/shop" la respuesta sera la contenida en el objeto "shopControllers" en la propiedad "shop" y asi sucesivamente
router.get('/shop/item/:id', shopControllers.item);
router.post('/shop/item/:id/add', shopControllers.itemAdd);
router.get('/shop/cart', shopControllers.cart);
router.post('/shop/cart', shopControllers.payment);

/* exportamos el "enrrutador" que hemos creado para tenerlo disponible donde querramos importarlo */
module.exports = router;