'use client';

import { motion } from 'framer-motion';

import { CountUp } from './CountUp';
import { SectionHeading } from './SectionHeading';
import type { HeadlineStat, InsightCard } from './shared';
import { popIn, slideFromLeft, slideFromRight } from './shared';

interface OverviewSectionProps {
  headlineStats: HeadlineStat[];
  insightCards: InsightCard[];
}

export function OverviewSection({ headlineStats, insightCards }: OverviewSectionProps) {
  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>
        <SectionHeading eyebrow='I grandi numeri' title='I grandi numeri' description='' />

        <div className='wrapped-highlight-list'>
          {headlineStats.map((stat, index) => (
            <motion.article className='wrapped-bento-stat' key={stat.label} {...popIn(index * 0.08)} whileHover={{ y: -8, scale: 1.03 }}>
              <div className='wrapped-bento-head'>
                <span className='wrapped-bento-emoji'>{stat.emoji}</span>
              </div>
              <p className='wrapped-metric-label'>{stat.label}</p>
              {stat.numericValue !== undefined ? (
                <CountUp className='wrapped-metric-value' decimals={stat.suffix === '%' ? 1 : 0} suffix={stat.suffix} value={stat.numericValue} />
              ) : (
                <p className='wrapped-metric-value'>{stat.value}</p>
              )}
              <p className='wrapped-metric-detail'>{stat.detail}</p>
            </motion.article>
          ))}
        </div>

        <div className='wrapped-story-grid'>
          {insightCards.map((card, index) => {
            const slide = index % 2 === 0 ? slideFromLeft : slideFromRight;
            return (
              <motion.article
                className='wrapped-story-card'
                key={card.eyebrow}
                style={{ '--wrapped-story-accent': card.accent } as React.CSSProperties}
                {...slide(index * 0.06)}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <p className='wrapped-story-eyebrow'>{card.eyebrow}</p>
                <h3 className='wrapped-story-title'>{card.title}</h3>
                <p className='wrapped-story-copy'>{card.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}