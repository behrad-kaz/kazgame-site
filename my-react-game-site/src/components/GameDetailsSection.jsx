// src/components/GameDetailsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GameDetailsSection.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055';

const GameDetailsSection = ({ game }) => {
  // پردازش تصاویر میانی
  const middleImages = game.middleImagesJson
    ? JSON.parse(game.middleImagesJson).map(img =>
        img.startsWith('http') ? img : `${PRODUCTS_API_BASE_URL}${img}`
      )
    : [];

  return (
    <section className={styles.gameDetailsSection}>
      <div className={styles.detailsHeader}>
        <h2 className={styles.sectionTitle}>توضیحات بازی</h2>
      </div>

      <div className={styles.detailsContentWrapper}>
        <div className={styles.gameDescriptionLong}>
          {game.fullDescription ? (
            // **مهم: رندر HTML خام**
            <div dangerouslySetInnerHTML={{ __html: game.fullDescription }} />
          ) : (
            <p>توضیحات کاملی برای این بازی در دسترس نیست.</p>
          )}

        </div>
      </div>
    </section>
  );
};

export default GameDetailsSection;