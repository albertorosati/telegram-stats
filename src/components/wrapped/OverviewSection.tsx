'use client';

import { motion } from 'framer-motion';
import { MessageCircleMore, Sparkles, Sticker, Trophy } from 'lucide-react';

import { CountUp } from './CountUp';
import { SectionHeading } from './SectionHeading';
import type { HeadlineStat, InsightCard } from './shared';
import { fadeUp } from './shared';

interface OverviewSectionProps {
  headlineStats: HeadlineStat[];
  insightCards: InsightCard[];
}

const HERO_ICONS = [MessageCircleMore, Sparkles, Sticker, Trophy] as const;

function MetricCard({ label, value, detail, numericValue, suffix }: HeadlineStat) {
  const Icon = HERO_ICONS[Math.abs(label.length) % HERO_ICONS.length];
  return (
    <motion.article className='wrapped-bento-stat' {...fadeUp()} whileHover={{ y: -6 }}>
      <div className='wrapped-bento-head'>
        <span className='wrapped-bento-emoji'>{label.startsWith('Avete') ? '🎉' : '✨'}</span>
        <span className='wrapped-bento-icon'><Icon size={18} /></span>
      </div>
      <p className='wrapped-metric-label'>{label}</p>
      {numericValue !== undefined ? (
        <CountUp className='wrapped-metric-value' decimals={suffix === '%' ? 1 : 0} suffix={suffix} value={numericValue} />
      ) : (
        <p className='wrapped-metric-value'>{value}</p>
      )}
      <p className='wrapped-metric-detail'>{detail}</p>
    </motion.article>
  );
}

export function OverviewSection({ headlineStats, insightCards }: OverviewSectionProps) {
  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>
        <SectionHeading
          eyebrow='I grandi numeri'
          title='I grandi numeri'
          description=''
        />

        <div className='wrapped-highlight-list'>
          {headlineStats.map((stat, index) => (
            <MetricCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className='wrapped-story-grid'>
          {insightCards.map((card, index) => (
            <motion.article className='wrapped-story-card' key={card.eyebrow} {...fadeUp(index * 0.05)} style={{ '--wrapped-story-accent': card.accent } as React.CSSProperties} whileHover={{ y: -6 }}>
              <p className='wrapped-story-eyebrow'>{card.eyebrow}</p>
              <h3 className='wrapped-story-title'>{card.title}</h3>
              <p className='wrapped-story-copy'>{card.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}