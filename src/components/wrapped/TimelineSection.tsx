'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Flame, Mic, TrendingUp } from 'lucide-react';

import type { MonthlySnapshot, WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { MediaAsset } from './MediaAsset';
import { fadeUp, USER_COLORS } from './shared';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NodeMeta {
  volPct: number;
  delta: number | null;
  dominantIdx: number;
  tier: 'peak' | 'high' | 'normal' | 'quiet' | 'silent';
  ordinal: number;
  totalMonths: number;
  isFirst: boolean;
  isLast: boolean;
}

// ---------------------------------------------------------------------------
// Chapter title — auto-generated from tier + delta + sentiment
// ---------------------------------------------------------------------------

function getChapterTitle(meta: NodeMeta, snap: MonthlySnapshot): string {
  if (meta.isFirst) return "L'Inizio 🌱";
  if (meta.isLast) return 'Adesso 📍';
  const { tier, delta } = meta;
  if (tier === 'silent') return 'La Pausa 💤';
  if (tier === 'quiet') return 'La Grande Quiete 🌑';
  if (tier === 'peak') return delta !== null && delta < 0 ? 'Il Picco Irripetibile ⚡' : 'Il Mese Record 🔥';
  if (tier === 'high') {
    if (delta !== null && delta > 30) return "L'Ascesa 📈";
    if (delta !== null && delta < -20) return 'Il Declino 📉';
    return 'Grandi Intese ✨';
  }
  // normal
  if (delta !== null && delta > 30) return 'La Rinascita 🌱';
  if (delta !== null && delta < -30) return 'Il Silenzio 🌧️';
  if (snap.sentiment.love > snap.sentiment.pos && snap.sentiment.love > snap.sentiment.neg) return 'Cuori e Parole 💞';
  if (snap.sentiment.neg > snap.sentiment.pos) return 'Acque Agitate 🌊';
  return 'Giornate Normali ☁️';
}

// ---------------------------------------------------------------------------
// Badges
// ---------------------------------------------------------------------------

function MoodBadge({ pos, neg, love }: { pos: number; neg: number; love: number }) {
  if (love > pos && love > neg) return <span className='tl-mood tl-mood-love'>💞 Caldo</span>;
  if (neg > pos) return <span className='tl-mood tl-mood-sad'>🌧️ Cupo</span>;
  if (pos > neg * 2) return <span className='tl-mood tl-mood-pos'>✨ Positivo</span>;
  return <span className='tl-mood tl-mood-chaos'>⚡ Caos</span>;
}

function DeltaBadge({ delta }: { delta: number | null }) {
  if (delta === null) return null;
  let cls = 'tl-delta tl-delta-flat';
  let arrow = '→';
  if (delta > 5) { cls = 'tl-delta tl-delta-up'; arrow = '↑'; }
  else if (delta < -5) { cls = 'tl-delta tl-delta-down'; arrow = '↓'; }
  return <span className={cls}>{arrow} {delta > 0 ? '+' : ''}{delta}%</span>;
}

// ---------------------------------------------------------------------------
// Story cover — cinematic intro card with sparkline
// ---------------------------------------------------------------------------

interface StoryCoverProps {
  snapshots: MonthlySnapshot[];
  metas: NodeMeta[];
  users: [string, string];
}

function StoryCover({ snapshots, metas, users }: StoryCoverProps) {
  const total = snapshots.reduce((s, m) => s + m.totalMessages, 0);
  const first = snapshots[0];
  const last = snapshots[snapshots.length - 1];

  return (
    <motion.div
      className='tl-cover'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className='tl-cover-eyebrow'>La vostra storia</p>

      <div className='tl-cover-title'>
        <span className='tl-cover-n'>{snapshots.length}</span>
        <span className='tl-cover-cap'>Capitoli</span>
      </div>

      <p className='tl-cover-range'>{first.label} → {last.label}</p>

      <div className='tl-cover-users'>
        <span style={{ color: USER_COLORS[0] }}>{users[0]}</span>
        <span className='tl-cover-amp'>×</span>
        <span style={{ color: USER_COLORS[1] }}>{users[1]}</span>
      </div>

      <p className='tl-cover-total'>{total.toLocaleString('it-IT')} messaggi totali</p>

      {/* Sparkline — all months at a glance */}
      <div className='tl-sparkline' aria-hidden='true'>
        {metas.map((m, i) => (
          <div
            key={i}
            className='tl-spark-bar'
            style={{
              '--spark-h': `${Math.max(m.volPct, 4)}%`,
              '--spark-color': USER_COLORS[m.dominantIdx],
            } as React.CSSProperties}
            title={snapshots[i].label}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Chapter node — one month as a cinematic chapter card
// ---------------------------------------------------------------------------

interface ChapterNodeProps {
  snap: MonthlySnapshot;
  index: number;
  users: [string, string];
  meta: NodeMeta;
}

function ChapterNode({ snap, index, users, meta }: ChapterNodeProps) {
  const dominantColor = USER_COLORS[meta.dominantIdx];
  const padded = String(meta.ordinal).padStart(2, '0');
  const title = getChapterTitle(meta, snap);

  return (
    <motion.div
      className='tl-node'
      data-chapter-ordinal={String(meta.ordinal)}
      data-chapter-label={snap.label}
      {...fadeUp(index * 0.04)}
    >
      <div
        className={`tl-chapter-card tl-card tl-card-${meta.tier}`}
        style={{
          '--tl-dominant-color': dominantColor,
          '--vol-pct': `${meta.volPct}%`,
        } as React.CSSProperties}
      >
        {/* Huge faded chapter number in background */}
        <div className='tl-chapter-bg-num' aria-hidden='true'>{padded}</div>

        {/* Chapter header: "Cap. 01 · GENNAIO 2024" + chapter title */}
        <div className='tl-chapter-head'>
          <div className='tl-chapter-meta'>
            <span className='tl-chapter-num'>Cap. {padded}</span>
            <h2 className='tl-chapter-month'>{snap.label.toUpperCase()}</h2>
          </div>
          <h3 className='tl-chapter-title'>{title}</h3>
        </div>

        {/* Full-width volume bar */}
        <div className='tl-vol-bar' aria-hidden='true'><div className='tl-vol-fill' /></div>

        {/* Hero message count — center stage */}
        <div className='tl-chapter-hero'>
          <CountUp className='tl-chapter-count' value={snap.totalMessages} />
          <span className='tl-chapter-count-label'>messaggi</span>
        </div>

        {/* Quick insights: dominant user + mood + delta */}
        <div className='tl-chapter-insights'>
          <span
            className='tl-chapter-dominant'
            style={{
              background: `color-mix(in srgb, ${dominantColor} 12%, transparent)`,
              color: dominantColor,
              border: `1px solid color-mix(in srgb, ${dominantColor} 28%, transparent)`,
            }}
          >
            👑 {users[meta.dominantIdx]}
          </span>
          <MoodBadge pos={snap.sentiment.pos} neg={snap.sentiment.neg} love={snap.sentiment.love} />
          <DeltaBadge delta={meta.delta} />
        </div>

        {/* Flavor text */}
        {snap.flavorText && <p className='tl-flavor'>{snap.flavorText}</p>}

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
              </div>
            );
          })}
        </div>

        {/* Stickers + words + emojis */}
        <div className='tl-bottom'>
          {snap.topStickers.length > 0 && (
            <div className='tl-stickers'>
              {snap.topStickers.slice(0, 3).map((s, i) => (
                <div className='tl-sticker' key={s.path}>
                  <MediaAsset alt={`Sticker #${i + 1}`} kind={s.isAnimated ? 'video' : 'image'} url={s.blobUrl} />
                  <span className='tl-sticker-count'>{s.count}×</span>
                </div>
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

        {/* Context pills */}
        <div className='tl-pills'>
          {snap.peakDay && (
            <span className='tl-pill'><Flame size={11} /> {snap.peakDay.label}: <strong>{snap.peakDay.count}</strong></span>
          )}
          {snap.avgMsgsPerDay > 0 && (
            <span className='tl-pill'><TrendingUp size={11} /> ~{snap.avgMsgsPerDay}/g</span>
          )}
          {snap.voiceNotes > 0 && <span className='tl-pill'><Mic size={11} /> {snap.voiceNotes}</span>}
          {snap.photos > 0 && <span className='tl-pill'><Camera size={11} /> {snap.photos}</span>}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export function TimelineSection({ data }: { data: WrappedData }) {
  const snapshots = data.global.monthlySnapshots;
  const users: [string, string] = [data.users[0].name, data.users[1].name];
  const listRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const metas = useMemo<NodeMeta[]>(() => {
    if (snapshots.length === 0) return [];
    const maxMsgs = Math.max(...snapshots.map((s) => s.totalMessages), 1);
    return snapshots.map((snap, i) => {
      const volPct = Math.round((snap.totalMessages / maxMsgs) * 100);
      let delta: number | null = null;
      if (i > 0) {
        const prev = snapshots[i - 1].totalMessages;
        delta = prev > 0 ? Math.round(((snap.totalMessages - prev) / prev) * 100) : (snap.totalMessages > 0 ? 100 : 0);
      }
      const u0 = snap.messagesPerUser[users[0]] ?? 0;
      const u1 = snap.messagesPerUser[users[1]] ?? 0;
      let tier: NodeMeta['tier'] = 'normal';
      if (snap.totalMessages === 0) tier = 'silent';
      else if (volPct < 20) tier = 'quiet';
      else if (volPct >= 90) tier = 'peak';
      else if (volPct >= 65) tier = 'high';
      return {
        volPct, delta, dominantIdx: u0 >= u1 ? 0 : 1, tier,
        ordinal: i + 1, totalMonths: snapshots.length,
        isFirst: i === 0, isLast: i === snapshots.length - 1,
      };
    });
  }, [snapshots, users]);

  // Sticky chapter indicator via IntersectionObserver
  useEffect(() => {
    if (!listRef.current || snapshots.length === 0) return;
    const nodes = Array.from(
      listRef.current.querySelectorAll<HTMLElement>('.tl-node[data-chapter-ordinal]'),
    );
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ord = Number((entry.target as HTMLElement).dataset.chapterOrdinal);
          if (!isNaN(ord)) setCurrentIdx(ord - 1);
        }
      });
    }, { threshold: 0.4 });
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [snapshots.length]);

  if (snapshots.length === 0) return null;

  const activeMeta = metas[currentIdx] ?? metas[0];
  const activeSnap = snapshots[currentIdx] ?? snapshots[0];
  const progressPct = ((activeMeta.ordinal / snapshots.length) * 100).toFixed(1);

  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>

        <StoryCover metas={metas} snapshots={snapshots} users={users} />

        {/* Sticky scroll progress indicator */}
        {snapshots.length > 1 && (
          <div className='tl-sticky' id='tl-sticky'>
            <span className='tl-sticky-cap'>Cap. {activeMeta.ordinal}/{snapshots.length}</span>
            <span className='tl-sticky-sep'>·</span>
            <span className='tl-sticky-label'>{activeSnap.label}</span>
            <div className='tl-sticky-prog'>
              <div className='tl-sticky-prog-fill' style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* Chapter list */}
        <div className='tl-timeline tl-chapter-list' id='tl-chapter-list' ref={listRef}>
          {snapshots.map((snap, index) => (
            <ChapterNode key={snap.month} index={index} meta={metas[index]} snap={snap} users={users} />
          ))}
        </div>

      </div>
    </section>
  );
}
