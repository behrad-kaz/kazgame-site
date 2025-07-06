// src/components/ProductSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // برای دکمه‌های ناوبری
import 'swiper/css/pagination'; // برای دات‌ها

import { Navigation, Pagination, A11y } from 'swiper/modules';

import styles from './ProductSlider.module.css'; // ایمپورت CSS Modules

const ProductSlider = ({ products }) => {
  return (
    <section className={styles.sliderSection}>
      <h2 className={styles.sliderTitle}>Best Games</h2>
      <div className={styles.productSlider}>
        <Swiper className={styles.swiperInner} 
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20} // فاصله بین اسلایدها (20px برای 200px کارت + 10px margin)
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 6, // طبق تصویر شما
              spaceBetween: 30, // فاصله بین 6 کارت
            },
            // اگر بیش از 6 کارت میخواهید در 1400px نشان دهید، آن را تنظیم کنید
            1400: {
              slidesPerView: 6,
              spaceBetween: 40,
            }
          }}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className={styles.productCard}>
                <img src={product.imageUrl} alt={product.title} />
                <p>{product.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductSlider;