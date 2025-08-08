// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchBar.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await fetch(`${PRODUCTS_API_BASE_URL}/api/Products/search?q=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Search API error');
        }
        const data = await response.json();
        const processedData = data.map(game => ({
            ...game,
            imageUrl: game.imageUrl ? (game.imageUrl.startsWith('http') ? game.imageUrl : `${PRODUCTS_API_BASE_URL}${game.imageUrl}`) : null,
            slug: game.slug
        }));
        setSearchResults(processedData);
      } catch (err) {
        console.error("خطا در جستجو:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceSearch = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchBarRef]);

  return (
    <div className={styles.searchBarContainer} ref={searchBarRef}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="جستجوی بازی..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setSearchResults(searchResults)}
      />
      <i className={`fas fa-search ${styles.searchIcon}`}></i>

      {isSearching && <div className={styles.loadingIndicator}>...</div>}
      
      {searchResults.length > 0 && (
        <div className={styles.searchResultsDropdown}>
          {searchResults.map((game) => (
            <Link 
              to={`/games/${game.slug}`} 
              key={game.id} 
              className={styles.searchResultItem}
              onClick={() => setSearchResults([])}
            >
              <img src={game.imageUrl} alt={game.title} className={styles.resultImage} />
              <div className={styles.resultInfo}>
                <span className={styles.resultTitle}>{game.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; // <--- **این خط بسیار مهم است**