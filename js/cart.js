// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {

    // Array de muestra para generar el contenido
    const dataBD = [
        { id: 1, name: 'BABY YODA BLUEBALL', category: 'STAR WARS', price: 1799.99, image: 'star-wars/baby-yoda-1.webp', quantity: 2 },
        { id: 2, name: 'PIDGEOTTO', category: 'POKEMON', price: 1799.99, image: 'pokemon/pidgeotto-1.webp', quantity: 1 },
        { id: 3, name: 'HARRY', category: 'HARRY POTTER', price: 1799.99, image: 'harry-potter/harry-1.webp', quantity: 3 }
    ];
    

    // Datos dinamicos utiles para el codigo
    let precioEnvio = 1500;
    let minimoEnvioGratis = 10000;


    // Creamos una constante para seleccionar el elemento del DOM que queremos manipular
    const cartList = document.querySelector('#cart_list');


    // Funcion para recorrer el ARRAY que contiene los productos en carrito y listarlos
    function listarCarrito() {

        // Inicializamos el Template Vacio
        let templateListar = '';

        // Recorremos el Array por todos sus elementos
        dataBD.forEach(elementoDelArray => {

            // En cada elemento asignamos los datos y lo "sumamos" al template
            templateListar += `
                <li class="cart__item">
                    <article class="cart__item-product">
                        <picture class="cart__item-productimg">
                            <img src="../images/${elementoDelArray.image}" alt="Producto Baby Yoda Blueball">
                        </picture>
                        <div class="cart__item-productdet">
                            <h2 class="cart__item-productdet-name">${elementoDelArray.name}</h2>
                            <h3 class="cart__item-productdet-categ">${elementoDelArray.category}</h3>
                            <p class="cart__item-productdet-price">Precio: $ ${elementoDelArray.price}</p>
                        </div>
                    </article>
                    <div class="cart__item-q">
                        <input data-id="${elementoDelArray.id}" class="cart__item-qnum" type="text" id="quant${elementoDelArray.id}" value="${elementoDelArray.quantity}">
                        <div class="cart__item-qplusminus">
                            <button data-id="${elementoDelArray.id}" id="plus" class="qplusminusbtn plus">+</button>
                            <button data-id="${elementoDelArray.id}" id="minus" class="qplusminusbtn minus">-</button>
                        </div>
                    </div>
                    <p class="cart__item-price" id="total${elementoDelArray.id}">$ ${(elementoDelArray.price * elementoDelArray.quantity).toFixed(2)}</p>
                    <div>
                        <button data-id="${elementoDelArray.id}" class="deletebtn OutItem"><iconify-icon class="cart__item-delete" icon="zondicons:close-outline"></iconify-icon></button>
                        <button data-id="${elementoDelArray.id}" class="deletebtn InItem"><iconify-icon class="cart__item-delete" icon="zondicons:close-outline"></iconify-icon></button>
                    </div>
                </li>
                `
        });

        // Finalmente asignamos nuestro template al contenedor "cart_list"  
        cartList.innerHTML = templateListar;
    }


    // Funcion para actualizar el valor total del producto dependiendo de las cantidades que figuran
    function actualizaTotalProducto(idProducto, cantidadInput) {                                        // Funcion que recibe 2 parametros, el identificador del producto y la cantidad que indica el Input Box
    const producto = dataBD.find(elementoDelArray => elementoDelArray.id === parseInt(idProducto));     // Buscamos si existe algun elemento en el array con el ID recibido como argumento  (parseint lo usamos para convertir el argumento recibido en numero, ya que el dato leido desde el DOM se recibe como cadena de texto)
    const totalElement = document.querySelector(`#total${idProducto}`);                                 // Seleccionamos el contenedor que muestra el total del producto cuyo nombre se forma con el ID
        if (producto) {                                                                                 // si el elemento en el array existe (es decir, hay un producto con dicho ID)
            const totalPrice = producto.price * cantidadInput;                                          // multiplicamos el valor de "price" de dicho producto por la cantidad recibida como argumento
            totalElement.textContent = `$ ${totalPrice.toFixed(2)}`;                                    // actualizamos el contenido del contenedor que muestr el total (toFixed(2) para mostrar 2 decimales en el numero)
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
    function funcionamientoDeleteBTN() {

        const botonesDelete = document.querySelectorAll('.deletebtn');              // seleccionamos todos los elementos cuya clase sea "deletebtn"  (todos los botones tienen la misma clase)
        botonesDelete.forEach(elementoBoton => {                                    // recorremos todos los botones
            elementoBoton.addEventListener('click', function() {                    // "escuchamos" el evento "Click" en cualquiera de ellos
                const idProducto = this.dataset.id;                                 // almacenamos el ID del producto proveniente del atributo "data-id" en el boton clickeado
                const indiceDelArray = dataBD.findIndex(elementoDelArray => elementoDelArray.id === idProducto);        // buscamos en que indice del array se almacena el producto con ese ID
                    dataBD.splice(indiceDelArray, 1);                               // hacemos un SPLICE al array al elemento en el indice correspondiente y solo de 1 elemento
                    listarCarrito();                                                // reinvocamos para que se regenere la lista de productos
                    actualizaTotalCarrito();                                        // reinvocamos para que se calcule el total de "RESUMEN"
                    funcionamientoDeleteBTN();                                      // reinvocamos para que siga disponible el funcionamiento "delete"
            });
        });
    
    };



    // Esta es la funcion principal, la que inicia y hace que todo aparezca y se ejecute llamando a otras funciones en caso de ser necesario
    function inicializarModuloCarrito() {

        // Invocamos la funcion para listar los items del carrito
        listarCarrito();
        
        // Capturamos todos los inputs de cantidad existentes para "escuchar" el evento "change" de cualquiera de ellos
        const inputsDeCantidad = document.querySelectorAll('.cart__item-qnum');   // Seleccionamos todos los inputs de cantidad con su clase en comun que es "cart__item-qnum"
        inputsDeCantidad.forEach(elementoInput => {                               // mediante un ForEach recorremos cada uno de esos inputs
            elementoInput.addEventListener('change', function() {                 // aqui estamos "escuchando" cualquier "change" que ocurra en cualquiera de ellos y reaccionaremos ante ello
                if (isNaN(this.value) || this.value < 0) {                        // si el valor del input no es numero O es menor a cero
                    this.value = 0;                                               // el valor del input se establece en cero
                } 
                actualizaTotalProducto(this.dataset.id, this.value);              // llamamos a la funcion para actualizar el total pasando como parametro al atributo "data-id" para identificar cual de los inputs fue el que tuvo el "change" y ademas pasamos el valor de dicho input
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
                actualizaTotalProducto(idProducto, parseInt(cantidadInput.value));       // llamamos a la funcion para actualizar el total pasando como parametro al atributo "data-id" para identificar en cual de los inputs fue clickeado el boton, por ende cambio su valor y ademas pasamos el valor de dicho input
                actualizaTotalCarrito()
                        
            } else if (elementoClickeado.classList.contains('minus')) {                  // SI el TARGET clickado tiene la clase "minus" entonces...
                const idProducto = elementoClickeado.dataset.id;                         // almacenamos el ID del producto proveniente del atributo "data-id"
                const cantidadInput = document.querySelector(`#quant${idProducto}`);     // seleccionamos el input cuya nombre de clase corresponda al ID del boton clickeado
                if (cantidadInput.value > 0) {                                           // si el valor del input es mayor a CERO
                    cantidadInput.value = Number(cantidadInput.value) - 1;               // restamos 1 al valor de dicho input
                    actualizaTotalProducto(idProducto, parseInt(cantidadInput.value));   // llamamos a la funcion para actualizar el total pasando como parametro al atributo "data-id" para identificar en cual de los inputs fue clickeado el boton, por ende cambio su valor y ademas pasamos el valor de dicho input
                    actualizaTotalCarrito()
                }
            }
        });

    }


    // Invocamos la funcion para que todo se ejecute, es decir, "el modulo del carrito"
    inicializarModuloCarrito();
    // Paso seguido invocamos a la funcion para que calcule los valores del Total del Carrito
    actualizaTotalCarrito();
    // Por ultimo invocamos la funcion para que trabajen los botones de "delete"
    funcionamientoDeleteBTN();


});








