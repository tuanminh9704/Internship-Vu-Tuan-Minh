import { CartItems } from "../../components/CartItem/CartItems.jsx";
import { Header } from "../../components/Header/Header.jsx";
import { CartProvider } from "../../context/CartContext.jsx";

export const Cart = () => {
    return (
        <>  
            {/* <CartProvider> */}
                <Header />
                <CartItems />
            {/* </CartProvider> */}
        </>
    );
}