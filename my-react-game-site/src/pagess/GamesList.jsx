// src/pages/GamesList.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroGameSlider from '../components/HeroGameSlider'; // <--- ایمپورت HeroGameSlider
import FeaturedGameHighlight from '../components/FeaturedGameHighlight'; // <--- ایمپورت FeaturedGameHighlight
import styles from './GamesList.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055';

const featuredGameData = [
  {
    id: 101,
    title: "Marvel's Spider-Man 2",
    description: "پیتر و مایلز این بار در مقابل شرورهای نمادین مانند ونوم، کریون شکارچی و لیزارد قرار می‌گیرند. قهرمانان ما برای چالش نهایی خود آماده می‌شوند، زیرا اصول آن‌ها در معرض آزمایش قرار می‌گیرد تا از شهر نیویورک و عزیزانشان محافظت کنند.",
    mainImageUrl: "/images/spider-man-2-main.jpg", // تصویر بزرگ بالای بخش
    trailerVideoUrl: "/videos/spider-man-2-trailer.mp4", // ویدئوی تریلر کوچک
    steamLink: "https://store.steampowered.com/",
    epicGamesLink: "https://store.epicgames.com/",
    moreInfoLink: "/games/101", // لینک به صفحه جزئیات این بازی
  },
  {
    id: 102,
    title: "The Last of Us Part I",
    description: "یک بازی نقش‌آفرینی اکشن و ماجراجویی در دنیای باز که در نایت سیتی، یک کلان‌شهر آینده‌نگر که با قدرت، زرق و برق و اصلاحات بی‌پایان بدن وسواس دارد، اتفاق می‌افتد.",
    mainImageUrl: "/images/the-last-of-us-part-i-pc-screenshot-11-en-09mar23.webp",
    trailerVideoUrl: "/videos/The_Last_of_Us_Part_I_Official_Launch_Trailer_1080p.mp4",
    steamLink: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
    epicGamesLink: "https://store.epicgames.com/en-US/p/cyberpunk-2077",
    moreInfoLink: "/games/102",
  },
  {
    id: 103,
    title: "God of War Ragnarök",
    description: "فیمبول‌وینتر به خوبی در جریان است. کریتوس و آترئوس باید به هر قیمتی زنده بمانند، زیرا نیروهای آسگارد برای یک نبرد پیشگویی شده آماده می‌شوند که به دنیا پایان خواهد داد.",
    mainImageUrl: "/images/god-of-war-ragnarok-main.jpg",
    trailerVideoUrl: "/videos/god-of-war-ragnarok-trailer.mp4",
    steamLink: "https://store.steampowered.com/app/1885900/God_of_War_Ragnarok/",
    epicGamesLink: "https://store.epicgames.com/en-US/p/god-of-war-ragnarok",
    moreInfoLink: "/games/103",
  },
  // **می‌توانید بازی‌های بیشتری را اینجا اضافه کنید**
];
// داده‌های Dummy برای HeroGameSlider (همانند گام ۱)
const heroSlidesData = [
  {
    id: 1,
    title: "Resident Evil 1: HD Remaster",
    subtitle: "با زیرنویس فارسی",
    description: "Resident Evil 1: HD Remaster.Farsi همین الان در جی باز کن",
    backgroundImageUrl: "/images/resident-evil-1.jpg",
    link: "/games/1",
  },
  {
    id: 2,
    title: "EA SPORTS FC 25",
    subtitle: "فقط در «جی باز»",
    description: "دیگه لازم نیست منتظر کرک شدن EA SPORTS FC 25 نمونی! فقط کافیه جی باز را نصب کنی و این بازی را دانلود و اجرا کنی!",
    backgroundImageUrl: "/images/ea-sports-fc-25.jpg",
    link: "/games/2",
  },
  {
    id: 3,
    title: "Silent Hill 2 Remake",
    subtitle: "همراه با زیرنویس فارسی",
    description: "Silent Hill 2 Remake.Farsi همین الان در جی باز کن",
    backgroundImageUrl: "/images/silent-hill-2.jpg",
    link: "/games/3",
  },
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
      <HeroGameSlider slides={heroSlidesData} /> {/* <--- HeroGameSlider را اضافه می‌کنیم */}
            <section className={styles.featuredGamesSectionWrapper}> {/* یک wrapper برای این بخش */}
        {featuredGameData.map(game => (
          <FeaturedGameHighlight key={game.id} game={game} />
        ))}
      </section>
      
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>لیست بازی‌ها</h1>
        
        {loading && <div className={styles.loading}>در حال بارگذاری لیست بازی‌ها...</div>}
        {error && <div className={styles.error}>{error}</div>}
        
        {!loading && !error && games.length === 0 && (
          <div className={styles.noGames}>هیچ بازی برای نمایش وجود ندارد.</div>
        )}

        <div className={styles.gamesGrid}>
          {!loading && !error && games.map(game => (
            <div key={game.id} className={styles.gameCard}>
              <img src={game.imageUrl} alt={game.title} className={styles.gameCardImage} />
              <h2 className={styles.gameCardTitle}>{game.title}</h2>
              <p className={styles.gameCardPrice}>${game.price}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GamesList;