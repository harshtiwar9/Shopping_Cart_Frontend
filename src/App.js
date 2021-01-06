import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './components/Cart/Cart';
import ProductList from './components/ProductList/ProductList';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const App = () => {

    const dispatch = useDispatch();
    const dbUrl = "http://localhost:3001";
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => { console.log(show); setShow(false) };
    const handleShow = () => { console.log(show); setShow(true) };


    function removeFromCart(id, name, stock, price, currency) {
        // Product.setIsInCart(false)

        let data = {
            id: id,
            productNameInCart: name,
            stock: stock,
            price: price,
            currency: currency
        }

        axios.delete(dbUrl + "/cart/" + data.id)
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
                                dispatch({ 'type': 'addItem', data: response2.data[i] });
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
                <div className="col-8 col-md-8">
                    <h1> Shopping Cart Example</h1>
                </div>
                <div className="col-4 col-md-4">
                    <br />
                    <Button variant="primary" onClick={handleShow}>
                        Login
                    </Button>

                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <form>
                            <Modal.Body>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" variant="secondary">Login</Button>
                                <Button type="reset" variant="primary">Reset</Button>
                            </Modal.Footer>
                        </form>
                    </Modal>

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
