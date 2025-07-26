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
      // إذا الكمية هتبقى 0، احذف المنتج من العربة
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => {
      // تأكد من إن الـ cost موجود وصحيح
      if (!item.cost) return total;
      const itemCost = parseFloat(item.cost.replace('$', ''));
      return total + item.quantity * itemCost;
    }, 0).toFixed(2);
  };

  // دالة للتعامل مع زر Continue Shopping
  const handleContinueShoppingClick = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>The cart is currently empty.</p>
          <button onClick={handleContinueShoppingClick} className="continue-shopping-btn">
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="cart-list">
            {cartItems.map(item => (
              <div key={item.name} className="cart-card">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Unit Cost: {item.cost || 'N/A'}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${item.cost ? (parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2) : '0.00'}</p>
                  <div className="cart-buttons">
                    <button onClick={() => handleIncrease(item)}>+</button>
                    <button onClick={() => handleDecrease(item)}>-</button>
                    <button onClick={() => handleRemove(item.name)} className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h4>Grand Total: ${calculateTotalCost()}</h4>
          </div>
          <div className="cart-actions">
            <button onClick={handleContinueShoppingClick} className="continue-shopping-btn">
              Continue Shopping
            </button>
            <button onClick={() => alert('Functionality to be added for future reference')} className="checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;