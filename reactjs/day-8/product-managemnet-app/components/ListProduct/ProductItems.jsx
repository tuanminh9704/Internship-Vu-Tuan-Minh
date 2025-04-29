import './ProductItems.scss';

export const ProductItems = ({products, handleOnAddToCart}) => {
    return (
        <div className="list-product">
            <h2>Danh sách sản phẩm</h2>
            {
                products.map((product) => (
                    <div key={product.id} className="box-product">
                        <img className="image" src={product.image} alt="" />
                        <div className='product-info'>
                            <h3 className="title">{product.title}</h3>
                            <p className="price">{product.price}$</p>
                            <button onClick={() => handleOnAddToCart(product)} className='button-add-to-cart'>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}