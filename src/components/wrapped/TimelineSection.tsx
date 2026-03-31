'use client';

import { motion } from 'framer-motion';
import { Heart, MessageSquareDashed, Sticker } from 'lucide-react';

import type { MonthlyJourneyEntry, WrappedData } from '../../lib/analytics/types';
import { MediaAsset } from './MediaAsset';
import { SectionHeading } from './SectionHeading';
import { fadeUp } from './shared';

interface TimelineSectionProps {
  data: WrappedData;
}

function moodIcon(entry: MonthlyJourneyEntry) {
  if (entry.mood === 'warm') return Heart;
  if (entry.mood === 'sticker') return Sticker;
  return MessageSquareDashed;
}

export function TimelineSection({ data }: TimelineSectionProps) {
  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>
        <SectionHeading
          eyebrow='Mese per mese'
          title='Mese per mese'
          description=''
        />

        <div className='wrapped-timeline-rail flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4'>
          {data.global.monthlyJourney.map((entry, index) => {
            const Icon = moodIcon(entry);
            return (
              <motion.article className={`wrapped-month-card wrapped-month-card-${entry.mood} shrink-0 snap-center`} key={entry.month} {...fadeUp(index * 0.035)} whileHover={{ y: -6 }}>
                <div className='wrapped-bento-head'>
                  <span className='wrapped-bento-emoji'>{entry.mood === 'warm' ? '💞' : entry.mood === 'sad' ? '🌧️' : entry.mood === 'sticker' ? '🍌' : '⚡'}</span>
                  <span className='wrapped-bento-icon'><Icon size={18} /></span>
                </div>
                <p className='wrapped-metric-label'>{entry.label}</p>
                <h3 className='wrapped-story-title'>{entry.title}</h3>
                <p className='wrapped-chaos-copy'>{entry.description}</p>
                {entry.stickerBlobUrl ? (
                  <div className='wrapped-month-sticker'>
                    <MediaAsset alt={entry.title} frameClassName='wrapped-media-frame wrapped-month-media' kind={entry.isAnimated ? 'video' : 'image'} url={entry.stickerBlobUrl} />
                  </div>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}