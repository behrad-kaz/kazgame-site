// src/components/RelatedGamesSection.jsx
import React, { useState, useEffect } from 'react';
import GameCard from '../components/gamelist components/GameCard'; // استفاده از GameCard موجود برای نمایش بازی‌های مشابه
import styles from './RelatedGamesSection.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055';

const RelatedGamesSection = ({ game }) => { // game: اطلاعات بازی اصلی
    const [relatedGames, setRelatedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRelatedGames = async () => {
            setLoading(true);
            setError(null);
            if (!game || !game.relatedGameIdsJson) { // اگر بازی یا RelatedGameIdsJson نبود
                setLoading(false);
                return;
            }

            try {
                const relatedIds = JSON.parse(game.relatedGameIdsJson);

                if (relatedIds.length === 0) {
                    setLoading(false);
                    return;
                }

                // فچ کردن جزئیات هر بازی مشابه به صورت جداگانه
                // می‌توان این را به یک Endpoint جدید در API برای دریافت چند بازی با ID / Slug هم تغییر داد.
                const fetchedRelatedGames = await Promise.all(
                    relatedIds.map(async (id) => {
                        const response = await fetch(`${PRODUCTS_API_BASE_URL}/api/Products/${id}`);
                        if (!response.ok) {
                            console.warn(`Failed to fetch related game with ID ${id}: ${response.status}`);
                            return null; // اگر بازی پیدا نشد، null برگردان
                        }
                        const gameData = await response.json();
                        // پردازش URLها در اینجا نیز لازم است
                        const processUrl = (url) => {
                            if (!url) return null;
                            if (url.startsWith('http://') || url.startsWith('https://')) {
                                return url;
                            }
                            return `${PRODUCTS_API_BASE_URL}${url}`;
                        };
                        gameData.imageUrl = processUrl(gameData.imageUrl);
                        gameData.videoUrl = processUrl(gameData.videoUrl); // برای هاور GameCard
                        gameData.mainPageVideoUrl = processUrl(gameData.mainPageVideoUrl); // اگر نیاز است
                        gameData.backgroundImageUrl = processUrl(gameData.backgroundImageUrl); // اگر نیاز است

                        // پردازش GalleryImagesJson و MiddleImagesJson برای GameCard
                        gameData.galleryImages = gameData.galleryImagesJson
                            ? JSON.parse(gameData.galleryImagesJson).map(img => processUrl(img))
                            : [];
                        gameData.middleImages = gameData.middleImagesJson
                            ? JSON.parse(gameData.middleImagesJson).map(img => processUrl(img))
                            : [];

                        return gameData;
                    })
                );
                // فیلتر کردن بازی‌هایی که پیدا نشدند
                setRelatedGames(fetchedRelatedGames.filter(g => g !== null));
            } catch (err) {
                console.error("خطا در دریافت بازی‌های مشابه:", err);
                setError("بازی‌های مشابه بارگذاری نشدند.");
            } finally {
                setLoading(false);
            }
        };

        if (game) { // فقط اگر اطلاعات بازی اصلی موجود بود، بازی‌های مشابه را فچ کن
            fetchRelatedGames();
        }
    }, [game]); // وقتی Prop 'game' (بازی اصلی) تغییر می‌کند، بازی‌های مشابه را دوباره فچ کن

    const hasRelatedGames = relatedGames && relatedGames.length > 0;
    
    if (!hasRelatedGames && loading === false && error === null) {
        return null; // اگر هیچ بازی مشابهی وجود نداشت و لودینگ تمام شد، چیزی نمایش نده
    }



    return (
        <section className={styles.relatedGamesSection}>
            <h2 className={styles.sectionTitle}>بازی‌های مشابه</h2>

            {loading && <div className={styles.loading}>در حال بارگذاری بازی‌های مشابه...</div>}
            {error && <div className={styles.error}>{error}</div>}

            {hasRelatedGames && (
                <div className={styles.relatedGamesGrid}>
                    {relatedGames.map((relatedGame) => (
                        // از GameCard موجود استفاده می‌کنیم
                        // مطمئن شوید GameCard تمام prop های لازم را می پذیرد (مثل slug)
                        <GameCard key={relatedGame.id} game={relatedGame} />
                    ))}
                </div>
            )}

            {!loading && !error && !hasRelatedGames && (
                <div className={styles.noRelatedGames}>بازی مشابهی یافت نشد.</div>
            )}
        </section>
    );
};

export default RelatedGamesSection;