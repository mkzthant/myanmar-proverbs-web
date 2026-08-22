'use client';

import { useState, useCallback } from 'react';

interface ShareActionsProps {
  text: string;
  path: string;
}

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

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

export default function ShareActions({ text, path }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(`${text}\n${window.location.origin}${path}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text, path]);

  const share = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: text, text, url: `${window.location.origin}${path}` }).catch(console.error);
    } else {
      copy();
    }
  }, [text, path, copy]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
      <button
        className={`copy-btn ${copied ? 'copied' : ''}`}
        onClick={copy}
        title="ကူးယူရန် (Copy)"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <button
        className="copy-btn"
        onClick={share}
        title="မျှဝေရန် (Share)"
      >
        <ShareIcon />
      </button>
    </div>
  );
}
