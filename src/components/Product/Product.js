import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function Product({ id, name, price, stock, currency, image }) {

    let updatedCart = useSelector(state => state);
    const dbUrl = "http://localhost:3001";
    const check = Object.values(updatedCart.productInCart)
    // console.log(updatedCart);
    const dispatch = useDispatch();

    let [isInCart, SetIsInCart] = useState(false);

    const addProductToCart = () => {

        let data = {
            id: id,
            productNameInCart: name,
            stock: stock,
            price: price,
            currency: currency
        }

        if (!check.find(e => { if (e.productNameInCart === name) { return true; } })) {

            axios.post(dbUrl + "/insertToCart?items=" + JSON.stringify(data))
            .then(function (response) {
                // console.log(response.data)
                if (response.data === true) {
                    console.log("Data Inserted to Cart!")
                    dispatch({ 'type': 'addItem', data: data })
                    SetIsInCart(true)
                } else {
                    console.log("Error while adding to Cart!")
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        }
        else {
            
            axios.delete(dbUrl + "/removefromcart?id=" + data.id)
            .then(function (response) {
                // console.log(response.data)
                if (response.data === true) {
                    console.log("Data removed from Cart!")
                    dispatch({ 'type': 'removeItem', data: data })
                    SetIsInCart(false)
                } else {
                    console.log("Error while removing from Cart!")
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        }

        // console.log("isInCart:" +isInCart)

        // console.log(productNameInCart)
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
                                check.find(e => { if (e.productNameInCart === name) { return true; } }) ? 'btn btn-danger' : 'btn btn-primary'
                        }

                        disabled={stock === 0 ? true : false}
                        onClick={() => addProductToCart()}
                    >
                        {
                            stock === 0 ? 'Out of Stock' :
                                check.find(e => { if (e.productNameInCart === name) { return true; } }) ? 'Remove' : 'Add to cart'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;