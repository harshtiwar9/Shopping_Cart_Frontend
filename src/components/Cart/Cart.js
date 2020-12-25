import React from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import './Cart.css';
import {useSelector} from 'react-redux'

const Cart = ({removeFromCart}) => {

    const items = useSelector(state => state.productInCart);
    const cartTotal = useSelector(state => state.total);
    const dbUrl = "http://localhost:3001";

    function placeOrder(){

        axios.post(dbUrl+"/placeOrder?items="+JSON.stringify(items))
        .then(function(response){
            // console.log(response.data)
            if(response.data === true){
                alert("Order Placed");
                window.location.href = "http://localhost:3000";
            }else{
                alert("Issue while placing Order!");
            }
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return (
        <div>
            <h3>Shopping Cart</h3>

            <div className="cart">
                <div className="panel panel-default">
                    <div className="panel-body">
                        { items && items.length > 0 && (
                            <div className="cart__body">
                                {items.map(item => (
                                    <CartItem key={item.id} {...item} removeFromCart={removeFromCart} />
                                ))}
                            </div>
                        )}
                        <div className="cart__total">Total: {cartTotal} EUR</div>
                        <br/>
                        {cartTotal > 0 ? <button className="btn btn-success" onClick={() => placeOrder()} >Place Order</button> : null }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
