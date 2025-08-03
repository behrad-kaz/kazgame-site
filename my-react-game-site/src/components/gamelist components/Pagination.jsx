// src/components/Pagination.jsx
import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageButtons = 7; // حداکثر تعداد دکمه‌های صفحه (مثل gbaz.ir)

  // منطق برای نمایش ...
  if (totalPages <= maxPageButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // منطق نمایش ... در ابتدا و انتها یا وسط
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        « قبلی
      </button>

      {pageNumbers.map((number, index) => (
        <React.Fragment key={index}>
          {number === '...' ? (
            <span className={styles.ellipsis}>...</span>
          ) : (
            <button
              className={`${styles.pageButton} ${number === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(number)}
              disabled={number === '...'}
            >
              {number}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        بعدی »
      </button>
    </div>
  );
};

export default Pagination;