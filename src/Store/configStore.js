import { createStore } from 'redux';
// import data from '../data/products';

const defaultState = {
    productList: [],
    productInCart: [],
    total: 0
}

//reducer
function updateCart(state = defaultState, action) {
    let newCart = Object.assign({}, state);

    switch (action.type) {

        case "setProducts":
            return {
                productList: action.data,
                productInCart: [],
                total: 0
            }
            break;

        case "addItem":
            let newArray = [...newCart.productInCart, action.data];
            newCart.total += action.data.price;
            return {
                productList: newCart.productList,
                productInCart: newArray,
                total: newCart.total
            }
            break;

        case "removeItem":

            const removeItemFromCartIndex = newCart.productInCart.findIndex(product => product.productNameInCart === action.data.productNameInCart);
            newCart.productInCart.splice(removeItemFromCartIndex, 1);
            let newArray1 = newCart.productInCart;
            newCart.total -= action.data.price;

            return {
                productList: newCart.productList,
                productInCart: newArray1,
                total: newCart.total
            }
            break;

        default:
            return newCart;

    }
    // return newCart;
}

var store = createStore(updateCart,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(store.getStore())
// store.dispatch({type: 'addItem', data: productName})

export default store;