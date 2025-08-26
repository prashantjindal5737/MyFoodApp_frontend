import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, decrementItem, incrementItem } from '../features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Cart.css';
import { toast } from 'react-toastify';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const placeOrder = async () => {
    const token = localStorage.getItem('authToken');
    // console.log(token)
    if (!token) {
      toast.error('Please login to place order');
      return navigate('/login');
    }
    try {
      const resp = await fetch('https://myfoodapp-backend-1.onrender.com/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        // console.log(Authorization)
        body: JSON.stringify({ items: cart })
      });
//       console.log("Fetch headers:", {
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer ${token}`
// });

      const json = await resp.json();
      if (json.success) {
        toast.success('Order placed successfully!');
        dispatch(clearCart());
        navigate('/my-orders');
      } else {
        toast.error(json.error || 'Failed to place order');
      }
    } catch (e) {
      toast.error('Server error');
      console.error(e);
    }
  };

  if (!cart.length) return (
    <div className="container cart-empty">
      <h1>Your cart is empty</h1>
      <Link to="/">Order now</Link>
    </div>
  );

  return (
    <div className="container cart">
      <table className="cart-table">
        <thead>
          <tr><th>#</th><th>Name</th><th>Price</th><th>Qty</th><th>Total</th><th>Remove</th></tr>
        </thead>
        <tbody>
          {cart.map((i, idx) => (
            <tr key={`${i.id}-${i.price}`}>
              <td>{idx + 1}</td>
              <td>{i.name}</td>
              <td>₹{i.price}</td>
              <td className="qty-cell">
                <Button size="sm" variant="outline-secondary" onClick={() => dispatch(decrementItem({ id: i.id, price: i.price }))}>−</Button>
                <span className="qty-badge">{i.quantity}</span>
                <Button size="sm" variant="outline-secondary" onClick={() => dispatch(incrementItem({ id: i.id, price: i.price }))}>+</Button>
              </td>
              <td>₹{i.price * i.quantity}</td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => dispatch(removeFromCart({ id: i.id, price: i.price }))}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="cart-total">Total: ₹{total}</h2>
      <div className="cart-actions">
        <Button variant="success" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
        <Button variant="primary" onClick={placeOrder}>Place Order</Button>
      </div>
    </div>
  );
};

export default Cart;
