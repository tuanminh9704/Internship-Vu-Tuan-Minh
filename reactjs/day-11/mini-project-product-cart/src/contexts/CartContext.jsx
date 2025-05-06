import { createContext, useReducer, useEffect } from "react";
import { CartReducer } from "../reducers/CartReducer.jsx";

const CartContext = createContext();

let storedCart = [];

const cartData = localStorage.getItem("cartData");

if (cartData) {
  try {
    const parsed = JSON.parse(cartData);
    if (Array.isArray(parsed)) {
      storedCart = parsed;
    }
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  items: storedCart,
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cart.items));
  }, [cart.items]);

  const addToCart = (product) => {
    const productExisted = cart.items.find((item) => item.id === product.id);
    if (productExisted) {
      const updatedItems = cart.items.map((item) =>
        item.id === product.id ? { ...item, stock: item.stock + 1 } : item
      );
      dispatch({
        type: "UPDATE_CART",
        items: updatedItems,
      });
    } else {
      const newProduct = { ...product, stock: 1 };
      dispatch({
        type: "ADD_TO_CART",
        product: newProduct,
      });
    }
  };

  const removeFromCart = (productId) => {
    const confirmed = window.confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không!');
    if(confirmed) {
      dispatch({
        type: "REMOVE_FROM_CART",
        productId,
      });
    }
  };

  const pressIncrease = (productId) => {
    const updatedItems = cart.items.map((item) =>
      item.id === productId ? { ...item, stock: item.stock + 1 } : item
    );

    dispatch({
      type: "UPDATE_CART",
      items: updatedItems,
    });
  };

  const pressDecrease = (productId) => {
    const productExisted = cart.items.find((item) => item.id === productId);
    if (productExisted.stock === 1) {
      dispatch({
        type: "REMOVE_FROM_CART",
        productId,
      });
    } else {
      const updatedItems = cart.items.map((item) =>
        item.id === productId ? { ...item, stock: item.stock - 1 } : item
      );
      dispatch({
        type: "UPDATE_CART",
        items: updatedItems,
      });
    }
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        pressIncrease,
        pressDecrease,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
