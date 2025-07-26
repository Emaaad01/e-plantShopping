import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.replace('$', ''));
      return total + item.quantity * itemCost;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>The cart is currently empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map(item => (
            <div key={item.name} className="cart-card">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit Cost: {item.cost}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2)}</p>
                <div className="cart-buttons">
                  <button onClick={() => handleIncrease(item)}>+</button>
                  <button onClick={() => handleDecrease(item)} disabled={item.quantity === 1}>-</button>
                  <button onClick={() => handleRemove(item.name)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h4>Grand Total: ${calculateTotalCost()}</h4>
          </div>
        </div>
      )}
      <button onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  );
}

export default CartItem;
