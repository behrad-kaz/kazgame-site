// src/components/HeroSection.jsx
import React from 'react';
import styles from './HeroSection.module.css'; // ایمپورت CSS Modules

const HeroSection = () => {
  return (
    <section className={styles.hero}> {/* استفاده از styles.hero */}
      <video autoPlay muted loop playsInline className={styles.bgVideo}> {/* styles.bgVideo */}
        <source src="/video/Aurora-1746463269142.mp4" type="video/mp4" />
        مرورگر شما از ویدیو پشتیبانی نمی‌کند.
      </video>
      <div className={styles.heroContent}> {/* styles.heroContent */}
        <h1>Build Your Dream Website</h1>
        <p>We help you create stunning websites that grow your business and engage your customers.</p>
        <div className={styles.heroButtons}> {/* styles.heroButtons */}
          <button className={styles.primaryBtn}>Get Started</button> {/* styles.primaryBtn */}
          <button className={styles.secondaryBtn}>Learn More</button> {/* styles.secondaryBtn */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;