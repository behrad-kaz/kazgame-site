import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HotGamesWidget.module.css';

const API_BASE_URL = 'https://localhost:7055';

const HotGamesWidget = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch(`${API_BASE_URL}/api/products/latest-releases?count=4`);
            const data = await response.json();
            setGames(data);
        };
        fetchGames();
    }, []);

    return (
        <div className={styles.widgetContainer}>
            <h3 className={styles.widgetTitle}>رادار بازی‌های داغ</h3>
            <div className={styles.gamesGrid}>
                {games.map(game => {
                    // **بهبود:** یک متغیر برای آدرس کامل و صحیح عکس می‌سازیم
                    const imageUrl = game.imageUrl && game.imageUrl.startsWith('http')
                        ? game.imageUrl
                        : `${API_BASE_URL}${game.imageUrl}`;

                    return (
                        <Link to={`/games/${game.id}`} key={game.id} className={styles.gameCard}>
                            {/* **اصلاح:** از متغیر جدید استفاده می‌کنیم */}
                            <img src={imageUrl} alt={game.title} />
                            <div className={styles.overlay}>
                                <span>{game.title}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default HotGamesWidget;