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
    } else {
      dispatch(removeItem(item.name));
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
        <div>
          <p>The cart is currently empty.</p>
          <button onClick={onContinueShopping} className="get-started-button1">
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {cartItems.map(item => {
            const unitPrice = parseFloat(item.cost.replace('$', ''));
            const totalPrice = (unitPrice * item.quantity).toFixed(2);

            return (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Unit Cost: ${unitPrice.toFixed(2)}</div>
                  <div className="cart-item-quantity">
                    <button className="cart-item-button" onClick={() => handleDecrease(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button" onClick={() => handleIncrease(item)}>+</button>
                  </div>
                  <div className="cart-item-total">Total: ${totalPrice}</div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
                </div>
              </div>
            );
          })}

          <div className="total_cart_amount">Grand Total: ${calculateTotalCost()}</div>

          <div className="cart-actions">
            <button onClick={onContinueShopping} className="continue_shopping_btn">
              Continue Shopping
            </button>
            <button onClick={() => alert('Checkout functionality coming soon!')} className="get-started-button1">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
