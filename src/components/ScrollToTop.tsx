'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '70px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        zIndex: 999,
        transition: 'all 0.3s ease',
      }}
      aria-label="Scroll to top"
      title="အပေါ်သို့ ပြန်တက်ရန်"
    >
      ↑
    </button>
  );
}
