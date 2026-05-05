import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faTruckFast, faHeadset } from '@fortawesome/free-solid-svg-icons';

import heroImage from '../../assets/WhatsApp Image 2025-09-30 at 20.49.57 (1).jpeg'; 
import featuredProductImage from '../../assets/WhatsApp Image 2025-09-30 at 20.37.42.jpeg';
import blogImage1 from '../../assets/WhatsApp Image 2025-09-30 at 20.49.57.jpeg';
import blogImage2 from '../../assets/WhatsApp Image 2025-09-30 at 21.27.53.jpeg';
import blogImage3 from '../../assets/WhatsApp Image 2025-09-30 at 21.27.54.jpeg';

const BlogCard = ({ image, title, author, date, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.blogCardContainer}>
      <div className={`${styles.blogCardInner} ${isFlipped ? styles.isFlipped : ''}`}>
        
        {/* === الوجه الأمامي === */}
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <img src={image} alt={title} className={styles.blogImage} />
          <div className={styles.blogContent}>
            <h3 className={styles.blogTitle}>{title}</h3>
            <div className={styles.blogMeta}>
              <span>By {author}</span>
              <span>On {date}</span>
            </div>
            {/* يتحكم في الدوران */}
            <button onClick={handleFlip} className={styles.flipButton}>
              Read More →
            </button>
          </div>
        </div>

        {/* === الوجه الخلفي === */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <div>
           
            <p className={styles.backDescription}>{description}</p>
            <button onClick={handleFlip} className={styles.backButton}>
              ← Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
export default function Home() {

  const blogPosts = [
    {
      image: blogImage1,
      title: "A Complete Guide to Shop Show’s Private Label Products",
      author: "The Nutrition Team",
      date: "September 30, 2025",
      description: "A perfect blend of toasted oats, crunchy nuts, and sweet dried fruits. Discover the health benefits of granola and how it provides the sustained energy you need to conquer your day."
    },
    {
      image: blogImage2,
      title: "More Than a Spread: 5 Creative Ways to Use Almond Butter",
      author: "Chef Yousef",
      date: "September 25, 2025",
      description: "From healthy smoothies to savory Asian-inspired sauces, almond butter isn't just for sandwiches! Here are 5 easy and innovative recipes that will change the way you see this healthy staple."
    },
    {
      image: blogImage3,
      title: "Lighting Lanterns of Goodness",
      author: "The Prep Team",
      date: "September 20, 2025",
      description: "No time to cook? No problem. Our range of high-quality, ready-to-heat meals delivers delicious flavor and natural ingredients in minutes. Healthy, tasty food has never been this easy."
    }
  ];

  return (
    <>
      {/* ===== القسم الأول: Hero Section ===== */}
      <div className={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
              <h1 className={styles.heroTitle}>Discover Your Next Favorite Thing</h1>
              <p className={styles.heroSubtitle}>Explore our curated collection of high-quality products.</p>
              <Link to="/product" className="btn btn-outline-success btn-lg">Shop Now</Link>
            </div>
            <div className="col-lg-6">
              <img src={heroImage} alt="Featured products" className={styles.heroImage} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== القسم الثاني: Features Section ===== */}
      <div className={styles.featuresSection}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <FontAwesomeIcon icon={faGem} className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Premium Quality</h3>
                <p className={styles.featureDescription}>We source only the best materials.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <FontAwesomeIcon icon={faTruckFast} className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>Fast Shipping</h3>
                <p className={styles.featureDescription}>Get your orders delivered promptly.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className={styles.featureCard}>
                <FontAwesomeIcon icon={faHeadset} className={styles.featureIcon} />
                <h3 className={styles.featureTitle}>24/7 Support</h3>
                <p className={styles.featureDescription}>Our support team is always here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== القسم الثالث: Featured Product ===== */}
      <div className={styles.featuredSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src={featuredProductImage} alt="Special featured product" className={styles.featuredImage} />
            </div>
            <div className="col-lg-6">
              <span className={styles.featuredBadge}>SPECIAL OFFER</span>
              <h2 className={styles.featuredTitle}>The Ultimate Smartwatch</h2>
              <p className={styles.featuredDescription}>
                Stay connected and track your fitness with our next-gen smartwatch. Sleek design, long battery life, and a vibrant display.
              </p>
              <div className={styles.price}>
                <span className={styles.newPrice}>$199.99</span>
                <span className={styles.oldPrice}>$249.99</span>
              </div>
              <Link to="/product" className="btn btn-outline-success btn-lg">View Details</Link>
             </div>
          </div>
        </div>
      </div>

      {/* ===== القسم الرابع: قسم المدونة (الذي يستخدم البطاقة القلابة) ===== */}
      <div className={styles.blogSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>From Our Blog</h2>
          <div className="row">
            {blogPosts.map((post, index) => (
              <div className="col-lg-4 col-md-6 mb-5" key={index}>
                <BlogCard 
                  image={post.image}
                  title={post.title}
                  author={post.author}
                  date={post.date}
                  description={post.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
