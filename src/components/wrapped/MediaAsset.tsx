'use client';

import { useEffect, useState } from 'react';

type MediaKind = 'auto' | 'image' | 'video';

interface MediaAssetProps {
  url?: string;
  alt: string;
  kind?: MediaKind;
  frameClassName?: string;
}

function inferKind(url: string): Exclude<MediaKind, 'auto'> {
  if (url.startsWith('data:video') || url.endsWith('.webm') || url.endsWith('.mp4')) {
    return 'video';
  }

  return 'image';
}

export function MediaAsset({ url, alt, kind = 'auto', frameClassName }: MediaAssetProps) {
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setAttempts(0);
  }, [url, kind]);

  if (!url || attempts >= 2) {
    return (
      <div className={frameClassName ?? 'wrapped-media-frame'}>
        <span className='wrapped-footnote'>{attempts >= 2 ? 'Errore media' : 'Nessun media'}</span>
      </div>
    );
  }

  const resolvedKind = kind === 'auto' ? inferKind(url) : kind;
  // On first error with auto-detected kind, flip to the other type
  const effectiveKind = attempts === 0 ? resolvedKind : (resolvedKind === 'image' ? 'video' : 'image');

  return (
    <div className={frameClassName ?? 'wrapped-media-frame'}>
      {effectiveKind === 'video' ? (
        <video
          autoPlay
          loop
          muted
          onError={() => setAttempts((a) => a + 1)}
          playsInline
          preload='metadata'
          src={url}
        />
      ) : (
        <img alt={alt} onError={() => setAttempts((a) => a + 1)} src={url} />
      )}
    </div>
  );
}