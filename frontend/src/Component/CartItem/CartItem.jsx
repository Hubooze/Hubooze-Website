import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './CartItem.css';


const CartItem = () => {
  const { cartData, addToCart, removeFromCart, totalAmount } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        {Object.entries(cartData).map(([itemId, quantity]) => (
          <div key={itemId} className="cart-item">
            <p>Item ID: {itemId}</p>
            <p>Quantity: {quantity}</p>
            <button onClick={() => addToCart(itemId)}>Add</button>
            <button onClick={() => removeFromCart(itemId)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total Amount: ₹{totalAmount}</h3>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;