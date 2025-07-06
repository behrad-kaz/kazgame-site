// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductSlider from '../components/ProductSlider';
import FeaturedProducts from '../components/FeaturedProducts';
import GameSlider from '../components/GameSlider';
import Footer from '../components/Footer';

import '../style.css'; // استایل‌های گلوبال شما

// Dummy Data برای Product Slider - (اینها باید با داده‌های API شما جایگزین شوند)
const dummyProducts = [
  { id: 1, title: 'PS5 Console', imageUrl: '/images/red.jpg', description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games.', price: 499.99 },
  { id: 2, title: 'The Last of Us Part II', imageUrl: '/images/tlou.jpg', description: 'Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming.', price: 59.99 },
  { id: 3, title: 'Grand Theft Auto V', imageUrl: '/images/gta.jpg', description: 'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4K and beyond.', price: 29.99 },
  { id: 4, title: 'Portal Remote', imageUrl: '/images/R.jpg', description: 'Play your PS5 console over your home Wi-Fi with console quality controls using PlayStation Portal™ Remote Player.', price: 199.99 },
  { id: 5, title: 'Elden Ring', imageUrl: '/images/elden ring.jpg', description: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.', price: 69.99 },
  { id: 6, title: 'The Witcher 3: Wild Hunt', imageUrl: '/images/witcher3.jpg', description: 'As a professional monster slayer, Geralt of Rivia is tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns.', price: 39.99 },
  { id: 7, title: 'Mortal Kombat 1', imageUrl: '/images/mortal combat 1.jpg', description: 'Discover a reborn Mortal Kombat Universe created by Fire God Liu Kang. Mortal Kombat 1 ushers in a new era of the iconic franchise with a new fighting system, game modes, and Fatalities!', price: 69.99 },
  { id: 8, title: 'FIFA 25', imageUrl: '/images/fifa25.jpg', description: 'Anticipate the next evolution of virtual football with FIFA 25, delivering unparalleled realism and immersive gameplay.', price: 69.99 },
  { id: 9, title: 'PULSE Elite Wireless Headset', imageUrl: '/images/PULSE-Elite.png', description: 'Enjoy lifelike sound in your favorite games with the PULSE Elite wireless headset.', price: 149.99 }, // تصویر جدیدی برای این محصول اضافه شد
  { id: 10, title: 'Explore Earbuds', imageUrl: '/images/explore-earbuds.png', description: 'Enjoy lifelike sound in your favorite games with the PULSE Explore wireless earbuds.', price: 199.99 }, // تصویر جدیدی برای این محصول اضافه شد
];


const Home = () => {
  return (
    <div className="home-page-layout">
      <Header />
      <HeroSection />
      <ProductSlider products={dummyProducts} />
      <FeaturedProducts />
      <GameSlider />
      <Footer />

    </div>
  );
};

export default Home;