// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './ContactPage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = 'https://localhost:7055';

const ContactPage = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '', message: '' });
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [status, setStatus] = useState('');

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 5; i++) {
            randomString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(randomString);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (captchaInput !== captcha) {
            setStatus('کد امنیتی وارد شده صحیح نیست.');
            generateCaptcha();
            return;
        }

        setStatus('در حال ارسال پیام...');
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, captcha: captchaInput })
            });

            const data = await response.json();
            if (response.ok) {
                setStatus(data.message);
                setFormData({ fullName: '', email: '', phoneNumber: '', message: '' });
                setCaptchaInput('');
                generateCaptcha();
            } else {
                setStatus(`خطا: ${data.message}`);
            }
        } catch (error) {
            setStatus('خطا در برقراری ارتباط با سرور.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />

            <div className={styles.banner}>
            </div>

            {/* **** تغییر ۱: بخش خدمات و پشتیبانی به اینجا منتقل شد **** */}
            {/* این بخش اکنون عرض کامل دارد و بالای محتوای اصلی قرار می‌گیرد */}
            <div className={styles.supportInfoBox}>
                <h3>به دنیای KazGame خوش آمدید، مقصد نهایی شما در جهان بی‌کران بازی‌های ویدیویی!</h3>
                <p>
                    ما در KazGame با اشتیاق، پلتفرمی جامع را برای گیمرهای فارسی‌زبان فراهم کرده‌ایم تا هر آنچه برای یک تجربه گیمینگ کامل نیاز دارید، در دسترس شما باشد. از گشت و گذار در آرشیو وسیع و به‌روز بازی‌های ما گرفته تا دسترسی به لینک‌های دانلود مستقیم، مشاهده گالری تصاویر و نیازمندی‌های سیستمی، همه چیز برای یک تجربه بی‌نقص طراحی شده است.

                    اما KazGame فراتر از یک آرشیو ساده است؛ اینجا خانه یک جامعه پویا از گیمرهاست. با ساخت پروفایل شخصی خود، می‌توانید بازی‌های مورد علاقه خود را به لیست علاقه‌مندی‌ها اضافه کنید، در بخش نظرات تخصصی ما با دیگر کاربران گفتگو کرده و تجربیات خود را به اشتراک بگذارید و به بخشی از خانواده بزرگ ما تبدیل شوید.

                    همیشه در مرکز اتفاقات باشید! بخش اخبار ما شما را از آخرین رویدادها، نقد و بررسی‌ها و مقالات داغ دنیای گیم مطلع نگه می‌دارد تا هیچ لحظه‌ای را از دست ندهید.

                    هدف ما در KazGame، خلق تجربه‌ای بی‌دغدغه و کامل برای شماست؛ از لحظه کشف یک بازی جدید تا اجرای آن و گفتگو درباره آن با دوستانتان. به ما بپیوندید و ماجراجویی خود را آغاز کنید.
                </p>
            </div>

            <main className={styles.mainContent}>


                {/* ستون فرم تماس */}
                <div className={styles.formColumn}>
                    <h3>تماس با ما</h3>
                    <p>انتقاد یا پیشنهادی دارید ؟ لطفا با ما درمیان بگذارید </p>
                    <form onSubmit={handleSubmit} className={styles.contactForm}>
                        <div className={styles.inputGroup}>
                            <input type="text" name="fullName" placeholder="نام و نام خانوادگی" value={formData.fullName} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="آدرس ایمیل" value={formData.email} onChange={handleChange} required />
                        </div>
                        <input type="text" name="phoneNumber" placeholder="شماره تماس (اختیاری)" value={formData.phoneNumber} onChange={handleChange} />
                        <textarea name="message" placeholder="پیام شما..." rows="6" value={formData.message} onChange={handleChange} required></textarea>
                        <div className={styles.captchaGroup}>
                            <div className={styles.captchaBox}>{captcha}</div>
                            <button type="button" onClick={generateCaptcha} className={styles.refreshCaptcha}>&#x21bb;</button>
                            <input type="text" placeholder="کد امنیتی را وارد کنید" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} required />
                        </div>
                        <button type="submit" className={styles.submitButton}>ارسال</button>
                        {status && <p className={styles.statusMessage}>{status}</p>}
                    </form>
                </div>

                {/* ستون شبکه‌های اجتماعی */}
                <div className={styles.socialColumn}>
                    <div className={styles.infoBox}>
                        <h3>شبکه‌های اجتماعی</h3>
                        <a href="https://www.instagram.com/kaz_games_pro" className={styles.socialLink}><i className="fab fa-instagram"></i> instagram.com/kazgame</a>
                        <a href="https://t.me/KazGameacc" className={styles.socialLink}><i className="fab fa-telegram"></i> https://t.me/KazGameacc</a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;