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

function sendCartToBot() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    const totalAmount = calculateTotal();
    const cartDetails = cart.map(item => 
        `${item.name} - ${item.quantity} шт. - $${item.price}`
    ).join('\n');
    
    const message = `Ваша корзина:\n${cartDetails}\n\nОбщая сумма: $${totalAmount}`;
    
    const botToken = '7003736022:AAGPGT8bMaFSzJ20XxH_r-NabecZPTGSoR0';
    const chatId = '7065197387';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Корзина успешно отправлена боту!');
        } else {
            alert('Ошибка при отправке корзины!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ошибка при отправке корзины!');
    });
}
