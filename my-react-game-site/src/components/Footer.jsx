// src/components/Footer.jsx
import React from 'react';
import styles from './Footer.module.css'; // برای استایل‌های فوتر

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <h2>Don't miss any news</h2>
          <p>Get the latest updates from our products and services</p>
          <div className={styles.subscribeBox}>
            <input type="email" placeholder="Your email" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
        <div className={styles.footerRight}>
          <h2>Follow us</h2>
          <p>Become part of the community</p>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-x-twitter"></i></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            <a href="https://www.twitch.tv" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitch"></i></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomLeft}>
          <img src="/images/kazgame-minilogo.png" alt="KazGAME Logo" />
        </div>
        <div className={styles.footerBottomCenter}>
          <p>
            © 2025 CD PROJEKT S.A. All rights reserved. CD PROJEKT, the CD PROJEKT logo, Cyberpunk, Cyberpunk 2077 and the Cyberpunk 2077 logo are trademarks and/or registered trademarks of CD PROJEKT S.A. in the US and/or other countries.
          </p>
        </div>
        <div className={styles.footerBottomRight}>
          {/* مطمئن شوید این تصاویر در public/images موجودند و آدرس دهی صحیح است */}
          <a href="#"><img src="/images/witcher-logo.png" alt="Witcher" /></a>
          <a href="#"><img src="/images/gwent-logo.png" alt="Gwent" /></a>
          <a href="#"><img src="/images/gear-logo.png" alt="Gear" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;