// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {

    // INICIO de los "DATOS DINAMICOS"  (Me refiero a dinamicos porque estos datos a futuro proveendrian desde una BD o alguna otra fuente.)
    // Array con los Items de Coleccion
    const dataBDcolecciones = [
        { id: 1, name: 'STAR WARS & THE MANDALORIAN', image: 'star-wars/baby-yoda-1.webp', altimage: 'Producto Baby Yoda', slogan: 'Disfruta de una saga que sigue agregando personajes a su colección.' },
        { id: 2, name: 'POKEMON INDIGO', image: 'pokemon/vulpix-1.webp', altimage: 'Producto Vulpix', slogan: 'Atrapa todos los que puedas y disfruta de una colección llena de amigos.' },
        { id: 3, name: 'HARRY POTTER', image: 'harry-potter/snape-patronus-1.webp', altimage: 'Producto Snape Patronus', slogan: 'Revive los recuerdos de una saga llena de magia y encanto.' }
    ];
    // Array con los Items del Slider
    // Info Util: paymentquant (cantidad de cuotas disponibles), interest (si tiene o no interes el precio en cuotas), new (si el producto es nuevo o no para marcarlo en la carda)
    const dataBDslider = [
        {id: 1, name: 'STORMTROOPER LIGHTSABER', category: 'STAR WARS', price: 1799.99, paymentquant: '3', interest: false, new: true, prodimage: 'star-wars/trooper-1.webp', boximage: 'star-wars/trooper-box.webp'},
        {id: 2, name: 'PIDGEOTTO', category: 'POKEMON', price: 1799.99, paymentquant: '6', interest: false, new: false, prodimage: 'pokemon/pidgeotto-1.webp', boximage: 'pokemon/pidgeotto-box.webp'},
        {id: 3, name: 'LUNA LOVEGOOD LION MASK', category: 'HARRY POTTER', price: 1799.99, paymentquant: '12', interest: true, new: true, prodimage: 'harry-potter/luna-1.webp', boximage: 'harry-potter/luna-box.webp'}
    ];
    // valor porcentual de recargo a las cuotas CON INTERES
    const recargoPorcentualCuotas = 50;
    // FIN de los "DATOS DINAMICOS"


    // Creamos constantes para almacenar el elemento del DOM que manipularemos
    const contenedorColecciones = document.getElementById('articles__container');
    const contenedorSliderCards = document.getElementById('jsContainer_Slider');


    // Funcion para recorrer el ARRAY que contiene los productos a mostrar en la Home
    function listarColecciones(){
        
        // Bucle para recorrer el Array por todos sus elementos
        dataBDcolecciones.forEach(elementoDelArrayColecciones => {

            // Creo una etiqueta "article" para contener la informacion de cada coleccion a listar
            const itemsColecciones = document.createElement('article');

            // Asigno a la etiqueta creada un nombre de clase
            itemsColecciones.className = 'article__item';

            // Inyectamos dentro de la etiqueta el HTML paramostrar los datos de la coleccion
            itemsColecciones.innerHTML = `
                                    <div class="article__details">
                                        <h2 class="article__detailstitle">${elementoDelArrayColecciones.name}</h2>
                                        <p class="article__detailstext">${elementoDelArrayColecciones.slogan}</p>
                                        <a class="article__detailsbutton" href="#">VER COLECCIÓN</a>
                                    </div>
                                    <picture class="article__image">
                                        <img src="../images/${elementoDelArrayColecciones.image}" alt="${elementoDelArrayColecciones.altimage}">
                                    </picture>
                                `;

            // Agrego toda esta etiqueta creada al elemento del DOM que seleccionamos previamente para manipular
            contenedorColecciones.appendChild(itemsColecciones);

        });

    };  // Fin de la funcion "listarColecciones"


    // Funcion para recorrer el ARRAY que contiene los datos de las Cards a mostrar en el Slider
    function listarSliderCards(){

        // Bucle para recorrer el array elemento por elemento
        dataBDslider.forEach(elementoDelArraySlider => {

            // Automatiza la aparicion o no de la etiqueta con leyenda "NUEVO"
            let etiquetaNuevo = '';                             // Inicializamos variable fuera del Scope del condicional para poder usarla luego fuera del scope
            if (elementoDelArraySlider.new == true){            // condicional que dependiendo del valor del campo "NEW" podra una opcion u otra
                etiquetaNuevo = `<span class="card__newprod">NUEVO</span>`;     // Opcion con la etiqueta NUEVO
            }else{
                etiquetaNuevo = `<span></span>`;                                // Opcion "vacia" sin ninguna etiqueta
            };
            
            // Automatiza el mensaje de cantidad de cuotas y recargo en el precio
            let formaPagoCuotas = '';                               // Inicializamos variable fuera del Scope del condicional para poder usarla luego fuera del scope     
            let valorCuotasRecargo = '';                            // Inicializamos variable fuera del Scope del condicional para poder usarla luego fuera del scope    
            if (elementoDelArraySlider.interest == true){           // Condicional que dependiendo de si aplica interes o no, muestra uno u otro mensaje
                let valorCuotasRecargo = (elementoDelArraySlider.price * (1 + recargoPorcentualCuotas / 100)) / elementoDelArraySlider.paymentquant;    // Calculo de precio de cada cuota CON INTERES
                formaPagoCuotas = `<p class="card__prodbill">${elementoDelArraySlider.paymentquant} CUOTAS de $ ${valorCuotasRecargo.toFixed(2)}</p>`;  // Leyenda a mostras SI tiene interes
            }else{
                formaPagoCuotas = `<p class="card__prodbill">${elementoDelArraySlider.paymentquant} CUOTAS SIN INTERÉS</p>`;                            // Leyenda a mostrar SI NO tiene interes
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
                                                        <img class="card__prodimage" src="../images/${elementoDelArraySlider.prodimage}" alt="Imagen de ${elementoDelArraySlider.name}">
                                                        <img class="card__boximage" src="../images/${elementoDelArraySlider.boximage}" alt="Imagen de ${elementoDelArraySlider.name}">
                                                    </picture>
                                                    <div class="card__detailscontainer">
                                                        <h3 class="card__prodfamily">${elementoDelArraySlider.category}</h3>
                                                        <h2 class="card__prodname">${elementoDelArraySlider.name}</h2>
                                                        <p class="card__prodprice">$ ${elementoDelArraySlider.price.toFixed(2)}</p>
                                                        ${formaPagoCuotas}
                                                    </div>
                                                </a>                                
                                            </article>
                                        `;

            // Agrego el contenido de este elemento dentro del DOM que elegimos para manipular mas arriba                                        
            contenedorSliderCards.appendChild(itemListaSlider);
            

        });
        
    };  // Fin de la funcion "listarSliderCards"



    // Invocamos la funcion para que liste las colecciones
    listarColecciones();
    
    // Invocamos la funcion para que liste las cards del slider
    listarSliderCards()

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

});