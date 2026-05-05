import React, { useState, useEffect } from 'react';
import styles from './product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products/category/groceries' );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (e) {
      console.error("Failed to fetch products:", e);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="alert alert-warning text-center">No products found.</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Our Groceries</h2>
      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className={styles.productCard}>
              <img src={product.thumbnail} className={styles.productImage} alt={product.title} />
              <div className={styles.cardBody}>
                <h5 className={styles.productTitle}>{product.title}</h5>
                <p className={styles.productDescription}>
                  {product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className={styles.productPrice}>${product.price}</span>
                  <span className={styles.productRating}>
                    <FontAwesomeIcon icon={faStar} className="me-1" />
                    {product.rating}
                  </span>
                </div>
                <button 
                  className="btn btn-success w-100 mt-auto" 
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
