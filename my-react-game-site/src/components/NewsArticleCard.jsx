// src/components/NewsArticleCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsArticleCard.module.css';

const API_BASE_URL = 'https://localhost:7055';

const NewsArticleCard = ({ article }) => {
    const fullImageUrl = article.imageUrl.startsWith('http') ? article.imageUrl : `${API_BASE_URL}${article.imageUrl}`;
    const articleUrl = `/news/${article.slug}`;

    return (
        <article className={styles.card}>
            <Link to={articleUrl} className={styles.imageLink}>
                <img src={fullImageUrl} alt={article.title} className={styles.cardImage} />
            </Link>
            <div className={styles.cardContent}>
                <span className={styles.cardCategory}>{article.category || "اخبار"}</span>
                <h3 className={styles.cardTitle}>
                    <Link to={articleUrl}>{article.title}</Link>
                </h3>
                <p className={styles.cardSummary}>{article.summary}</p>
                <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>
                        {new Date(article.publishedDate).toLocaleDateString('fa-IR')}
                    </span>
                    <Link to={articleUrl} className={styles.readMore}>مشاهده بیشتر</Link>
                </div>
            </div>
        </article>
    );
};

export default NewsArticleCard;