function goBack() {
    window.history.back();
}

let quantity = 1; // Инициализация количества товаров

// Функция добавления товара в корзину
function addToCart() {
    // Действия при добавлении в корзину (например, отправка данных или обновление интерфейса)
    alert(`Добавлено в корзину: ${quantity} шт.`);
}

// Функция увеличения количества товаров
function incrementQuantity() {
    quantity++;
    updateQuantityDisplay();
}

// Функция уменьшения количества товаров (не может быть меньше 0)
function decrementQuantity() {
    if (quantity > 1) {
        quantity--;
        updateQuantityDisplay();
    }
}

// Функция обновления отображения количества
function updateQuantityDisplay() {
    const quantityDisplay = document.getElementById('quantity');
    quantityDisplay.textContent = quantity;
}

// Функция добавления товара в корзину
function addToCart() {
    const productName = 'Product Name'; // Название продукта
    const productPrice = 10.99; // Цена продукта
    const quantity = parseInt(document.getElementById('quantity').textContent); // Количество товаров

    // Создаем объект для товара
    const item = {
        name: productName,
        price: productPrice,
        quantity: quantity
    };

    // Получаем текущий список корзины из localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Добавляем новый товар в корзину
    cart.push(item);

    // Сохраняем обновленный список корзины в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Сообщаем пользователю, что товар добавлен в корзину
    alert(`Добавлено в корзину: ${quantity} шт. ${productName}`);
}

// Функция увеличения количества товаров
function incrementQuantity() {
    const quantityDisplay = document.getElementById('quantity');
    let quantity = parseInt(quantityDisplay.textContent);
    quantity++;
    quantityDisplay.textContent = quantity;
}

// Функция уменьшения количества товаров (не может быть меньше 1)
function decrementQuantity() {
    const quantityDisplay = document.getElementById('quantity');
    let quantity = parseInt(quantityDisplay.textContent);
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
}


// Функция увеличения количества определенного товара
function incrementItem(productName) {
    let cart = getCartFromLocalStorage();

    cart.forEach(item => {
        if (item.name === productName) {
            item.quantity++;
        }
    });

    saveCartToLocalStorage(cart);
    updateCartDisplay();
}

// Функция уменьшения количества определенного товара (не может быть меньше 1)
function decrementItem(productName) {
    let cart = getCartFromLocalStorage();

    cart.forEach(item => {
        if (item.name === productName && item.quantity > 1) {
            item.quantity--;
        }
    });

    saveCartToLocalStorage(cart);
    updateCartDisplay();
}

// Функция удаления определенного товара из корзины
function removeItem(productName) {
    let cart = getCartFromLocalStorage();

    cart = cart.filter(item => item.name !== productName);

    saveCartToLocalStorage(cart);
    updateCartDisplay();
}

// Функция для получения корзины из localStorage
function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Функция для сохранения корзины в localStorage
function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция для обновления отображения содержимого корзины
function updateCartDisplay() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = ''; // Очищаем текущий список товаров

    const cart = getCartFromLocalStorage();

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item">
                <span>${item.name}</span>
                <div class="quantity-controls">
                    <button onclick="decrementItem('${item.name}')">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="incrementItem('${item.name}')">+</button>
                </div>
                <button onclick="removeItem('${item.name}')">Удалить</button>
            </div>
        `;
        cartList.appendChild(li);
    });
}

// Запускаем функцию обновления отображения корзины при загрузке страницы
updateCartDisplay();