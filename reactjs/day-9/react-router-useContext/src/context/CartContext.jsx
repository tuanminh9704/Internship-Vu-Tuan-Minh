import { createContext, useState } from "react"

const CartContext = createContext();
export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        // console.log(product);
        setCart((previousCart) => [...previousCart, product]);
    }

    const removeFromCart = (id) => {
        setCart((previousCart) => previousCart.filter(item => item.id !== id));
    }
    console.log(cart);
    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;