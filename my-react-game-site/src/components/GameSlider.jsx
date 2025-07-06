// src/components/GameSlider.jsx
import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs'; // <--- استایل‌های Thumbs
import 'swiper/css/free-mode'; // برای حالت Free Mode برای Thumbs (اختیاری)

// Import required modules
import { Navigation, Pagination, Thumbs, FreeMode, A11y } from 'swiper/modules';

// ایمپورت استایل‌های مخصوص این کامپوننت با CSS Modules
import styles from './GameSlider.module.css';

const GameSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // برای همگام‌سازی اسلایدر Thumbs
  const [activeIndex, setActiveIndex] = useState(0); // برای ردیابی اسلاید فعال

  // داده‌های Dummy برای اسلایدها (مطابق با HTML اصلی شما)
  // توجه: آدرس‌دهی ویدیوها و تصاویر باید دقیقاً مطابق با پوشه public شما باشد.
  const gamesData = [
    {
      id: 1,
      title: "Elden Ring",
      videoUrl: "/videos/Elden-Ring-Shadow-of-the-Erdtree-Official-Launch-Trailer.webm",
      description: "Elden Ring (الدن رینگ) یک ویدئو گیم در سبک نقش‌ آفرینی و همچنین اکشن و جهان باز هست؛ که توسط شرکت بازی سازی بزرگ فرام سافتور طراحی و توسط کمپانی باندای نامکو انترتینمنت در فوریه ۲۰۲۲، برای PC مایکروسافت ویندوز، اکس‌باکس وان XBOX ONE، اکس‌باکس سری اکس/اس، پلی‌استیشن ۴ PS4 و PS5 پلی‌استیشن ۵ منتشر شد",
      thumbnails: [
        "/images/elden ring/elden-ring-1_bzzt.jpg",
        "/images/elden ring/elden-ring-4_bzzt.jpg",
        "/images/elden ring/ELDEN_RING_Shadow_of_the_Erdtree-1.webp",
      ],
    },
    {
      id: 2,
      title: "Read Dead Redemption 2",
      videoUrl: "/videos/Red Dead Redemption 2  Official Gameplay Video.mp4",
      description: "داستان بازی در سال ۱۸۹۹ رخ می دهد و داستان یکی از آخرین گروه های بازمانده از غرب وحشی که گروه “پسران داچ” نام دارد را روایت می کند. رهبر گروه خود داچ ون در لیند است و بازیکن در نقش دست راست او، یعنی آرتور مورگان قرار می گیرد و بازی داستان اتفاقات قبل از Red Dead Redemption 1 را روایت می کند. Red Dead Redemption 2هم با داستانی حماسی زندگی بی رحم و خشن در منطقه مرکزی آمریکا و غرب وحشی را برای شما به تصویر می کشاند و جلوی واقعی از تمام تضادهای موجود در بین مردم در این جامعه رخ می دهد را به مایش می گذارد  .",
      thumbnails: [
        "/images/red dead redemption 2/Red_Dead_Redemption_2-1.webp",
        "/images/red dead redemption 2/Red_Dead_Redemption_2-2.jpg",
        "/images/red dead redemption 2/Red_Dead_Redemption_2-3.webp",
      ],
    },
    // ... می‌توانید بازی‌های بیشتری را اینجا اضافه کنید
  ];

  // Effect برای متوقف کردن ویدیوها هنگام تغییر اسلاید
  useEffect(() => {
    const stopAllVideos = () => {
      const videos = document.querySelectorAll(`.${styles.gameVideo}`);
      videos.forEach(video => {
        if (!video.paused) {
          video.pause();
          video.currentTime = 0; // به اول ویدیو برگردان
        }
      });
    };

    // پاکسازی در هنگام unmount یا تغییر اسلاید
    return () => stopAllVideos();
  }, [activeIndex]); // هر بار که activeIndex تغییر کند، ویدیوها را کنترل کن

  return (
    <section className={styles.whatsNewsContainer}>
      <h1 className={styles.whatsNewsTitle}>Best Game</h1>
      <div className={styles.sliderWrapper}>
        {/* Swiper اصلی برای ویدیو و محتوا */}
        <Swiper
          modules={[Navigation, Pagination, Thumbs, A11y]}
          spaceBetween={0} // فاصله بین اسلایدها (چون اسلایدها 100% عرض viewport هستند)
          slidesPerView={1} // همیشه یک اسلاید کامل را نشان بده
          navigation={true} // فعال کردن دکمه‌های ناوبری
          pagination={{ clickable: true }} // فعال کردن دات‌ها
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} // <--- Thumbs را متصل می‌کنیم
          loop={true} // اسلایدر بی‌پایان
          className={styles.mainSlider}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex); // Index واقعی اسلاید فعال را بگیرید
          }}
          // onSwiper={(swiper) => {
          //   // Ensure current video starts playing when slider is initialized
          //   const currentVideo = swiper.slides[swiper.activeIndex].querySelector('video');
          //   if (currentVideo) {
          //       currentVideo.play();
          //   }
          // }}
        >
          {gamesData.map((game, index) => (
            <SwiperSlide key={game.id} className={styles.slide}>
              <div className={styles.slideContent}>
                <div className={styles.videoBox}>
                  <h2 className={styles.videoHead}>{game.title}</h2>
                  <video src={game.videoUrl} controls className={styles.gameVideo} ></video> {/* autoPlay بر اساس فعال بودن اسلاید */}
                  <div className={styles.gameDescription}>{game.description}</div>
                </div>
                {/* Thumbs Box کنار ویدیو - این بخشی از محتوای اسلاید است */}
                <div className={styles.thumbsBox}>
                  {game.thumbnails.map((thumbUrl, idx) => (
                    <div key={idx} className={styles.thumb}>
                      <img src={thumbUrl} alt={`Thumbnail ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default GameSlider;