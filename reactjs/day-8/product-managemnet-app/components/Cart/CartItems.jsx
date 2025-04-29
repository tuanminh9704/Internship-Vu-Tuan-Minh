import './CartItems.scss';

export const CartItems = ({cartItem, handleAddquantity, handleReduceQuantity}) => {
    const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
    // console.log(cartItem);
    return (
        <div className="list-cart">
            <h2 className='cart'>Giỏ hàng</h2>
            <p className='total-price'>Tổng giá: {totalPrice}$</p>
            {
                cartItem.map((item) => (
                    <div className='cart-info'>
                        <div className='cart-item'>
                            <img className='cart-image' src={item.image} alt="Product 1"/>
                            <div className="cart-details">
                                <h3 className='carttem-title'>{item.title}</h3>
                                <p className="cart-price">{item.price}</p>
                                <div className='cart-quantity'>
                                    <button onClick={() => handleReduceQuantity(item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleAddquantity(item)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}