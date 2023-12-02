// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {


    // Conjunto de elementos que simula ITEMS cargados al carrito
    const cartContent = [
        { cart_id: 1, prod_id: 1, prod_cant: 2},
        { cart_id: 2, prod_id: 7, prod_cant: 1},
        { cart_id: 3, prod_id: 10, prod_cant: 3}
    ]


     //  Creamos una funcion asincrona que sera la que leera los datos del JSON de Productos
    async function cargarDatosJSON() {

        // hacemos la solicitud  mediante FETCH para obtener los datos que contiene el archivo "products.json"
        const respuestaFetch = await fetch('../data/products.json');
        // utilizamos el metodo ".json" para extraer unicamente el BODY de dicha respuesta
        dataRespuestaLimpia = await respuestaFetch.json();
        // por ultimo, "entregamos" a quien invoco esta funcion los datos obtenidos
        return dataRespuestaLimpia;
        
        //(NOTA: al ser una funcion asincrona se utiliza el AWAIT para esperar a que se resuelva la promesa)
    };
    

    // Datos dinamicos utiles para el codigo
    let precioEnvio = 1500;
    let minimoEnvioGratis = 10000;


    // Creamos una constante para seleccionar el elemento del DOM que queremos manipular
    const cartList = document.querySelector('#cart_list');


    // Funcion para recorrer el ARRAY que contiene los productos en carrito y listarlos
    function listarCarrito(dataRespuestaJSON) {

        // Inicializamos el Template Vacio
        let templateListar = '';

        // Recorremos el Array por todos sus elementos
        cartContent.forEach(contenidoCarrito => {

            // recorremos el array con los datos "Provenientes de la BD" para almacenar en "datosProducto" los datos de aquel cuyo ID coincida con el del ID de los "Agregados en carrito"
            let datosProducto = dataRespuestaJSON.find(todosLosProductos => todosLosProductos.prod_id == contenidoCarrito.prod_id);

            // En cada elemento asignamos los datos y lo "sumamos" al template
            templateListar += `
                <li class="cart__item">
                    <article class="cart__item-product">
                        <picture class="cart__item-productimg">
                            <img src="../${datosProducto.prod_imagen_frontal}" alt="${datosProducto.prod_descripcion}">
                        </picture>
                        <div class="cart__item-productdet">
                            <h2 class="cart__item-productdet-name">${datosProducto.prod_nombre}</h2>
                            <h3 class="cart__item-productdet-categ">${datosProducto.prod_licencia}</h3>
                            <p class="cart__item-productdet-price">Precio: $ ${datosProducto.prod_precio}</p>
                        </div>
                    </article>
                    <div class="cart__item-q">
                        <input data-id="${contenidoCarrito.cart_id}" class="cart__item-qnum" type="text" id="quant${contenidoCarrito.cart_id}" value="${contenidoCarrito.prod_cant}">
                        <div class="cart__item-qplusminus">
                            <button data-id="${contenidoCarrito.cart_id}" id="plus" class="qplusminusbtn plus">+</button>
                            <button data-id="${contenidoCarrito.cart_id}" id="minus" class="qplusminusbtn minus">-</button>
                        </div>
                    </div>
                    <p class="cart__item-price" id="total${contenidoCarrito.cart_id}">$ ${(datosProducto.prod_precio * contenidoCarrito.prod_cant).toFixed(2)}</p>
                    <div>
                        <button data-id="${contenidoCarrito.cart_id}" class="deletebtn OutItem"><iconify-icon class="cart__item-delete" icon="zondicons:close-outline"></iconify-icon></button>
                        <button data-id="${contenidoCarrito.cart_id}" class="deletebtn InItem"><iconify-icon class="cart__item-delete" icon="zondicons:close-outline"></iconify-icon></button>
                    </div>
                </li>
                `
        });

        // Finalmente asignamos nuestro template al contenedor "cart_list"  
        cartList.innerHTML = templateListar;
    }


    // Funcion para actualizar el valor total del producto dependiendo de las cantidades que figuran
    function actualizaTotalProducto(idProducto, cantidadInput, dataRespuestaJSON) {                                             // Funcion que recibe 2 parametros, el identificador del producto y la cantidad que indica el Input Box
    const datosProducto = dataRespuestaJSON.find(todosLosProductos => todosLosProductos.prod_id === parseInt(idProducto));      // Buscamos si existe algun elemento en el array con el ID recibido como argumento  (parseint lo usamos para convertir el argumento recibido en numero, ya que el dato leido desde el DOM se recibe como cadena de texto)
    const totalElement = document.querySelector(`#total${idProducto}`);                                                         // Seleccionamos el contenedor que muestra el total del producto cuyo nombre se forma con el ID
        if (datosProducto) {                                                                                                    // si el elemento en el array existe (es decir, hay un producto con dicho ID)
            const totalPrice = datosProducto.prod_precio * cantidadInput;                                                       // multiplicamos el valor de "price" de dicho producto por la cantidad recibida como argumento
            totalElement.textContent = `$ ${totalPrice.toFixed(2)}`;                                                            // actualizamos el contenido del contenedor que muestr el total (toFixed(2) para mostrar 2 decimales en el numero)
        }
    }


    function actualizaTotalCarrito() {
        // Capturamos los 4 elementos contenedores donde se muestra la informacion
        
        const headerCantidad = document.querySelector(`#header-cantidad`);  // Icono en el header del carrito
        const resumenCantidad = document.querySelector(`#cantidad`);
        const resumenSubtotal = document.querySelector(`#subtotal`);
        const resumenEnvio = document.querySelector(`#envio`);
        const resumenTotal = document.querySelector(`#total`);

        // Cantidad de Elementos
        const sumamosInputs = document.querySelectorAll('.cart__item-qnum');        // Capturamos todos los inputs de cantidad para leer sus numeros
        let sumadorCantidad = 0;                                                    // inicializamos un sumador en 0
        sumamosInputs.forEach(inputCantidad => {                                    // recorremos todos los inputs capturados
            sumadorCantidad += parseInt(inputCantidad.value);                       // sumamos el valor de cada elemento en el "sumador" (parseInt convierte la cadena en numero)
        });

        // Subtotal
        const sumamosSubtotal = document.querySelectorAll('.cart__item-price');     // Capturamos todos los elementos que muestran el precio total del producto en funcion de la cantidad
        let sumadorSubtotal = 0;                                                    // inicializamos un sumador en 0
        sumamosSubtotal.forEach(elementoSumado => {                                 // recorremos todos los elementos capturados
            sumadorSubtotal += parseFloat(elementoSumado.textContent.replace(/[^0-9.]/g, ''));    // sumamos el valor de cada elemento en el "sumador"
                                // parseFloat convierte la cadena en un numero de coma flotante
                                // replace reemplaza todos los caracteres que no sean numeros ni el separador decimal por "nada", osea que borra cualquier otro caracter
        });

        // Total
        sumadorTotal = sumadorSubtotal + precioEnvio;                           // Calculamos el total sumando el subtotal + el envio
        if (sumadorTotal > minimoEnvioGratis + precioEnvio){                    // si el total supera el envio gratis entonces
            resumenEnvio.innerHTML = `<span class="EnvioGratis">$ ${precioEnvio.toFixed(2)}</span>`;     // en envio mostramos esto
            mostrarTotal = `$ ${sumadorSubtotal.toFixed(2)}`;                   // en total mostramos esto
        } else {                                                                // sino
            resumenEnvio.textContent = `$ ${precioEnvio.toFixed(2)}`;           // en envio mostramos esto
            mostrarTotal = `$ ${sumadorTotal.toFixed(2)}`;                      // en total mostramos esto
        }

        // Asignamos los valores a cada contenedor correspondiente
        headerCantidad.textContent = sumadorCantidad;   // Icono en el header del carrito
        resumenCantidad.textContent = sumadorCantidad; 
        resumenSubtotal.textContent = `$ ${sumadorSubtotal.toFixed(2)}`;
        resumenTotal.textContent = mostrarTotal;
    }


    // Funcion que altera el Array de muestra y elimina valores (simulamos funcionamiento boton delete)
    function funcionamientoDeleteBTN(dataRespuestaJSON) {

        const botonesDelete = document.querySelectorAll('.deletebtn');              // seleccionamos todos los elementos cuya clase sea "deletebtn"  (todos los botones tienen la misma clase)
        botonesDelete.forEach(elementoBoton => {                                    // recorremos todos los botones
            elementoBoton.addEventListener('click', function() {                    // "escuchamos" el evento "Click" en cualquiera de ellos
                const idProducto = this.dataset.id;                                 // almacenamos el ID del producto proveniente del atributo "data-id" en el boton clickeado
                const indiceDelArray = cartContent.findIndex(contenidoCarrito => contenidoCarrito.cart_id === idProducto);        // buscamos en que indice del array se almacena el producto con ese ID
                cartContent.splice(indiceDelArray, 1);                               // hacemos un SPLICE al array al elemento en el indice correspondiente y solo de 1 elemento
                    listarCarrito(dataRespuestaJSON);                                // reinvocamos para que se regenere la lista de productos
                    actualizaTotalCarrito(dataRespuestaJSON);                        // reinvocamos para que se calcule el total de "RESUMEN"
                    funcionamientoDeleteBTN(dataRespuestaJSON);                      // reinvocamos para que siga disponible el funcionamiento "delete"
            });
        });
    
    };



    // Esta es la funcion principal, la que inicia y hace que todo aparezca y se ejecute llamando a otras funciones en caso de ser necesario
    async function inicializarModuloCarrito() {


        try {

            // Ejecutamos la funcion para traer los datos del JSON con el AWAIT para esperar que nos llegue toda la info de esa funcion
            const dataRespuestaJSON = await cargarDatosJSON();

            // Invocamos la funcion para listar los items del carrito
            listarCarrito(dataRespuestaJSON);

            // Por ultimo invocamos la funcion para que trabajen los botones de "delete"
            funcionamientoDeleteBTN(dataRespuestaJSON);

            // Paso seguido invocamos a la funcion para que calcule los valores del Total del Carrito
            actualizaTotalCarrito();
            
            // Capturamos todos los inputs de cantidad existentes para "escuchar" el evento "change" de cualquiera de ellos
            const inputsDeCantidad = document.querySelectorAll('.cart__item-qnum');   // Seleccionamos todos los inputs de cantidad con su clase en comun que es "cart__item-qnum"
            inputsDeCantidad.forEach(elementoInput => {                               // mediante un ForEach recorremos cada uno de esos inputs
                elementoInput.addEventListener('change', function() {                 // aqui estamos "escuchando" cualquier "change" que ocurra en cualquiera de ellos y reaccionaremos ante ello
                    if (isNaN(this.value) || this.value < 0) {                        // si el valor del input no es numero O es menor a cero
                        this.value = 0;                                               // el valor del input se establece en cero
                    } 
                    actualizaTotalProducto(this.dataset.id, this.value, dataRespuestaJSON);              // llamamos a la funcion para actualizar el total pasando como parametro al atributo "data-id" para identificar cual de los inputs fue el que tuvo el "change" y ademas pasamos el valor de dicho input
                    actualizaTotalCarrito()
                });
            });


            // Aqui estaremos "escuchando" cualquier click que se haga dentro del contenedor cuyo DOM sea el de "cartList" que como mas arriba definimos es el contenedor "cart_list"
            cartList.addEventListener('click', function(event) {
                
                // Aqui almacenaremos cual fue el "target" de dicho click, que elemento fue "clickeado"
                const elementoClickeado = event.target;
                
                if (elementoClickeado.classList.contains('plus')) {                          // SI el TARGET clickado tiene la clase "plus" entonces...
                    const idProducto = elementoClickeado.dataset.id;                         // almacenamos el ID del producto proveniente del atributo "data-id"
                    const cantidadInput = document.querySelector(`#quant${idProducto}`);     // seleccionamos el input cuya nombre de clase corresponda al ID del boton clickeado
                    cantidadInput.value = Number(cantidadInput.value) + 1;                   // sumamos 1 al valor de dicho input
                    actualizaTotalProducto(parseInt(idProducto), parseInt(cantidadInput.value), dataRespuestaJSON);       // llamamos a la funcion para actualizar el total pasando como parametro al atributo "data-id" para identificar en cual de los inputs fue clickeado el boton, por ende cambio su valor y ademas pasamos el valor de dicho input
                    actualizaTotalCarrito()
                           
                } else if (elementoClickeado.classList.contains('minus')) {                  // SI el TARGET clickado tiene la clase "minus" entonces...
                    const idProducto = elementoClickeado.dataset.id;                         // almacenamos el ID del producto proveniente del atributo "data-id"
                    const cantidadInput = document.querySelector(`#quant${idProducto}`);     // seleccionamos el input cuya nombre de clase corresponda al ID del boton clickeado
                    if (cantidadInput.value > 0) {                                           // si el valor del input es mayor a CERO
                        cantidadInput.value = Number(cantidadInput.value) - 1;               // restamos 1 al valor de dicho input
                        actualizaTotalProducto(parseInt(idProducto), parseInt(cantidadInput.value), dataRespuestaJSON);   // llamamos a la funcion para actualizar el total pasando como parametro al atributo "data-id" para identificar en cual de los inputs fue clickeado el boton, por ende cambio su valor y ademas pasamos el valor de dicho input
                        actualizaTotalCarrito()
                    }
                }
            });

        } catch (error) {

        };

    }




    // Invocamos la funcion para que todo se ejecute, es decir, "el modulo del carrito"
    inicializarModuloCarrito();




});








