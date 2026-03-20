import refs from "./refs.js";
// export const renderRef = { renderCategories, renderProducts };
export { renderCategories, renderProducts };

function renderCategories(categories) {
    const markup = categories.map(item => {
        return `<li class="categories__item">
    <button class="categories__btn" type="button">${item}</button>
        </li>`;
    }).join('');

    refs.categories.innerHTML = markup;
};


function renderProducts(products, append = false) {
   
    const markup = products.map(product => {
        return `<li class="products__item" data-id="${product.id}">
        <img class="products__image" src="${product.thumbnail}" alt="${product.title}"/>
        <p class="products__title">${product.title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand: </span>${product.brand}</p>
        <p class="products__category">Category: ${product.category}</p>
    <p class="products__price">Price: $${product.price}</p>
        </li>`
    }).join('');
    if (append) {
        refs.products.insertAdjacentHTML("beforeend", markup);
    }
    else {
        refs.products.innerHTML = markup;
    }

    
};

