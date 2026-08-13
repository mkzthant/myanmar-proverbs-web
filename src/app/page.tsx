'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';

interface Proverb {
  id: string;
  proverb: { original: string };
  meaning: {
    en: string;
    my: { spoken: string; written: string };
  };
  story?: {
    emotional?: { en: string; my: string };
  };
  lexical?: {
    metadata?: { note: string; politeness: string };
  };
}

const alphabets = [
  'က', 'ခ', 'ဂ', 'ဃ', 'င', 'စ', 'ဆ', 'ဇ', 'ဈ', 'ဉ', 'ည', 
  'ဋ', 'ဌ', 'ဍ', 'ဎ', 'ဏ', 'တ', 'ထ', 'ဒ', 'ဓ', 'န', 
  'ပ', 'ဖ', 'ဗ', 'ဘ', 'မ', 'ယ', 'ရ', 'လ', 'ဝ', 'သ', 
  'ဟ', 'ဠ', 'အ'
];

// SVG Icons
const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const CopyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function Home() {
  const [allProverbs, setAllProverbs] = useState<Proverb[]>([]);
  const [search, setSearch] = useState('');
  const [activeAlpha, setActiveAlpha] = useState('က');
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Fetch the static JSON data once on mount
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const res = await fetch('/proverbs_data.json');
        const data = await res.json();
        setAllProverbs(data);
      } catch (error) {
        console.error('Failed to fetch proverbs data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaticData();
  }, []);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => new Fuse(allProverbs, {
    keys: ['proverb.original', 'meaning.my.spoken'],
    threshold: 0.4, // Lower means more strict, 0.4 allows slight typos
    distance: 100,
  }), [allProverbs]);

  // Filter words instantly on the client side
  const filteredProverbs = useMemo(() => {
    if (search) {
      // Fuzzy search using Fuse.js
      return fuse.search(search).map(result => result.item);
    }
    
    // Otherwise, filter by the active alphabet
    if (activeAlpha) {
      return allProverbs.filter((p) => p.proverb.original.trim()[0] === activeAlpha);
    }
    
    return [];
  }, [allProverbs, search, activeAlpha, fuse]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (val && activeAlpha) {
      setActiveAlpha('');
    } else if (!val && !activeAlpha) {
      setActiveAlpha('က');
    }
  };

  const handleAlphabetClick = (alpha: string) => {
    setSearch('');
    setActiveAlpha(alpha);
    setExpandedId(null);
  };

  const copyToClipboard = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="container">

      <div className="header">
        <div className="header-top">
          <h1>မြန်မာစကားပုံ အဘိဓာန်</h1>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <p>Myanmar Proverbs Lexicon (867 Entries)</p>
        
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="စကားပုံ သို့မဟုတ် အဓိပ္ပာယ်ဖြင့် ရှာဖွေနိုင်ပါသည်..." 
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {!search && (
        <div className="alphabet-grid">
          {alphabets.map((alpha) => (
            <button
              key={alpha}
              className={`alphabet-btn ${activeAlpha === alpha ? 'active' : ''}`}
              onClick={() => handleAlphabetClick(alpha)}
            >
              {alpha}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="loading">ဒေတာများကို ရှာဖွေနေပါသည်...</div>
      ) : (
        <div className="words-container">
          {filteredProverbs.length > 0 ? (
            filteredProverbs.map((p) => (
              <div key={p.id} className="word-card" style={{ display: 'block', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ cursor: 'pointer', flex: 1 }} onClick={() => toggleExpand(p.id)}>
                    <div className="word-text" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{p.proverb.original}</div>
                    <div className="word-note" style={{ marginTop: '8px', lineHeight: '1.6' }}>
                      {p.meaning.my.spoken || p.meaning.my.written}
                    </div>
                  </div>
                  <button 
                    className={`copy-btn ${copiedId === p.id ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(p.id, `${p.proverb.original}\n\n${p.meaning.my.spoken}`)}
                    title="စကားပုံကူးယူရန် (Copy)"
                    style={{ marginLeft: '12px' }}
                  >
                    {copiedId === p.id ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
                
                {/* Expanded Section for Story */}
                {expandedId === p.id && p.story?.emotional?.my && (
                  <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.9rem', lineHeight: '1.8' }}>
                    <strong>ပုံပြင်ဇာတ်လမ်း -</strong><br/>
                    {p.story.emotional.my}
                  </div>
                )}
                
                {/* Expand Toggle Hint */}
                {p.story?.emotional?.my && (
                  <div 
                    onClick={() => toggleExpand(p.id)} 
                    style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--primary)', cursor: 'pointer', textAlign: 'center' }}
                  >
                    {expandedId === p.id ? '▲ ဇာတ်လမ်းကို ဖျောက်မည်' : '▼ ပုံပြင်ဇာတ်လမ်းကို ဖတ်မည်'}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              ရှာဖွေနေသော စကားပုံ မတွေ့ရှိပါခင်ဗျာ။
            </div>
          )}
        </div>
      )}
    </main>
  );
}
