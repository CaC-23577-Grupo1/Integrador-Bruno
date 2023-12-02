/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const adminControllers = {
    admin: (req, res) => res.send('Ruta para la vista del Administrador de Items.'),
    create:(req, res) => res.send('Ruta para la vista Crear un nuevo Item.'),
    createAdd:(req, res) => res.send('Ruta para guardar el Item Creado.'),
    edit:(req, res) => res.send(`Ruta para la vista Editar un item dependiendo el ID especificado.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),
    editSave:(req, res) => res.send(`Ruta para guardar los datos del Item editado, tambien dependiendo el ID.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),
    delete:(req, res) => res.send(`Ruta para eliminar un Item. dependiendo el ID especificado.<br><br>En esta ruta han indicado el ID: ${req.params.id}`),
  };

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = adminControllers;