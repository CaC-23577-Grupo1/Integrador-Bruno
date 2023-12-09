/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const errorControllers = {
    error404: (req, res) => {

      const messageTitle = "Error 404!";
      const messageDescript = "La ruta especificada No Existe.";
      const messageData = "";

      res.status(404).render('messages',
      {
        title: "Error | Funkoshop",
        messageTitle,
        messageDescript,
        messageData
      }
      )}

  };

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = errorControllers;