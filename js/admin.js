
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



    const contenedorItemsAdmin = document.getElementById('list-table-items');
    const contenedorNoEncontrado = document.getElementById('negative-search');




function listarProductosAdmin(criterioBusqueda) {

    //console.log(criterioBusqueda);



    contenedorItemsAdmin.innerHTML = '';

    contenedorNoEncontrado.innerHTML = '';

    let busquedaSinResultados = false;


    dataBDproductos.forEach(elementoDelArray => {

        if ((elementoDelArray.codigo.toLowerCase()).includes(criterioBusqueda.toLowerCase()) || 
            (elementoDelArray.nombre.toLowerCase()).includes(criterioBusqueda.toLowerCase()) || 
            (elementoDelArray.categoria.toLowerCase()).includes(criterioBusqueda.toLowerCase())) {

            itemProducto = document.createElement('tr');

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

            contenedorItemsAdmin.appendChild(itemProducto)

            busquedaSinResultados = true

        };
        

    });

    if (busquedaSinResultados == false && criterioBusqueda.trim() !== '') {
            mensajeNoEncontrado = document.createElement('div');

            mensajeNoEncontrado.className = 'negative__search';

            mensajeNoEncontrado.innerHTML = `                      
                                        
                                        <span>Ningun producto coincide con la busqueda...</span>
                                    `;

            contenedorNoEncontrado.appendChild(mensajeNoEncontrado)
    }


};





function funcionamientoDeleteBTN() {
    const botonesDelete = document.querySelectorAll('.deletebtnicon');

    botonesDelete.forEach(elementoBoton => {
        elementoBoton.addEventListener('click', function() {
            
            let productoID = this.dataset.id;
            let productoCodigo = '';
            let productoNombre = '';
            let productoCategoria = '';
            //console.log("ID del producto a eliminar", productoID);
            
            const indiceDelArray = dataBDproductos.findIndex(elementoDelArray => {
                if (elementoDelArray.id == productoID) {
                    productoCodigo = elementoDelArray.codigo;
                    productoNombre = elementoDelArray.nombre;
                    productoCategoria = elementoDelArray.categoria;
                    return true;
                }
                return false;
            });
            
            //console.log("indice del producto en el array", indiceDelArray);

            const confirmacion = window.confirm('¿Desea eliminar el siguiente producto?\n\nID: ' + productoID + '\nCodigo: ' + productoCodigo + '\nNombre: ' + productoNombre + '\nCategoria: ' + productoCategoria);
                if (confirmacion == true) {
                    dataBDproductos.splice(indiceDelArray, 1);  
                    inicializarModuloAdmin();
                    funcionamientoDeleteBTN();                 
                }

        });  
    });
}









function inicializarModuloAdmin() {
    
    
    
    listarProductosAdmin('');

    const inputBuscador = document.getElementById('search-textinput');

    inputBuscador.addEventListener('input', function(event) {
        const valorInputSearch = event.target.value;
        //console.log(valorInputSearch);
        listarProductosAdmin(valorInputSearch);
    });

};







inicializarModuloAdmin();

funcionamientoDeleteBTN();




});