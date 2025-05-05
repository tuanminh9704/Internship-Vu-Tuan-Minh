// CartItems.jsx
import './CartItems.scss';
import { useContext } from 'react';
import CartContext from '../../context/CartContext.jsx';

export const CartItems = () => {

    const {cart} = useContext(CartContext);
    console.log(cart);

    return (
        <div className="cart-items">
            <h2>🛒 Giỏ hàng</h2>
            {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className="info">
                        <h4>{item.title}</h4>
                        <p>{item.price.toLocaleString()}₫</p>
                    </div>
                    <button className="remove-btn">Xóa</button>
                </div>
            ))}
        </div>
    );
};
