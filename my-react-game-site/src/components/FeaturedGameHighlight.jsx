// src/components/FeaturedGameHighlight.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedGameHighlight.module.css'; // برای استایل‌های این کامپوننت

const FeaturedGameHighlight = ({ game }) => {
    return (
        <section className={styles.featuredGameSection}>
            <div className={styles.featuredGameHeader}>
                <img src={game.mainImageUrl} alt={game.title} className={styles.mainGameImage} />
            </div>

            <div className={styles.gameInfoCard}>
                <div className={styles.trailerBox}>
                    {game.trailerVideoUrl ? (
                        <video controls className={styles.trailerVideo} src={game.trailerVideoUrl}></video>
                    ) : (
                        <img src={game.mainImageUrl} alt={game.title} className={styles.trailerVideoPlaceholder} />
                    )}
                </div>

                <div className={styles.gameDetailsContent}>
                    <h2 className={styles.gameTitle}>{game.title}</h2>
                    <p className={styles.gameDescription}>{game.description}</p>

                    <div className={styles.buyButtons}>
                        <a href={game.steamLink} target="_blank" rel="noopener noreferrer" className={styles.buyButton}>
                            Kopen op Steam
                        </a>
                        <Link to={game.moreInfoLink} className={styles.moreInfoButton}>
                            Meer informatie
                        </Link>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default FeaturedGameHighlight;