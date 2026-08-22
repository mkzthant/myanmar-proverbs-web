'use client';

import { useEffect, useId, useRef } from 'react';

interface NativeBannerProps {
  src: string;
  containerId: string;
}

export default function NativeBanner({ src, containerId }: NativeBannerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const uniqueId = `${containerId}-${reactId.replace(/[:]/g, '')}`;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const adContainer = document.createElement('div');
    adContainer.id = uniqueId;
    wrapper.appendChild(adContainer);

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.cfasync = 'false';
    wrapper.appendChild(script);

    return () => {
      wrapper.innerHTML = '';
    };
  }, [src, uniqueId]);

  return (
    <div
      style={{
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        minHeight: '250px',
      }}
    >
      <div ref={wrapperRef} style={{ width: '100%', maxWidth: '400px' }} />
    </div>
  );
}
