/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

const { traerTodosLosProductos, traerUnSoloProducto } = require('../models/itemsModel');

/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const adminControllers = {


    admin: async (req, res) => {

      const listaDeProductos = await traerTodosLosProductos();

      res.render('./admin/admin', {
        title: "Admin | Funkoshop",
        listaDeProductos
      });
    },
      


    create:(req, res) => res.render('./admin/create', {
      title: "Create | Funkoshop"
    }),



    createAdd:(req, res) => res.send('Ruta para guardar el Item Creado.'),



    edit: async (req, res) => {

      const dataProductoEditando = await traerUnSoloProducto(req.params.id);
      
      res.render('admin/edit', {
        title: "Edit | Funkoshop",
        dataProductoEditando
      });
    },



    editSave:(req, res) => res.send(`Ruta para guardar los datos del Item editado, tambien dependiendo el ID.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),



    delete:(req, res) => res.send(`Ruta para eliminar un Item. dependiendo el ID especificado.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),
    


  };

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = adminControllers;