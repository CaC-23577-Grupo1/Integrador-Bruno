/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const authControllers = {

    loginView: (req, res) => res.render('auth/login', {
      title: "Login | Funkoshop"
    }),

    loginSend:(req, res) => res.send('Ruta para la accion Iniciar Sesion.'),

    registerView:(req, res) => res.render('auth/register', {
      title: "Register | Funkoshop"
    }),

    registerSend:(req, res) => res.send('Ruta para la accion Registrarse'),

    logout:(req, res) => res.send('Ruta para la accion Cerrar Sesion'),
  };

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = authControllers;