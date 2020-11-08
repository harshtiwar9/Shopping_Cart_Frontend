import React from 'react';
import Cart from './components/Cart/Cart';
import ProductList from './components/ProductList/ProductList';
import Product from './components/Product/Product'
import data from './data/products';
import { useSelector, useDispatch} from 'react-redux';

const App = () => {

    const productList = useSelector(state => state.productList);

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
                    <Cart />
                </div>
            </div>

        </div>
    );
}

export default App;
