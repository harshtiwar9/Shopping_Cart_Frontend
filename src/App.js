import React, { useEffect, useState } from 'react';
import Cart from './components/Cart/Cart';
import ProductList from './components/ProductList/ProductList';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const App = () => {

    const dispatch = useDispatch();
    const dbUrl = "http://localhost:3001";
    const [products, setProducts] = useState([]);

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

    function getProducts(){
        axios.get(dbUrl+"/getproducts")
        .then(function(response){
            dispatch({'type': 'setProducts', data : response.data})
            setProducts(response.data);
            // console.log(response.data)
        })
    }

    useEffect(getProducts,[]);

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
                    <Cart removeFromCart={ removeFromCart} />
                </div>
            </div>

        </div>
    );
}

export default App;
