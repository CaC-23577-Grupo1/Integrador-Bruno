// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {

    // Array que simula el resultado de una consulta a una BD
    const dataBDproductos = [
        {id: 1, codigo: 'STW001001', nombre: 'Baby Yoda Blueball', categoria: 'STAR WARS'},
        {id: 2, codigo: 'STW001002', nombre: 'Boba Fett Fighter', categoria: 'STAR WARS'},
        {id: 3, codigo: 'STW001003', nombre: 'Luke Skylwalker & Grogu', categoria: 'STAR WARS'},
        {id: 4, codigo: 'STW001004', nombre: 'Stormtrooper Lightsaber', categoria: 'STAR WARS'},
        {id: 5, codigo: 'PKM001001', nombre: 'Charmander Smiley', categoria: 'POKEMON'},
        {id: 6, codigo: 'PKM001002', nombre: 'Dragonite Hi!', categoria: 'POKEMON'},
        {id: 7, codigo: 'PKM001003', nombre: 'Pidgeotto Flying', categoria: 'POKEMON'},
        {id: 8, codigo: 'PKM001004', nombre: 'Pikachu Smiley', categoria: 'POKEMON'},
        {id: 9, codigo: 'PKM001005', nombre: 'Vulpix Fancy', categoria: 'POKEMON'},
        {id: 10, codigo: 'HPT001001', nombre: 'Harry Potter & Hegwid', categoria: 'HARRY POTTER'},
        {id: 11, codigo: 'HPT001002', nombre: 'Herminione Ball Dress', categoria: 'HARRY POTTER'},
        {id: 12, codigo: 'HPT001003', nombre: 'Luna Lovegood Lion Mask', categoria: 'HARRY POTTER'},
        {id: 13, codigo: 'HPT001004', nombre: 'Snape Patronus', categoria: 'HARRY POTTER'}
    ];


    // Creamos dos constantes para almacenar los elementos del DOM que manipularemos
    const contenedorItemsAdmin = document.getElementById('list-table-items');       // Listado de Items
    const contenedorNoEncontrado = document.getElementById('negative-search');      // Zona de Mensaje


    // Creamos una funcion para recorrer el Array y listar los datos que cumplan con el criterio establecido en la busqueda
    function listarProductosAdmin(criterioBusqueda) {

        // Inicializamos el elemento donde colocaremos la lista de items vacio
        contenedorItemsAdmin.innerHTML = '';

        // Inicializamos el elemento donde aparecera el mensaje cuando no haya coincidencias en la busqueda vacio
        contenedorNoEncontrado.innerHTML = '';

        // Inicializamos en "FALSO" que la busqueda tenga resultados ya que no sabemos aun si los tendra o no
        let busquedaEncontroResultados = false;

        // Recorremos cada elemento del Array
        dataBDproductos.forEach(elementoDelArray => {
            
            // Si, en alguno de dichos elementoos del array, su codigo ó nombre ó categoria coincide con el argumento recibido al invocarse la funcion, listara dicho elemento, sino, no sera listado
            if ((elementoDelArray.codigo.toLowerCase()).includes(criterioBusqueda.toLowerCase()) || 
                (elementoDelArray.nombre.toLowerCase()).includes(criterioBusqueda.toLowerCase()) || 
                (elementoDelArray.categoria.toLowerCase()).includes(criterioBusqueda.toLowerCase())) {

                    // para cada elemento que haya coincidencia creara un elemento "TR" es decir una fila de la tabla
                    itemProducto = document.createElement('tr');

                    // Dentro de dicho TR se inyectara este html con los datos del producto
                    itemProducto.innerHTML = `
                                                <td class="list-table__id">${elementoDelArray.id}</td>
                                                <td class="list-table__code">${elementoDelArray.codigo}</td>
                                                <td class="list-table__name">${elementoDelArray.nombre}</td>
                                                <td class="list-table__categ">${elementoDelArray.categoria}</td>
                                                <td class="list-table__action">
                                                    <div class="list-table__iconcontainer">                                                
                                                        <button data-id="${elementoDelArray.id}" class="editbtnicon"><i class="fa-solid fa-pen"></i></button>
                                                        <button data-id="${elementoDelArray.id}" class="deletebtnicon"><i class="fa-solid fa-trash-can"></i></button>
                                                    </div>
                                                </td>
                                            `;

                    // por ultimo dicho TR sera agregado al nodo DOM seleccionado mas arriba y almacenado en la constane "contenedorItemsAdmin"
                    contenedorItemsAdmin.appendChild(itemProducto)

                    // Por ultimo, establecemos en "TRUE" la existencia de resultados a mostrar para evitar el mensaje de que no se encontraron productos
                    busquedaEncontroResultados = true

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
                contenedorNoEncontrado.appendChild(mensajeNoEncontrado)
            }


    };



    // Funcion que altera el Array de muestra y elimina valores (simulando el funcionamiento del boton delete)
    function funcionamientoDeleteBTN() {

        // seleccionamos todos los elementos cuya clase sea "deletebtnicon"  (todos los botones tienen la misma clase)
        const botonesDelete = document.querySelectorAll('.deletebtnicon');
        
        botonesDelete.forEach(elementoBoton => {                            // recorremos todo el conjunto de botones
            elementoBoton.addEventListener('click', function() {            // "escuchamos" en cada uno de ellos el evento "click"
                
                let productoID = this.dataset.id;       // cuando un de ellos es clickeado capturamos su atributo "data-id" asignado en el html
                // a la vez incializamos 3 variables vacias para luego almacenar informacion
                let productoCodigo = '';
                let productoNombre = '';
                let productoCategoria = '';
                
                // buscaremos el indice de cada elemento en el array que simula a la BD que contiene los datos de los items listados
                const indiceDelArray = dataBDproductos.findIndex(elementoDelArray => {      
                    if (elementoDelArray.id == productoID) {                // cuando el ID almacenado en el array coincida con el ID asignado en el "data-id"
                        // almacenaremos en las 3 variables previamente creada los siguientes datos
                        productoCodigo = elementoDelArray.codigo;           
                        productoNombre = elementoDelArray.nombre;
                        productoCategoria = elementoDelArray.categoria;
                        return true;    // y retornaremos "TRUE" para que la funcion "findIndex" halle efectivamente cual es el indice del array que contiene el elemento en el cual se presiono el boton
                    }
                    return false;       // retornaremos "FALSE" en los demas casos
                });
                
                // habiendo hallado ahora el indice que nos indica en cual elemento del array se presiono el boton "delete" y teniendo la informacion del codigo nombre y categoria
                // mostraremos un "ALERT" con las opciones "Aceptar" y "Cancelar" para que el usuario confirme la eliminacion
                const confirmacion = window.confirm('¿Desea eliminar el siguiente producto?\n\nID: ' + productoID + '\nCodigo: ' + productoCodigo + '\nNombre: ' + productoNombre + '\nCategoria: ' + productoCategoria);
                    if (confirmacion == true) {                         // si el usuario preciona "Aceptar"
                        dataBDproductos.splice(indiceDelArray, 1);      // se hara un splice sobre el array simulando la eliminacion de un producto
                        inicializarModuloAdmin();                       // luego de eliminar se invocara el modulo completo para "reiniciar" el listado y mostrar todos los productos que quedaron
                        funcionamientoDeleteBTN();                      // tambien se invocara el funcionamiento del boton delete para que este disponible nuevamente
                    }

            });  
        });
    }



    // Funcion principal que debe ejecutarse para que se listen los productos y mantendra el dinamismo
    function inicializarModuloAdmin() {
                
        // Como primer paso al cargarse la pagina, invocara a listar los productos pasando como parametro una cadena vacia para que todos los productos aparezcan
        listarProductosAdmin('');

        // Aqui seleccionaremos el INPUT donde se ingresa el texto de busqueda
        const inputBuscador = document.getElementById('search-textinput');

        // "Escucharemos" a dicho input, utilizando el evento input para reaccionar ante cada cambio en tiempo real y no tener que esperar a que el puntero salga del input
        // es decir, ante cada caracter tipeado dentro del input reaccionara nuestro evento
        inputBuscador.addEventListener('input', function(event) {
            
            // en cada una de dichas reacciones, se invocara la funcion de listar, pasando como parametro el valor que exista en el input
            const valorInputSearch = event.target.value;
            listarProductosAdmin(valorInputSearch);

        });

    };




    // Invocamos la funcion principal para que todo se ejecute, se cargue inicialmente el listado y este "activa" la "escucha" sobre el input
    inicializarModuloAdmin();
    // Invocamos el funcionamiento del boton Delete para que el mismo funcione
    funcionamientoDeleteBTN();


});