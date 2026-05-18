'use client';

import { motion } from 'framer-motion';

import { CountUp } from './CountUp';
import { SectionHeading } from './SectionHeading';
import type { HeadlineStat, InsightCard } from './shared';
import { fadeScale, popIn, slideFromLeft, slideFromRight } from './shared';

interface OverviewSectionProps {
  headlineStats: HeadlineStat[];
  insightCards: InsightCard[];
}

export function OverviewSection({ headlineStats, insightCards }: OverviewSectionProps) {
  const [leadInsight, ...otherInsights] = insightCards;

  return (
    <section className='wrapped-overview-board'>
      <div className='wrapped-overview-header'>
        <SectionHeading eyebrow='I grandi numeri' title='I grandi numeri' description='Le metriche che definiscono la vostra conversazione.' />
      </div>

      {leadInsight ? (
        <motion.article className='wrapped-overview-letter' {...fadeScale(0.03)}>
          <p className='wrapped-overview-letter-label'>Quello che si sente</p>
          <h3 className='wrapped-overview-letter-title'>{leadInsight.title}</h3>
          <p className='wrapped-overview-letter-copy'>{leadInsight.detail}</p>
        </motion.article>
      ) : null}

      <div className='wrapped-overview-grid'>
        <div className='wrapped-highlight-list wrapped-highlight-bento'>
          {headlineStats.map((stat, index) => (
            <motion.article className={`wrapped-bento-stat${index === 0 ? ' wrapped-bento-stat-lead' : ''}`} key={stat.label} {...popIn(index * 0.07)} whileHover={{ y: -4 }}>
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

        <div className='wrapped-story-grid wrapped-story-strips'>
          {otherInsights.map((card, index) => {
            const slide = index % 2 === 0 ? slideFromLeft : slideFromRight;
            return (
              <motion.article
                className={`wrapped-story-card${index === 0 ? ' wrapped-story-card-lead' : ''}`}
                key={card.eyebrow}
                style={{ '--wrapped-story-accent': card.accent } as React.CSSProperties}
                {...slide(index * 0.06)}
                whileHover={{ x: 6 }}
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