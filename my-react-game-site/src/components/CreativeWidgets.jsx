// src/components/CreativeWidgets.jsx
import React from 'react';
import styles from './CreativeWidgets.module.css'; // از فایل CSS Module جدید استفاده می‌کنیم

// ایمپورت ویجت‌ها
import HotGamesWidget from './widgets/HotGamesWidget';
import PollWidget from './widgets/PollWidget';
import DealsWidget from './widgets/DealsWidget';

const CreativeWidgets = () => {
    return (
        // به جای Swiper از یک div ساده با استایل فلکس عمودی استفاده می‌کنیم
        <div className={styles.widgetsContainer}>
            
            {/* هر ویجت در یک آیتم جداگانه قرار می‌گیرد تا فاصله بین آن‌ها رعایت شود */}
            <div className={styles.widgetItem}>
                <PollWidget />
            </div>
            
            <div className={styles.widgetItem}>
                <DealsWidget />
            </div>
            
            <div className={styles.widgetItem}>
                <HotGamesWidget />
            </div>

        </div>
    );
};

export default CreativeWidgets;