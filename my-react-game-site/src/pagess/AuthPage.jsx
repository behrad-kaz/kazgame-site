// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css'; // برای استایل‌های این صفحه

const AuthPage = () => {
    const [isLoginActive, setIsLoginActive] = useState(false); // true برای Login, false برای Sign Up
    // State برای فیلدهای فرم Sign Up
    const [registerUsername, setRegisterUsername] = useState(''); // در طراحی جدید username است
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState(''); // برای تایید رمز عبور
    // State برای فیلدهای فرم Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();

    // در طراحی Key Sharer کپچا دیده نمی‌شود، پس آن را حذف می‌کنیم
    // اگر نیاز دارید بعداً کپچا را به طراحی جدید اضافه کنیم، اطلاع دهید.

    // تابع برای مدیریت ثبت‌نام
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        // اعتبارسنجی‌های فرانت‌اند
        if (!registerUsername.trim()) { alert("نام کاربری الزامی است."); return; }
        if (!registerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) { alert("ایمیل معتبر وارد کنید."); return; }
        if (registerPassword.length < 8) { alert("رمز عبور باید حداقل 8 کاراکتر باشد."); return; } // معمولا 8 کاراکتر برای امنیت بیشتر
        if (registerPassword !== registerConfirmPassword) { alert("رمز عبور و تایید آن مطابقت ندارند."); return; }
        // بردرسی کاراکترهای خاص (اگر می‌خواهید این را اعمال کنید)
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(registerPassword)) {
            alert("رمز عبور باید حداقل شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد.");
            return;
        }

        const data = {
            fullName: registerUsername, // FullName در API شماست، اینجا به username مپ می‌شود
            email: registerEmail,
            password: registerPassword
        };

        try {
            const response = await fetch("https://localhost:7055/api/User/register", {
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
                setIsLoginActive(true); // بعد از ثبت‌نام موفق به فرم Login بروید
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
            console.error("Register Error:", error);
        }
    };

    // تابع برای مدیریت ورود
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
            const response = await fetch("https://localhost:7055/api/User/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();

            if (!response.ok) {
                alert(responseData.message || "ایمیل یا رمز عبور اشتباه است.");
            } else {
                localStorage.setItem('loggedInUsername', responseData.fullName);
                localStorage.setItem('loggedInUserId', responseData.userId);
                localStorage.setItem('userAvatar', responseData.avatarUrl || '/images/default-user.png'); // اگر API آواتار را هم برمی‌گرداند، ذخیره کن

                alert("ورود با موفقیت انجام شد.");
                navigate('/');
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
            console.error("Login Error:", error);
        }
    };

    return (
        <div className={styles.authPageContainer}>
            <div className={styles.authFormWrapper}>
                <div className={styles.leftPanel}>
                    <div className={styles.logo}>
                        <img src="/images/key-sharer-logo.png" alt="Key Sharer Logo" /> {/* لوگوی Key Sharer */}
                    </div>
                    <div className={styles.leftPanelContent}>
                        <h1>Your Keys.</h1>
                        <h1>Your Chats.</h1>
                        <h1>Your Security.</h1>
                        <p>Take control of your conversations, ensuring that only you and your recipients have access to your communication.</p>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.authForms}>
                        <h2 className={styles.authTitle}>{isLoginActive ? "Login To Your Account" : "Sign Up An Account"}</h2>

                        {/* دکمه‌های Google و Apple - فعلاً فقط بصری هستند */}
                        <div className={styles.socialAuthButtons}>
                            <button className={styles.socialButton}><img src="/images/google-logo.png" alt="Google" /> Google</button>
                            <button className={styles.socialButton}><img src="/images/apple-logo.png" alt="Apple" /> Apple</button>
                        </div>
                        <div className={styles.orDivider}><span>OR</span></div>

                        {/* فرم Sign Up / Register */}
                        {!isLoginActive && (
                            <form className={styles.authForm} onSubmit={handleRegisterSubmit}>
                                <div className={styles.inputGroup}>
                                    <input type="text" placeholder="Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required />
                                    <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                                    <p className={styles.passwordHint}>رمز عبور باید حداقل 8 کاراکتر باشد و شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد.</p>
                                    <input type="password" placeholder="Confirm password" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className={styles.submitButton}>Sign Up</button>
                                <p className={styles.switchFormText}>Already have an account? <span onClick={() => setIsLoginActive(true)} className={styles.switchFormLink}>Log In</span></p>
                            </form>
                        )}

                        {/* فرم Login */}
                        {isLoginActive && (
                            <form className={styles.authForm} onSubmit={handleLoginSubmit}>
                                <div className={styles.inputGroup}>
                                    <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className={styles.submitButton}>Log In</button>
                                <p className={styles.switchFormText}>Don't have an account? <span onClick={() => setIsLoginActive(false)} className={styles.switchFormLink}>Sign Up</span></p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;