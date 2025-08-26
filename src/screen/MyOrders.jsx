import React, { useEffect, useState } from 'react';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;
        const resp = await fetch('http://localhost:5000/orders/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await resp.json();
        if (json.success) setOrders(json.orders || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!localStorage.getItem('authToken')) {
    return <div className="container"><h2>Please login to view your orders.</h2></div>;
  }

  return (
    <div className="container orders">
      <h2>My Orders</h2>
      {!orders.length ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o, idx) => (
          <div className="order-card" key={o._id}>
            <div className="order-header">
              <span>Order #{idx + 1}</span>
              <span>Amount: ₹{o.amount}</span>
              <span>{new Date(o.createdAt).toLocaleString()}</span>
            </div>
            <ul className="order-items">
              {o.items.map((it, i) => (
                <li key={i}>
                  <span>{it.name}</span>
                  <span>₹{it.price} × {it.quantity} = ₹{it.price * it.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
