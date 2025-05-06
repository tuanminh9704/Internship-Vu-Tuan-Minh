# Day 17: useReducer + Custom Hook
## Nội dung chính
- Phân biệt useReducer vs useState
- Refactor Context dùng useReducer
- Tạo Custom Hook useCart()
- Call API NodeJS của chính mình ( 2 tuần trước )
- Xử lý loading, error, validate form

## Phân biệt useReducer vs useState
## useState
Nói về React Hook, đã có nhiều bài viết về useState, nó cho phép sử dụng state và các chức năng khác của React (life cycle, side effect,...) mà không cần viết class component.

```
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Reducer 

Để sử dụng useReducer hook; đầu tiên chúng ta cần biết reducer là gì, đơn giản là một hàm có 2 tham số là state, action và trả về new state sau khi thực hiện một action, hãy tưởng tượng reducer như là một bộ chuyển đổi, nhận input, thực hiện action tác động đến input đó, rồi tạo ra output.

Ví dụ: 
```
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};
```

Ở trên là một Todo reducer; state ban đầu là list items todo, có 2 kiểu action type để chuyển đổi 2 trạng thái tương ứng của item là complete: true or false.

```
import React from 'react';

const initialTodos = [...]; // same as above
const todoReducer = (state, action) => newState; //same as above

const App = () => {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

  const handleChange = todo => {
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleChange(todo)}
            />
            {todo.task}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default App;

```

Ở ví dụ trên:

- React.useReducer: dòng này sử dụng useReducer với 2 tham số todoReducer và initialTodos, trả về todos hiện tại và dispatch dùng để send action đến reducer làm thay đổi list todos
- handleChange: hàm này dùng để dispatch action chuyển đổi trạng thái của item là hoàn thành or chưa hoàn thành
- Tiếp theo chúng ta sẽ render ra list item todos đi kèm với 1 checkbox để switch trạng thái complete của item đó, mỗi lần check or uncheck thì sẽ call handleChange
- Mỗi lần switch trạng thái hoàn thành như vậy sẽ update todos và component sẽ đươcj render lại với list todos vừa được update

------------------
## Bài tập
## Refactor Context dùng useReducer:
Thêm file CartReducer.jsx
```
export const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            return {...state, item: [state.items, action.product]};
        case 'REMOVE_FROM_CART':
            return {...state, item: state.items.filter(item => item.id !== action.productId)}
        default:
            return state;
    }
}

```

Refactor CartContext:

```
// CartContext.js

import React, { createContext, useReducer } from 'react';
import cartReducer from './cartReducer';

const CartContext = createContext();

const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

```

