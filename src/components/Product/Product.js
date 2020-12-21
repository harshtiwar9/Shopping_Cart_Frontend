import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';

function Product ({ name, price, currency, image }){

let updatedCart = useSelector(state => state);
const check = Object.values(updatedCart.productInCart)
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
                            className={check.find(e => {if(e.productNameInCart === name){ return true;}}) ? 'btn btn-danger' : 'btn btn-primary'}
                            // onClick = { () => console.log(`${name} is added to cart`)}
                            // onClick = { () => dispatch({'type': 'addItem', data : {name,price,currency}})}
                            onClick = { () => addProductToCart()}
                        >
                            {console.log("Here!")}
                            {check.find(e => {if(e.productNameInCart === name){ return true;}}) ? 'Remove' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>
        );
}



export default Product;
