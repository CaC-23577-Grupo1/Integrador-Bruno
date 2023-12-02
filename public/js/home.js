// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {

  
    // valor porcentual de recargo a las cuotas CON INTERES
    const recargoPorcentualCuotas = 50;



     //  Creamos una funcion asincrona que sera la que leera los datos del JSON de Colecciones
     async function cargarDatosJSONcolecciones() {

        // hacemos la solicitud  mediante FETCH para obtener los datos que contiene el archivo "products.json"
        const respuestaFetchcolecciones = await fetch('../data/collections.json');
        // utilizamos el metodo ".json" para extraer unicamente el BODY de dicha respuesta
        dataRespuestaLimpiaColecciones = await respuestaFetchcolecciones.json();
        // por ultimo, "entregamos" a quien invoco esta funcion los datos obtenidos
        return dataRespuestaLimpiaColecciones;
        
        //(NOTA: al ser una funcion asincrona se utiliza el AWAIT para esperar a que se resuelva la promesa)
    };



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



    // Creamos constantes para almacenar el elemento del DOM que manipularemos
    const contenedorColecciones = document.getElementById('articles__container');
    const contenedorSliderCards = document.getElementById('jsContainer_Slider');


    // Funcion para recorrer el ARRAY que contiene los productos a mostrar en la Home
    function listarColecciones(dataRespuestaJSONcolecciones){
        
        // Bucle para recorrer el Array por todos sus elementos
        dataRespuestaJSONcolecciones.forEach(itemDeColecciones => {

            // Creo una etiqueta "article" para contener la informacion de cada coleccion a listar
            const itemsColecciones = document.createElement('article');

            // Asigno a la etiqueta creada un nombre de clase
            itemsColecciones.className = 'article__item';

            // Inyectamos dentro de la etiqueta el HTML paramostrar los datos de la coleccion
            itemsColecciones.innerHTML = `
                                    <div class="article__details">
                                        <h2 class="article__detailstitle">${itemDeColecciones.colection_name}</h2>
                                        <p class="article__detailstext">${itemDeColecciones.colection_descript}</p>
                                        <a class="article__detailsbutton" href="#">VER COLECCIÓN</a>
                                    </div>
                                    <picture class="article__image">
                                        <img src="../${itemDeColecciones.colection_image}" alt="${itemDeColecciones.colection_altimage}">
                                    </picture>
                                `;

            // Agrego toda esta etiqueta creada al elemento del DOM que seleccionamos previamente para manipular
            contenedorColecciones.appendChild(itemsColecciones);

        });

    };  // Fin de la funcion "listarColecciones"




    // Funcion para recorrer el ARRAY que contiene los datos de las Cards a mostrar en el Slider
    function listarSliderCards(dataRespuestaJSON){

        // Bucle para recorrer el array elemento por elemento
        dataRespuestaJSON.forEach(itemDeProducto => {

            // Si, el producto tiene como condicion verdadera la propiedad "Inlcuir en Slider" sera mostrado
            if (itemDeProducto.prod_sliderincluir == true) {
                           
                // Automatiza la aparicion o no de la etiqueta con leyenda "NUEVO"
                let etiquetaNuevo = '';                             // Inicializamos variable fuera del Scope del condicional para poder usarla luego fuera del scope
                if (itemDeProducto.prod_nuevo == true){            // condicional que dependiendo del valor del campo "NEW" podra una opcion u otra
                    etiquetaNuevo = `<span class="card__newprod">NUEVO</span>`;     // Opcion con la etiqueta NUEVO
                }else{
                    etiquetaNuevo = `<span></span>`;                                // Opcion "vacia" sin ninguna etiqueta
                };
                
                // Automatiza el mensaje de cantidad de cuotas y recargo en el precio
                let formaPagoCuotas = '';                               // Inicializamos variable fuera del Scope del condicional para poder usarla luego fuera del scope     
                if (itemDeProducto.prod_intereses == true){           // Condicional que dependiendo de si aplica interes o no, muestra uno u otro mensaje
                    let valorCuotasRecargo = (itemDeProducto.prod_precio * (1 + recargoPorcentualCuotas / 100)) / itemDeProducto.prod_cuotas;    // Calculo de precio de cada cuota CON INTERES
                    formaPagoCuotas = `<p class="card__prodbill">${itemDeProducto.prod_cuotas} CUOTAS de $ ${valorCuotasRecargo.toFixed(2)}</p>`;  // Leyenda a mostras SI tiene interes
                }else{
                    formaPagoCuotas = `<p class="card__prodbill">${itemDeProducto.prod_cuotas} CUOTAS SIN INTERÉS</p>`;                            // Leyenda a mostrar SI NO tiene interes
                };
                
                
                // Creamos en cada iteracion un elemento "<li>"
                const itemListaSlider = document.createElement('li');
                
                // a dicho elemento le asignamos los nombres de clases aqui especificados
                itemListaSlider.className = 'slider__card glide__slide';
            
                
                // insertamos dentro de dicho elemento el siguiente HTML
                itemListaSlider.innerHTML = `
                                                <article class="card__container">
                                                    <a class="card__link" href="#">
                                                        <picture class="card__imagecontainer">
                                                            ${etiquetaNuevo}
                                                            <img class="card__prodimage" src="../${itemDeProducto.prod_imagen_frontal}" alt="Imagen de ${itemDeProducto.prod_nombre}">
                                                            <img class="card__boximage" src="../${itemDeProducto.prod_imagen_trasera}" alt="Imagen de ${itemDeProducto.prod_nombre}">
                                                        </picture>
                                                        <div class="card__detailscontainer">
                                                            <h3 class="card__prodfamily">${itemDeProducto.prod_licencia}</h3>
                                                            <h2 class="card__prodname">${itemDeProducto.prod_nombre}</h2>
                                                            <p class="card__prodprice">$ ${itemDeProducto.prod_precio.toFixed(2)}</p>
                                                            ${formaPagoCuotas}
                                                        </div>
                                                    </a>                                
                                                </article>
                                            `;

                // Agrego el contenido de este elemento dentro del DOM que elegimos para manipular mas arriba                                        
                contenedorSliderCards.appendChild(itemListaSlider);

            };
            
        });
        
    };  // Fin de la funcion "listarSliderCards"







    async function inicilizarModuloHome(){

        // Ejecutamos la funcion para traer los datos del JSON con el AWAIT para esperar que nos llegue toda la info de esa funcion
        const dataRespuestaJSONcolecciones = await cargarDatosJSONcolecciones();

        // Ejecutamos la funcion para traer los datos del JSON con el AWAIT para esperar que nos llegue toda la info de esa funcion
        const dataRespuestaJSON = await cargarDatosJSON();
        
        // Invocamos la funcion para que liste las colecciones
        listarColecciones(dataRespuestaJSONcolecciones);
        
        // Invocamos la funcion para que liste las cards del slider
        listarSliderCards(dataRespuestaJSON)
        
        // Instanciamos la clase "Glide" creando un Objeto brindandole los parametros necesarios, por ultimo ejecutamos el metodo "mount" para que el Slider funcione.
        new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 3,
            gap: 10,
            breakpoints: {
                1199: {
                    perView: 2
                },
                850: {
                    perView: 1
                }
            }
        }).mount();
        
    };



    // Invocamos la funcion para que todo se ejecute, es decir, "el modulo del home"
    inicilizarModuloHome();


});