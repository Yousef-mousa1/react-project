import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from './nav.module.css';

export default function Nav({ userData, logout, cartItemCount }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
   
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} navbar navbar-expand-lg fixed-top`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className={styles.brandText}>Market show</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About Us</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            {userData ? (
             
              <>
                <li className="nav-item me-3">
                  <Link to="/cart" className={`position-relative ${styles.cartIconContainer}`}>
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="navbar-text me-3">Hello, {userData.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-success" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
