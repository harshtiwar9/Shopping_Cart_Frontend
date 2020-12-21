import React, { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import ProductList from './components/ProductList/ProductList';
import Product from './components/Product/Product'
import data from './data/products';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const App = () => {

    const productList = useSelector(state => state.productList);
    const dispatch = useDispatch();
    const dbUrl = "http://localhost:3001";

    function removeFromCart(name,price,currency){
        // Product.setIsInCart(false)
        let data = {
            productNameInCart : name,
            price : price,
            currency : currency
        }
        dispatch({'type': 'removeItem', data : data})
        // console.log(data)
    }

    function checkConnection(){
        axios.get(dbUrl+"/readfile")
        .then(function(response){
            console.log(response.data)
        })
    }

    useEffect(checkConnection,[]);

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
                    <ProductList/>
                </div>
                <div className="col-md-4">
                    <Cart removeFromCart={ removeFromCart} />
                </div>
            </div>

        </div>
    );
}

export default App;
