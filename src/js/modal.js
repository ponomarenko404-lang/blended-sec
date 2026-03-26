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

