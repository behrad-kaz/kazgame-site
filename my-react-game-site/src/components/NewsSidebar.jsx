// src/components/NewsSidebar.jsx (نسخه نهایی و کامل)
import React from 'react';
import styles from './NewsSidebar.module.css';
import SidebarSlider from './CreativeWidgets'; // ایمپورت اسلایدر

const NewsSidebar = () => {
    // این داده‌ها می‌توانند از API بیایند، اما فعلا ثابت هستند
    const categories = ["نقد و بررسی", "اخبار بازی", "راهنمای بازی", "سخت‌افزار"];
    const tags = ["پلی‌استیشن", "ایکس‌باکس", "PC", "GTA", "FIFA"];

    return (
        // تگ <aside> اصلی سایدبار شما
        <aside className={styles.sidebar}>
            <div className={styles.widget}>
                <h3 className={styles.widgetTitle}>دسته‌بندی‌ها</h3>
                <ul className={styles.categoryList}>
                    {categories.map(cat => <li key={cat}><a href="#">{cat}</a></li>)}
                </ul>
            </div>

            <div className={styles.widget}>
                <h3 className={styles.widgetTitle}>کلمات کلیدی</h3>
                <div className={styles.tagCloud}>
                    {tags.map(tag => <a key={tag} href="#" className={styles.tagLink}>{tag}</a>)}
                </div>
            </div>

            <div className={styles.widget}>
                <h3 className={styles.widgetTitle}>تبلیغات</h3>
                <div className={styles.adBox}>
                    <div className={styles.textAds}>
                        <a href="#">خرید سی پی قانونی و ارزان</a>
                        <a href="#">آموزش طراحی وب</a>
                        <a href="#">فضای ذخیره‌سازی ابری</a>
                    </div>
                    <div className={styles.bannerAd}>
                        <a href="#">
                            <img src="/images/ads/sample-ad.jpg" alt="تبلیغات" />
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default NewsSidebar;