import refs from "./refs.js";
import axios from "axios";
import { getProductById, } from "./products-api.js";
import { renderModalProduct } from "./render-function.js";
// делегування подій

refs.products.addEventListener('click', async (e) => {
    const productItem = e.target.closest('.products__item');
  
    if (!productItem)
        return;
    const productId = productItem.dataset.id;
    const product = await getProductById(productId);
    
    renderModalProduct(product);
    refs.modal.classList.add('modal--is-open');
    
});

// закриття по кліку на бекдроп

refs.modal.addEventListener('click', async (e) => {
    const modal = e.target;
    
    if (modal === refs.modal)
        refs.modal.classList.remove('modal--is-open');  
})
// закриття по кнопці х
refs.modalCloseBtn.addEventListener('click', (e) => {
        refs.modal.classList.remove('modal--is-open');

})
// закриття по кнопці еск
window.addEventListener('keyup', (e) => {

    if (e.key === 'Escape' && refs.modal.classList.contains('modal--is-open'))
        refs.modal.classList.remove('modal--is-open');
} )