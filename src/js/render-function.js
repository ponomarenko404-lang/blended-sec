import refs from "./refs.js";
// export const renderRef = { renderCategories, renderProducts };
export { renderCategories, renderProducts, renderModalProduct };

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

// функція для рендеру продукту в модалку

function renderModalProduct(product) {
    const markup =
        `<img class="modal-product__img" src="${product.thumbnail}" alt="${product.title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${product.title}</p>
        <ul class="modal-product__tags">${product.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
        <p class="modal-product__description">${product.description}</p>
        <p class="modal-product__shipping-information">Shipping:${product.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy:${product.returnPolicy}</p>
        <p class="modal-product__price">Price: $${product.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`
    ;
    refs.modalRenderProduct.innerHTML = markup;
};

