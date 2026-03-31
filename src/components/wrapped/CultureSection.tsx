'use client';

import { motion } from 'framer-motion';

import type { WrappedData } from '../../lib/analytics/types';
import { MediaAsset } from './MediaAsset';
import { SectionHeading } from './SectionHeading';
import { fadeUp, formatDisplayDate } from './shared';

function WordCloud({ words }: { words: WrappedData['global']['topWords'] }) {
  const maxCount = words[0]?.count ?? 1;
  return (
    <div className='wrapped-word-cloud'>
      {words.map((entry, index) => {
        const ratio = entry.count / maxCount;
        const hue = index % 2 === 0 ? 'rgba(180,255,0,' : 'rgba(189,0,255,';
        const opacity = Math.min(0.95, 0.35 + ratio * 0.6);
        const fontSize = `${1 + ratio * 4.8}rem`;
        const rotate = (index % 5) * 4 - 8;
        const y = (index % 3) * 4 - 4;

        return (
        <span
          className='wrapped-word'
          key={entry.word}
          style={{
            fontSize,
            color: `${hue}${opacity})`,
            opacity,
            transform: `translateY(${y}px) rotate(${rotate}deg)`,
            textShadow: index % 2 === 0
              ? '0 0 18px rgba(180,255,0,0.18)'
              : '0 0 18px rgba(189,0,255,0.18)',
          }}
        >
          {entry.word}
        </span>
        );
      })}
    </div>
  );
}

interface CultureSectionProps {
  data: WrappedData;
}

export function CultureSection({ data }: CultureSectionProps) {
  const peakHour = [...data.global.hourlyWave].sort((left, right) => right.count - left.count)[0];
  const totalLinks = data.users.reduce((sum, user) => sum + user.linksShared, 0);
  const weekendAlignment = 100 - Math.abs(data.users[0].weekendPercentage - data.users[1].weekendPercentage);

  return (
    <section className='wrapped-stack'>
      <motion.div className='wrapped-panel wrapped-scene' {...fadeUp()} whileHover={{ y: -4 }}>
        <div className='wrapped-panel-inner'>
        <SectionHeading eyebrow='Le vostre parole' title='Le vostre parole' description='' />
        <WordCloud words={data.global.topWords.slice(0, 36)} />
        </div>
      </motion.div>

      <motion.div className='wrapped-panel wrapped-scene' {...fadeUp(0.05)} whileHover={{ y: -4 }}>
        <div className='wrapped-panel-inner'>
        <SectionHeading eyebrow='Dettagli' title='Dettagli' description='' />
        <div className='wrapped-mini-kpi-grid'>
          <div className='wrapped-stat-box'>
            <span className='wrapped-stat-label'>Ora di picco</span>
            <span className='wrapped-stat-value'>{String(peakHour?.hour ?? 0).padStart(2, '0')}:00</span>
            <span className='wrapped-stat-subvalue'>{peakHour?.count ?? 0} messaggi</span>
          </div>
          <div className='wrapped-stat-box'>
            <span className='wrapped-stat-label'>Link lanciati</span>
            <span className='wrapped-stat-value'>{totalLinks}</span>
            <span className='wrapped-stat-subvalue'>condivisi nell'intero archivio</span>
          </div>
          <div className='wrapped-stat-box'>
            <span className='wrapped-stat-label'>Sincronia weekend</span>
            <span className='wrapped-stat-value'>{weekendAlignment}%</span>
            <span className='wrapped-stat-subvalue'>allineamento fra entrambi</span>
          </div>
        </div>

        <div className='wrapped-anchor-grid'>
          <div className='wrapped-anchor-card'>
            <p className='wrapped-metric-label'>Primo sticker</p>
            <MediaAsset alt='Primo sticker' frameClassName='wrapped-media-frame wrapped-media-frame-hero' kind={data.stickers.firstSticker?.isAnimated ? 'video' : 'image'} url={data.stickers.firstSticker?.blobUrl} />
            <p className='wrapped-footnote'>
              {data.stickers.firstSticker ? `${data.stickers.firstSticker.userName} · ${formatDisplayDate(data.stickers.firstSticker.date)}` : 'N/D'}
            </p>
          </div>
          <div className='wrapped-anchor-card'>
            <p className='wrapped-metric-label'>Ultimo sticker</p>
            <MediaAsset alt='Ultimo sticker' frameClassName='wrapped-media-frame wrapped-media-frame-hero' kind={data.stickers.lastSticker?.isAnimated ? 'video' : 'image'} url={data.stickers.lastSticker?.blobUrl} />
            <p className='wrapped-footnote'>
              {data.stickers.lastSticker ? `${data.stickers.lastSticker.userName} · ${formatDisplayDate(data.stickers.lastSticker.date)}` : 'N/D'}
            </p>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}