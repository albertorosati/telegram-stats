'use client';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import type { MonthlySnapshot, WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { MediaAsset } from './MediaAsset';
import { fadeUp, formatDisplayDate, formatDuration, USER_COLORS } from './shared';
import { MonthCardSkeleton } from './MonthCardSkeleton';

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
  if (meta.isFirst) return 'Da dove parte tutto';
  if (meta.isLast) return 'Dove siete arrivati';
  const { tier, delta } = meta;
  if (tier === 'silent') return 'Il mese fermo';
  if (tier === 'quiet') return 'Il mese piu quieto';
  if (tier === 'peak') return delta !== null && delta < 0 ? 'Il mese del culmine' : 'Il mese piu intenso';
  if (tier === 'high') {
    if (delta !== null && delta > 30) return 'Il mese della ripresa';
    if (delta !== null && delta < -20) return 'Quando il ritmo ha rallentato';
    return 'Il mese pieno';
  }
  if (delta !== null && delta > 30) return 'Il mese che riparte';
  if (delta !== null && delta < -30) return 'Il mese in calo';
  if (snap.sentiment.love > snap.sentiment.pos && snap.sentiment.love > snap.sentiment.neg) return 'Il mese piu vicino';
  if (snap.sentiment.neg > snap.sentiment.pos) return 'Il mese piu teso';
  return 'Il mese in equilibrio';
}

function getChapterSummary(snap: MonthlySnapshot, meta: NodeMeta, users: [string, string]): string {
  if (snap.totalMessages === 0) {
    return `Nel mese di ${snap.label} non risultano messaggi inviati.`;
  }

  const rankedUsers = Object.entries(snap.messagesPerUser).sort((left, right) => right[1] - left[1]);
  const [dominantName = users[meta.dominantIdx], dominantCount = 0] = rankedUsers[0] ?? [];
  const dominantPct = snap.totalMessages > 0 ? Math.round((dominantCount / snap.totalMessages) * 100) : 0;

  if (!snap.peakDay) {
    return `${dominantName} ha inviato ${dominantCount.toLocaleString('it-IT')} messaggi su ${snap.totalMessages.toLocaleString('it-IT')} (${dominantPct}%) nel mese di ${snap.label}.`;
  }

  return `${dominantName} ha inviato ${dominantCount.toLocaleString('it-IT')} messaggi su ${snap.totalMessages.toLocaleString('it-IT')} (${dominantPct}%). Il giorno con piu attivita e stato ${snap.peakDay.label} con ${snap.peakDay.count.toLocaleString('it-IT')} messaggi.`;
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
  chatName: string;
  archiveWindow: string;
  openingLine: string;
  peakChapterLabel: string;
  peakChapterDetail: string;
  sharedNightPulse: number;
  snapshots: MonthlySnapshot[];
  metas: NodeMeta[];
  users: [string, string];
}

