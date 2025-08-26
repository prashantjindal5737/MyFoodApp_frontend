import { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementItem, decrementItem } from '../features/cartSlice';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import './Cards.css';

const Cards = ({ fooditems, quantity }) => {
  const dispatch = useDispatch();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const cart = useSelector(state => state.cart);

  useEffect(() => setSize(priceRef.current.value), []);

  // find existing cart line for this product + current size price
  const currentLine = useMemo(() => {
    const p = Number(size);
    return cart.find(i => i.id === fooditems._id && Number(i.price) === p);
  }, [cart, fooditems._id, size]);

  const handleAdd = () => {
    dispatch(addToCart({
      id: fooditems._id,
      name: fooditems.name,
      price: Number(size),
      quantity: Number(qty),
    }));
    toast.success("Added to cart");
  };

  const finalPrice = Number(size) * Number(qty);
  const qtyInCart = currentLine?.quantity || 0;
  const amountInCart = (currentLine?.price || 0) * qtyInCart;

  return (
    <div className="card">
      <img
        className="food-img"
        src={fooditems.img}
        alt={fooditems.name}
        onError={e => e.target.src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"}
      />
      <h3>{fooditems.name}</h3>

      <div className="selectors">
        {/* <select value={qty} onChange={e => setQty(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select> */}

        <select ref={priceRef} onChange={e => setSize(e.target.value)}>
          {Object.entries(quantity).map(([key, val]) => (
            <option key={key} value={val}>{key} - ₹{val}</option>
          ))}
        </select>
      </div>

      <p className="price">₹{finalPrice}</p>

      {qtyInCart > 0 ? (
        <div className="inline-controls">
          <Button className="btn minus" variant="outline-secondary"
            onClick={() => dispatch(decrementItem({ id: fooditems._id, price: Number(size) }))}>−</Button>
          <span className="qty-badge">{qtyInCart}</span>
          <Button className="btn plus" variant="outline-secondary"
            onClick={() => dispatch(incrementItem({ id: fooditems._id, price: Number(size) }))}>+</Button>
        </div>
      ) : (
        <Button className="btn add-btn" onClick={handleAdd}>Add to Cart</Button>
      )}

      {qtyInCart > 0 && (
        <p className="in-cart-amt">In cart: ₹{amountInCart}</p>
      )}
    </div>
  );
};

export default Cards;
