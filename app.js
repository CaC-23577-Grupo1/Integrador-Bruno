/* La responsabilidad de este archivo es establecer la configuracion del Servidor */

/* Requerimos la libreria "Express" para poder instanciarla y utilizar sus metodos */
const express = require('express');

/* Ahora ejecutamos express creando una Instancia, estamos "levantando el servidor" y ahora podremos utilizar sus metodos */
const app = express();

/* requerimos el metodo path para resolver las rutas */
const path = require('path');

/* requerimos el middleware para poder usar los metodos PUT y DELETE pasados mediante post */
const methodOverride = require('method-override');

/* Requerimos la dependencia "Dotenv" para poder sacar los datos sensibles de los archivos */
require('dotenv').config();


/* requerimos nuestro "paquete creado por nosotros" en el archivo tal y lo asignamos a determinada variable */
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorRoutes = require('./src/routes/errorRoutes');

/* definimos el puerto que escucharemos y en donde se ejecutara el sevidor */
const PORT = process.env.SERVERPORT || process.env.AUXSERVERPORT;

// /* Template Engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

/* Middlewares de Configuracion */
app.use(express.urlencoded());              // parseamos los datos para nuestro JS pueda comprender los datos recibidos en el body
app.use(express.json());                    // parseamos los datos para nuestro JS pueda comprender los datos recibidos en el body
app.use(methodOverride('_method'));         // configuramos el metodo override para el uso de los metodos PUT y DELETE

app.use(express.static('public'));          // definimos una carpeta de archivos que seran "levantados" para ser mostrados por el server


/* Middlewares de Rutas  */
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);


/* Rutas de Error */
app.use(errorRoutes);

/* utilizamos el metodo "listen" para escuchar el puerto y en base a la ruta dar respuesta */
app.listen(PORT, () => console.log(`Servidor corriendo en: http://localhost:${PORT}`));