// src/pages/AuthPage.jsx (نسخه ترکیبی: منطق اصلی شما + ظاهر جدید)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';

// ثابت API_BASE_URL برای هماهنگی با توابع شما
const API_BASE_URL = 'https://localhost:7055';

// تصاویر برای اسلایدشوی پنل چپ (از طراحی جدید)
const sliderImages = [
    '/images/auth-slider/image1.jpg',
    '/images/auth-slider/image2.jpg',
    '/images/auth-slider/image3.jpg',
];

const AuthPage = () => {
    // ۱. بازگشت به state اصلی شما (isLoginActive)
    const [isLoginActive, setIsLoginActive] = useState(false);

    // State های فرم‌ها (مانند کد اصلی شما)
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();

    // منطق اسلایدشوی عکس (از طراحی جدید، چون فقط ظاهری است)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    // ۲. استفاده از توابع handle...Submit اصلی و کارآمد شما
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        // ... (تمام کدهای اعتبارسنجی شما) ...
        if (!registerUsername.trim()) { alert("نام کاربری الزامی است."); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) { alert("ایمیل معتبر وارد کنید."); return; }
        if (registerPassword.length < 8) { alert("رمز عبور باید حداقل 8 کاراکتر باشد."); return; }
        if (registerPassword !== registerConfirmPassword) { alert("رمز عبور و تایید آن مطابقت ندارند."); return; }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(registerPassword)) {
            alert("رمز عبور باید حداقل شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد.");
            return;
        }

        const data = {
            fullName: registerUsername,
            email: registerEmail,
            password: registerPassword
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/User/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (!response.ok) {
                alert(responseData.message || "خطا در ثبت‌نام.");
            } else {
                alert("ثبت‌نام با موفقیت انجام شد.");
                setRegisterUsername('');
                setRegisterEmail('');
                setRegisterPassword('');
                setRegisterConfirmPassword('');
                setIsLoginActive(true); // استفاده از منطق اصلی شما
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
            console.error("Register Error:", error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            alert("ایمیل و رمز عبور را وارد کنید.");
            return;
        }
        const data = {
            email: loginEmail,
            password: loginPassword
        };
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (!response.ok) {
                alert(responseData.message || "ایمیل یا رمز عبور اشتباه است.");
            } else {
                // استفاده از منطق اصلی شما برای ذخیره در localStorage
                localStorage.setItem('loggedInUsername', responseData.fullName);
                localStorage.setItem('loggedInUserId', responseData.userId);
                localStorage.setItem('userAvatar', responseData.avatarUrl || '/images/default-user.png');
                alert("ورود با موفقیت انجام شد.");
                navigate('/');
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
            console.error("Login Error:", error);
        }
    };

    const handleForgotPasswordClick = async () => {
        if (!loginEmail) {
            alert("لطفاً ایمیل خود را در فیلد بالا وارد کنید.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail })
            });
            const responseData = await response.json();
            alert(responseData.message || "خطا در ارسال درخواست.");
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
            console.error("Forgot Password Error:", error);
        }
    };

    return (
        // ۳. استفاده از ساختار JSX و کلاس‌های CSS طراحی جدید
        <div className={styles.authPageContainer}>
            <div className={styles.authFormWrapper}>
                <div
                    className={styles.leftPanel}
                    style={{ backgroundImage: `url(${sliderImages[currentImageIndex]})` }}
                >
                </div>
                <div className={styles.rightPanel}>
                    <div className={styles.logo}><img src="/images/image.png" alt="KazGame Logo" />
                    </div>
                    <div className={styles.authForms}>
                        {/* ۴. شرط نمایش فرم‌ها بر اساس isLoginActive (منطق اصلی شما) */}
                        {!isLoginActive ? (
                            <form className={styles.authForm} onSubmit={handleRegisterSubmit}>
                                <h2 className={styles.authTitle}>ایجاد حساب کاربری</h2>
                                <input type="text" placeholder="نام کاربری" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required />
                                <input type="email" placeholder="ایمیل" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                                <input type="password" placeholder="رمز عبور" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                                <input type="password" placeholder="تکرار رمز عبور" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} required />
                                <button type="submit" className={styles.submitButton}>ثبت‌نام</button>
                                <p className={styles.switchFormText}>قبلاً ثبت‌نام کرده‌اید؟ <span onClick={() => setIsLoginActive(true)} className={styles.switchFormLink}>وارد شوید</span></p>
                            </form>
                        ) : (
                            <form className={styles.authForm} onSubmit={handleLoginSubmit}>
                                <h2 className={styles.authTitle}>ورود به حساب کاربری</h2>
                                <input type="email" placeholder="ایمیل" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                <input type="password" placeholder="رمز عبور" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                                <p className={styles.forgotPasswordLink} onClick={handleForgotPasswordClick}>رمز عبور خود را فراموش کرده‌اید؟</p>
                                <button type="submit" className={styles.submitButton}>ورود</button>
                                <p className={styles.switchFormText}>حساب کاربری ندارید؟ <span onClick={() => setIsLoginActive(false)} className={styles.switchFormLink}>ثبت‌نام کنید</span></p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;