import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar1 from "./components/Navbar";
import Footer from './components/Footer';
import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import Cart from './screen/Cart';
// import AddFood from './screen/AddFood';
import MyOrders from './screen/MyOrders';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/addfood" element={<AddFood />} /> */}
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  </Provider>
);

export default App;
