// src/components/GameNewsSection.jsx (نسخه نهایی سه ستونه)
import React, { useState, useEffect } from 'react';
import styles from './GameNewsSection.module.css';
import NewsSidebar from './NewsSidebar'; // سایدبار قدیمی را دوباره ایمپورت می‌کنیم
import NewsArticleCard from './NewsArticleCard';
import CreativeWidgets  from './CreativeWidgets'; // اسلایدر جدید

const API_BASE_URL = 'https://localhost:7055';

const GameNewsSection = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/NewsArticles?count=2`); // تعداد مقالات را به ۲ کاهش می‌دهیم تا در ستون وسط بهتر جا شوند
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error("Error fetching news articles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    if (loading) {
        return <div className={styles.loading}>در حال بارگذاری اخبار...</div>;
    }

    return (
        <section className={styles.newsSection}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>اخبار دنیای گیم</h2>
                <a href="/news" className={styles.seeAllLink}>مشاهده همه</a>
            </div>
            
            <div className={styles.newsLayout}>

                {/* ستون اول (در سمت راست نمایش داده می‌شود) */}
                <aside className={styles.sidebarContainer}>
                    <CreativeWidgets />
                </aside>

                {/* ستون دوم (در وسط نمایش داده می‌شود) */}
                <main className={styles.articlesGrid}>
                    {articles.map(article => (
                        <NewsArticleCard key={article.id} article={article} />
                    ))}
                </main>

                {/* ستون سوم (در سمت چپ نمایش داده می‌شود - جای جعبه قرمز) */}
                <aside className={styles.sidebarContainer}>
                    <NewsSidebar />
                </aside>
            </div>
        </section>
    );
};

export default GameNewsSection;