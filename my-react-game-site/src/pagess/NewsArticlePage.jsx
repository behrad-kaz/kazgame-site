// src/pages/NewsArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './NewsArticlePage.module.css';

const API_BASE_URL = 'https://localhost:7055';

const NewsArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
        setLoading(true);

        // ۱. یک کلید منحصر به فرد برای این مقاله در sessionStorage می‌سازیم
        const viewedKey = `viewed_article_${slug}`;

        // ۲. چک می‌کنیم آیا این مقاله قبلاً در این جلسه مشاهده شده است
        const hasViewed = sessionStorage.getItem(viewedKey);

        // ۳. اگر مشاهده نشده بود، بازدید را ثبت می‌کنیم
        if (!hasViewed) {
            try {
                // درخواست افزایش شمارنده به Endpoint جدید
                await fetch(`${API_BASE_URL}/api/newsarticles/by-slug/${slug}/increment-view`, {
                    method: 'POST'
                });
                // این مقاله را به عنوان "مشاهده شده" در این جلسه علامت می‌زنیم
                sessionStorage.setItem(viewedKey, 'true');
            } catch (error) {
                console.error("Failed to increment view count:", error);
            }
        }

        // ۴. حالا اطلاعات کامل مقاله را دریافت می‌کنیم (با بازدید به‌روز شده)
        const userId = localStorage.getItem('loggedInUserId');
        let url = `${API_BASE_URL}/api/newsarticles/by-slug/${slug}`;
        if (userId) url += `?userId=${userId}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setArticle(data.article);
            setLikeCount(data.likeCount);
            setIsLiked(data.isLiked);
        } catch (error) {
            console.error("Failed to fetch article:", error);
        } finally {
            setLoading(false);
        }
    };

    if (slug) {
        fetchArticle();
    }
}, [slug]);

    const handleLikeToggle = async () => {
        const userId = localStorage.getItem('loggedInUserId');
        if (!userId) { alert("برای لایک کردن باید وارد شوید."); return; }

        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);

        const url = `${API_BASE_URL}/api/newsarticles/${article.id}/like`;
        const method = newIsLiked ? 'POST' : 'DELETE';
        const headers = { 'Content-Type': 'application/json' };
        
        // برای DELETE، userId را در URL می‌فرستیم
        const finalUrl = newIsLiked ? url : `${url}/${userId}`;
        // برای POST، userId را در بدنه می‌فرستیم
        const body = newIsLiked ? JSON.stringify({ userId: parseInt(userId) }) : null;

        try {
            const response = await fetch(finalUrl, { method, headers, body });
            if (!response.ok) { // اگر خطا رخ داد، به حالت قبل برگرد
                setIsLiked(!newIsLiked);
                setLikeCount(prev => !newIsLiked ? prev + 1 : prev - 1);
            }
        } catch (error) {
            setIsLiked(!newIsLiked);
            setLikeCount(prev => !newIsLiked ? prev + 1 : prev - 1);
        }
    };
    
    if (loading) return <div>در حال بارگذاری...</div>;
    if (!article) return <div>مقاله یافت نشد.</div>;

    const fullImageUrl = article.imageUrl.startsWith('http') ? article.imageUrl : `${API_BASE_URL}${article.imageUrl}`;
    const publishedDate = new Date(article.publishedDate).toLocaleDateString('fa-IR');

    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.articleMain}>
                <nav className={styles.breadcrumbs}>
                    <Link to="/">خانه</Link> / <Link to="/news">اخبار</Link> / <span>{article.title}</span>
                </nav>
                <img src={fullImageUrl} alt={article.title} className={styles.headerImage} />
                <div className={styles.metaBar}>
                    <span><i className="fas fa-eye"></i> {article.viewCount} بازدید</span>
                    <span><i className="fas fa-calendar-alt"></i> {publishedDate}</span>
                    <button className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`} onClick={handleLikeToggle}>
                        <i className={isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
                        {likeCount}
                    </button>
                </div>
                <h1 className={styles.articleTitle}>{article.title}</h1>
                <div 
                    className={styles.articleContent} 
                    dangerouslySetInnerHTML={{ __html: article.content }} 
                />
            </main>
            <Footer />
        </div>
    );
};

export default NewsArticlePage;