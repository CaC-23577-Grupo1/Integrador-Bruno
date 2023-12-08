// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {
 

    // Datos dinamicos utiles para el codigo
    let precioEnvio = 2500;
    let minimoEnvioGratis = 10000;


    // Creamos una constante para seleccionar el elemento del DOM que queremos manipular
    const cartList = document.querySelector('#cart_list');


    // Funcion para actualizar el valor total del producto dependiendo de las cantidades que figuran
    function actualizaTotalProducto(idItemCarrito, cantidadInput) {                        // Funcion que recibe 2 parametros, el identificador del item en el carrito y la cantidad que indica el Input Box
        const inputHiddenPrecio = document.querySelector(`#price${idItemCarrito}`);         // Seleccionamos el contenedor que contiene el precio del item (un input oculto en el HTML)
        precioItem = inputHiddenPrecio.value;                                               // Leemos el valor que tiene dicho contenedor
        const totalElement = document.querySelector(`#total${idItemCarrito}`);              // Seleccionamos el contenedor que muestra el total del producto cuyo nombre se forma con el ID del item
        const precioTotal = precioItem * cantidadInput;                                     // multiplicamos el valor de "precioItem" de dicho item en el carrito por la cantidad recibida como argumento
        totalElement.textContent = `$ ${precioTotal.toFixed(2)}`;                           // actualizamos el contenido del contenedor que muestra el total (toFixed(2) para mostrar 2 decimales en el numero)
    }


    function actualizaTotalCarrito() {
        // Capturamos los 4 elementos contenedores donde se muestra la informacion
        
        //const headerCantidad = document.querySelector(`#header-cantidad`);  // Icono en el header del carrito
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
        sumadorTotal = sumadorSubtotal + precioEnvio;                                                   // Calculamos el total sumando el subtotal + el envio
        if (sumadorTotal > minimoEnvioGratis + precioEnvio){                                            // si el total supera el envio gratis entonces
            resumenEnvio.innerHTML = `<span class="EnvioGratis">$ ${precioEnvio.toFixed(2)}</span>`;    // en envio mostramos esto
            mostrarTotal = `$ ${sumadorSubtotal.toFixed(2)}`;                                           // en total mostramos esto
        } else {                                                                                        // sino
            resumenEnvio.textContent = `$ ${precioEnvio.toFixed(2)}`;                                   // en envio mostramos esto
            mostrarTotal = `$ ${sumadorTotal.toFixed(2)}`;                                              // en total mostramos esto
        }

        // Asignamos los valores a cada contenedor correspondiente
        //headerCantidad.textContent = sumadorCantidad;   // Icono en el header del carrito
        resumenCantidad.textContent = sumadorCantidad; 
        resumenSubtotal.textContent = `$ ${sumadorSubtotal.toFixed(2)}`;
        resumenTotal.textContent = mostrarTotal;
    }



    // Esta es la funcion principal, la que inicia y hace que todo aparezca y se ejecute llamando a otras funciones en caso de ser necesario
    function inicializarModuloCarrito() {


            // Paso seguido invocamos a la funcion para que calcule los valores del Total del Carrito
            actualizaTotalCarrito();
            
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
                    const idItemCarrito = elementoClickeado.dataset.id;                         // almacenamos el ID del producto proveniente del atributo "data-id"
                    const cantidadInput = document.querySelector(`#quant${idItemCarrito}`);     // seleccionamos el input cuya nombre de clase corresponda al ID del boton clickeado
                    cantidadInput.value = Number(cantidadInput.value) + 1;                   // sumamos 1 al valor de dicho input
                    actualizaTotalProducto(parseInt(idItemCarrito), parseInt(cantidadInput.value));       // llamamos a la funcion para actualizar el total pasando como parametro al atributo "data-id" para identificar en cual de los inputs fue clickeado el boton, por ende cambio su valor y ademas pasamos el valor de dicho input
                    actualizaTotalCarrito()
                           
                } else if (elementoClickeado.classList.contains('minus')) {                  // SI el TARGET clickado tiene la clase "minus" entonces...
                    const idItemCarrito = elementoClickeado.dataset.id;                         // almacenamos el ID del producto proveniente del atributo "data-id"
                    const cantidadInput = document.querySelector(`#quant${idItemCarrito}`);     // seleccionamos el input cuya nombre de clase corresponda al ID del boton clickeado
                    if (cantidadInput.value > 0) {                                           // si el valor del input es mayor a CERO
                        cantidadInput.value = Number(cantidadInput.value) - 1;               // restamos 1 al valor de dicho input
                        actualizaTotalProducto(parseInt(idItemCarrito), parseInt(cantidadInput.value));   // llamamos a la funcion para actualizar el total pasando como parametro al atributo "data-id" para identificar en cual de los inputs fue clickeado el boton, por ende cambio su valor y ademas pasamos el valor de dicho input
                        actualizaTotalCarrito()
                    }
                }
            });

   

    }




    // Invocamos la funcion para que todo se ejecute, es decir, "el modulo del carrito"
    inicializarModuloCarrito();

    console.log('Estamos vinculados');


});








