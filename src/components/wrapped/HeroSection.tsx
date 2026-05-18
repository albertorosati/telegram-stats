'use client';

import { motion } from 'framer-motion';
import { Flame, HeartHandshake, Sparkles, Stars, Zap } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { formatDisplayDate, popIn } from './shared';

interface HeroSectionProps {
  data: WrappedData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const activeDays = Math.max(data.global.dailyVolume.length, 1);
  const stickerPerDay = data.stickers.total / activeDays;
  const emotionalDelta = data.users.reduce((sum, user) => sum + user.positivity, 0) - data.users.reduce((sum, user) => sum + user.negativity, 0);
  const topChatMood = data.global.totalLoveWords >= (data.users[0].negativity + data.users[1].negativity)
    ? 'c\'era ancora voglia di restare'
    : 'anche dopo le pause tornavate qui';
  const firstActiveDay = data.global.dailyVolume[0]?.date;
  const lastActiveDay = data.global.dailyVolume[data.global.dailyVolume.length - 1]?.date;
  const archiveWindow = firstActiveDay && lastActiveDay
    ? `${formatDisplayDate(firstActiveDay)} · ${formatDisplayDate(lastActiveDay)}`
    : `${activeDays.toLocaleString('it-IT')} giorni attivi`;
  const emotionalManifesto = emotionalDelta >= 0
    ? 'Certe chat diventano abitudine. La vostra e rimasta li: nelle ore tarde, nelle parole che ritornano, nel gesto semplice di tornare.'
    : 'Certe chat non scorrono dritte. La vostra ha lasciato dentro pause, riavvicinamenti e il bisogno ostinato di scrivervi di nuovo.';

  return (
    <section className='wrapped-hero wrapped-hero-orbit'>
      <motion.div
        className='wrapped-hero-copy'
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
      >
          <motion.p
            className='wrapped-kicker'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Sparkles size={14} /> Il recap della chat
          </motion.p>
          <motion.p
            className='wrapped-hero-context'
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            {data.chatName} · {archiveWindow}
          </motion.p>
          <h1 className='wrapped-title'>
            <motion.span
              className='wrapped-title-user-a'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
            >
              {data.users[0].name}
            </motion.span>
            <motion.span
              className='wrapped-title-plus'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
            >
              {' + '}
            </motion.span>
            <motion.span
              className='wrapped-title-user-b'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.25 }}
            >
              {data.users[1].name}
            </motion.span>
            <br />
            <motion.span
              className='wrapped-title-wrapped'
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.4 }}
            >
              Wrapped
            </motion.span>
          </h1>
          <motion.p
            className='wrapped-subtitle wrapped-hero-subtitle'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {data.global.totalMessages.toLocaleString('it-IT')} messaggi in {activeDays.toLocaleString('it-IT')} giorni. Ecco la vostra storia.
          </motion.p>
          <motion.p
            className='wrapped-hero-manifesto'
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.62 }}
          >
            {emotionalManifesto}
          </motion.p>
          <div className='wrapped-hero-pill-row'>
            {[
              { icon: HeartHandshake, text: `${data.users[0].name} + ${data.users[1].name}` },
              { icon: Flame, text: `${activeDays.toLocaleString('it-IT')} giorni attivi` },
              { icon: Zap, text: `${stickerPerDay.toLocaleString('it-IT', { maximumFractionDigits: 1 })} sticker/giorno` },
              { icon: Stars, text: topChatMood },
            ].map((pill, i) => (
              <motion.span className='wrapped-hero-pill' key={pill.text} {...popIn(0.5 + i * 0.06)}>
                <pill.icon size={15} /> {pill.text}
              </motion.span>
            ))}
          </div>
      </motion.div>

      <motion.div className='wrapped-orbit-stage' {...popIn(0.18)}>
        <span className='wrapped-orbit-ring wrapped-orbit-ring-a' />
        <span className='wrapped-orbit-ring wrapped-orbit-ring-b' />
        <span className='wrapped-orbit-whisper'>{topChatMood}</span>
        <div className='wrapped-orbit-core'>
          <span className='wrapped-orbit-label'>messaggi</span>
          <CountUp className='wrapped-orbit-value' value={data.global.totalMessages} />
        </div>
        <div className='wrapped-orbit-chip wrapped-orbit-chip-a'>
          <span>{data.users[0].name}</span>
          <strong>{data.users[0].msgCount.toLocaleString('it-IT')}</strong>
        </div>
        <div className='wrapped-orbit-chip wrapped-orbit-chip-b'>
          <span>{data.users[1].name}</span>
          <strong>{data.users[1].msgCount.toLocaleString('it-IT')}</strong>
        </div>
        <div className='wrapped-orbit-chip wrapped-orbit-chip-c'>
          <span>streak</span>
          <strong>{data.global.streak.maxStreak.toLocaleString('it-IT')} giorni</strong>
        </div>
      </motion.div>

      <div className='wrapped-hero-kpi-grid'>
          <motion.div className='wrapped-mini-card wrapped-mini-card-accent' {...popIn(0.25)}>
            <p className='wrapped-mini-label'>🔥 Giorni passati a scriversi</p>
            <CountUp className='wrapped-mini-value' value={data.global.streak.maxStreak} />
            <p className='wrapped-mini-detail'>Giorni unici con almeno un messaggio</p>
          </motion.div>
          <motion.div className='wrapped-mini-card wrapped-mini-card-wide' {...popIn(0.32)}>
            <p className='wrapped-mini-label'>💬 Avete fatto rumore con</p>
            <CountUp className='wrapped-mini-value' value={data.global.totalMessages} />
            <p className='wrapped-mini-detail'>{data.stickers.total.toLocaleString('it-IT')} sticker · {data.global.totalLoveWords} parole ad alta intensità</p>
          </motion.div>
          <motion.div className='wrapped-mini-card wrapped-mini-card-secondary' {...popIn(0.39)}>
            <p className='wrapped-mini-label'>⚡ Pressione emotiva</p>
            <CountUp className='wrapped-mini-value' prefix={emotionalDelta >= 0 ? '+' : ''} value={emotionalDelta} />
            <p className='wrapped-mini-detail'>saldo tra parole positive e negative</p>
          </motion.div>
      </div>
    </section>
  );
}