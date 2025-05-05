import { useState, useEffect } from "react"
import { useParams } from "react-router";

export const ProductDetail = () => {
    const [data, setData] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(product => setData(product))
    })
    return (
        <div className="product-detail">
            <h2>{data.title}</h2>
            <img src={data.image} alt={data.title} width="100" />
            <p>{data.description}</p>
            <p>Giá: ${data.price}</p>
        </div>
    );
    

}