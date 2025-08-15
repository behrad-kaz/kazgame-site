// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AuthPage.module.css'; // می‌توانیم از استایل‌های AuthPage استفاده کنیم

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!token) { alert("توکن نامعتبر است."); return; }
        if (newPassword !== confirmPassword) { alert("رمزهای عبور مطابقت ندارند."); return; }
        if (newPassword.length < 8) { alert("رمز عبور باید حداقل 8 کاراکتر باشد."); return; }

        try {
            const response = await fetch("https://localhost:7055/api/User/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword, resetToken: token })
            });

            const responseData = await response.json();
            if (!response.ok) {
                alert(responseData.message || "خطا در تغییر رمز عبور.");
            } else {
                alert("رمز عبور با موفقیت تغییر یافت. حالا می‌توانید وارد شوید.");
                navigate('/signup');
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
        }
    };
    
    return (
        <div className={styles.authPageContainer}>
            <div className={styles.authFormWrapper} style={{ width: '500px', height: '400px' }}>
                <div className={styles.authForms}>
                    <h2>تغییر رمز عبور</h2>
                    <p>رمز عبور جدید خود را وارد کنید.</p>
                    <form onSubmit={handleResetPassword} className={styles.authForm}>
                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="رمز عبور جدید"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="تایید رمز عبور جدید"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>تغییر رمز</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;