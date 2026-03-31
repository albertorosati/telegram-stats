'use client';

import { motion } from 'framer-motion';
import { BadgeAlert, BookText, Camera, Laugh, Mic, MoonStar } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { SectionHeading } from './SectionHeading';
import { fadeUp } from './shared';

interface AwardsSectionProps {
  data: WrappedData;
}

const AWARD_ICONS = {
  'night-owl': MoonStar,
  podcaster: Mic,
  novelist: BookText,
  anxious: BadgeAlert,
  jester: Laugh,
  paparazzo: Camera,
} as const;

export function AwardsSection({ data }: AwardsSectionProps) {
  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>
        <SectionHeading
          eyebrow='Testa a testa'
          title='Testa a testa'
          description=''
        />

        <div className='wrapped-versus-list'>
          {data.global.awards.map((award, index) => {
            const Icon = AWARD_ICONS[award.key as keyof typeof AWARD_ICONS] ?? MoonStar;
            const baseline = Math.max(award.winnerScore, award.loserScore, 1);
            const winnerPct = (award.winnerScore / baseline) * 100;
            const loserPct = (award.loserScore / baseline) * 100;
            return (
              <motion.article className='wrapped-versus-card' key={award.key} {...fadeUp(index * 0.06)} whileHover={{ y: -6 }}>
                <div className='wrapped-versus-head'>
                  <div className='wrapped-versus-title-block'>
                    <span className='wrapped-versus-emoji'>{award.emoji}</span>
                    <span className='wrapped-versus-icon'><Icon size={22} /></span>
                  </div>
                  <div className='wrapped-break-words'>
                    <p className='wrapped-metric-label'>{award.title}</p>
                    <p className='wrapped-chaos-copy'>{award.description}</p>
                  </div>
                </div>

                <div className='wrapped-versus-body'>
                  <div className='wrapped-versus-row'>
                    <div className='wrapped-versus-row-head'>
                      <p className='wrapped-versus-name'>{award.winnerName}</p>
                      <CountUp className='wrapped-award-mega' value={award.winnerScore} />
                    </div>
                    <div className='wrapped-versus-track'>
                      <div className='wrapped-versus-fill wrapped-versus-fill-winner' style={{ width: `${winnerPct}%` }} />
                    </div>
                    <p className='wrapped-footnote wrapped-break-words'>{award.winnerValue}</p>
                  </div>

                  <div className='wrapped-versus-row'>
                    <div className='wrapped-versus-row-head'>
                      <p className='wrapped-versus-name'>{award.loserName}</p>
                      <CountUp className='wrapped-versus-secondary-score' value={award.loserScore} />
                    </div>
                    <div className='wrapped-versus-track'>
                      <div className='wrapped-versus-fill wrapped-versus-fill-loser' style={{ width: `${loserPct}%` }} />
                    </div>
                    <p className='wrapped-footnote wrapped-break-words'>{award.loserValue}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}