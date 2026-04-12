'use client';

import { motion } from 'framer-motion';
import { Crown, Zap } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { SectionHeading } from './SectionHeading';
import { fadeUp, USER_COLORS } from './shared';

interface AwardsSectionProps {
  data: WrappedData;
}

export function AwardsSection({ data }: AwardsSectionProps) {
  return (
    <section className='wrapped-stack'>
      <section className='wrapped-panel wrapped-scene'>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Testa a testa' title='Chi domina cosa?' description='Ogni sfida è un duello. Chi ne esce vincitore?' />
        </div>
      </section>

      {data.global.awards.map((award, index) => {
        const total = award.winnerScore + award.loserScore || 1;
        const winnerPct = Math.round((award.winnerScore / total) * 100);
        const loserPct = 100 - winnerPct;
        const isUser1Winner = award.winnerName === data.users[0].name;
        const winnerColor = isUser1Winner ? USER_COLORS[0] : USER_COLORS[1];
        const loserColor = isUser1Winner ? USER_COLORS[1] : USER_COLORS[0];

        return (
          <motion.section className='wrapped-panel wrapped-scene award-card' key={award.key} {...fadeUp(index * 0.06)}>
            <div className='award-card-inner'>
              {/* Unified header */}
              <div className='award-card-header'>
                <span className='award-card-emoji'>{award.emoji}</span>
                <div>
                  <h3 className='award-card-title'>{award.title}</h3>
                  <p className='award-card-desc'>{award.description}</p>
                </div>
              </div>

              {/* Two-column duel with center divider */}
              <div className='award-card-duel'>
                {/* Winner side */}
                <div className='award-card-side'>
                  <span className='award-card-crown'><Crown size={12} /> WINNER</span>
                  <p className='award-card-name' style={{ color: winnerColor }}>{award.winnerName}</p>
                  <CountUp className='award-card-score' value={award.winnerScore} />
                  <p className='award-card-detail'>{award.winnerValue}</p>
                </div>

                {/* Center divider with lightning badge */}
                <div className='award-card-divider'>
                  <div className='award-card-divider-line' />
                  <div className='award-card-badge'>
                    <Zap size={14} />
                  </div>
                  <div className='award-card-divider-line' />
                </div>

                {/* Loser side */}
                <div className='award-card-side award-card-side-right'>
                  <p className='award-card-name' style={{ color: loserColor }}>{award.loserName}</p>
                  <CountUp className='award-card-score' value={award.loserScore} />
                  <p className='award-card-detail'>{award.loserValue}</p>
                </div>
              </div>

              {/* Single shared progress bar */}
              <div className='award-card-bar-wrap'>
                <div className='award-card-bar'>
                  <motion.div
                    className='award-card-bar-fill'
                    style={{ background: winnerColor }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${winnerPct}%` }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
                  />
                  <motion.div
                    className='award-card-bar-fill'
                    style={{ background: loserColor }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${loserPct}%` }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.4 }}
                  />
                </div>
                <div className='award-card-pcts'>
                  <span style={{ color: winnerColor }}>{winnerPct}%</span>
                  <span style={{ color: loserColor }}>{loserPct}%</span>
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </section>
  );
}