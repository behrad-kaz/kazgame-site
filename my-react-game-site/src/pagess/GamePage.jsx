// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameOverviewSection from '../components/GameOverviewSection'; // <--- ایمپورت کامپوننت جدید
import styles from './GamePage.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055';



const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`${PRODUCTS_API_BASE_URL}/api/Products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // پردازش آدرس‌های نسبی به آدرس‌های کامل
        if (data.videoUrl && !data.videoUrl.startsWith('http')) {
          data.videoUrl = `${PRODUCTS_API_BASE_URL}${data.videoUrl}`;
        }

        if (data.mainPageVideoUrl && !data.mainPageVideoUrl.startsWith('http')) {
          data.mainPageVideoUrl = `${PRODUCTS_API_BASE_URL}${data.mainPageVideoUrl}`;
        }
        // فرض می‌کنیم `data.galleryImages` یک آرایه از مسیرهای نسبی است
        const processedGalleryImages = data.galleryImagesJson
          ? JSON.parse(data.galleryImagesJson).map(img =>
            img.startsWith('http') ? img : `${PRODUCTS_API_BASE_URL}${img}`
          )
          : [];
          console.log("Game Data fetched from API:", data); // <--- **LOG جدید ۱**

        // **اگر GalleryImages در API شما وجود ندارد، می‌توانید Dummy Data اینجا اضافه کنید**
        const dummyGalleryImages = [
          `/images/elden ring/elden-ring-1_bzzt.jpg`,
          `/images/elden ring/elden-ring-4_bzzt.jpg`,
          `/images/elden ring/ELDEN_RING_Shadow_of_the_Erdtree-1.webp`,
          `/images/red dead redemption 2/Red_Dead_Redemption_2-1.webp`,
        ].map(img => `${PRODUCTS_API_BASE_URL}${img}`); // ساخت آدرس کامل برای Dummy Data

        setGame({
          ...data,
          galleryImages: processedGalleryImages, // <--- آرایه تصاویر گالری
          // BackgroundImageUrl نیز به صورت خودکار در data خواهد بود
        });

      } catch (err) {
        console.error("خطا در دریافت جزئیات بازی:", err);
        setError("جزئیات بازی یافت نشد یا مشکلی در اتصال به سرور وجود دارد.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGameDetails();
    }
  }, [id]);

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
      <GameOverviewSection game={game} /> {/* <--- کامپوننت جدید را اینجا اضافه می‌کنیم */}

      <main className={styles.gamePageContent}>
        {/* بقیه محتوای اصلی صفحه که قبلاً داشتیم (اطلاعات، قیمت، دکمه‌ها و گالری کوچک) */}
        <h1 className={styles.gameTitle}>{game.title}</h1> {/* این شاید تکراری شود، می‌توانیم در GameOverviewSection قرار دهیم */}

        <div className={styles.gameContentWrapper}>
          <div className={styles.mainMedia}>
            {game.videoUrl ? (
              <video controls className={styles.gameVideoPlayer} src={game.videoUrl}></video>
            ) : (
              <img src={game.imageUrl} alt={game.title} className={styles.gameImagePlayer} />
            )}
          </div>

          <div className={styles.gameDetails}>
            <p className={styles.gameDescription}>{game.description}</p>
            <div className={styles.gamePrice}>قیمت: ${game.price}</div>
            <button className={styles.buyGameButton}>خرید بازی</button>

            <div className={styles.gameThumbnails}>
              {game.galleryImages && game.galleryImages.length > 0 ? (
                game.galleryImages.map((thumbUrl, index) => (
                  <img key={index} src={thumbUrl} alt={`Thumb ${index}`} className={styles.thumbnailItem} />
                ))
              ) : (
                game.imageUrl && <img src={game.imageUrl} alt={game.title} className={styles.thumbnailItem} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GamePage;