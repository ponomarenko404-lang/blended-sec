import refs from "./refs.js";
import { getProductById } from "./products-api.js";
import { renderModalProduct } from "./render-function.js";
import { addToCart, removeFromCart, getCartButton } from "./helpers.js";

let storage = JSON.parse(localStorage.getItem('cart')) || [];
let currentModalProductId = null;

// ------------------------------
// Відкриття модалки при кліку на продукт
// ------------------------------
refs.products.addEventListener('click', async (e) => {
    const productItem = e.target.closest('.products__item');
    if (!productItem) return;

    const productId = productItem.dataset.id;
    const product = await getProductById(productId);

    currentModalProductId = product.id; // зберігаємо для модалки
    renderModalProduct(product);

    // оновлюємо текст кнопки залежно від того, чи є товар у кошику
    const btn = getCartButton();
    if (btn) {
        btn.textContent = storage.includes(currentModalProductId)
            ? 'Remove from cart'
            : 'Add to cart';
    }

    refs.modal.classList.add('modal--is-open');
});

// ------------------------------
// Логіка кнопки Add/Remove Cart
// ------------------------------
refs.modal.addEventListener('click', (e) => {
    const btn = e.target.closest('.modal-product__btn--cart');
    const clickedBackdrop = e.target === refs.modal;

    // закриття по бекдропу
    if (clickedBackdrop) {
        refs.modal.classList.remove('modal--is-open');
        return;
    }

    if (!btn) return;

    if (storage.includes(currentModalProductId)) {
        storage = removeFromCart(currentModalProductId, storage);
    } else {
        storage = addToCart(currentModalProductId, storage);
    }

    console.log('current cart:', storage);
    console.log('localStorage:', localStorage.getItem('cart'));
});

// ------------------------------
// Закриття модалки по кнопці X
// ------------------------------
refs.modalCloseBtn.addEventListener('click', () => {
    refs.modal.classList.remove('modal--is-open');
});

// ------------------------------
// Закриття модалки по клавіші Escape
// ------------------------------
window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && refs.modal.classList.contains('modal--is-open')) {
        refs.modal.classList.remove('modal--is-open');
    }
});