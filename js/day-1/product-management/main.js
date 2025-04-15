import { addProduct, removeProductById, getTotalPrice, getProductNames, findProduct, getExpensiveProducts } from "./product.js";

const products = [
    { id: 1, name: 'iPhone', price: 1000 },
    { id: 2, name: 'iPad', price: 800 },
    { id: 3, name: 'Macbook', price: 2000 }
];
  
const newProduct = { id: 4, name: 'SamSung', price: 2000 };

const addNewProduct = addProduct(products, newProduct);
console.log(addNewProduct);

const deletedProduct = removeProductById(products, 2);
console.log(deletedProduct);

const totalPrice = getTotalPrice(products);
console.log(totalPrice);

const listNames = getProductNames(products);
console.log(listNames);

let keyword = 'Macbook';
const product = findProduct(products, keyword);
console.log(product);

const productsFounded = getExpensiveProducts(products, 900);
console.log(productsFounded);