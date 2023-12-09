/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const authControllers = {


    loginView: (req, res) => res.render('auth/login', {
      title: "Login | Funkoshop"
    }),



    loginSend: (req, res) => {
      
      bdEmail = "cac23577-grupo1@gmail.com";
      bdPassword = "pass123";

      let loginResultStatus = "";
      let loginResultMessage = "";

      if (req.body.user == bdEmail){
          if (req.body.password == bdPassword) {
            loginResultMessage = "Login Exitoso";
            loginResultStatus = true;
          } else {
            loginResultMessage = "Datos Incorrectos, por favor Verifique.";
            loginResultStatus = false;
          }
        } else {
          loginResultMessage = "Su usuario no existe, Por favor Registrese";
          loginResultStatus = false;
      };

      res.render('auth/loginresult',
      {
        title: "Login | Funkoshop",
        loginResultTitle: "LOGIN",
        loginResultMessage,
        loginResultStatus
      });
    },


    
    registerView: (req, res) => res.render('auth/register', {
      title: "Register | Funkoshop"
    }),



    registerSend: (req, res) => {

      const messageTitle = "Información";
      const messageDescript = `El usuario ha completado el formulario de registro y presionado el boton "Registrar" \n Ejecutando de esta manera una consulta HTTP del tipo POST con el siguiente contenido en el Body`;
      const messageData = `Data recibida en el Body del POST: \n ${JSON.stringify(req.body, null, 4)}`;

      res.render('messages',
      {
        title: "Registro Completo | Funkoshop",
        messageTitle,
        messageDescript,
        messageData
      });
    },



    logout: (req, res) => res.redirect('/home'),



  };

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = authControllers;