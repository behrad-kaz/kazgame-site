// src/components/HeroGameSlider.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules'; // EffectFade برای ترنزیشن نرم

// استایل‌های Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // استایل‌های EffectFade

import styles from './HeroGameSlider.module.css'; // برای استایل‌های این کامپوننت

const HeroGameSlider = ({ slides }) => {
  return (
    <div className={styles.heroSliderContainer}>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        effect="fade" // ترنزیشن محو شدن
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true, renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'; // Pagination عددی
          },
        }}
        loop={true}
        autoplay={{
          delay: 5000, // هر 5 ثانیه اسلاید عوض شود
          disableOnInteraction: false, // با تعامل کاربر متوقف نشود
        }}
        className={styles.mainHeroSwiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.heroSlide}>
            <div className={styles.backgroundOverlay}></div> {/* لایه تیره روی تصویر */}
            <img src={slide.backgroundImageUrl} alt={slide.title} className={styles.backgroundImage} />

            <div className={styles.contentWrapper}>
              <div className={styles.leftSocialPanel}>
                {/* آیکون‌های شبکه‌های اجتماعی - Font Awesome نیاز است */}
                <a href="#"><i className="fas fa-download"></i></a>
                <a href="#"><i className="fab fa-telegram-plane"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fas fa-envelope"></i></a>
                <a href="#" className={styles.colorfulIcon}></a> {/* آیکون رنگی */}
              </div>

              <div className={styles.gameInfo}>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.description}>{slide.description}</p>
                <Link to={slide.link} className={styles.readMoreButton}>
                  ادامه مطلب <i className="fas fa-angle-left"></i>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroGameSlider;