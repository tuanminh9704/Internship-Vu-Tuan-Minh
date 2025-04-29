import './Home.scss';
import { useState, useEffect } from 'react';
import { ProductItems } from '../../components/ListProduct/ProductItems.jsx';
import { CartItems } from '../../components/Cart/CartItems.jsx';
import { ProductForm } from '../../components/ProductForm/ProductForm.jsx';

export const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => setData(products))
    }, [])
    const [cartItem, setCartItem] = useState([]);
    const handleOnAddToCart = (product) => {
        const productExisted = cartItem.find((item) => item.id === product.id);
        if(productExisted) {
            setCartItem(
                cartItem.map(item => item.id === product.id ? 
                    {...productExisted, quantity: productExisted.quantity + 1} 
                    : 
                    item
                )
            )
        }
        else {
            setCartItem([...cartItem, {...product, quantity: 1}]);
        }

    }

    const handleAddquantity  = (product) => {
        const productExisted = cartItem.find((item) => item.id === product.id);
        if(productExisted) {
            setCartItem(
                cartItem.map(item => item.id === product.id ? 
                    {...productExisted, quantity: productExisted.quantity + 1} 
                    : 
                    item
                )
            )
        }
    }
    const handleReduceQuantity = (product) => {
        const productExisted = cartItem.find((item) => item.id === product.id);
        if (!productExisted) return;
    
        if (productExisted.quantity === 1) {
            const newCartItems = cartItem.filter((element) => element.id !== productExisted.id);
            setCartItem(newCartItems);
        } else {
            setCartItem(
                cartItem.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }
    };

    const [formData, setFormData] = useState({
        image: '',
        title: '',
        price: '',
    });

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        // console.log(name, value);
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmitProduct = (e) => {
        e.preventDefault();
        if(formData.title.trim === "") {
            alert('Tiêu đề không được để trống!');
            return;
        }
        if(formData.price.trim() === "") {
            alert('Giá không được để trống!');
            return;
        }
        const newProduct = {
            id: data.length + 1,
            image: formData.image,
            title: formData.title,
            price: parseFloat(formData.price),
        };
        console.log('newProduct', newProduct)
        setData([...data, newProduct]);
        setFormData({ image: '', title: '', price: '' }); 
    };
    
    
    return (
        <div className="home">
            <div className='product'>
                <ProductItems products={data} handleOnAddToCart={handleOnAddToCart}/>
            </div>
            <div className='cart'>
                <CartItems cartItem={cartItem} handleAddquantity={handleAddquantity} handleReduceQuantity={handleReduceQuantity}/>
            </div>
            <ProductForm formData={formData} handleOnChange={handleOnChange} handleSubmitProduct={handleSubmitProduct}/>
        </div>
    )
}