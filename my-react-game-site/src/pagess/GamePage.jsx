// src/pages/GamePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameOverviewSection from '../components/gamepage components/GameOverviewSection';
import GameDetailsSection from '../components/gamepage components/GameDetailsSection';
import GameSystemRequirementsSection from '../components/gamepage components/GameSystemRequirementsSection';
import DownloadSection from '../components/gamepage components/DownloadSection';
import RelatedGamesSection from '../components/gamepage components/RelatedGamesSection';
import CommentSection from '../components/CommentSection';

import styles from './GamePage.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055';



const GamePage = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // **تعریف Refs برای بخش‌های هدف**
  const downloadSectionRef = useRef(null); // <--- **جدید**
  const commentSectionRef = useRef(null); // <--- **جدید**

  // **تابع اسکرول به یک عنصر**
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true); // <--- اضافه شد: برای هر بار فچ، لودینگ را فعال کن
      setError(null);   // <--- اضافه شد: خطاهای قبلی را پاک کن

      const loggedInUserId = localStorage.getItem('loggedInUserId');

      // آدرس API را بر اساس لاگین بودن کاربر می‌سازیم
      let apiUrl = `${PRODUCTS_API_BASE_URL}/api/Products/by-slug/${slug}`;
      if (loggedInUserId) {
        apiUrl += `?userId=${loggedInUserId}`;
      }

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // <-- data شامل IsLiked و تمام پراپرتی‌های بازی است

        // **مهم:** ساختار پاسخ API تغییر کرده. دیگر نیازی به پردازش دستی URLها نیست اگر در بک‌اند انجام شود
        // اما چون کد پردازش URL در کد شما وجود دارد، آن را حفظ می‌کنیم.
        const processUrl = (url) => {
          if (!url || url.startsWith('http')) return url;
          return `${PRODUCTS_API_BASE_URL}${url}`;
        };
        console.log("Raw downloadLinksJson from API:", data.downloadLinksJson);

        if (data.videoUrl && !data.videoUrl.startsWith('http')) { data.videoUrl = `${PRODUCTS_API_BASE_URL}${data.videoUrl}`; }
        if (data.mainPageVideoUrl && !data.mainPageVideoUrl.startsWith('http')) { data.mainPageVideoUrl = `${PRODUCTS_API_BASE_URL}${data.mainPageVideoUrl}`; }
        if (data.backgroundImageUrl && !data.backgroundImageUrl.startsWith('http')) { data.backgroundImageUrl = `${PRODUCTS_API_BASE_URL}${data.backgroundImageUrl}`; }
        if (data.imageUrl && !data.imageUrl.startsWith('http')) { data.imageUrl = `${PRODUCTS_API_BASE_URL}${data.imageUrl}`; }



        // فرض می‌کنیم `data.galleryImages` یک آرایه از مسیرهای نسبی است
        const processedGalleryImages = data.galleryImagesJson
          ? JSON.parse(data.galleryImagesJson).map(img =>
            img.startsWith('http') ? img : `${PRODUCTS_API_BASE_URL}${img}`
          )
          : [];
        const processedMiddleImages = data.middleImagesJson
          ? JSON.parse(data.middleImagesJson).map(img =>
            img.startsWith('http') ? img : `${PRODUCTS_API_BASE_URL}${img}`
          )
          : [];
        const processedDownloadLinks = data.downloadLinksJson
          ? JSON.parse(data.downloadLinksJson).map(link => ({
            ...link,
            // Url باید خودش کامل باشد یا با تابع processUrl کامل شود
            Url: processUrl(link.Url) // <--- **استفاده از تابع processUrl**
          }))
          : [];
        console.log("Processed Download Links (Final to DownloadSection):", processedDownloadLinks);

        const processedGameData = {
          ...data, // کپی کردن تمام فیلدها از جمله IsLiked, Title, Id, Slug, ...

          // پردازش URLها و JSONها مانند کد قبلی شما
          imageUrl: processUrl(data.imageUrl),
          videoUrl: processUrl(data.videoUrl),
          mainPageVideoUrl: processUrl(data.mainPageVideoUrl),
          backgroundImageUrl: processUrl(data.backgroundImageUrl),

          galleryImages: data.galleryImagesJson
            ? JSON.parse(data.galleryImagesJson).map(img => processUrl(img))
            : [],
          middleImages: data.middleImagesJson
            ? JSON.parse(data.middleImagesJson).map(img => processUrl(img))
            : [],
          downloadLinks: data.downloadLinksJson
            ? JSON.parse(data.downloadLinksJson).map(link => ({
              ...link,
              Url: processUrl(link.Url)
            }))
            : [],
        };

        console.log("Game Data fetched from API:", data); // <--- **LOG جدید ۱**


        // **اگر GalleryImages در API شما وجود ندارد، می‌توانید Dummy Data اینجا اضافه کنید**
        const dummyGalleryImages = [
          `/images/elden ring/elden-ring-1_bzzt.jpg`,
          `/images/elden ring/elden-ring-4_bzzt.jpg`,
          `/images/elden ring/ELDEN_RING_Shadow_of_the_Erdtree-1.webp`,
          `/images/red dead redemption 2/Red_Dead_Redemption_2-1.webp`,
        ].map(img => `${PRODUCTS_API_BASE_URL}${img}`); // ساخت آدرس کامل برای Dummy Data

        setGame(processedGameData);
        console.log("Game ID after fetching and setting state:", data.id);

      } catch (err) {
        console.error("خطا در دریافت جزئیات بازی:", err);
        setError("جزئیات بازی یافت نشد یا مشکلی در اتصال به سرور وجود دارد.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchGameDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.gamePageWrapper}>
        <Header />
        <div className={styles.loading}>در حال بارگذاری جزئیات بازی...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.gamePageWrapper}>
        <Header />
        <div className={styles.error}>{error}</div>
        <Footer />
      </div>
    );
  }

  if (!game) {
    return (
      <div className={styles.gamePageWrapper}>
        <Header />
        <div className={styles.notFound}>بازی مورد نظر یافت نشد.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.gamePageWrapper}>
      <Header />
      <GameOverviewSection
        game={game}
        scrollToDownload={() => scrollToSection(downloadSectionRef)} // <--- **جدید**
        scrollToComments={() => scrollToSection(commentSectionRef)} // <--- **جدید**
      />
      <GameDetailsSection game={game} />
      <GameSystemRequirementsSection game={game} />
      <DownloadSection game={game} ref={downloadSectionRef} />
      <RelatedGamesSection game={game} />
      <CommentSection gameId={game.id} ref={commentSectionRef} />
      <Footer />
    </div>
  );
};

export default GamePage;