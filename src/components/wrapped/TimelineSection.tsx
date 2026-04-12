'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Camera, Flame, Mic, TrendingUp } from 'lucide-react';

import type { MonthlySnapshot, WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { MediaAsset } from './MediaAsset';
import { SectionHeading } from './SectionHeading';
import { fadeUp, USER_COLORS } from './shared';

interface TimelineSectionProps {
  data: WrappedData;
}

function MoodBadge({ pos, neg, love }: { pos: number; neg: number; love: number }) {
  if (love > pos && love > neg) return <span className='tl-mood tl-mood-love'>💞 Caldo</span>;
  if (neg > pos) return <span className='tl-mood tl-mood-sad'>🌧️ Cupo</span>;
  if (pos > neg * 2) return <span className='tl-mood tl-mood-pos'>✨ Positivo</span>;
  return <span className='tl-mood tl-mood-chaos'>⚡ Caos</span>;
}

function TimelineNode({ snap, index, users }: { snap: MonthlySnapshot; index: number; users: [string, string] }) {
  const maxUser = snap.messagesPerUser[users[0]] ?? 0;
  const minUser = snap.messagesPerUser[users[1]] ?? 0;
  const dominant = maxUser >= minUser ? 0 : 1;

  return (
    <motion.div className='tl-node' {...fadeUp(index * 0.05)}>
      {/* Dot on the line */}
      <div className='tl-dot-col'>
        <div className='tl-dot' />
      </div>

      {/* Card */}
      <div className='tl-card'>
        {/* Header row */}
        <div className='tl-card-head'>
          <span className='tl-label'>
            <CalendarDays size={12} />
            {snap.label}
          </span>
          <MoodBadge pos={snap.sentiment.pos} neg={snap.sentiment.neg} love={snap.sentiment.love} />
        </div>

        {/* Flavor text */}
        {snap.flavorText && (
          <p className='tl-flavor'>{snap.flavorText}</p>
        )}

        {/* Hero metric + quick pills */}
        <div className='tl-metrics'>
          <div className='tl-hero'>
            <CountUp className='tl-hero-value' value={snap.totalMessages} />
            <span className='tl-hero-suffix'>msg</span>
          </div>

          <div className='tl-pills'>
            {snap.peakDay && (
              <span className='tl-pill'>
                <Flame size={11} /> {snap.peakDay.label}: <strong>{snap.peakDay.count}</strong>
              </span>
            )}
            {snap.avgMsgsPerDay > 0 && (
              <span className='tl-pill'>
                <TrendingUp size={11} /> ~{snap.avgMsgsPerDay}/g
              </span>
            )}
            {snap.voiceNotes > 0 && (
              <span className='tl-pill'>
                <Mic size={11} /> {snap.voiceNotes}
              </span>
            )}
            {snap.photos > 0 && (
              <span className='tl-pill'>
                <Camera size={11} /> {snap.photos}
              </span>
            )}
          </div>
        </div>

        {/* User bars */}
        <div className='tl-users'>
          {users.map((name, i) => {
            const count = snap.messagesPerUser[name] ?? 0;
            const pct = snap.totalMessages > 0 ? Math.round((count / snap.totalMessages) * 100) : 0;
            return (
              <div className='tl-user-row' key={name}>
                <span className='tl-user-name' style={{ color: USER_COLORS[i] }}>{name}</span>
                <div className='tl-user-track'>
                  <motion.div
                    className='tl-user-fill'
                    style={{ background: USER_COLORS[i] }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.3 + i * 0.1 }}
                  />
                </div>
                <span className='tl-user-pct'>{pct}%</span>
                {i === dominant && <span className='tl-user-crown'>👑</span>}
              </div>
            );
          })}
        </div>

        {/* Bottom: stickers + words + emojis compact */}
        <div className='tl-bottom'>
          {snap.topStickers.length > 0 && (
            <div className='tl-stickers'>
              {snap.topStickers.slice(0, 3).map((s, i) => (
                <motion.div className='tl-sticker' key={s.path} {...fadeUp(0.3 + i * 0.06)} whileHover={{ scale: 1.12 }}>
                  <MediaAsset alt={`Sticker #${i + 1}`} kind={s.isAnimated ? 'video' : 'image'} url={s.blobUrl} />
                  <span className='tl-sticker-count'>{s.count}×</span>
                </motion.div>
              ))}
            </div>
          )}

          {snap.topWords.length > 0 && (
            <div className='tl-words'>
              {snap.topWords.slice(0, 4).map((w) => (
                <span className='tl-word' key={w.word}>{w.word} <strong>{w.count}</strong></span>
              ))}
            </div>
          )}

          {snap.topEmojis.length > 0 && (
            <div className='tl-emojis'>
              {snap.topEmojis.slice(0, 3).map((e) => (
                <span className='tl-emoji' key={e.emoji}>{e.emoji}<small>{e.count}</small></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function TimelineSection({ data }: TimelineSectionProps) {
  const snapshots = data.global.monthlySnapshots;
  const users: [string, string] = [data.users[0].name, data.users[1].name];

  if (snapshots.length === 0) return null;

  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>
        <SectionHeading
          eyebrow='Il viaggio mese per mese'
          title='La storia della vostra chat, un capitolo alla volta'
          description='Ogni mese ha una personalità, un vincitore, e i suoi sticker e parole che lo definiscono.'
        />

        <div className='tl-timeline'>
          <div className='tl-line' aria-hidden='true' />
          {snapshots.map((snap, index) => (
            <TimelineNode key={snap.month} index={index} snap={snap} users={users} />
          ))}
        </div>
      </div>
    </section>
  );
}