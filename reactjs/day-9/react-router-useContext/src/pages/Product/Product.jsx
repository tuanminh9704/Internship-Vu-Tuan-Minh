import { Header } from "../../components/Header/Header.jsx";
import {Outlet} from 'react-router-dom';
import { CartProvider } from "../../context/CartContext.jsx";
export const Product = () => {
    return (
        <>  
            {/* <CartProvider> */}
                <Header />
                <Outlet />
            {/* </CartProvider> */}
        </>
    );
}