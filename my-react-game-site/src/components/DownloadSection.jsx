// src/components/DownloadSection.jsx
import React, { useState, useEffect } from 'react';
import styles from './DownloadSection.module.css';

// PRODUCTS_API_BASE_URL در اینجا لازم نیست اگر همه URLها از GamePage پردازش شده‌اند


const DownloadSection = ({ game }) => {
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [showPassword, setShowPassword] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    if (game && game.downloadLinks) {
      setDownloadLinks(game.downloadLinks);
    } else {
      setDownloadLinks([]);
    }
  }, [game]);

  const togglePasswordVisibility = (partNumber) => {
    setShowPassword(prevState => ({
      ...prevState,
      [partNumber]: !prevState[partNumber]
    }));
  };
  const toggleAccordion = (index) => {
    // اگر روی همان Accordion کلیک شد، آن را ببند (null کن)؛ در غیر این صورت باز کن (index را تنظیم کن)
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  if (!downloadLinks || downloadLinks.length === 0) {
    return null;
  }

  return (
    <section className={styles.downloadSection}>
      <h2 className={styles.sectionTitle}>باکس دانلود <i className="fas fa-download"></i></h2>

      <div className={styles.accordionContainer}>
        <div className={styles.accordionItem}>
          <button
            className={`${styles.accordionHeader} ${activeAccordion === 0 ? styles.active : ''}`}
            onClick={() => toggleAccordion(0)} // <--- کلیک روی سربرگ (index 0 برای اولین Accordion)
          >
            پارت‌ها
            <i className={`fas fa-chevron-down ${styles.accordionIcon}`}></i>
          </button>

          <div
            // **مهم: کلاس show را به accordionContent اضافه می‌کنیم**
            className={`${styles.accordionContent} ${activeAccordion === 0 ? styles.show : ''}`}
          >
            <div className={styles.linksList}>
              {downloadLinks.map((link) => (
                <div key={link.PartNumber} className={styles.downloadItem}>
                  <div className={styles.partInfo}>
                    <span className={styles.partNumber}>پارت {link.PartNumber}</span> {/* "پارت" به جای "قسمت" */}
                    {link.FileSize && <span className={styles.fileSize}>({link.FileSize})</span>}
                  </div>
                  {link.Url && ( // <--- **مهم: فقط اگر URL وجود داشت، لینک را رندر کن**
                    <a href={link.Url} target="_blank" rel="noopener noreferrer" className={styles.downloadLinkButton}>
                      دانلود
                    </a>
                  )}
                  {link.Password && (
                    <div className={styles.passwordContainer}>
                      <span className={styles.passwordLabel}>رمز: </span>
                      <span className={styles.passwordText}>
                        {showPassword[link.PartNumber] ? link.Password : '********'}
                      </span>
                      <button
                        type="button"
                        className={styles.togglePasswordButton}
                        onClick={() => togglePasswordVisibility(link.PartNumber)}
                      >
                        <i className={`fas ${showPassword[link.PartNumber] ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;