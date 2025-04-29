import './ProductForm.scss';

export const ProductForm = ({formData, handleOnChange, handleSubmitProduct}) => {

    return (
        <form className="product-form" onSubmit={handleSubmitProduct}>
            <input
                type="text"
                name="image"
                className="input-image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleOnChange}
            />
            <input
                type="text"
                name="title"
                className="input-title"
                placeholder="Product Title"
                value={formData.title}
                onChange={handleOnChange}
            />
            <input
                type="text"
                name="price"
                className="input-price"
                placeholder="Price"
                value={formData.price}
                onChange={handleOnChange}
            />
            <button type="submit" className="submit-button">
                Submit
            </button>
        </form>
    );
};
