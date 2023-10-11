document.addEventListener('DOMContentLoaded', function() {
    const dataBD = [
        { id: 1, name: 'BABY YODA BLUEBALL', category: 'STAR WARS', price: 1799.99, image: 'star-wars/baby-yoda-1.webp', quantity: 2 },
        { id: 2, name: 'PIDGEOTTO', category: 'POKEMON', price: 1799.99, image: 'pokemon/pidgeotto-1.webp', quantity: 1 },
        { id: 3, name: 'HARRY', category: 'HARRY POTTER', price: 1799.99, image: 'harry-potter/harry-1.webp', quantity: 3 }
    ];

    const cartList = document.querySelector('#cart_list');

    function renderCart() {
        let templateListar = '';
        dataBD.forEach(arrayElement => {
            templateListar += `
                <li class="cart__item">
                    <article class="cart__item-product">
                        <picture class="cart__item-productimg">
                            <img src="../images/${arrayElement.image}" alt="Producto Baby Yoda Blueball">
                        </picture>
                        <div class="cart__item-productdet">
                            <h2 class="cart__item-productdet-name">${arrayElement.name}</h2>
                            <h3 class="cart__item-productdet-categ">${arrayElement.category}</h3>
                            <p class="cart__item-productdet-price">Precio: $ ${arrayElement.price}</p>
                        </div>
                    </article>
                    <div class="cart__item-q">
                        <input data-id="${arrayElement.id}" class="cart__item-qnum" type="text" id="quant${arrayElement.id}" value="${arrayElement.quantity}">
                        <div class="cart__item-qplusminus">
                            <button data-id="${arrayElement.id}" id="plus" class="qplusminusbtn plus">+</button>
                            <button data-id="${arrayElement.id}" id="minus" class="qplusminusbtn minus">-</button>
                        </div>
                    </div>
                    <p class="cart__item-price" id="total${arrayElement.id}">$ ${(arrayElement.price * arrayElement.quantity).toFixed(2)}</p>
                    <div>
                        <button data-id="${arrayElement.id}" class="deletebtn OutItem"><iconify-icon class="cart__item-delete" icon="zondicons:close-outline"></iconify-icon></button>
                        <button data-id="${arrayElement.id}" class="deletebtn InItem"><iconify-icon class="cart__item-delete" icon="zondicons:close-outline"></iconify-icon></button>
                    </div>
                </li>
                `

        });
        cartList.innerHTML = templateListar;
    }

    function updateTotalPrice(productId, quantity) {
        const product = dataBD.find(item => item.id === parseInt(productId));
        const totalElement = document.querySelector(`#total${productId}`);
        if (product) {
            const totalPrice = product.price * quantity;
            totalElement.textContent = `$ ${totalPrice.toFixed(2)}`;
        }
    }

    function init() {
        renderCart();
        
        const quantityInputs = document.querySelectorAll('.cart__item-qnum');
        quantityInputs.forEach(quantityInput => {
            quantityInput.addEventListener('change', function() {
                const productId = this.dataset.id;
                const value = parseInt(this.value) || 0;
                this.value = value;
                updateTotalPrice(productId, value);
            });
        });

        cartList.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('plus')) {
                const productId = target.dataset.id;
                const quantityInput = document.querySelector(`#quant${productId}`);
                quantityInput.value = Number(quantityInput.value) + 1;
                updateTotalPrice(productId, parseInt(quantityInput.value));
            } else if (target.classList.contains('minus')) {
                const productId = target.dataset.id;
                const quantityInput = document.querySelector(`#quant${productId}`);
                if (quantityInput.value > 0) {
                    quantityInput.value = Number(quantityInput.value) - 1;
                    updateTotalPrice(productId, parseInt(quantityInput.value));
                }
            }
        });
    }

    init();


    const deleteBtns = document.querySelectorAll('.deletebtn');
    deleteBtns.forEach(button => {
        button.addEventListener('click', function() {
            const productContainer = this.closest('.cart__item'); // Obtener el contenedor del producto
            const productId = this.dataset.id;
            const productName = productContainer.querySelector('.cart__item-productdet-name').textContent;
            alert(`Presiono Borrar producto en la Posicion: ${productId} \n ${productName}`);
        });
    });
    
    
});
