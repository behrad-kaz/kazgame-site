// src/components/gamelist components/ProductSlider.jsx (نسخه نهایی و بازطراحی شده)
import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; // <--- ایمپورت Link برای لینک‌دهی
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import styles from './ProductSlider.module.css';

const API_BASE_URL = 'https://localhost:7055';

const ProductSlider = ({ games }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <section className={styles.sliderSection}>
      <h2 className={styles.sliderTitle}>جدید ترین بازی ها </h2>
      <div className={styles.productSlider}>
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
           breakpoints={{
            // برای کوچک‌ترین سایزها (موبایل)
            320: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            // تبلت
            768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            // دسکتاپ
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          // این تابع برای اطمینان از اتصال صحیح Ref ها در اولین رندر است
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className={styles.swiperContainer}
        >
          {games.map((game) => (
            <SwiperSlide key={game.id}>
              <Link to={`/games/${game.slug}`} className={styles.cardLink}>
                <div className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <img src={game.imageUrl} alt={game.title} />
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.productTitle}>{game.title}</p>
                    {game.price && <p className={styles.productPrice}>${game.price}</p>}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div ref={navigationPrevRef} className={`${styles.navButton} ${styles.prevButton}`}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div ref={navigationNextRef} className={`${styles.navButton} ${styles.nextButton}`}>
        <i className="fas fa-chevron-right"></i>
      </div>
    </section>
  );
};

export default ProductSlider;