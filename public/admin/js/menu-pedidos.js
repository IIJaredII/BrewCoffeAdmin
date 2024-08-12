document.addEventListener('DOMContentLoaded', function () {
    const menuContainer = document.getElementById('menu-container');
    const orderList = document.getElementById('order-list');
    const processOrderBtn = document.getElementById('process-order-btn');
    const orderMessage = document.getElementById('order-message');
    const orderPanel = document.getElementById('order-panel');
    const paymentPanel = document.getElementById('payment-panel');
    const cardNameInput = document.getElementById('card-name');
    const cardNumberInput = document.getElementById('card-number');
    const cardExpiryInput = document.getElementById('card-expiry');
    const cardCvvInput = document.getElementById('card-cvv');
    const cardNumberDisplay = document.getElementById('card-number-display');
    const cardNameDisplay = document.getElementById('card-name-display');
    const cardExpiryDisplay = document.getElementById('card-expiry-display');
    const cardCvvDisplay = document.getElementById('card-cvv-display');
    const paymentForm = document.getElementById('payment-form');
    const successMessage = document.getElementById('success-message');
    const totalDisplay = document.getElementById('total-display'); // Añadir un elemento para el total
    let total = 0; // Variable para mantener el total

    // Función para cargar las opciones de porción para un producto específico
    async function loadPortionOptions(productId, selectElement) {
        try {
            const response = await fetch(`http://localhost:3000/api/porciones/${productId}`);
            const portionTypes = await response.json();
            portionTypes.forEach(portion => {
                const option = document.createElement('option');
                option.value = portion.tipo;
                option.textContent = `${portion.tipo} - $${portion.Precio.toFixed(2)}`;
                option.dataset.price = portion.Precio; // Añade el precio como un atributo de datos
                selectElement.appendChild(option);
            });
        } catch (error) {
            console.error('Error cargando las opciones de porción:', error);
        }
    }

    // Función para cargar los productos desde el servidor
    async function loadProducts() {
        try {
            const response = await fetch('http://localhost:3000/api/productos');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error cargando los productos:', error);
        }
    }

    // Función para mostrar los productos en el menú
    function displayProducts(products) {
        products.forEach(product => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <h2>${product.Nombre.toUpperCase() || "Nombre no disponible"}</h2>
                <label for="size-${product.ID_producto}">Tamaño:</label>
                <select id="size-${product.ID_producto}" class="size-select">
                </select>
                <label for="quantity-${product.ID_producto}">Cantidad:</label>
                <input type="number" id="quantity-${product.ID_producto}" class="quantity-input" min="1" value="1">
                <button class="add-btn" data-product="${product.Nombre.toUpperCase()}" data-size-id="size-${product.ID_producto}" data-quantity-id="quantity-${product.ID_producto}" data-price="${product.Precio}">Agregar al Pedido</button>
            `;
            menuContainer.appendChild(menuItem);
            // Cargar tipos de porciones en cada select
            const sizeSelect = menuItem.querySelector('.size-select');
            loadPortionOptions(product.ID_producto, sizeSelect);
        });

        // Añadir eventos a los botones de agregar
        const addButtons = document.querySelectorAll('.add-btn');
        addButtons.forEach(button => {
            button.addEventListener('click', function () {
                const product = this.getAttribute('data-product');
                const sizeId = this.getAttribute('data-size-id');
                const quantityId = this.getAttribute('data-quantity-id');
                const sizeSelect = document.getElementById(sizeId);
                const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
                const portionPrice = selectedOption.dataset.price ? parseFloat(selectedOption.dataset.price) : 0;
                const size = selectedOption.value;
                const quantity = document.getElementById(quantityId).value;
                addToOrder(product, size, quantity, portionPrice);
                sizeSelect.selectedIndex = 0;
                quantity.value = 1;

            });
        });
    }

    function addToOrder(product, size, quantity, price) {
        const listItem = document.createElement('li');
        listItem.classList.add('order-item');

        const subtotal = price * quantity; // Calcular el subtotal

        const textSpan = document.createElement('span');
        textSpan.textContent = `${product} - Tamaño: ${size} Cantidad: ${quantity} Subtotal: $${(price * quantity).toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => removeOrderItem(listItem));

        listItem.appendChild(textSpan);
        listItem.appendChild(removeButton);

        orderList.appendChild(listItem);

        // Actualizar el total
        total += subtotal;
        totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    function removeOrderItem(listItem) {
        listItem.remove();
        // Restar el subtotal del total
        total -= subtotal;
        totalDisplay.textContent = `Total: $${total.toFixed(2)}`;

    }

    processOrderBtn.addEventListener('click', function () {
        const orderItems = orderList.querySelectorAll('.order-item');
        if (orderItems.length === 0) {
            orderMessage.textContent = 'No hay elementos en el pedido.';
            orderMessage.style.display = 'block';
            return;
        }

        orderMessage.style.display = 'none';
        orderPanel.style.display = 'none';
        paymentPanel.style.display = 'block';
    });


    // Actualizar los campos de la tarjeta en tiempo real
    cardNameInput.addEventListener('input', function () {
        cardNameDisplay.textContent = this.value || 'NOMBRE EN LA TARJETA';
    });

    cardNumberInput.addEventListener('input', function () {
        cardNumberDisplay.textContent = formatCardNumber(this.value);
    });

    cardExpiryInput.addEventListener('input', function () {
        cardExpiryDisplay.textContent = this.value || 'MM/AA';
    });

    cardCvvInput.addEventListener('input', function () {
        cardCvvDisplay.textContent = this.value || 'CVV';
    });

    function formatCardNumber(value) {
        const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
        return formattedValue || '• • • • • • • • • • • • • • • •';
    }

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();
    
        pagar.disabled = true;
    
        // Enviar el total a la base de datos
        fetch('http://localhost:3000/api/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nombreCliente: 'consumidor final',
                nombreEmpleado: 'cajero',
                total: total 
            }) // Enviar el total
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
    
            // Mostrar mensaje de éxito
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
    
                // Reiniciar el pedido y el formulario de pago
                orderList.innerHTML = '';
                resetMenu();
                pagar.disabled = false;

                // Limpiar los campos del formulario de pago
                cardNameInput.value = '';
                cardNumberInput.value = '';
                cardExpiryInput.value = '';
                cardCvvInput.value = '';
    
                // Ocultar el panel de pago y mostrar el panel de pedido
                paymentPanel.style.display = 'none';
                orderPanel.style.display = 'block';
    
                // Reiniciar el total
                total = 0;
                totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
            }, 3000); // Mensaje desaparece después de 3 segundos
        })
        .catch(error => {
            console.error('Error al registrar la venta:', error);
        });
    });

    // Aplicar máscaras a los campos de entrada usando IMask
    const cardNumberMask = IMask(cardNumberInput, {
        mask: '0000 0000 0000 0000',
        definitions: {
            '0': /[0-9]/
        }
    });

    const cardExpiryMask = IMask(cardExpiryInput, {
        mask: '00/00',
        blocks: {
            '00': {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12
            },
            '00': {
                mask: IMask.MaskedRange,
                from: 0,
                to: 99
            }
        }
    });

    const cardCvvMask = IMask(cardCvvInput, {
        mask: '000',
        definitions: {
            '0': /[0-9]/
        }
    });

    // Reiniciar el menú al cargar la página
    function resetMenu() {
        const sizeSelects = document.querySelectorAll('.size-select');
        const quantityInputs = document.querySelectorAll('.quantity-input');

        sizeSelects.forEach(select => {
            select.selectedIndex = 0;
        });

        quantityInputs.forEach(input => {
            input.value = 1;
        });
        
    }
    

    // Cargar los productos al cargar la página
    loadProducts();
});
