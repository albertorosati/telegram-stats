'use client';

import { motion } from 'framer-motion';
import { Camera, Clapperboard, Link2, Mic } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { SectionHeading } from './SectionHeading';
import { fadeUp, formatDuration } from './shared';

interface MediaChaosSectionProps {
  data: WrappedData;
}

const MEDIA_TILES = [
  { key: 'voice', icon: Mic, emoji: '🎙️' },
  { key: 'photos', icon: Camera, emoji: '📸' },
  { key: 'videos', icon: Clapperboard, emoji: '🎥' },
  { key: 'links', icon: Link2, emoji: '🔗' },
] as const;

export function MediaChaosSection({ data }: MediaChaosSectionProps) {
  const { mediaChaos } = data.global;
  const voiceChampion = data.users.find((user) => user.name === mediaChaos.voiceChampion) ?? data.users[0];
  const photoChampion = data.users.find((user) => user.name === mediaChaos.photoChampion) ?? data.users[0];
  const videoChampion = data.users.find((user) => user.name === mediaChaos.videoChampion) ?? data.users[0];
  const linkChampion = data.users.find((user) => user.name === mediaChaos.linkChampion) ?? data.users[0];

  const cards = [
    {
      title: 'Il Podcaster',
      emoji: MEDIA_TILES[0].emoji,
      icon: MEDIA_TILES[0].icon,
      value: mediaChaos.totalVoiceNotes.toLocaleString('it-IT'),
      detail: `Avete registrato l'equivalente di un audiolibro: ${formatDuration(mediaChaos.totalVoiceDuration)}. Più vocale di tutti: ${voiceChampion.name}.`,
    },
    {
      title: 'I Paparazzi',
      emoji: MEDIA_TILES[1].emoji,
      icon: MEDIA_TILES[1].icon,
      value: mediaChaos.totalPhotos.toLocaleString('it-IT'),
      detail: `${photoChampion.name} ha riempito il rullino più di tutti con ${photoChampion.imagesSent} foto.`,
    },
    {
      title: 'I Registi',
      emoji: MEDIA_TILES[2].emoji,
      icon: MEDIA_TILES[2].icon,
      value: mediaChaos.totalVideos.toLocaleString('it-IT'),
      detail: `${videoChampion.name} firma la regia con ${videoChampion.videoFiles} video inviati.`,
    },
    {
      title: 'I Condivisi',
      emoji: MEDIA_TILES[3].emoji,
      icon: MEDIA_TILES[3].icon,
      value: mediaChaos.totalLinks.toLocaleString('it-IT'),
      detail: `${linkChampion.name} ha spinto il feed con ${linkChampion.linksShared} link, reel o TikTok inoltrati.`,
    },
  ];

  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>
        <SectionHeading
          eyebrow='Multimedia & caos'
          title='La parte rumorosa, visiva e ingestibile della conversazione'
          description='Messaggi vocali, foto, video e link meritano il loro palco. Qui il rumore di fondo diventa intrattenimento puro.'
        />

        <div className='wrapped-bento-grid'>
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article className='wrapped-chaos-card' key={card.title} {...fadeUp(index * 0.05)} whileHover={{ y: -6 }}>
                <div className='wrapped-bento-head'>
                  <span className='wrapped-bento-emoji'>{card.emoji}</span>
                  <span className='wrapped-bento-icon'><Icon size={18} /></span>
                </div>
                <p className='wrapped-metric-label'>{card.title}</p>
                <CountUp className='wrapped-chaos-value' value={Number(card.value.replaceAll('.', '').replace(',', '.')) || 0} />
                <p className='wrapped-chaos-copy'>{card.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}