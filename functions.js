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

    // Обновляем количество товаров в корзине
    updateCartCount(); // Вызов функции для обновления счетчика

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
        const itemTotal = (item.price * item.quantity).toFixed(2); // Рассчитываем сумму для данного товара

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="images/product-icon.png">
                    <div class="nwhnbufw">
                        <div class="product-name">
                            <span>${item.name}</span>
                            <button class="cart-delete" onclick="removeItem('${item.name}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V7H2V5H22V7H20ZM6 7V20H18V7H6ZM7 2H17V4H7V2ZM11 10H13V17H11V10Z"/></svg>
                            </button>
                        </div>
                        <div class="quantity-controls">
                            <button onclick="decrementItem('${item.name}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11V13H19V11H5Z"/></svg>
                            </button>
                            <span>${item.quantity}</span>
                            <button onclick="incrementItem('${item.name}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"/></svg>
                            </button>
                        </div>
                        <div class="cart-price">$${itemTotal}</div> <!-- Отображаем сумму для данного товара -->
                    </div>
                </div>
            </div>
        `;
        cartList.appendChild(li);
    });

    // Обновляем общую сумму
    const totalAmount = calculateTotal();
    document.getElementById('cart-total-amount').textContent = `$${totalAmount}`;
}



// Запускаем функцию обновления отображения корзины при загрузке страницы
updateCartDisplay();

function calculateTotal() {
    const cart = getCartFromLocalStorage();
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    return total.toFixed(2); // Возвращает общую сумму с двумя знаками после запятой
}


function updateCartCount() {
    // Получаем корзину из localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Подсчитываем общее количество товаров в корзине
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Обновляем содержимое элемента с id "cart-count"
    document.getElementById('cart-count').textContent = totalItems;
}