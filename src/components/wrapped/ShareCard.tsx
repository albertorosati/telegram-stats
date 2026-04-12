'use client';

import { useCallback, useRef, useState } from 'react';
import { Share2 } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { USER_COLORS } from './shared';

interface ShareCardProps {
  data: WrappedData;
}

export function ShareCard({ data }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const topWord = data.global.topWords[0]?.word ?? '—';
  const totalDays = data.global.dailyVolume.length;

  const handleShare = useCallback(async () => {
    if (!cardRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const { default: html2canvas } = await import('html2canvas-pro');
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 3,
        useCORS: true,
        logging: false,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'telegram-wrapped.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Il mio Telegram Wrapped',
            text: `${data.users[0].name} + ${data.users[1].name} Wrapped`,
          });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'telegram-wrapped.png';
          document.body.append(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } finally {
      setIsGenerating(false);
    }
  }, [data, isGenerating]);

  return (
    <div className='share-card-wrapper'>
      <div className='share-card' ref={cardRef}>
        {/* Single soft radial glow — no gaudy multi-gradient */}
        <div className='share-card-glow' />

        <div className='share-card-content'>
          {/* Top branding */}
          <div className='share-card-top'>
            <p className='share-card-kicker'>TELEGRAM WRAPPED</p>
            <div className='share-card-divider' />
          </div>

          {/* Names */}
          <h2 className='share-card-title'>
            <span style={{ color: USER_COLORS[0] }}>{data.users[0].name}</span>
            <span className='share-card-amp'>&</span>
            <span style={{ color: USER_COLORS[1] }}>{data.users[1].name}</span>
          </h2>

          {/* Big hero number */}
          <div className='share-card-hero-num'>
            <span className='share-card-big-value'>{data.global.totalMessages.toLocaleString('it-IT')}</span>
            <span className='share-card-big-label'>messaggi</span>
          </div>

          {/* Metric row — glassmorphism pills */}
          <div className='share-card-metrics'>
            <div className='share-card-metric'>
              <span className='share-card-metric-value'>{totalDays}</span>
              <span className='share-card-metric-label'>giorni</span>
            </div>
            <div className='share-card-metric-sep' />
            <div className='share-card-metric'>
              <span className='share-card-metric-value'>{data.stickers.total.toLocaleString('it-IT')}</span>
              <span className='share-card-metric-label'>sticker</span>
            </div>
            <div className='share-card-metric-sep' />
            <div className='share-card-metric'>
              <span className='share-card-metric-value'>{data.global.streak.maxStreak}</span>
              <span className='share-card-metric-label'>streak</span>
            </div>
          </div>

          {/* Highlight pills */}
          <div className='share-card-highlights'>
            <div className='share-card-pill'>
              <span className='share-card-pill-icon'>💬</span>
              <span>{topWord}</span>
            </div>
            <div className='share-card-pill'>
              <span className='share-card-pill-icon'>❤️</span>
              <span>{data.global.totalLoveWords.toLocaleString('it-IT')} parole d&apos;amore</span>
            </div>
          </div>

          {/* Footer */}
          <p className='share-card-footer'>telegramwrapped.app</p>
        </div>
      </div>

      <button
        className='wrapped-export-button share-card-btn'
        disabled={isGenerating}
        onClick={handleShare}
        type='button'
      >
        {isGenerating ? 'Generazione…' : (
          <>
            <Share2 size={15} />
            Condividi Immagine
          </>
        )}
      </button>
    </div>
  );
}
