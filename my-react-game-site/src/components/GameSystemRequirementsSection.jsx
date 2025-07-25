// src/components/GameSystemRequirementsSection.jsx
import React from 'react';
import styles from './GameSystemRequirementsSection.module.css';

const GameSystemRequirementsSection = ({ game }) => {
  // داده‌های سیستم مورد نیاز (با نام‌های camelCase از API می‌آیند)
  const requirements = [
    { label: 'سیستم عامل', min: game.minOS, rec: game.recOS },
    { label: 'پردازنده', min: game.minProcessor, rec: game.recProcessor },
    { label: 'حافظه رم', min: game.minMemory, rec: game.recMemory },
    { label: 'کارت گرافیک', min: game.minGraphics, rec: game.recGraphics },
    { label: 'فضای ذخیره‌سازی', min: game.minStorage, rec: game.recStorage },
    { label: 'DirectX', min: game.minDirectX, rec: game.recDirectX },
  ];

  // اگر هیچ اطلاعات سیستمی در دسترس نبود
  const hasRequirements = requirements.some(req => req.min || req.rec);

  if (!hasRequirements) {
    return null; // اگر اطلاعاتی نبود، چیزی نمایش نده
  }

  return (
    <section className={styles.systemRequirementsSection}>
      <h2 className={styles.sectionTitle}>سیستم مورد نیاز</h2>
      <div className={styles.requirementsWrapper}>
        {/* ستون حداقل سیستم مورد نیاز */}
        <div className={styles.requirementColumn}>
          <h3 className={styles.columnTitle}>حداقل سیستم مورد نیاز</h3>
          <ul className={styles.requirementList}>
            {requirements.map((req, index) => (
              req.min && (
                <li key={index} className={styles.requirementItem}>
                  <span className={styles.requirementLabel}>{req.label}:</span>
                  <span className={styles.requirementValue}>{req.min}</span>
                </li>
              )
            ))}
          </ul>
        </div>

        {/* ستون سیستم پیشنهادی */}
        <div className={styles.requirementColumn}>
          <h3 className={styles.columnTitle}>سیستم پیشنهادی</h3>
          <ul className={styles.requirementList}>
            {requirements.map((req, index) => (
              req.rec && (
                <li key={index} className={styles.requirementItem}>
                  <span className={styles.requirementLabel}>{req.label}:</span>
                  <span className={styles.recRequirementValue}>{req.rec}</span>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GameSystemRequirementsSection;