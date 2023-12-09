/* La responsabilidad de esta capa (Controladores) es "contener" la logica para dar respuesta a la capa de las Rutas */
/* en otras palabras, en esta capa se ubicara toda la logica (funciones, codigo) para dar la respuesta a la capa de rutas */

const { traerTodosLosProductos, traerProductosFiltradosShop, traerUnSoloProducto, traerProductosSlider, traerContenidoCarrito } = require('../models/itemsModel');
//const { param } = require('../routes/mainRoutes');      //  No recuerdo haber escrito esta linea, ni veo que este utiliazada, ni tampoco tiene sentido aqui dentro
//const { log } = require('console');                     //  Mucho menos recuerdo haber escrito esta linea (habra sido en alguno de los intentos de auto escribir "console.log")


/* creamos un objeto que contendra diferentes propiedades y cada una de ellas sera una "funcion" para dar logica de respuesta a cada ruta */
const shopControllers = {



  // Definimos la "funcion" que cumplira el controlador de la ruta SHOP como asincrona ya que debemos aguardar recibir datos desde el JSON mediante el Modelo
  // aqui traeremos todos los productos y los enviaremos a la vista
  shop: async (req, res) => {

    /* INICIO MODO 1   (no lo veo practico porque repite codigo, hace lo mismo aqui como en el modelo)*/
    /*
        // Funcion para obtener el nombre del query param que recibimos en el "req.query"
        function obtenerNombre(objeto) {
          for (let nombre in objeto) {
            return nombre;
          }
        }

        const nombreQueryParam = obtenerNombre(req.query);   // llamando a la funcion podemos saber el nombre del parametro recibido
        const valorQueryParam = req.query[nombreQueryParam];

        let dataRecibida = "";

        switch (nombreQueryParam) {
          
          case "newProducts":
            //console.log('Mostramos los productos nuevos');
            dataRecibida = await traerProductosFiltradosShop("newProducts", null);
            break;
          
          case "license":
            //console.log('Mostramos los de la coleccion');
            dataRecibida = await traerProductosFiltradosShop(nombreQueryParam, valorQueryParam);
            break;
            
          case "buscar":
            console.log('Mostramos segun buscador');
            dataRecibida = await traerProductosFiltradosShop(nombreQueryParam, valorQueryParam);
            break;

          default:
            console.log('Mostramos Todos los productos');
            dataRecibida = await traerTodosLosProductos();  // invocamos la "funcion" que hemos definido dentro del modelo para taer todos los productos que hay en el JSON
            break;
        }
    */
    /* FIN MODO 1 */

    /* INICIO MODO 2   (me parece mejor esta forma ya que extraermos la query param con su valor y de lo pasamos al modelo para que nos devuelva la dara*/

    let dataRecibida = ''     // creamos la variable para tenerla disponible fuera del Scope del condicional

    if (Object.keys(req.query).length > 0) {    // Si el objeto tiene mas de 0 propiedades (es decir, recibimos "query params") se ejecutara esta parte del codigo

            // Funcion para obtener el nombre del query param que recibimos en el "req.query"
            function obtenerNombre(objeto) {
              for (let nombre in objeto) {
                return nombre;
              }
            }

            const nombreQueryParam = obtenerNombre(req.query);    // llamando a la funcion podemos saber el nombre del parametro recibido
            const valorQueryParam = req.query[nombreQueryParam];  // con el nombre del parametro obtenemos cual es su valor

            dataRecibida = await traerProductosFiltradosShop(nombreQueryParam, valorQueryParam);  // pedimos productos filtrados pasando de argumento nombre y valor del query param
    
    } else {                                                                                      // sino (es decir si no recibimos query params)
    
            dataRecibida = await traerTodosLosProductos();                                        // pedimos todos los datos sin filtrar (todos los productos)
    
    }

    /* FIN MODO 2 */

    res.render('./shop/shop', {
      title: "Shop | Funkoshop",
      dataRecibida
    });
  },


  
   // Definimos la "funcion" que cumplira el controlador de la ruta items como asincrona ya que debemos aguardar recibir datos desde el JSON mediante el Modelo
   // aqui traeremos un solo producto y lo enviaremos a la vista
   item: async (req, res) => {
     
    const dataRecibidaItem = await traerUnSoloProducto(req.params.id);    // invocamos la "funcion" definida en el modelo pasandole como argumento el ID del Path Params que nos entrega la ruta
    const dataRecibidaSlider = await traerProductosSlider();


    res.render('./shop/item',
      {
        title: "Item | Funkoshop",
        dataRecibidaItem,
        dataRecibidaSlider
      });
  },


  // Definimos la "funcion" que cumplira el controlador al responder a la ruta mediante el metodo POST de agregar un Item
  itemAdd: (req, res) => {

    const idProducto = req.params.id;     // Capturamos el path param que viene en la URL que nos identifica el ID del items a agregar
    const cantItems = req.body.quantity;  // Capturamos el valor que viene en el Body del POST que nos indica la cantidad de items a agregar

    // Generamos 3 constantes con informacion para responder ya que no podemos grabarlo en ninguna BD
    const messageTitle = "Información:";
    const messageDescript = `El usuario presiono el boton "Agregar al Carrito" ejecutando una solicitud HTTP bajo el metodo POST a la ruta "/shop/item/:id/add" la cual ejecuta la accion de agregar un Item al Carrito.`;
    const messageData = `Data enviada en el Body del POST: \n    ${cantItems} (Valor del Input que indica la cantidad de Items) \n    ${idProducto} (Valor del Query Param que indentifica el Producto)`;

    res.render('messages',
    { 
      title: "Item | Funkoshop",
      messageTitle,       // Enviamos las 3 variables a un render para mostrar la data que viajo por el Body del POST
      messageDescript,
      messageData
    });
  },
  
  
  
  cart: async (req, res) => {
    
    const contenidoCarrito = await traerContenidoCarrito();
    const todosLosProductos = await traerTodosLosProductos();
   
    const detalleProductosEnCarrito = contenidoCarrito.map(itemDelCarrito => {    // Hacemos un MAP para recorrer cada ITEM que existe en el carrito y a cada ITEM aplicarle una funcion
      
        // La funcion nos permitira recorrer todos los productos buscando aquel cuyo ID coincida con el ID proveniente del ITEM que estamos analizando con el MAP
        const detalleProductoEncontrado = todosLosProductos.find(producto => producto.prod_id === itemDelCarrito.cart_prod_id);
        
        if (detalleProductoEncontrado) {  // Si el FIND encontro un producto cuyo ID coincide con el ID del item que estamos recorriendo del contenido carrito
          return {                        // usamos "spread syntax" (sintaxis de propagación) para retornar la union de 2 objetos
            ...itemDelCarrito,            // el primero que contendra las propiedades del ITEM que estamos recorriendo en "contenidoCarrito"
            ...detalleProductoEncontrado  // y el segundo que contendra las propiedades del Producto cuyo ID coincidio en FIND con el Item de "contenidoCarrito"
          };
        } else {
          return null;  // Si el FIND no encontro coincidencias retornaremos un NULL para evitar que el UNDEFINED nos cause problemas en el MAP
        }

    });

    const dataParaListarCarrito = detalleProductosEnCarrito.filter(Boolean); // Aplicamos este metodo filter para quitar el elemento de valor NULL del array
    
    //console.log(dataParaListarCarrito);

    res.render('./shop/cart', {
      title: "Carrito | Funkoshop",
      dataParaListarCarrito
    })
  },

  

  payment: (req, res) => {
   
    const messageTitle = "Información:";
    const messageDescript = `El usuario presiono el boton "IR A PAGAR" ejecutando una solicitud HTTP bajo el metodo POST a la ruta "/shop/cart" la cual ejecuta la accion de ir a la plataforma de pagos.`;
    const messageData = `Data recibida en el Body del POST: \n ${JSON.stringify(req.body, null, 4)}`;

    res.render('messages',
    {
      title: "Pago | Funkoshop",
      messageTitle,       // Enviamos las 3 variables a un render para mostrar la data que viajo por el Body del POST
      messageDescript,
      messageData
    });
  },

};

/* exportamos el objeto con todas sus propiedades que serian las "funciones" */
module.exports = shopControllers;
