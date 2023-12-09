/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

const { traerTodosLosProductos, traerUnSoloProducto, traerProductosFiltrados } = require('../models/itemsModel');

/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const adminControllers = {


    admin: async (req, res) => {

      let listaDeProductos = ''     // creamos la variable para tenerla disponible fuera del Scope del condicional

          if (Object.keys(req.query).length > 0) {                                      // Si el objeto tiene mas de 0 propiedades (es decir, recibimos "query params")
              listaDeProductos = await traerProductosFiltrados(req.query.buscar);       // enviaremos el valor de la query param a la funcion que nos filtrara los datos
          } else {                                                                      // sino
              listaDeProductos = await traerTodosLosProductos();                        // pediremos todos los datos sin filtrar (todos los productos)
          }

      res.render('./admin/admin', {
        title: "Admin | Funkoshop",
        listaDeProductos
      });

    },
      


    create:(req, res) => res.render('./admin/create', {
      title: "Create | Funkoshop"
    }),



    createAdd:(req, res) => {

      const messageTitle = "Información";
      const messageDescript = `El usuario ha presionado el Boton "Agregar Producto" para guardar el nuevo producto creado \nDicha accion genero una consulta HTTP mediante el metodo POST.`;
      const messageData = `Data Recibida en el Body del POST: \n${JSON.stringify(req.body, null, 4)}`;

      res.render('messages',
      {
        title: "Producto Creado | Funkoshop",
        messageTitle,
        messageDescript,
        messageData
      });
    },



    edit: async (req, res) => {

      const dataProductoEditando = await traerUnSoloProducto(req.params.id);
      
      res.render('admin/edit', {
        title: "Edit | Funkoshop",
        dataProductoEditando
      });
    },



    editSave:(req, res) => {
      
      const messageTitle = "Información";
      const messageDescript = `El usuario ha presionado el Boton "Modificar Producto" para guardar los cambios en el producto editado \nDicha accion genero una consulta HTTP mediante el metodo POST. \nUtilizando el middleware "method-override" sobreescribiremos el metodo de POST a PUT.`;
      const messageData = `Dato recibido en el Path Param: ${req.params.id} (ID del producto) \nData Recibida en el Body del POST: \n${JSON.stringify(req.body, null, 4)}`;

      res.render('messages',
      {
        title: "Producto Guardado | Funkoshop",
        messageTitle,
        messageDescript,
        messageData
      });
    },



    delete: (req, res) => {

      const messageTitle = "Información";
      const messageDescript = `El usuario ha presionado el boton Eliminar en la vista Admin, generando asi una consulta HTTP bajo el Metodo POST. \n Utilizando el middleware "method-override" sobreescribiremos el metodo de POST a DELETE.`;
      messageData = `Mediante el Path Param, obtenemos el ID del Producto al cual debemos aplicarle el metodo DELETE \n En este caso el ID ${req.params.id}`;
      
      res.render('messages',
      {
        title: "Eliminar Item | Funkoshop",
        messageTitle,
        messageDescript,
        messageData
      });
    },
    


  };

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = adminControllers;