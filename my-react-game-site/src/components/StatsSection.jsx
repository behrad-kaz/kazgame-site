// src/components/StatsSection.jsx
import React, { useState, useEffect } from 'react';
import styles from './StatsSection.module.css';

const API_BASE_URL = 'https://localhost:7055';

// یک کامپوننت کوچک برای انیمیشن شمارش اعداد
const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const endValue = parseInt(end, 10);
        if (start === endValue) return;

        const totalFrames = Math.round(duration / (1000 / 60));
        const increment = endValue / totalFrames;
        let currentFrame = 0;

        const timer = setInterval(() => {
            currentFrame++;
            start += increment;
            if (start >= endValue) {
                clearInterval(timer);
                setCount(endValue);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count.toLocaleString('en-US')}</span>;
};


const StatsSection = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`);
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
                // در صورت خطا، مقادیر پیش‌فرض را نمایش می‌دهیم
                setStats({ totalGames: 0, totalNews: 0, totalUsers: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <section className={styles.statsSection}>
            <div className={styles.statsGrid}>
                {/* باکس تعداد کاربران */}
                <div className={styles.statBox}>
                    <div className={styles.statNumber}>
                        {loading ? '...' : <CountUp end={stats.totalUsers} />}
                    </div>
                    <div className={styles.statLabel}>تعداد کاربران</div>
                </div>

                {/* باکس تعداد اخبار */}
                <div className={styles.statBox}>
                    <div className={styles.statNumber}>
                        {loading ? '...' : <CountUp end={stats.totalNews} />}
                    </div>
                    <div className={styles.statLabel}>تعداد اخبار</div>

                </div>

                {/* باکس همکاران (عدد ثابت) */}
                <div className={styles.statBox}>
                    <div className={styles.statNumber}>
                        {/* **** عدد ثابت خود را اینجا وارد کنید **** */}
                        <CountUp end={1} />
                    </div>
                    <div className={styles.statLabel}>همکاران ما</div>
                </div>

                {/* باکس آرشیو بازی‌ها */}
                <div className={styles.statBox}>
                    <div className={styles.statNumber}>
                        {loading ? '...' : <CountUp end={stats.totalGames} />}
                    </div>
                    <div className={styles.statLabel}>آرشیو کل بازی‌ها</div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;