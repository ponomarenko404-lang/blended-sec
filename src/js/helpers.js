export function getCartButton() {
    return document.querySelector('.modal-product__btn--cart');
};


 function addToCart(productId, storage) {
    // productId в storage
   if (!storage.includes(productId)) {
       storage.push(productId);
       const btn = getCartButton();
if (btn) btn.textContent = 'Remove from cart';
}
//онови localStorage
    localStorage.setItem('cart', JSON.stringify(storage));

    return storage;
};

 function removeFromCart(productId, storage) {
    // productId в storage
    if (storage.includes(productId)) {
       storage = storage.filter(id => id !== productId);
    const btn = getCartButton();
if (btn) btn.textContent = 'Add to cart';
       
} //онови localStorage
    localStorage.setItem('cart', JSON.stringify(storage));
    return storage;
};

export { addToCart, removeFromCart };