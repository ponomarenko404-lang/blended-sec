import axios from "axios";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export { getCategories, getProducts, getProductsByCategory, searchProducts, getProductById, };
const api = axios.create ({
    baseURL: 'https://dummyjson.com'});

async function getCategories() {
    const res = await api.get('/products/category-list');
    return res.data;
};


async function getProducts(page = 1, limit = 12) {
    const skip = (page - 1) * limit;
const res = await api.get('/products', {
  params: {
    limit,
    skip,
  },
})
    return res.data;
};

async function getProductsByCategory(category, page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const res = await api.get(`/products/category/${category}`, {
        params: {
            limit,
            skip,
        }
    });

    return res.data;
}


// створили асинхронну функцію
async function getProductById(id) {
    // змінна для шляху до продукту по ід
    const res = await api.get(`/products/${id}`);
    // повертаємо дані
    return res.data;
};

async function searchProducts(query, page = 1, limit = 12) {
    const skip = (page - 1) * limit;
    const res = await api.get(`/products/search/`, {
        params: {
            q: query,
            limit,
            skip,
        }
    });
return res.data
};