function StoryCover({
  chatName,
  archiveWindow,
  openingLine,
  peakChapterLabel,
  peakChapterDetail,
  sharedNightPulse,
  snapshots,
  metas,
  users,
}: StoryCoverProps) {
  const total = snapshots.reduce((s, m) => s + m.totalMessages, 0);

  return (
    <motion.div
      className='tl-cover tl-cover-editorial'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className='tl-cover-grid'>
        <div className='tl-cover-copy'>
          <p className='tl-cover-eyebrow'>La Storia</p>
          <h1 className='tl-cover-headline'>{chatName}</h1>
          <p className='tl-cover-manifesto'>{openingLine}</p>
          <p className='tl-cover-range'>{archiveWindow}</p>
        </div>

        <div className='tl-cover-aside'>
          <div className='tl-cover-mini'>
            <p className='tl-cover-mini-label'>Il mese piu intenso</p>
            <h2 className='tl-cover-mini-title'>{peakChapterLabel}</h2>
            <p className='tl-cover-mini-copy'>{peakChapterDetail}</p>
          </div>
        </div>
      </div>

      <div className='tl-cover-users'>
        <span style={{ color: USER_COLORS[0] }}>{users[0]}</span>
        <span className='tl-cover-amp'>×</span>
        <span style={{ color: USER_COLORS[1] }}>{users[1]}</span>
      </div>

      <div className='tl-cover-stats'>
        <div className='tl-cover-stat'>
          <CountUp className='tl-cover-stat-value' value={total} />
          <span className='tl-cover-stat-label'>messaggi custoditi</span>
        </div>
        <div className='tl-cover-stat'>
          <CountUp className='tl-cover-stat-value' value={snapshots.length} />
          <span className='tl-cover-stat-label'>capitoli da sfogliare</span>
        </div>
        <div className='tl-cover-stat'>
          <span className='tl-cover-stat-value'>{sharedNightPulse}%</span>
          <span className='tl-cover-stat-label'>energia notturna condivisa</span>
        </div>
      </div>

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

const ChapterNode = memo(function ChapterNode({ snap, index, users, meta }: ChapterNodeProps) {
  const dominantColor = USER_COLORS[meta.dominantIdx];
  const padded = String(meta.ordinal).padStart(2, '0');
  const title = getChapterTitle(meta, snap);
  const chapterSummary = getChapterSummary(snap, meta, users);
  const rankedUsers = Object.entries(snap.messagesPerUser).sort((left, right) => right[1] - left[1]);
  const [dominantName = users[meta.dominantIdx], dominantCount = 0] = rankedUsers[0] ?? [];
  const dominantPct = snap.totalMessages > 0 ? Math.round((dominantCount / snap.totalMessages) * 100) : 0;
  const voiceDurationLabel = formatDuration(snap.voiceDuration);

  return (
    <motion.div
      className={`tl-node ${index % 2 === 0 ? 'tl-node-left' : 'tl-node-right'}`}
      style={{ '--tl-dominant-color': dominantColor } as React.CSSProperties}
      {...fadeUp(index * 0.04)}
    >
      <div
        className={`tl-chapter-card tl-card tl-card-${meta.tier}`}
        style={{
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

        <p className='tl-flavor'>{chapterSummary}</p>

        <div className='tl-chapter-facts'>
          <div className='tl-chapter-fact'>
            <span className='tl-chapter-fact-label'>Voce dominante</span>
            <strong className='tl-chapter-fact-value'>{dominantName}</strong>
            <span className='tl-chapter-fact-detail'>{dominantCount.toLocaleString('it-IT')} messaggi · {dominantPct}%</span>
          </div>
          <div className='tl-chapter-fact'>
            <span className='tl-chapter-fact-label'>Giorno top</span>
            <strong className='tl-chapter-fact-value'>{snap.peakDay?.label ?? 'N/D'}</strong>
            <span className='tl-chapter-fact-detail'>{snap.peakDay ? `${snap.peakDay.count.toLocaleString('it-IT')} messaggi` : 'nessun picco rilevato'}</span>
          </div>
          <div className='tl-chapter-fact'>
            <span className='tl-chapter-fact-label'>Vocali</span>
            <strong className='tl-chapter-fact-value'>{snap.voiceNotes.toLocaleString('it-IT')}</strong>
            <span className='tl-chapter-fact-detail'>{voiceDurationLabel} totali</span>
          </div>
          <div className='tl-chapter-fact'>
            <span className='tl-chapter-fact-label'>Foto</span>
            <strong className='tl-chapter-fact-value'>{snap.photos.toLocaleString('it-IT')}</strong>
            <span className='tl-chapter-fact-detail'>immagini condivise</span>
          </div>
          <div className='tl-chapter-fact'>
            <span className='tl-chapter-fact-label'>Video</span>
            <strong className='tl-chapter-fact-value'>{snap.videos.toLocaleString('it-IT')}</strong>
            <span className='tl-chapter-fact-detail'>video inviati</span>
          </div>
          <div className='tl-chapter-fact'>
            <span className='tl-chapter-fact-label'>Sticker</span>
            <strong className='tl-chapter-fact-value'>{snap.stickerCount.toLocaleString('it-IT')}</strong>
            <span className='tl-chapter-fact-detail'>sticker usati nel mese</span>
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
              </div>
            );
          })}
        </div>

        <div className='tl-bottom-head'>
          <p className='tl-bottom-kicker'>Segni del mese</p>
          {snap.avgMsgsPerDay > 0 ? <span className='tl-bottom-meta'>~{snap.avgMsgsPerDay.toLocaleString('it-IT')} messaggi al giorno</span> : null}
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
      </div>
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Lazy chapter node — only renders full content when near viewport
// ---------------------------------------------------------------------------

function LazyChapterNode({ snap, index, users, meta }: ChapterNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '200px 0px', once: false });

  return (
    <div
      ref={ref}
      data-chapter-ordinal={String(meta.ordinal)}
      data-chapter-label={snap.label}
      style={{ minHeight: 320 }}
    >
      {isInView ? (
        <ChapterNode snap={snap} index={index} users={users} meta={meta} />
      ) : (
        <MonthCardSkeleton />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export function TimelineSection({ data, disableLazy = false }: { data: WrappedData; disableLazy?: boolean }) {
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
      listRef.current.querySelectorAll<HTMLElement>('[data-chapter-ordinal]'),
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

  const firstActiveDay = data.global.dailyVolume[0]?.date;
  const lastActiveDay = data.global.dailyVolume[data.global.dailyVolume.length - 1]?.date;
  const activeMeta = metas[currentIdx] ?? metas[0];
  const activeSnap = snapshots[currentIdx] ?? snapshots[0];
  const progressPct = ((activeMeta.ordinal / snapshots.length) * 100).toFixed(1);
  const peakChapter = snapshots.reduce((best, current) => (current.totalMessages > best.totalMessages ? current : best), snapshots[0]);
  const sharedNightPulse = Math.round((data.users[0].nightPercentage + data.users[1].nightPercentage) / 2);
  const archiveWindow = firstActiveDay && lastActiveDay
    ? `${formatDisplayDate(firstActiveDay)} - ${formatDisplayDate(lastActiveDay)}`
    : `${snapshots[0].label} - ${snapshots[snapshots.length - 1].label}`;
  const totalNegative = data.users.reduce((sum, user) => sum + user.negativity, 0);
  const openingLine = data.global.totalLoveWords >= totalNegative
    ? 'Mese per mese trovi i picchi, i ritorni, i media condivisi e i dettagli che hanno dato forma alla conversazione.'
    : 'Qui sotto la conversazione si ricompone mese per mese, con i giorni chiave e tutti i segnali che l\'hanno resa vostra.';
  const peakChapterDetail = peakChapter.totalMessages > 0
    ? `${peakChapter.totalMessages.toLocaleString('it-IT')} messaggi nel mese con il volume piu alto della chat.`
    : 'Un archivio sottile, ma comunque pieno di tracce da rileggere.';

  return (
    <section className='wrapped-timeline-stage'>
      <StoryCover
        archiveWindow={archiveWindow}
        chatName={data.chatName}
        metas={metas}
        openingLine={openingLine}
        peakChapterDetail={peakChapterDetail}
        peakChapterLabel={peakChapter.label}
        sharedNightPulse={sharedNightPulse}
        snapshots={snapshots}
        users={users}
      />

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
        {snapshots.map((snap, index) =>
          disableLazy ? (
            <div
              key={snap.month}
              data-chapter-ordinal={String(metas[index].ordinal)}
              data-chapter-label={snap.label}
              style={{ minHeight: 320 }}
            >
              <ChapterNode snap={snap} index={index} users={users} meta={metas[index]} />
            </div>
          ) : (
            <LazyChapterNode key={snap.month} index={index} meta={metas[index]} snap={snap} users={users} />
          )
        )}
      </div>
    </section>
  );
}
