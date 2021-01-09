import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './components/Cart/Cart';
import ProductList from './components/ProductList/ProductList';
import { useDispatch } from 'react-redux';
import axios from 'axios';
var Cookies = require('js-cookie')

const App = () => {

    const dispatch = useDispatch();
    const dbUrl = "http://localhost:3001";
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email: e.target.login_email.value,
            pass: e.target.login_pass.value
        }

        axios.post(dbUrl + "/login", data)
            .then(function (response) {
                console.log(response.data)
                if (response.data.success === true) {
                    Cookies.set('AuthToken', response.data.AuthToken, { expires: response.data.maxAge })
                    Cookies.set('Email', data.email, { expires: response.data.maxAge })
                    if (response.data.success === true && Cookies.get('AuthToken') != null || "") {
                        console.log("User Logged in!");
                        window.location.href = "http://localhost:3000";
                    }

                } else {
                    console.log("Error while Login!")
                }
            })
            .catch(function (error) {
                alert("Error while login!")
                console.log(error)
            })
    }

    const handleLogout = () => {

        const data = {
            token: Cookies.get('AuthToken'),
            email: Cookies.get('Email')
        }

        axios.post(dbUrl + "/logout", data)
            .then(function (response) {
                console.log(response)
                if (response.data.success === true) {
                    Cookies.remove('AuthToken');
                    Cookies.remove('Email');
                    window.location.href = "http://localhost:3000";
                } else if (response.data.success === false) {
                    
                } else {
                    alert("Error while Logout!");
                }
            })
            .catch(function (error) {
                alert("Error while Logout!");
                console.log(error);
            })
    }

    const signUp = (e) => {
        e.preventDefault();
        // e.target.signup_pass.value
        // e.target.signup_email.value

        const data = {
            email: e.target.signup_email.value,
            pass: e.target.signup_pass.value
        }

        axios.post(dbUrl + "/signup", data)
            .then(function (response) {
                console.log(response.data)
                if (response.data.success === true) {
                    Cookies.set('AuthToken', response.data.AuthToken, { expires: response.data.maxAge })
                    Cookies.set('Email', data.email, { expires: response.data.maxAge })
                    if (response.data.success === true && Cookies.get('AuthToken') != null || "") {
                        console.log("User Registered!");
                        window.location.href = "http://localhost:3000";
                    }

                } else {
                    console.log("Error while registration!")
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        return false;
    }

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
                    {
                        Cookies.get('AuthToken') != null || "" ? 
                            <>
                                <span>Hi {Cookies.get('Email')},</span> 
                                &nbsp;<a href="#!" onClick={handleLogout}>Logout</a>
                            </>
                            :
                            <>
                                <a href="#!" onClick={handleShow}>Login</a>
                                <a href="#!" onClick={handleShow2}>/Signup</a>
                            </>
                    }
                    {/* <Button variant="primary" onClick={handleShow}>
                        Login
                    </Button> */}

                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={handleLogin}>
                            <Modal.Body>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name="login_email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="login_pass" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    &nbsp;<label className="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" variant="secondary">Login</Button>
                                <Button type="reset" variant="primary">Reset</Button>
                            </Modal.Footer>
                        </form>
                    </Modal>

                    <Modal show={show2} onHide={handleClose2} animation={false}>
                        <Modal.Header>
                            <Modal.Title>Signup</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={signUp}>
                            <Modal.Body>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name="signup_email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="signup_pass" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    &nbsp;<label className="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" variant="secondary">Signup</Button>
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
