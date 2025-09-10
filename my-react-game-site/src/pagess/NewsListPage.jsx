// src/pages/NewsListPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsArticleCard from '../components/NewsArticleCard'; // استفاده مجدد از کارت اخبار
import Pagination from '../components/gamelist components/Pagination'; // استفاده مجدد از کامپوننت صفحه‌بندی
import styles from './NewsListPage.module.css';

const API_BASE_URL = 'https://localhost:7055';
const PAGE_SIZE = 12; // باید با pageSize در API هماهنگ باشد

const NewsListPage = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllNews = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/NewsArticles?pageNumber=${currentPage}&pageSize=${PAGE_SIZE}`);
                const data = await response.json();
                setArticles(data.items);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch news list:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllNews();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>آرشیو اخبار</h1>
                {loading ? (
                    <div className={styles.loading}>در حال بارگذاری اخبار...</div>
                ) : (
                    <>
                        <div className={styles.articlesGrid}>
                            {articles.map(article => (
                                <NewsArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default NewsListPage;