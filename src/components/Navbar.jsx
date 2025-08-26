// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/searchSlice';
import './Navbar.css';

const Navbar1 = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const searchTerm = useSelector(state => state.search.searchTerm);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  const cartCount = cart.reduce((a, i) => a + i.quantity, 0);

  return (
    <div className="navbarmain">
      <Link to="/" className="title1">FoodieExpress</Link>

      <input
        type="text"
        placeholder="Search food"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />

      <button className="btn" onClick={() => navigate('/cart')}>
        My Cart <Badge bg="danger">{cartCount}</Badge>
      </button>

      {isLoggedIn && (
        <button className="btn" onClick={() => navigate('/my-orders')}>
          My Orders
        </button>
      )}

      <div style={{ marginLeft: 'auto' }}>
        {isLoggedIn ? (<>
          <span> {}</span>
          <button className="btn" onClick={logout}>Logout</button>
        </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar1;
