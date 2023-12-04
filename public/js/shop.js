// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {

    // valor porcentual de recargo a las cuotas CON INTERES
    const recargoPorcentualCuotas = 50;

    //  Creamos una funcion asincrona que sera la que leera los datos del JSON
    async function cargarDatosJSON() {

        // hacemos la solicitud  mediante FETCH para obtener los datos que contiene el archivo "products.json"
        const respuestaFetch = await fetch('../data/products.json');
        // utilizamos el metodo ".json" para extraer unicamente el BODY de dicha respuesta
        dataRespuestaLimpia = await respuestaFetch.json();
        // por ultimo, "entregamos" a quien invoco esta funcion los datos obtenidos
        return dataRespuestaLimpia;
        
        //(NOTA: al ser una funcion asincrona se utiliza el AWAIT para esperar a que se resuelva la promesa)
    };



    // Creamos dos constantes para almacenar los elementos del DOM que manipularemos
    const contenedorItemsShop = document.getElementById('shop-items-list');       // Listado de Items
    const contenedorMensajes = document.getElementById('negative-search');      // Zona de Mensaje



    // Creamos una funcion para recorrer el Array y listar los datos que cumplan con el criterio establecido en la busqueda
    function listarProductosShop(criterioBusqueda, dataRespuestaJSON) {

        // Inicializamos el elemento donde colocaremos la lista de items vacio
        contenedorItemsShop.innerHTML = '';

        // Inicializamos el elemento donde aparecera el mensaje cuando no haya coincidencias en la busqueda vacio
        contenedorMensajes.innerHTML = '';

        // Inicializamos en "FALSO" que la busqueda tenga resultados ya que no sabemos aun si los tendra o no
        let busquedaEncontroResultados = false;

        // Recorremos cada elemento del Array
        dataRespuestaJSON.forEach(elementoDelArray => {
            
            // Si, en alguno de dichos elementoos del array, su codigo ó nombre ó categoria coincide con el argumento recibido al invocarse la funcion, listara dicho elemento, sino, no sera listado
            if ((elementoDelArray.prod_nombre.toLowerCase()).includes(criterioBusqueda.toLowerCase()) || 
                (elementoDelArray.prod_licencia.toLowerCase()).includes(criterioBusqueda.toLowerCase())) {


                    // Automatiza la aparicion o no de la etiqueta con leyenda "NUEVO"
                    let etiquetaNuevo = '';                             // Inicializamos variable fuera del Scope del condicional para poder usarla luego fuera del scope
                    if (elementoDelArray.prod_nuevo == true){            // condicional que dependiendo del valor del campo "NEW" podra una opcion u otra
                        etiquetaNuevo = `<span class="card__newprod">NUEVO</span>`;     // Opcion con la etiqueta NUEVO
                    }else{
                        etiquetaNuevo = `<span></span>`;                                // Opcion "vacia" sin ninguna etiqueta
                    };
                    
                    // Automatiza el mensaje de cantidad de cuotas y recargo en el precio
                    let formaPagoCuotas = '';                               // Inicializamos variable fuera del Scope del condicional para poder usarla luego fuera del scope     
                    if (elementoDelArray.prod_intereses == true){           // Condicional que dependiendo de si aplica interes o no, muestra uno u otro mensaje
                        let valorCuotasRecargo = (elementoDelArray.prod_precio * (1 + recargoPorcentualCuotas / 100)) / elementoDelArray.prod_cuotas;    // Calculo de precio de cada cuota CON INTERES
                        formaPagoCuotas = `<p class="card__prodbill">${elementoDelArray.prod_cuotas} CUOTAS de $ ${valorCuotasRecargo.toFixed(2)}</p>`;  // Leyenda a mostras SI tiene interes
                    }else{
                        formaPagoCuotas = `<p class="card__prodbill">${elementoDelArray.prod_cuotas} CUOTAS SIN INTERÉS</p>`;                            // Leyenda a mostrar SI NO tiene interes
                    };
                    
                    
                    // Creamos en cada iteracion un elemento "<li>"
                    const itemListaShop = document.createElement('li');
                    
                    // a dicho elemento le asignamos los nombres de clases aqui especificados
                    itemListaShop.className = 'slider__card';
                
                    
                    // insertamos dentro de dicho elemento el siguiente HTML
                    itemListaShop.innerHTML = `
                                                    <article class="card__container">
                                                        <a class="card__link" href="#">
                                                            <picture class="card__imagecontainer">
                                                                ${etiquetaNuevo}
                                                                <img class="card__prodimage" src="../${elementoDelArray.prod_imagen_frontal}" alt="Imagen de ${elementoDelArray.prod_nombre}">
                                                                <img class="card__boximage" src="../${elementoDelArray.prod_imagen_trasera}" alt="Imagen de ${elementoDelArray.prod_nombre}">
                                                            </picture>
                                                            <div class="card__detailscontainer">
                                                                <h3 class="card__prodfamily">${elementoDelArray.prod_licencia}</h3>
                                                                <h2 class="card__prodname">${elementoDelArray.prod_nombre}</h2>
                                                                <p class="card__prodprice">$ ${elementoDelArray.prod_precio.toFixed(2)}</p>
                                                                ${formaPagoCuotas}
                                                            </div>
                                                        </a>                                
                                                    </article>
                                                `;

                    // Agrego el contenido de este elemento dentro del DOM que elegimos para manipular mas arriba                                        
                    contenedorItemsShop.appendChild(itemListaShop);

                    // Por ultimo, establecemos en "TRUE" la existencia de resultados a mostrar para evitar el mensaje de que no se encontraron productos
                    busquedaEncontroResultados = true;

                };
            
            });

            // Si, el valor de "busquedaEncontroResultados" se mantiene en "Falso" y tambien el "criterioBusqueda" es diferente a "vacio" es decir que se ha ingresado algun criterio para buscar
            // significa que no hubo ninguna coincidencia en el criterio de busqueda por lo cual se ejecutara el codigo entre las siguientes llaves
            if (busquedaEncontroResultados == false && criterioBusqueda.trim() !== '') {
                    
                // se crea una etiqueta div como un contenedor    
                mensajeNoEncontrado = document.createElement('div');

                // a dicho div se le asigna una clase
                mensajeNoEncontrado.className = 'negative__search';

                // dentro de dicho div se inyecta el siguiente HTML (una etiqueta SPAN con una leyenda)
                mensajeNoEncontrado.innerHTML = `<span>Ningun producto coincide con la busqueda...</span>`;

                // por ultimo se agrega al Nodo del DOM seleccionado previamente esta etiqueta div creada con su contenido
                contenedorMensajes.appendChild(mensajeNoEncontrado);
            }


    };



    // Funcion principal que debe ejecutarse para que se listen los productos y mantendra el dinamismo
    async function inicializarModuloShop() {
        
        // Ejecutamos la funcion para traer los datos del JSON con el AWAIT para esperar que nos llegue toda la info de esa funcion
        const dataRespuestaJSON = await cargarDatosJSON();

        // Como primer paso al cargarse la pagina, invocara a listar los productos pasando como parametro una cadena vacia para que todos los productos aparezcan
        listarProductosShop('', dataRespuestaJSON);        

        // Aqui seleccionaremos el INPUT donde se ingresa el texto de busqueda
        const inputBuscador = document.getElementById('search-textinput');

        // "Escucharemos" a dicho input, utilizando el evento input para reaccionar ante cada cambio en tiempo real y no tener que esperar a que el puntero salga del input
        // es decir, ante cada caracter tipeado dentro del input reaccionara nuestro evento
        inputBuscador.addEventListener('input', function(event) {
        
            // en cada una de dichas reacciones, se invocara la funcion de listar, pasando como parametro el valor que exista en el input
            const valorInputSearch = event.target.value;
            listarProductosShop(valorInputSearch, dataRespuestaJSON);

        });

    };




    // Invocamos la funcion principal para que todo se ejecute, se cargue inicialmente el listado y este "activa" la "escucha" sobre el input
    inicializarModuloShop();


});