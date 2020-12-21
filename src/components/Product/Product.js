import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';

function Product ({ name, price, currency, image }){

let updatedCart = useSelector(state => state.productInCart);
// console.log(updatedCart);
const dispatch = useDispatch();

let [isInCart,SetIsInCart] = useState(false);

const addProductToCart = () =>{

    let data = {
        productNameInCart : name,
        price : price,
        currency : currency
    }

    if(!isInCart){    
        
        dispatch({'type': 'addItem', data : data})
        SetIsInCart(true)
    }
    else{
        dispatch({'type': 'removeItem', data : data})
        SetIsInCart(false)
    }

    // console.log("isInCart:" +isInCart)

    // console.log(productNameInCart)
}

function removeItemFromCart(){

    console.log("Here")
    let data = {
        productNameInCart : name,
        price : price,
        currency : currency
    }

    dispatch({'type': 'removeItem', data : data})
    SetIsInCart(false)
}

//

        return (
            <div className="product thumbnail">
                <img src={image} alt="product" />
                <div className="caption">
                    <h3>{name}</h3>
                    <div className="product__price">{price} {currency}</div>
                    <div className="product__button-wrap">
                        <button
                            className={isInCart ? 'btn btn-danger' : 'btn btn-primary'}
                            // onClick = { () => console.log(`${name} is added to cart`)}
                            // onClick = { () => dispatch({'type': 'addItem', data : {name,price,currency}})}
                            onClick = { () => addProductToCart()}
                        >
                            {console.log(updatedCart.typeOf)}
                            {updatedCart.find(e => e.productNameInCart === name) ? 'Remove' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>
        );
}



export default Product;
