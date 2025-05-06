import { useState, useEffect, useContext } from "react";
import CartContext from "../../context/CartContext.jsx";
import './ProductList.scss';


export const ProductList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => setData(products));
    }, []);
    const {addToCart} = useContext(CartContext);
    return (
        <div className="product-list">
            <h2>Danh sách sản phẩm</h2>
            <div className="product-box">
                {data.map(product => (
                    <div key={product.id} className="product-item">
                    <img src={product.image} className="product-image" alt={product.title} />
                    <div className="product-info">
                        <a className="title" href={`/products/${product.id}`}>${product.title}</a>
                        <p className="price">${product.price}</p>
                        <button onClick={() => addToCart(product)} className="button-add-to-cart">Thêm vào giỏ hàng</button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}