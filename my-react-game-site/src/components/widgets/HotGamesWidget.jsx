// src/components/widgets/HotGamesWidget.jsx (نسخه اصلاح شده با slug)
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
                    const imageUrl = game.imageUrl && game.imageUrl.startsWith('http')
                        ? game.imageUrl
                        : `${API_BASE_URL}${game.imageUrl}`;

                    return (
                        // **** تغییر اصلی اینجاست ****
                        // to از game.id به game.slug تغییر کرد
                        <Link to={`/games/${game.slug}`} key={game.id} className={styles.gameCard}>
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