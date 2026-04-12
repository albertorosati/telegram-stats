'use client';

import { motion } from 'framer-motion';
import { Camera, Clapperboard, Crown, Link2, Mic } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { SectionHeading } from './SectionHeading';
import { formatDuration, popIn, slideFromLeft, slideFromRight } from './shared';

interface MediaChaosSectionProps {
  data: WrappedData;
}

export function MediaChaosSection({ data }: MediaChaosSectionProps) {
  const { mediaChaos } = data.global;

  const cards = [
    {
      title: 'Il Podcaster',
      emoji: '🎙️',
      icon: Mic,
      value: mediaChaos.totalVoiceNotes,
      detail: `${formatDuration(mediaChaos.totalVoiceDuration)} di audio totali`,
      champion: mediaChaos.voiceChampion,
      color: '#b4ff00',
    },
    {
      title: 'Il Paparazzo',
      emoji: '📸',
      icon: Camera,
      value: mediaChaos.totalPhotos,
      detail: 'foto inviate nella chat',
      champion: mediaChaos.photoChampion,
      color: '#bd00ff',
    },
    {
      title: 'Il Regista',
      emoji: '🎥',
      icon: Clapperboard,
      value: mediaChaos.totalVideos,
      detail: 'video nella timeline',
      champion: mediaChaos.videoChampion,
      color: '#00d1ff',
    },
    {
      title: 'Il Curator',
      emoji: '🔗',
      icon: Link2,
      value: mediaChaos.totalLinks,
      detail: 'link condivisi',
      champion: mediaChaos.linkChampion,
      color: '#ff9d00',
    },
  ];

  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>
        <SectionHeading
          eyebrow='Multimedia & caos'
          title='Il palco del rumore'
          description='Vocali, foto, video e link — il lato più rumoroso della conversazione.'
        />

        <div className='chaos-champion-grid'>
          {cards.map((card, index) => {
            const slide = index % 2 === 0 ? slideFromLeft : slideFromRight;
            const Icon = card.icon;
            return (
              <motion.article
                className='chaos-champion-card'
                key={card.title}
                style={{ '--chaos-accent': card.color } as React.CSSProperties}
                {...slide(index * 0.08)}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className='chaos-champion-head'>
                  <span className='chaos-champion-emoji'>{card.emoji}</span>
                  <Icon size={20} className='chaos-champion-icon' />
                </div>
                <p className='chaos-champion-title'>{card.title}</p>
                <CountUp className='chaos-champion-value' value={card.value} />
                <p className='wrapped-metric-detail'>{card.detail}</p>
                <motion.div className='chaos-champion-badge' {...popIn(0.3 + index * 0.06)}>
                  <Crown size={12} />
                  <span>{card.champion}</span>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}