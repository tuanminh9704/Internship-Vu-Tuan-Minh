export const addProduct = (products, product) => {
    return [...products, product];
}


export const removeProductById = (products, id) => {
    const newProducts = products.filter(item => item.id !== id);
    return newProducts;
}

export const getTotalPrice = (products) => {
    const totalPrice = products.reduce((total, item) => total + item.price, 0);
    return totalPrice;
}

export const getProductNames = (products) => {
    const listNames = products.map(item => item.name);
    return listNames;
}

export const findProduct = (products, keyword) => {
    const product = products.find(item => item.name === keyword);
    return product;
}

export const getExpensiveProducts = (products, minPrice) => {
    const productsFounded = products.filter(item => item.price > minPrice);
    return productsFounded;
}
  