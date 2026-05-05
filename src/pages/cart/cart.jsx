import React from 'react';
import { Link } from 'react-router-dom';
import styles from './cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Cart({ cartItems, removeFromCart, updateQuantity }) {
  
  // حساب السعر الإجمالي
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2 className="mb-4">Your Cart is Empty</h2>
        <p className="mb-4">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/product" className="btn btn-success btn-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Your Shopping Cart</h2>
      <div className="row">
        <div className="col-lg-8">
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h5 className={styles.itemTitle}>{item.title}</h5>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>
              <div className={styles.itemControls}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-outline-secondary btn-sm">-</button>
                <span className={styles.itemQuantity}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-outline-secondary btn-sm">+</button>
              </div>
              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
        <div className="col-lg-4">
          <div className={styles.summaryCard}>
            <h4>Order Summary</h4>
            <div className="d-flex justify-content-between my-3">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="btn btn-success btn-lg w-100 mt-4">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
