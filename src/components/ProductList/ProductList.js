import React from 'react';
import Product from '../Product/Product';
import './ProductList.css';
import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';

const ProductList = ({ products }) => {
  
  const productListState = useSelector(state => state.productList);
  const productInCart = useSelector(state => state.productInCart);

    return (
        <div>
            <h3>Products</h3>
            <ul className="product-list">
              {/* {console.log({...productInCart})} */}
              {productListState.map(product => (
                  <li key={product.id} className="product-list__item">
                    <Product {...product} />
                  </li>
              ))}
            </ul>
        </div>
    );
}


export default ProductList;
