import React from 'react';
import { useDispatch} from 'react-redux';


const CartItem = ({ productNameInCart, price, currency }) => {

    const dispatch = useDispatch();

    return (
        <div className="cart-item">
            <div>
                <button className="btn btn-danger btn-xs" onClick={() => dispatch({'type': 'removeItem', data : {productNameInCart,price,currency}})}>X</button>
                {/* <button className="btn btn-danger btn-xs" onClick={""}>X</button> */}
                <span className="cart-item__name">{productNameInCart}</span>
            </div>
            <div className="cart-item__price">{price} {currency}</div>
        </div>
    );
}


export default CartItem;
