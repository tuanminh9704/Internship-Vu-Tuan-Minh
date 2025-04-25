import { Header } from "../components/Header/Header.jsx"
import { ProductList } from "../components/ProductList/ProductList"
import {Cart} from '../components/Cart/Cart.jsx';
import { useState } from "react";

const products = [
    { id: 1, name: 'Product 1', price: 10, image: 'asus.png' },
    { id: 2, name: 'Product 2', price: 20, image: 'asus.png' },
    { id: 3, name: 'Product 3', price: 30, image: 'asus.png' },
    { id: 4, name: 'Product 4', price: 40, image: 'asus.png' },
    { id: 5, name: 'Product 5', price: 50, image: 'asus.png' },
    { id: 6, name: 'Product 6', price: 60, image: 'asus.png' },
];

export const Home = () => {
    const [cartItems, setCartItems] = useState([]);
    const handleOnAddToCart = (product) => {
        const productExisted = cartItems.find((item) => item.id === product.id);
        if(productExisted) {
            setCartItems(
                cartItems.map((item) =>
                  item.id === product.id ? { ...productExisted, quantity: productExisted.quantity + 1 } : item
                )
              );
        }
        else {
            setCartItems([...cartItems, {...product, quantity: 1}]);
        }

    }
    return (
        <>
            <Header />
            <ProductList products={products} onAddToCart={handleOnAddToCart}/>
            <Cart cartItems={cartItems}/>
        </>
    )
}