import React, { useEffect, useState } from 'react';
import Cart from './components/Cart/Cart';
import ProductList from './components/ProductList/ProductList';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const App = () => {

    const dispatch = useDispatch();
    const dbUrl = "http://localhost:3001";
    const [products, setProducts] = useState([]);

    function removeFromCart(id,name,stock, price, currency) {
        // Product.setIsInCart(false)
    
        let data = {
            id: id,
            productNameInCart: name,
            stock: stock,
            price: price,
            currency: currency
        }

        axios.delete(dbUrl + "/cart/"+data.id)
            .then(function (response) {
                // console.log(response.data)
                if (response.data === true) {
                    console.log("Data removed from Cart!")
                    dispatch({ 'type': 'removeItem', data: data })
                } else {
                    console.log("Error while removing from Cart!")
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        // console.log(data)
    }

    function getProducts() {
        axios.get(dbUrl + "/products")
            .then(function (response) {
                dispatch({ 'type': 'setProducts', data: response.data })
                setProducts(response.data);
                axios.get(dbUrl + "/cart")
                    .then(function (response2) {
                        if (response2.data != null) {
                            // console.log(Object.keys(response2.data))
                            // console.log(response2.data)
                            for (let i = 0; i < response2.data.length; i++) {
                                dispatch({ 'type': 'addItem', data: response2.data[i]});
                            }
                            // console.log(data)
                            // dispatch({ 'type': 'addItem', data: data })
                        }
                    })
                // console.log(response.data)
            }).catch(function (error) {
                console.log(error);
            })
    }

    useEffect(getProducts, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1> Shopping Cart Example</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    {/* <ProductList products={ productList }/> */}
                    <ProductList products={products} />
                </div>
                <div className="col-md-4">
                    <Cart removeFromCart={removeFromCart} />
                </div>
            </div>

        </div>
    );
}

export default App;
