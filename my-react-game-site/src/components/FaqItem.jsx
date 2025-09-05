// src/components/FaqItem.jsx
import React from 'react';
import styles from './FaqSection.module.css'; // ما از همان فایل CSS والد استفاده می‌کنیم

const FaqItem = ({ faq, index, isOpen, onToggle }) => {
    return (
        <div className={styles.faqItem}>
            <button className={styles.faqQuestion} onClick={() => onToggle(index)}>
                <span>{faq.question}</span>
                <span className={`${styles.toggleIcon} ${isOpen ? styles.open : ''}`}>
                    +
                </span>
            </button>
            <div className={`${styles.faqAnswer} ${isOpen ? styles.open : ''}`}>
                <div className={styles.answerContent}>
                    {faq.answer}
                </div>
            </div>
        </div>
    );
};

export default FaqItem;