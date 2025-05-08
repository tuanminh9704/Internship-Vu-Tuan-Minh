import './CartItems.scss';
import { useContext, useEffect } from 'react';
import CartContext from '../../contexts/CartContext';

export const CartItems = () => {
    const { cart, pressIncrease, pressDecrease, removeFromCart} = useContext(CartContext);
    const totalPrice = cart.items.reduce((total, item) => total + (item.price * item.stock), 0);

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(cart.items));
    }, [cart.items]);
    return (
        <div className="cart-items">
            <h2>🛒 Giỏ hàng</h2>
            <h2 className='total-price'>Tổng giá: {totalPrice.toLocaleString()}$</h2>
            {cart.length === 0 ? (
                <p>Không có sản phẩm nào trong giỏ hàng.</p>
            ) : (
                cart.items.flat().map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' alt={item.name} />
                        <div className="info">
                            <h4>{item.name}</h4>
                            <p>{item.price.toLocaleString()}₫</p>
                        </div>
                        <div className="button-amount">
                            <button onClick={() => pressDecrease(item.id)} className='button-decrease'>-</button>
                            <span className='stock'>{item.stock}</span>
                            <button onClick={() => pressIncrease(item.id)} className='button-increase'>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="remove-btn">Xóa</button>
                    </div>
                ))
            )}
        </div>
    );
};
