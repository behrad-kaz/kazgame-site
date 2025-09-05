// src/components/CollaborationCta.jsx (نسخه اصلاح شده)
import React from 'react';
import { Link } from 'react-router-dom'; // <--- ۱. ایمپورت Link
import styles from './CollaborationCta.module.css';

const CollaborationCta = () => {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
                
                {/* ۲. تگ <a> با Link جایگزین شد و به صفحه تماس با ما می‌رود */}
                <Link to="/services" className={styles.ctaLink}>
                    <p className={styles.ctaText}>
                        {/* ۳. متن جدید شما در اینجا قرار گرفت */}
                        جهت همکاری و انجام تبلیغات با ما از طریق صفحه تماس با ما  یا شبکه‌های اجتماعی در تماس باشید
                    </p>
                </Link>
            </div>
        </section>
    );
};

export default CollaborationCta;