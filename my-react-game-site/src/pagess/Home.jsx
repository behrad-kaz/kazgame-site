// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import GameSlider from '../components/GameSlider';
import Footer from '../components/Footer';
import HeroGameSlider from '../components/HeroGameSlider'; // <--- ایمپورت HeroGameSlider
import FeaturedGameHighlight from '../components/FeaturedGameHighlight'; // <--- ایمپورت FeaturedGameHighlight
import GameNewsSection from '../components/GameNewsSection';
import CommentSection from '../components/CommentSection';

import styles from './GamesList.module.css';
import '../style.css'; // استایل‌های گلوبال شما

// Dummy Data برای Product Slider - (اینها باید با داده‌های API شما جایگزین شوند)

const featuredGameData = [
  {
    id: 5,
    title: "Marvel's Spider-Man 2",
    description: "پیتر و مایلز این بار در مقابل شرورهای نمادین مانند ونوم، کریون شکارچی و لیزارد قرار می‌گیرند. قهرمانان ما برای چالش نهایی خود آماده می‌شوند، زیرا اصول آن‌ها در معرض آزمایش قرار می‌گیرد تا از شهر نیویورک و عزیزانشان محافظت کنند.",
    mainImageUrl: "/images/spider-man-2-main.jpg", // تصویر بزرگ بالای بخش
    trailerVideoUrl: "/videos/spider-man-2-trailer.mp4", // ویدئوی تریلر کوچک
    steamLink: "https://store.steampowered.com/",
    epicGamesLink: "https://store.epicgames.com/",
    moreInfoLink: "/games/spider-man-2", // لینک به صفحه جزئیات این بازی
  },
  {
    id: 6,
    title: "The Last of Us Part I",
    description: "یک بازی نقش‌آفرینی اکشن و ماجراجویی در دنیای باز که در نایت سیتی، یک کلان‌شهر آینده‌نگر که با قدرت، زرق و برق و اصلاحات بی‌پایان بدن وسواس دارد، اتفاق می‌افتد.",
    mainImageUrl: "/images/the-last-of-us-part-i-pc-screenshot-11-en-09mar23.webp",
    trailerVideoUrl: "/videos/The_Last_of_Us_Part_I_Official_Launch_Trailer_1080p.mp4",
    steamLink: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
    epicGamesLink: "https://store.epicgames.com/en-US/p/cyberpunk-2077",
    moreInfoLink: "/games/the-last-of-us-part-1",
  },
  {
    id: 7,
    title: "God of War Ragnarök",
    description: "فیمبول‌وینتر به خوبی در جریان است. کریتوس و آترئوس باید به هر قیمتی زنده بمانند، زیرا نیروهای آسگارد برای یک نبرد پیشگویی شده آماده می‌شوند که به دنیا پایان خواهد داد.",
    mainImageUrl: "/images/god-of-war-ragnarok-main.jpg",
    trailerVideoUrl: "/videos/god-of-war-ragnarok-trailer.mp4",
    steamLink: "https://store.steampowered.com/app/1885900/God_of_War_Ragnarok/",
    epicGamesLink: "https://store.epicgames.com/en-US/p/god-of-war-ragnarok",
    moreInfoLink: "/games/god-of-war-ragnarök",
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
    link: "/games/resident-evil-1-hd-remaster",
  },
  {
    id: 2,
    title: "EA SPORTS FC 25",
    subtitle: "فقط در «جی باز»",
    description: "دیگه لازم نیست منتظر کرک شدن EA SPORTS FC 25 نمونی! فقط کافیه جی باز را نصب کنی و این بازی را دانلود و اجرا کنی!",
    backgroundImageUrl: "/images/ea-sports-fc-25.jpg",
    link: "/games/ea-sports-fc-25",
  },
  {
    id: 3,
    title: "Silent Hill 2 Remake",
    subtitle: "همراه با زیرنویس فارسی",
    description: "Silent Hill 2 Remake.Farsi همین الان در جی باز کن",
    backgroundImageUrl: "/images/silent-hill-2.jpg",
    link: "/games/silent-hill-2-remake",
  },
];


const Home = () => {
  return (
    <div className="home-page-layout">
      <Header />
      <HeroGameSlider slides={heroSlidesData} /> {/* <--- HeroGameSlider را اضافه می‌کنیم */}
      {featuredGameData.map(game => (
        <FeaturedGameHighlight key={game.id} game={game} />
      ))}
      <GameNewsSection />
      <GameSlider />
       <CommentSection gameId={9999} />
      <Footer />

    </div>
  );
};

export default Home;