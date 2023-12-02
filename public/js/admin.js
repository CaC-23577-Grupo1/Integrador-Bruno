// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {


   
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
    const contenedorItemsAdmin = document.getElementById('list-table-items');       // Listado de Items
    const contenedorMensajes = document.getElementById('negative-search');      // Zona de Mensaje



    // Creamos una funcion para recorrer el Array y listar los datos que cumplan con el criterio establecido en la busqueda
    function listarProductosAdmin(criterioBusqueda, dataRespuestaJSON) {

        // Inicializamos el elemento donde colocaremos la lista de items vacio
        contenedorItemsAdmin.innerHTML = '';

        // Inicializamos el elemento donde aparecera el mensaje cuando no haya coincidencias en la busqueda vacio
        contenedorMensajes.innerHTML = '';

        // Inicializamos en "FALSO" que la busqueda tenga resultados ya que no sabemos aun si los tendra o no
        let busquedaEncontroResultados = false;

        // Recorremos cada elemento del Array
        dataRespuestaJSON.forEach(elementoDelArray => {
            
            // Si, en alguno de dichos elementoos del array, su codigo ó nombre ó categoria coincide con el argumento recibido al invocarse la funcion, listara dicho elemento, sino, no sera listado
            if ((elementoDelArray.prod_sku.toLowerCase()).includes(criterioBusqueda.toLowerCase()) || 
                (elementoDelArray.prod_nombre.toLowerCase()).includes(criterioBusqueda.toLowerCase()) || 
                (elementoDelArray.prod_licencia.toLowerCase()).includes(criterioBusqueda.toLowerCase())) {

                    // para cada elemento que haya coincidencia creara un elemento "TR" es decir una fila de la tabla
                    itemProducto = document.createElement('tr');

                    // Dentro de dicho TR se inyectara este html con los datos del producto
                    itemProducto.innerHTML = `
                                                <td class="list-table__id">${elementoDelArray.prod_id}</td>
                                                <td class="list-table__code">${elementoDelArray.prod_sku}</td>
                                                <td class="list-table__name">${elementoDelArray.prod_nombre}</td>
                                                <td class="list-table__categ">${elementoDelArray.prod_licencia}</td>
                                                <td class="list-table__action">
                                                    <div class="list-table__iconcontainer">                                                
                                                        <button data-id="${elementoDelArray.prod_id}" class="editbtnicon"><i class="fa-solid fa-pen"></i></button>
                                                        <button data-id="${elementoDelArray.prod_id}" class="deletebtnicon"><i class="fa-solid fa-trash-can"></i></button>
                                                    </div>
                                                </td>
                                            `;

                    // por ultimo dicho TR sera agregado al nodo DOM seleccionado mas arriba y almacenado en la constane "contenedorItemsAdmin"
                    contenedorItemsAdmin.appendChild(itemProducto);

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




    // Funcion que mostrara un Alert cuando se presione el boton EDIT de algun producto
    function funcionamientoEditBTN(dataRespuestaJSON) {

        // seleccionamos todos los elementos cuya clase sea "editbtnicon"  (todos los botones tienen la misma clase)
        const botonesEdit = document.querySelectorAll('.editbtnicon');

        botonesEdit.forEach(elementoBoton => {                              // recorremos todo el conjunto de botones
            elementoBoton.addEventListener('click', function() {            // "escuchamos" en cada uno de ellos el evento "click"

                // recorremos el array con los datos "Provenientes de la BD" para almacenar en "datosProducto" los datos de aquel cuyo ID coincida con el del boton presionado
                let datosProducto = dataRespuestaJSON.find(elementoDelArray => elementoDelArray.prod_id == this.dataset.id);
    
                // mostraremos un "ALERT" que informa cual boton producto quiere editar
                window.alert( 'Usted esta editando el Producto\n\nID: ' + datosProducto.prod_id + '\nCodigo: ' + datosProducto.prod_sku + '\nNombre: ' + datosProducto.prod_nombre + '\nCategoria: ' + datosProducto.prod_licencia);
                
            });  
        });
    };




    // Funcion que mostrara un Alert de confirmacion o cancelacion cuando se presione el boton DELETE de algun producto
    function funcionamientoDeleteBTN(dataRespuestaJSON) {

        // seleccionamos todos los elementos cuya clase sea "deletebtnicon"  (todos los botones tienen la misma clase)
        const botonesEdit = document.querySelectorAll('.deletebtnicon');

        botonesEdit.forEach(elementoBoton => {                              // recorremos todo el conjunto de botones
            elementoBoton.addEventListener('click', function() {            // "escuchamos" en cada uno de ellos el evento "click"

                // recorremos el array con los datos "Provenientes de la BD" para almacenar en "datosProducto" los datos de aquel cuyo ID coincida con el del boton presionado
                let datosProducto = dataRespuestaJSON.find(elementoDelArray => elementoDelArray.prod_id == this.dataset.id);
    
                // mostraremos un "ALERT" que nos pregunta si realmente queremos eliminar dicho producto
                window.confirm('¿Desea eliminar el siguiente producto?\n\nID: ' + datosProducto.prod_id + '\nCodigo: ' + datosProducto.prod_sku + '\nNombre: ' + datosProducto.prod_nombre + '\nCategoria: ' + datosProducto.prod_licencia);
                
            });  
        });
    };




    // Funcion principal que debe ejecutarse para que se listen los productos y mantendra el dinamismo
    async function inicializarModuloAdmin() {
        
        // Ejecutamos la funcion para traer los datos del JSON con el AWAIT para esperar que nos llegue toda la info de esa funcion
        const dataRespuestaJSON = await cargarDatosJSON();

        // Como primer paso al cargarse la pagina, invocara a listar los productos pasando como parametro una cadena vacia para que todos los productos aparezcan
        listarProductosAdmin('', dataRespuestaJSON);

        // Invocamos el funcionamiento del boton Edit para que el mismo funcione
        funcionamientoEditBTN(dataRespuestaJSON);               

        // Invocamos el funcionamiento del boton Delete para que el mismo funcione
        funcionamientoDeleteBTN(dataRespuestaJSON);            

        // Aqui seleccionaremos el INPUT donde se ingresa el texto de busqueda
        const inputBuscador = document.getElementById('search-textinput');

        // "Escucharemos" a dicho input, utilizando el evento input para reaccionar ante cada cambio en tiempo real y no tener que esperar a que el puntero salga del input
        // es decir, ante cada caracter tipeado dentro del input reaccionara nuestro evento
        inputBuscador.addEventListener('input', function(event) {
        
            // en cada una de dichas reacciones, se invocara la funcion de listar, pasando como parametro el valor que exista en el input
            const valorInputSearch = event.target.value;
            listarProductosAdmin(valorInputSearch, dataRespuestaJSON);

        });

    };




    // Invocamos la funcion principal para que todo se ejecute, se cargue inicialmente el listado y este "activa" la "escucha" sobre el input
    inicializarModuloAdmin();


});