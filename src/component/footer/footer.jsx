import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

// استيراد أيقونات Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className='bg-dark text-white py-5'>
      <div className="container">
        <div className="row">
         <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 none">
            <Link to="/" className={styles.footerLogo}>Market Show</Link>
            <p>
              Your one-stop shop for the best products. We are dedicated to providing high-quality items and excellent customer service.
            </p>
          </div>
          <div className="col-lg-2 offset-lg-1 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className={styles.footerLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/product">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </div>
          <div className="col-lg-4 offset-lg-1 col-md-12">
            <h5 className="text-uppercase">Follow Us</h5>
            <p>Stay connected with us on social media for the latest updates and offers.</p>
            <ul className={styles.socialIcons}>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a></li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date( ).getFullYear()} YourShop. All rights reserved. Created by Yousef Mousa.
      </div>
    </footer>
  );
}
