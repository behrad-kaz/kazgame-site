// src/components/Footer.jsx
import React from 'react';
import styles from './Footer.module.css'; // برای استایل‌های فوتر

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerBackground}></div>
      <div className={styles.footerContent}>
          <h2>Follow us</h2>
          <p>Become part of the community</p>
          <div className={styles.socialIcons}>
            <a href="https://t.me/KazGameacc" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram"></i></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
           <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
            <a href="https://www.instagram.com/kaz_games_pro" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomLeft}>
          <img src="/images/kazgame-minilogo.png" alt="KazGAME Logo" />
        </div>
        <div className={styles.footerBottomCenter}>
          <p>
               ازینکه مارا انتخاب کردید کمال سپاس را داریم 
          </p>
        </div>
        <div className={styles.footerBottomRight}>
          {/* مطمئن شوید این تصاویر در public/images موجودند و آدرس دهی صحیح است */}
          <a href="#"><img src="/images/bonyad-meli.png" alt="bonyad-meli" /></a>
          <a href="#"><img src="/images/enamad.webp" alt="enamad" /></a>
          <a href="#"><img src="/images/samandehi.png" alt="samandehi" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;