'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Globe, Sparkles } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { MediaAsset } from './MediaAsset';
import { SectionHeading } from './SectionHeading';
import { formatDisplayDate, popIn, slideFromLeft, slideFromRight, USER_COLORS } from './shared';

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
          <motion.span
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
            {...popIn(index * 0.02)}
            whileHover={{ scale: 1.2 }}
          >
            {entry.word}
          </motion.span>
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
  const snapshots = data.global.monthlySnapshots;

  return (
    <section className='wrapped-stack'>
      <section className='wrapped-panel wrapped-scene'>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Le vostre parole' title='Il DNA della conversazione' description='Ogni parola racconta qualcosa. Ecco il lessico che vi definisce.' />
          <WordCloud words={data.global.topWords.slice(0, 36)} />
        </div>
      </section>

      {/* Monthly word evolution */}
      {snapshots.length > 0 && (
        <section className='wrapped-panel wrapped-scene'>
          <div className='wrapped-panel-inner'>
            <SectionHeading eyebrow='Evoluzione lessicale' title='Come cambiano le parole' description='Le parole più usate mese per mese: il vocabolario che si evolve.' />
            <div className='culture-evolution-strip'>
              {snapshots.filter(s => s.topWords.length > 0).map((snap, index) => (
                <motion.div
                  className='culture-month-pill-group'
                  key={snap.month}
                  {...(index % 2 === 0 ? slideFromLeft(index * 0.04) : slideFromRight(index * 0.04))}
                >
                  <span className='culture-month-label'>{snap.label}</span>
                  <div className='culture-word-pills'>
                    {snap.topWords.slice(0, 3).map((w) => (
                      <span className='culture-word-pill' key={w.word}>{w.word} <strong>{w.count}</strong></span>
                    ))}
                  </div>
                  {snap.topEmojis.length > 0 && (
                    <div className='culture-emoji-row'>
                      {snap.topEmojis.slice(0, 3).map((e) => (
                        <span key={e.emoji}>{e.emoji}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className='wrapped-panel wrapped-scene'>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='I dettagli' title='I numeri dietro il vocabolario' description='' />

          <div className='culture-kpi-grid'>
            {[
              { icon: Clock, label: 'Ora di picco', value: `${String(peakHour?.hour ?? 0).padStart(2, '0')}:00`, sub: `${peakHour?.count ?? 0} messaggi`, color: '#b4ff00' },
              { icon: Globe, label: 'Link lanciati', value: String(totalLinks), sub: 'nell\'intero archivio', color: '#bd00ff' },
              { icon: BookOpen, label: 'Sincronia weekend', value: `${weekendAlignment}%`, sub: 'allineamento fra entrambi', color: '#00d1ff' },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  className='culture-kpi-card'
                  key={kpi.label}
                  style={{ '--culture-accent': kpi.color } as React.CSSProperties}
                  {...popIn(i * 0.1)}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <Icon size={20} className='culture-kpi-icon' />
                  <span className='wrapped-stat-label'>{kpi.label}</span>
                  <span className='wrapped-stat-value'>{kpi.value}</span>
                  <span className='wrapped-stat-subvalue'>{kpi.sub}</span>
                </motion.div>
              );
            })}
          </div>

          <div className='wrapped-anchor-grid'>
            <motion.div className='wrapped-anchor-card' {...slideFromLeft(0.1)} whileHover={{ y: -4 }}>
              <p className='wrapped-metric-label'>Primo sticker</p>
              <MediaAsset alt='Primo sticker' frameClassName='wrapped-media-frame wrapped-media-frame-hero' kind={data.stickers.firstSticker?.isAnimated ? 'video' : 'image'} url={data.stickers.firstSticker?.blobUrl} />
              <p className='wrapped-footnote'>
                {data.stickers.firstSticker ? `${data.stickers.firstSticker.userName} · ${formatDisplayDate(data.stickers.firstSticker.date)}` : 'N/D'}
              </p>
            </motion.div>
            <motion.div className='wrapped-anchor-card' {...slideFromRight(0.15)} whileHover={{ y: -4 }}>
              <p className='wrapped-metric-label'>Ultimo sticker</p>
              <MediaAsset alt='Ultimo sticker' frameClassName='wrapped-media-frame wrapped-media-frame-hero' kind={data.stickers.lastSticker?.isAnimated ? 'video' : 'image'} url={data.stickers.lastSticker?.blobUrl} />
              <p className='wrapped-footnote'>
                {data.stickers.lastSticker ? `${data.stickers.lastSticker.userName} · ${formatDisplayDate(data.stickers.lastSticker.date)}` : 'N/D'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
}