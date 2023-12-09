// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {

    let identificadorTemporizador ; // Variable para almacenar el identificador del temporizador para poder "resetearlo" con clear
    
    const inputBuscador = document.getElementById('search-textinput');  // seleccionamos el elemento INPUT donde se ingresa el texto de búsqueda

    // Chequeamos si existe alguna "Query Param" en la URL para rellenar el Input
    const queryString = window.location.search;             // Capturamos la cadena de consulta (query string) de la URL actual
    const params = new URLSearchParams(queryString);        // Crear un objeto URLSearchParams a partir de la cadena de consulta
    const valorQueryParam = params.get('buscar');                // Obtener el valor del parámetro 'buscar' de la URL
    
    if (valorQueryParam){                            // si existe "valorQueryParam" entonces
        inputBuscador.value = valorQueryParam;       // "rellenamos" el input con ese valor
        inputBuscador.focus();                       // posicionamos el cursor dentro del input
    };

    // "Escucharemos" el evento input del input para reaccionar ante cada cambio en tiempo real y no esperar a que el puntero salga del input. 
    //  (ante cada carácter tipeado dentro del input se ejecutara este codigo)
    inputBuscador.addEventListener('input', function(event) {
        
        // Como es un nuevo tipeo dentro del input, "reseteamos" el temporizador (Para eso necesitabamos el identificador)
        clearTimeout(identificadorTemporizador );

        // Establecemos un nuevo temporizador guardando su identificador para cuando se repita esto
        identificadorTemporizador  = setTimeout(function() {

                // si el tiempo del temporizador se agota, se ejecutara este codigo:

                const valorInputSearch = event.target.value;    // capturamos el valor que existe actualmente en el input
                
                if (valorInputSearch != '') {                   // si el valor el input es diferente a vacio

                    window.location.href = `/shop/?buscar=${encodeURIComponent(valorInputSearch)}`;    // Entonces hubo una busqueda y redirigimos a la siguiente ruta
                
                }else{                                          // sino

                    window.location.href = `/shop/`;           // entonces el input esta vacio y debemos mostrar todos los productos

                }

        }, 1000); // Aqui establecemos los milisegundos que espera el temporizador antes de ejecutar su codigo

    });
    
});