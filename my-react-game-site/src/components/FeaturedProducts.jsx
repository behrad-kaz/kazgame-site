/// src/components/FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // حالت برای نگهداری ID محصولی که در حال حاضر ماوس روی آن است
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // آدرس API شما. اطمینان حاصل کنید که سرور C# در حال اجرا است.
        const response = await fetch("https://localhost:7055/api/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // حالا که API مستقیماً VideoUrl را برمی‌گرداند، دیگر نیازی به کد تست موقتی نیست.
        setProducts(data);
      } catch (err) {
        console.error("خطا در دریافت محصولات:", err);
        setError("محصولی یافت نشد یا مشکلی در اتصال به سرور وجود دارد.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // [] به معنای اجرای useEffect فقط یک بار پس از اولین رندر

  // کامپوننت داخلی ProductCard برای تمیزتر شدن کد
  // این یک Functional Component معمولی است که در داخل FeaturedProducts تعریف شده است.
  const FeaturedProductCard = ({ product }) => {
    return (
      <div
        key={product.id}
        className={styles.productCard}
        // Event Handlers برای هاور کردن
        onMouseEnter={() => product.videoUrl && setHoveredProductId(product.id)}
        onMouseLeave={() => setHoveredProductId(null)}
      >
        {/* رندر مشروط: اگر هاور شده و videoUrl دارد، ویدیو را نشان بده، در غیر این صورت تصویر را */}
        {hoveredProductId === product.id && product.videoUrl ? (
          <video
            src={product.videoUrl}
            autoPlay // پخش خودکار
            loop     // پخش تکراری
            muted    // بی صدا
            playsInline // برای پخش در موبایل
            className={styles.hoverMedia}
          />
        ) : (
          <img src={product.imageUrl} alt={product.title} className={styles.hoverMedia} />
        )}
        
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className={styles.price}>${product.price}</div>
        <button className={styles.buyBtn}>Buy Now</button>
      </div>
    );
  };

  if (loading) {
    return <div className={styles.loading}>در حال بارگذاری محصولات...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section className={styles.featuredProducts}>
      <h2 className={styles.heading}> GAMES </h2>
      <div className={styles.productsGrid}>
        {products.length > 0 ? (
          products.map(product => (
            <FeaturedProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>محصولی برای نمایش وجود ندارد.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;