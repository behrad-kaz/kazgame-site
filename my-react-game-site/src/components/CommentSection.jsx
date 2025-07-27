// src/components/CommentSection.jsx
import React, { useState, useEffect, forwardRef } from 'react'; 
import styles from './CommentSection.module.css';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://localhost:7055';


const CommentSection = forwardRef(({ gameId }, ref) => {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // اطلاعات کاربر لاگین شده
    const isLoggedIn = localStorage.getItem('loggedInUsername') !== null;
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInFullName = localStorage.getItem('loggedInUsername'); // نام کامل کاربر
    const loggedInUserAvatarPath = localStorage.getItem('userAvatar');
    const fullLoggedInUserAvatarUrl = loggedInUserAvatarPath
        ? `${API_BASE_URL}${loggedInUserAvatarPath}?t=${new Date().getTime()}`
        : '/images/user.png';

    // تابع برای دریافت کامنت‌ها
    const fetchComments = async () => {
        setLoading(true);
        try {
            const url = `${API_BASE_URL}/api/Comments?gameId=${gameId || 0}`;
            const response = await fetch(`${API_BASE_URL}/api/Comments?gameId=${gameId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // **مهم:** آدرس‌های آواتار را به آدرس کامل تبدیل می‌کنیم
            const commentsWithFullAvatarUrls = data.map(comment => {
                // آدرس آواتار هر کامنت از API می‌آید (comment.UserAvatarUrl)
                const fullCommentAvatarUrl = comment.UserAvatarUrl
                    ? `${API_BASE_URL}${comment.UserAvatarUrl}?t=${new Date().getTime()}` // <--- استفاده از API_BASE_URL
                    : '/images/user.png'; // آواتار پیش‌فرض
                console.log(`Comment ID: ${comment.id}, Raw Avatar URL from API: ${comment.UserAvatarUrl}, Final Display URL: ${fullCommentAvatarUrl}`); // <--- **LOG جدید برای دیباگ**
                return {
                    ...comment,
                    fullCommentAvatarUrl: fullCommentAvatarUrl // یک فیلد جدید برای آدرس کامل آواتار هر کامنت
                };
            });
            setComments(commentsWithFullAvatarUrls);
        } catch (err) {
            console.error("خطا در دریافت کامنت‌ها:", err);
            setError("کامنت‌ها بارگذاری نشدند.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (gameId) {
            console.log("CommentSection received gameId:", gameId); // <--- **LOG ۲**
            fetchComments();
        } else {
            console.log("CommentSection did NOT receive gameId."); // <--- **LOG ۳**
        }
    }, [gameId]);

    // تابع برای ارسال کامنت جدید
    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert("برای ارسال کامنت، ابتدا وارد شوید.");
            return;
        }

        if (newCommentText.trim() === "") {
            alert("متن کامنت نمی‌تواند خالی باشد.");
            return;
        }

        if (newCommentText.length > 500) {
            alert("کامنت نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/Comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: parseInt(loggedInUserId), // به عدد تبدیل شود
                    fullName: loggedInFullName,
                    gameId: gameId || 0,
                    text: newCommentText
                    // GameId: gameId // اگر کامنت برای بازی خاصی است
                })
            });

            const responseData = await response.json();

            if (!response.ok) {
                alert(responseData.message || "خطا در ارسال کامنت.");
            } else {
                alert("کامنت با موفقیت ارسال شد.");
                setNewCommentText("");
                const newComment = {
                    ...responseData.comment, // CommentResponseDto از API
                    fullCommentAvatarUrl: responseData.comment.UserAvatarUrl // اگر از API می‌آید
                        ? `${API_BASE_URL}${responseData.comment.UserAvatarUrl}?t=${new Date().getTime()}`
                        : '/images/user.png'
                };
                setComments(prevComments => [newComment, ...prevComments]); // اضافه کردن به ابتدای لیست
            }
        } catch (err) {
            alert("خطا در ارتباط با سرور.");
            console.error("Submit Comment Error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };
    // تابع برای فرمت دادن به تاریخ
    const formatCommentTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString('fa-IR')} در ${date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <section className={styles.commentSection} ref={ref}>
            <h2 className={styles.sectionTitle}>نظرات کاربران</h2>

            {/* فرم ارسال کامنت */}
            <div className={styles.commentFormContainer}>
                {isLoggedIn ? (
                    <form onSubmit={handleSubmitComment} className={styles.commentForm}>
                        <div className={styles.currentUserInfo}>
                            <img src={fullLoggedInUserAvatarUrl} alt="User Avatar" className={styles.commentUserAvatar} /> {/* <--- آواتار کاربر لاگین شده */} {/* <--- استفاده از آدرس کامل */}
                            <span className={styles.commentUserName}>{loggedInFullName}</span>
                        </div>
                        <textarea
                            className={styles.commentTextArea}
                            placeholder="دیدگاه خود را بنویسید..."
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            rows="4"
                            maxLength="500" // همانند بک‌اند
                        ></textarea>
                        <button type="submit" className={styles.submitCommentButton} disabled={isSubmitting}>
                            {isSubmitting ? "در حال ارسال..." : "ارسال دیدگاه"}
                        </button>
                    </form>
                ) : (
                    <p className={styles.loginPrompt}>برای ارسال دیدگاه، لطفاً <Link to="/signup">وارد شوید</Link>.</p>
                )}
            </div>

            {/* لیست کامنت‌ها */}
            <div className={styles.commentsList}>
                {loading && <div className={styles.loadingComments}>در حال بارگذاری کامنت‌ها...</div>}
                {error && <div className={styles.errorComments}>{error}</div>}

                {!loading && !error && comments.length === 0 && (
                    <div className={styles.noComments}>هنوز دیدگاهی ثبت نشده است. اولین نفر باشید!</div>
                )}

                {!loading && !error && comments.map((comment) => (
                    <div key={comment.id} className={styles.commentItem}>
                        <div className={styles.commentHeader}>
                            <img src={comment.fullCommentAvatarUrl} alt="User Avatar" className={styles.commentAvatar} />
                            <span className={styles.commentAuthor}>{comment.fullName}</span>
                            <span className={styles.commentTimestamp}>در {formatCommentTimestamp(comment.timestamp)}</span>
                        </div>
                        <p className={styles.commentText}>{comment.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
});
export default CommentSection;