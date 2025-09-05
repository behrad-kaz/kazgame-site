// src/components/FaqSection.jsx
import React, { useState } from 'react';
import FaqItem from './FaqItem';
import styles from './FaqSection.module.css';

// داده‌های مربوط به سوالات متداول
const faqData = [
    {
        question: 'سایت KazGame چه ویژگی‌هایی دارد؟',
        answer: 'KazGame یک پلتفرم جامع برای گیمرهاست. ویژگی‌های اصلی سایت شامل آرشیو کامل بازی‌ها با لینک دانلود، آخرین اخبار دنیای گیم، پروفایل‌های کاربری با قابلیت شخصی‌سازی، و بخش نظرات برای هر بازی است.'
    },
    {
        question: 'چگونه می‌توانم با پشتیبانی سایت تماس بگیرم؟',
        answer: 'شما می‌توانید از طریق فرم موجود در صفحه "تماس با ما"، سوالات، پیشنهادات و مشکلات خود را مستقیماً برای ما ارسال کنید. تیم پشتیبانی ما در اسرع وقت پاسخگوی شما خواهد بود.'
    },
    {
        question: 'آیا برای استفاده از تمام امکانات سایت نیاز به ثبت‌نام دارم؟',
        answer: 'خیر، دسترسی به لیست بازی‌ها و اخبار برای همه کاربران آزاد است. اما برای استفاده از امکاناتی مانند ثبت نظر، شخصی‌سازی پروفایل و دسترسی به تاریخچه، نیاز به ایجاد حساب کاربری دارید.'
    },
    {
        question: 'این وب‌سایت در چه تاریخی ساخته شده است؟',
        answer: 'پروژه وب‌سایت KazGame در سال ۲۰۲۵ میلادی با هدف ایجاد یک مرجع کامل و کاربرپسند برای جامعه گیمرهای فارسی‌زبان کلید خورد.'
    }
];

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null); // State برای نگه داشتن اندیس سوالی که باز است

    // این تابع مسئول باز و بسته کردن سوالات است
    const handleToggle = (index) => {
        // اگر روی سوالی که باز است دوباره کلیک شود، بسته می‌شود
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <h2 className={styles.sectionTitle}>سوالات متداول</h2>
            <div className={styles.faqContainer}>
                {faqData.map((faq, index) => (
                    <FaqItem
                        key={index}
                        faq={faq}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={handleToggle}
                    />
                ))}
            </div>
        </section>
    );
};

export default FaqSection;