//Логіка сторінки Home
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import refs from './js/refs.js';

import { renderCategories, renderProducts } from './js/render-function.js';

import { getCategories, getProducts, getProductsByCategory } from './js/products-api.js';

// початкова змінна для сторінки 
let currentPage = 1;

// кількість айтемів на сторінці
const perPage = 12;

let currentCategory = 'All';

// функція для додавання лоадмор кнопки з перевіркою для того щоб коли є товар Ю 12 вона була коли товару менше 12 то зникала
function updateLoadMoreButton(productData) {
 const loadedProducts = currentPage * perPage;
    const totalProducts = productData.total;
    const productsOnPage = productData.products.length;
    if (loadedProducts >= totalProducts || productsOnPage < perPage) {
        refs.loadMoreBtn.classList.add('is-hidden');
    }
    else {
        refs.loadMoreBtn.classList.remove('is-hidden');
    }
}

// функція для рендеру всього товару

async function initHomePage() {
    const categories = await getCategories();
    categories.unshift('All');
    renderCategories(categories)

    const productData = await getProducts(currentPage, perPage);
    renderProducts(productData.products);

    // показ кнопки лоад мор
   updateLoadMoreButton(productData);
    
    // додаю на олл клас ектів
    const firstCategoryBtn = refs.categories.querySelector('.categories__btn');
    firstCategoryBtn.classList.add('categories__btn--active');

};
// додаємо товари при кліку на кнопку
refs.loadMoreBtn.addEventListener('click', async (e) => {
    currentPage += 1;
    let productData;
    if (currentCategory === 'All') {
        productData = await getProducts(currentPage, perPage)
    }
    else {
        productData = await getProductsByCategory(currentCategory, currentPage, perPage)
    }
    renderProducts(productData.products, true);
  updateLoadMoreButton(productData);
});

initHomePage() ;

refs.categories.addEventListener('click', async (e) => {
    
    const btn = e.target.closest('.categories__btn');
    if (!btn)
        return;
    
    const category = btn.textContent;
    currentCategory = category;
// додаю активеий клас на кнопку
    const activeBtn = refs.categories.querySelector('.categories__btn--active');
    currentPage = 1;
    if (activeBtn) {
        activeBtn.classList.remove('categories__btn--active');
    }
        btn.classList.add('categories__btn--active');
    
    // console.log(category);
    if (category === 'All') {
        const productData = await
        getProducts(currentPage, perPage);
        renderProducts(productData.products);
        updateLoadMoreButton(productData);

    }
    else {
        const productData = await
        getProductsByCategory(category, currentPage, perPage);
        renderProducts(productData.products);
        updateLoadMoreButton(productData);
    }
});

// кнопка лоад море