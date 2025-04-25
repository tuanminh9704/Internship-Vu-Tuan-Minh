export const Cart = ({cartItems}) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return (
        <div>
            <h2>Giỏ hàng</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                    {item.name} - {item.price}đ x {item.quantity}
                    </li>
                ))}
            </ul>
            <h3>Total Price: {totalPrice}</h3>
        </div>
    )
}