import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';

function Product ({id, name, price, stock, currency, image }){

let updatedCart = useSelector(state => state);
const check = Object.values(updatedCart.productInCart)
// console.log(updatedCart);
const dispatch = useDispatch();

let [isInCart,SetIsInCart] = useState(false);

const addProductToCart = () =>{

    let data = {
        id:id,
        productNameInCart : name,
        stock : stock,
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

    let data = {
        id:id,
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
                            className={
                                stock === 0 ? 'btn btn-primary text-white' :
                                check.find(e => {if(e.productNameInCart === name){ return true;}}) ? 'btn btn-danger' : 'btn btn-primary'
                            }
                            
                            disabled={stock === 0 ? true : false}

                            // onClick = { () => console.log(`${name} is added to cart`)}
                            // onClick = { () => dispatch({'type': 'addItem', data : {name,price,currency}})}
                            onClick = { () => addProductToCart()}
                        >
                            {/* {check.find(e => {if(e.productNameInCart === name){ return true;}}) ? 'Remove' : 'Add to cart'} */}
                            {/* {console.log(stock+" : "+typeof(stock))} */}
                            {
                                stock === 0 ? 'Out of Stock' :
                                check.find(e => {if(e.productNameInCart === name){ return true;}}) ? 'Remove' : 'Add to cart'
                            }
                        </button>
                    </div>
                </div>
            </div>
        );
}



export default Product;
