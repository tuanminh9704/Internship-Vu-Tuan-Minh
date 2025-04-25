import './ProductList.scss';

export const ProductList = ({products, onAddToCart}) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className='product-item'>
                    <h3 className='product-name'>{product.name}</h3>
                    <img className='product-image' src={product.image} alt={product.name}/>
                    <p className='product-price'>{product.price}$</p>
                    <button onClick={() => onAddToCart(product)} className='button-add-to-cart'>Add</button>
                </div>
            ))}
        </div>
    );
};
