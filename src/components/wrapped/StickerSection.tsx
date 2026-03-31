'use client';

import { motion } from 'framer-motion';
import { Crown, Film, Ghost, Sparkles, Sticker, Swords, Trophy, Zap } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { MediaAsset } from './MediaAsset';
import { SectionHeading } from './SectionHeading';
import { emptyStickerStats, formatDisplayDate, USER_COLORS } from './shared';
import { fadeUp } from './shared';

interface StickerSectionProps {
  data: WrappedData;
}

/* ── Custom spring configs ── */
const popIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.5, y: 30 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { type: 'spring', stiffness: 260, damping: 20, delay },
});

const slideFromLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { type: 'spring', stiffness: 180, damping: 22, delay },
});

const slideFromRight = (delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { type: 'spring', stiffness: 180, damping: 22, delay },
});

export function StickerSection({ data }: StickerSectionProps) {
  const [userA, userB] = data.users;
  const userABattle = data.stickers.byUser[userA.name] ?? emptyStickerStats(userA.name);
  const userBBattle = data.stickers.byUser[userB.name] ?? emptyStickerStats(userB.name);
  const battleEntries = [userABattle, userBBattle];
  const winner = userABattle.count >= userBBattle.count ? 0 : 1;

  if (data.stickers.total === 0) {
    return (
      <section className='wrapped-panel wrapped-scene'>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Stickers' title='Caverna sticker' description='In questo archivio non è stato trovato nessun sticker, quindi qui resta tutto in silenzio.' />
        </div>
      </section>
    );
  }

  const { holyTrinity, museumEntries, mosaicUrls, firstSticker, lastSticker } = data.stickers;
  const density = data.global.totalMessages > 0
    ? ((data.stickers.total / data.global.totalMessages) * 100).toFixed(1)
    : '0';

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO — Big numbers + animated mosaic background
          ══════════════════════════════════════════════════════════════════════ */}
      <section className='wrapped-panel wrapped-scene sticker-hero-section'>
        {/* Background mosaic strip */}
        {mosaicUrls.length > 0 && (
          <div className='sticker-hero-mosaic-bg' aria-hidden='true'>
            <div className='sticker-hero-mosaic-track'>
              {mosaicUrls.slice(0, 30).map((url, i) => (
                <div className='sticker-hero-mosaic-item' key={`hero-m-${i}`}>
                  <MediaAsset alt='' url={url} />
                </div>
              ))}
              {/* Duplicate for seamless scroll */}
              {mosaicUrls.slice(0, 30).map((url, i) => (
                <div className='sticker-hero-mosaic-item' key={`hero-m2-${i}`}>
                  <MediaAsset alt='' url={url} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='wrapped-panel-inner sticker-hero-content'>
          <motion.div
            className='sticker-hero-headline'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className='wrapped-kicker'><Sticker size={14} /> La galassia degli sticker</p>
            <h2 className='sticker-hero-title'>
              <CountUp className='sticker-hero-number' value={data.stickers.total} />
              <span className='sticker-hero-label'>sticker inviati</span>
            </h2>
          </motion.div>

          <div className='sticker-hero-stats'>
            <motion.div className='sticker-hero-pill' {...popIn(0.1)}>
              <span className='sticker-hero-pill-icon'>🎨</span>
              <CountUp className='sticker-hero-pill-value' value={data.stickers.uniqueCount} />
              <span className='sticker-hero-pill-label'>unici</span>
            </motion.div>
            <motion.div className='sticker-hero-pill' {...popIn(0.18)}>
              <span className='sticker-hero-pill-icon'>🎬</span>
              <CountUp className='sticker-hero-pill-value' value={data.stickers.animatedCount} />
              <span className='sticker-hero-pill-label'>animati</span>
            </motion.div>
            <motion.div className='sticker-hero-pill' {...popIn(0.26)}>
              <span className='sticker-hero-pill-icon'>🖼️</span>
              <CountUp className='sticker-hero-pill-value' value={data.stickers.staticCount} />
              <span className='sticker-hero-pill-label'>statici</span>
            </motion.div>
            <motion.div className='sticker-hero-pill' {...popIn(0.34)}>
              <span className='sticker-hero-pill-icon'>⚡</span>
              <span className='sticker-hero-pill-value'>{density}%</span>
              <span className='sticker-hero-pill-label'>densità</span>
            </motion.div>
          </div>

          {/* First & Last */}
          <div className='sticker-hero-anchors'>
            <motion.div className='sticker-anchor' {...slideFromLeft(0.15)}>
              <div className='sticker-anchor-badge'>🏁 Primo</div>
              <div className='sticker-anchor-media'>
                <MediaAsset alt='Primo sticker' kind={firstSticker?.isAnimated ? 'video' : 'image'} url={firstSticker?.blobUrl} />
              </div>
              <p className='sticker-anchor-meta'>
                {firstSticker ? `${firstSticker.userName} · ${formatDisplayDate(firstSticker.date)}` : 'N/D'}
              </p>
            </motion.div>
            <motion.div className='sticker-anchor' {...slideFromRight(0.15)}>
              <div className='sticker-anchor-badge'>🔚 Ultimo</div>
              <div className='sticker-anchor-media'>
                <MediaAsset alt='Ultimo sticker' kind={lastSticker?.isAnimated ? 'video' : 'image'} url={lastSticker?.blobUrl} />
              </div>
              <p className='sticker-anchor-meta'>
                {lastSticker ? `${lastSticker.userName} · ${formatDisplayDate(lastSticker.date)}` : 'N/D'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOLY TRINITY — Podium with gold/silver/bronze glow
          ══════════════════════════════════════════════════════════════════════ */}
      {holyTrinity.length > 0 && (
        <section className='wrapped-panel wrapped-scene'>
          <div className='wrapped-panel-inner'>
            <SectionHeading eyebrow='La santa trinità' title='I 3 sticker più usati in assoluto' description='Il podio globale della chat, indipendentemente da chi li ha mandati.' />
            <div className='sticker-podium'>
              {/* Reorder: 2nd, 1st, 3rd for podium layout */}
              {[1, 0, 2].map((rank) => {
                const sticker = holyTrinity[rank];
                if (!sticker) return null;
                const isFirst = rank === 0;
                const podiumClass = rank === 0 ? 'sticker-podium-gold' : rank === 1 ? 'sticker-podium-silver' : 'sticker-podium-bronze';
                return (
                  <motion.div
                    className={`sticker-podium-card ${podiumClass}`}
                    key={sticker.path}
                    {...popIn(rank === 0 ? 0.2 : rank === 1 ? 0 : 0.1)}
                    whileHover={{ y: -12, scale: 1.05 }}
                  >
                    {isFirst && <div className='sticker-podium-crown'><Crown size={28} /></div>}
                    <div className='sticker-podium-medal'>#{rank + 1}</div>
                    <div className='sticker-podium-media'>
                      <MediaAsset alt={`Sticker #${rank + 1}`} kind={sticker.isAnimated ? 'video' : 'image'} url={sticker.blobUrl} />
                    </div>
                    <CountUp className='sticker-podium-count' suffix='x' value={sticker.count} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          BATTLE — Side-by-side VS with animated entrance
          ══════════════════════════════════════════════════════════════════════ */}
      <section className='wrapped-panel wrapped-scene sticker-battle-section'>
        <div className='wrapped-panel-inner'>
          <div className='sticker-battle-header'>
            <motion.div {...popIn(0.1)}>
              <Swords size={32} className='sticker-battle-icon' />
            </motion.div>
            <SectionHeading eyebrow='La battaglia degli sticker' title='La battaglia degli sticker' description='' />
          </div>

          <div className='sticker-vs-container'>
            {/* VS badge */}
            <motion.div
              className='sticker-vs-badge'
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.4 }}
            >
              <Zap size={22} />
              <span>VS</span>
            </motion.div>

            <div className='wrapped-sticker-battle-grid'>
              {battleEntries.map((entry, index) => {
                const animatedPct = entry.count === 0 ? 0 : Math.round((entry.animatedCount / entry.count) * 100);
                const topThree = entry.podium.slice(0, 3);
                const isWinner = index === winner;
                const slide = index === 0 ? slideFromLeft : slideFromRight;
                const accentColor = USER_COLORS[index];

                return (
                  <motion.article
                    className={`wrapped-sticker-user-card ${isWinner ? 'sticker-card-winner' : ''}`}
                    key={entry.userName}
                    style={{ '--sticker-accent': accentColor } as React.CSSProperties}
                    {...slide(index * 0.12)}
                  >
                    {isWinner && (
                      <div className='sticker-winner-tag'>
                        <Trophy size={14} /> Vincitore
                      </div>
                    )}

                    <h3 className='wrapped-user-name wrapped-break-words'>
                      <span className='sticker-user-dot' style={{ background: accentColor }} />
                      {entry.userName}
                    </h3>

                    <div className='sticker-big-number'>
                      <CountUp className='sticker-big-count' value={entry.count} />
                      <span className='sticker-big-suffix'>sticker</span>
                    </div>

                    <div className='wrapped-sticker-user-kpis'>
                      <div className='wrapped-stat-box'>
                        <span className='wrapped-stat-label'>Unici</span>
                        <CountUp className='wrapped-stat-value' value={entry.uniqueCount} />
                      </div>
                      <div className='wrapped-stat-box'>
                        <span className='wrapped-stat-label'>Animati</span>
                        <CountUp className='wrapped-stat-value' suffix='%' value={animatedPct} />
                      </div>
                    </div>

                    <div className='wrapped-sticker-top-grid'>
                      {topThree.length > 0 ? topThree.map((sticker, rank) => (
                        <motion.div
                          className='wrapped-sticker-top-card'
                          key={`${entry.userName}-${sticker.path}`}
                          {...popIn(0.3 + rank * 0.08)}
                          whileHover={{ scale: 1.1, rotate: rank % 2 === 0 ? 3 : -3 }}
                        >
                          <MediaAsset alt={sticker.path} kind={sticker.isAnimated ? 'video' : 'image'} url={sticker.blobUrl} />
                          <p className='wrapped-metric-label'>#{rank + 1}</p>
                          <p className='wrapped-sticker-top-count'><CountUp suffix='x' value={sticker.count} /></p>
                        </motion.div>
                      )) : (
                        <p className='wrapped-footnote'>Nessuno sticker rilevato.</p>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          GRAVEYARD — "I Dimenticati" — onesies from both users
          ══════════════════════════════════════════════════════════════════════ */}
      {battleEntries.some((e) => e.onesies.length > 0) && (
        <section className='wrapped-panel wrapped-scene sticker-graveyard-section'>
          <div className='wrapped-panel-inner'>
            <SectionHeading
              eyebrow='Il cimitero degli sticker'
              title='I Dimenticati'
              description='Usati una sola volta e mai più. Riposa in pace, piccola faccina.'
            />
            <div className='sticker-graveyard-grid'>
              {battleEntries.flatMap((entry) =>
                entry.onesies.map((sticker) => (
                  <motion.div
                    className='sticker-graveyard-cell'
                    key={`grave-${entry.userName}-${sticker.path}`}
                    initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                    whileInView={{ opacity: 0.65, scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18, delay: Math.random() * 0.3 }}
                    whileHover={{ opacity: 1, scale: 1.2, rotate: 5 }}
                  >
                    <MediaAsset alt={sticker.path} kind={sticker.isAnimated ? 'video' : 'image'} url={sticker.blobUrl} />
                  </motion.div>
                )),
              )}
            </div>
            <p className='sticker-graveyard-epitaph'><Ghost size={16} /> Qui giacciono {battleEntries.reduce((s, e) => s + e.onesies.length, 0)} sticker dimenticati dal tempo</p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MUSEUM — Full gallery of most-used stickers beyond the trinity
          ══════════════════════════════════════════════════════════════════════ */}
      {museumEntries.length > 0 && (
        <section className='wrapped-panel wrapped-scene'>
          <div className='wrapped-panel-inner'>
            <SectionHeading eyebrow='Il museo degli sticker' title='Il museo degli sticker' description='Oltre il podio: tutti gli altri sticker più usati nella chat, in ordine di frequenza.' />
            <div className='wrapped-sticker-museum-grid'>
              {museumEntries.map((sticker, index) => (
                <motion.div
                  className='wrapped-sticker-museum-card'
                  key={sticker.path}
                  {...popIn(index * 0.025)}
                  whileHover={{ y: -6, scale: 1.08 }}
                >
                  <MediaAsset alt={`Sticker ${index + 4}`} kind={sticker.isAnimated ? 'video' : 'image'} url={sticker.blobUrl} />
                  <span className='wrapped-sticker-museum-count'>{sticker.count}x</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MOSAIC — Infinite scrolling sticker wall
          ══════════════════════════════════════════════════════════════════════ */}
      {mosaicUrls.length > 0 && (
        <section className='wrapped-panel wrapped-scene sticker-mosaic-section'>
          <div className='wrapped-panel-inner'>
            <SectionHeading eyebrow='Mosaico sticker' title='La parete degli sticker' description={`${mosaicUrls.length} sticker estratti dalla chat, un muro di pura espressione visiva.`} />
            <div className='sticker-mosaic-scroll'>
              <div className='sticker-mosaic-track'>
                {mosaicUrls.map((url, index) => (
                  <motion.div
                    className='sticker-mosaic-cell'
                    key={`mosaic-${index}`}
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <MediaAsset alt='' url={url} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}