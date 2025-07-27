// src/pages/GamesList.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductSlider from '../components/gamelist components/ProductSlider';
import GameCard from '../components/gamelist components/GameCard'; 
import CommentSection from '../components/CommentSection';
import styles from './GamesList.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055';

const dummyProducts = [
  { id: 1, title: 'PS5 Console', imageUrl: '/images/red.jpg', description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games.', price: 499.99 },
  { id: 2, title: 'The Last of Us Part II', imageUrl: '/images/tlou.jpg', description: 'Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming.', price: 59.99 },
  { id: 3, title: 'Grand Theft Auto V', imageUrl: '/images/gta.jpg', description: 'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4K and beyond.', price: 29.99 },
  { id: 4, title: 'Portal Remote', imageUrl: '/images/R.jpg', description: 'Play your PS5 console over your home Wi-Fi with console quality controls using PlayStation Portal™ Remote Player.', price: 199.99 },
  { id: 5, title: 'Elden Ring', imageUrl: '/images/elden ring.jpg', description: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.', price: 69.99 },
  { id: 6, title: 'The Witcher 3: Wild Hunt', imageUrl: '/images/witcher3.jpg', description: 'As a professional monster slayer, Geralt of Rivia is tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns.', price: 39.99 },
  { id: 7, title: 'Mortal Kombat 1', imageUrl: '/images/mortal combat 1.jpg', description: 'Discover a reborn Mortal Kombat Universe created by Fire God Liu Kang. Mortal Kombat 1 ushers in a new era of the iconic franchise with a new fighting system, game modes, and Fatalities!', price: 69.99 },
  { id: 8, title: 'FIFA 25', imageUrl: '/images/fifa25.jpg', description: 'Anticipate the next evolution of virtual football with FIFA 25, delivering unparalleled realism and immersive gameplay.', price: 69.99 },
  { id: 9, title: 'PULSE Elite Wireless Headset', imageUrl: '/images/PULSE-Elite.png', description: 'Enjoy lifelike sound in your favorite games with the PULSE Elite wireless headset.', price: 149.99 }, // تصویر جدیدی برای این محصول اضافه شد
  { id: 10, title: 'Explore Earbuds', imageUrl: '/images/explore-earbuds.png', description: 'Enjoy lifelike sound in your favorite games with the PULSE Explore wireless earbuds.', price: 199.99 }, // تصویر جدیدی برای این محصول اضافه شد
];


const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${PRODUCTS_API_BASE_URL}/api/Products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log("Data fetched from API (Products):", data); // <--- **LOG جدید ۱**

        setGames(data);
      } catch (err) {
        console.error("خطا در دریافت لیست بازی‌ها:", err);
        setError("لیست بازی‌ها یافت نشد یا مشکلی در اتصال به سرور وجود دارد.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className={styles.gamesListPageContainer}>
      <Header />
      <ProductSlider products={dummyProducts} />
  <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>لیست بازی‌ها</h1>

        {loading && <div className={styles.loading}>در حال بارگذاری لیست بازی‌ها...</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && games.length === 0 && (
          <div className={styles.noGames}>هیچ بازی برای نمایش وجود ندارد.</div>
        )}

        <div className={styles.gamesGrid}>
          {/* **تغییر مهم: استفاده از کامپوننت GameCard** */}
          {!loading && !error && games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
      <CommentSection gameId={9999} />
      <Footer />
    </div>
  );
};

export default GamesList;