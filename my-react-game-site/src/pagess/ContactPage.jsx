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
                <img src="/images/kazgame-logo.png" alt="KazGame Logo" className={styles.bannerLogo} />
            </div>

            {/* **** تغییر ۱: بخش خدمات و پشتیبانی به اینجا منتقل شد **** */}
            {/* این بخش اکنون عرض کامل دارد و بالای محتوای اصلی قرار می‌گیرد */}
            <div className={styles.supportInfoBox}>
                <h3>خدمات و پشتیبانی  چگونه است؟</h3>
                <p>
                    جی باز یک بستر هوشمند برای انتخاب و نصب خودکار بازی های کامپیوتری و پشتیبانی /شبکه سازی بازی ها می باشد.شما با نصب نرم افزار جی باز می توانید از امکاناتی مانند تروفی ها، مودها و ثبت فعالیتهای گیمینگ خود و ... استفاده نمایید و همچنین با چند کلیک بازی های مورد علاقه خود را بدون دردسر و نیاز به کرک به راحتی دانلود و نصب کنید، علاوه بر این امکانات شما می توانید از زیر نویسی فارسی و دوبله و ویدئوی کامل از گیم پلی بازی ها بهرمند شوید.



                    سازندگان و توسعه دهندگان بازی میتوانند با ما در ارتباط باشند و جی باز آماده همکاری با تمامی سازنگان بازی را دارد .

                    تمام کسانی که علاقمند هستند در این راه در کنار ما باشند و به تیم جی باز کمک کنند میتوانند فرم زیر را پر کرده و برای ما ارسال نمایند .



                    تجربه ی بی دغدغه ی لذت بازی از دانلود تا اجرا با پلتفرم جی باز
                </p>
            </div>

            <main className={styles.mainContent}>


                {/* ستون فرم تماس */}
                <div className={styles.formColumn}>
                    <h3>تماس با ما</h3>
                    <p>تجربه بی نظیری داشته اید؟ یا دانش بیشتری نیاز دارید؟</p>
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