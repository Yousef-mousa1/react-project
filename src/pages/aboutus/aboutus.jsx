import React from 'react';
import styles from './aboutus.module.css';

// استيراد الفيديو والصور الجديدة التي ستستخدمها
import heroVideo from '../../assets/video.mp4'; 
import featureImage1 from '../../assets/WhatsApp Image 2025-10-01 at 18.53.09.jpeg';
import featureImage2 from '../../assets/WhatsApp Image 2025-10-01 at 19.03.45 (1).jpeg';
import featureImage3 from '../../assets/WhatsApp Image 2025-10-01 at 19.03.45 (2).jpeg';

export default function About() {
  return (
    <div className={styles.aboutPage}>
      {/* --- Hero Section with Video (لا تغيير هنا) --- */}
      <header className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <video src={heroVideo} autoPlay loop muted className={styles.heroVideo}></video>
        <div className={styles.heroContent}>
          <h1>About Market</h1>
          <p>Your trusted partner for quality groceries, delivered right to your door.</p>
        </div>
      </header>

      {/* --- قسم "قصتنا" (لا تغيير هنا) --- */}
      <section className="container my-5 py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.storyText}>
              Founded in 2024, "Market" started with a simple idea: to make fresh, high-quality groceries accessible to everyone. We are committed to quality, convenience, and customer satisfaction.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <i className={`fas fa-store-alt ${styles.storeIcon}`}></i>
          </div>
        </div>
      </section>

      {/* --- الأقسام الجديدة المتناوبة --- */}
      <div className={styles.alternatingSections}>
        {/* القسم الأول: صورة على اليسار */}
        <section className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={featureImage1} alt="Freshness Guaranteed" className={`img-fluid rounded ${styles.featureImage}`} />
            </div>
            <div className="col-md-6">
              <div className={styles.featureText}>
                <h3>Freshness Guaranteed</h3>
                <p>We partner directly with local farmers and trusted suppliers to bring you the freshest produce, dairy, and meats. Every item is hand-picked and inspected to ensure it meets our highest quality standards before it reaches your door.</p>
              </div>
            </div>
          </div>
        </section>

        {/* القسم الثاني: صورة على اليمين */}
        <section className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 order-md-2">
              <img src={featureImage2} alt="Convenient Delivery" className={`img-fluid rounded ${styles.featureImage}`} />
            </div>
            <div className="col-md-6 order-md-1">
              <div className={styles.featureText}>
                <h3>Convenient & Fast Delivery</h3>
                <p>Life is busy. That's why we offer flexible delivery slots that fit your schedule. Place your order online in minutes and get everything you need delivered to your doorstep, often on the same day. Say goodbye to long checkout lines!</p>
              </div>
            </div>
          </div>
        </section>

        {/* القسم الثالث: صورة على اليسار */}
        <section className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={featureImage3} alt="Community Focused" className={`img-fluid rounded ${styles.featureImage}`} />
            </div>
            <div className="col-md-6">
              <div className={styles.featureText}>
                <h3>A Commitment to Community</h3>
                <p>We're more than just a grocery store; we're part of your community. We are dedicated to supporting local economies, reducing food waste, and promoting sustainable practices. When you shop with us, you're supporting a better food system for everyone.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
