// src/pages/AdvertisingPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsSection from '../components/StatsSection';
import FaqSection from '../components/FaqSection';
import CollaborationCta from '../components/CollaborationCta';
import styles from './AdvertisingPage.module.css';

// داده‌ها برای کارت‌های ویژگی
const features = [
    {
        icon: 'fas fa-shield-alt',
        title: 'خرید مطمئن',
        description: 'با درگاه‌های پرداخت امن و رمزنگاری شده، با اطمینان کامل خرید کنید.'
    },
    {
        icon: 'fas fa-rocket',
        title: 'آسودگی خاطر',
        description: 'تیم پشتیبانی ما در تمام مراحل خرید و پس از آن همراه شماست.'
    },
    {
        icon: 'fas fa-headset',
        title: 'پشتیبانی عالی',
        description: 'در ۷ روز هفته و به صورت ۲۴ ساعته پاسخگوی سوالات شما هستیم.'
    }
];

const AdvertisingPage = () => {
    return (
        <div className={styles.pageContainer}>
            <Header />

            <main>
                {/* بخش ۱: بنر با اسکرول بی‌نهایت */}
                <section className={styles.scrollingBanner}>
                    <div className={styles.scrollingImageWrapper}>
                        {/* ما دو بار عکس را قرار می‌دهیم تا انیمیشن یکپارچه و بی‌نهایت به نظر برسد */}
                        <img src="/images/scrolling-banner.jpg" alt="Games collage" />
                        <img src="/images/scrolling-banner.jpg" alt="Games collage" />
                    </div>
                </section>

                {/* بخش ۲: سه کارت ویژگی */}
                <section className={styles.featuresSection}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureBox}>
                            <i className={`${feature.icon} ${styles.featureIcon}`}></i>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </section>
                <FaqSection />
                <StatsSection />
                <CollaborationCta />
            </main>

            <Footer />
        </div>
    );
};

export default AdvertisingPage;