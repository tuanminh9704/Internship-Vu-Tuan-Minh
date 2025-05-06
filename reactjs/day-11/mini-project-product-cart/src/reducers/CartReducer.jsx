export const CartReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            return {...state, items: [...state.items, action.product]}
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.productId)
            };
        case "UPDATE_CART":
            return {
                ...state,
                items: action.items,
            };
        default: 
            return state
    }
}