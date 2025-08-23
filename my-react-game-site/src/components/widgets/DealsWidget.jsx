import React, { useState, useEffect } from 'react';
import styles from './DealsWidget.module.css';

const API_BASE_URL = 'https://localhost:7055';

const DealsWidget = () => {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        const fetchDeals = async () => {
            const response = await fetch(`${API_BASE_URL}/api/steamdeals/top-deals`);
            const data = await response.json();
            setDeals(data);
        };
        fetchDeals();
    }, []);

    return (
        <div className={styles.widgetContainer}>
            <h3 className={styles.widgetTitle}>گنجینه تخفیف‌ها</h3>
            <ul className={styles.dealsList}>
                {deals.map((deal, index) => (
                    <li key={index} className={styles.dealItem}>
                        <img src={deal.headerImage} alt={deal.name} className={styles.dealImage} />
                        <div className={styles.dealInfo}>
                            <span className={styles.dealName}>{deal.name}</span>
                            <span className={styles.dealPrice}>{deal.finalPrice}</span>
                        </div>
                        <div className={styles.discountBadge}>
                            %{deal.discountPercent}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DealsWidget;