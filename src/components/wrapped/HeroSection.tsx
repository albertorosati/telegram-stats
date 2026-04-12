'use client';

import { motion } from 'framer-motion';
import { Flame, HeartHandshake, Sparkles, Stars, Zap } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { popIn, slideFromRight } from './shared';

interface HeroSectionProps {
  data: WrappedData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const activeDays = Math.max(data.global.dailyVolume.length, 1);
  const stickerPerDay = data.stickers.total / activeDays;
  const emotionalDelta = data.users.reduce((sum, user) => sum + user.positivity, 0) - data.users.reduce((sum, user) => sum + user.negativity, 0);
  const topChatMood = data.global.totalLoveWords >= (data.users[0].negativity + data.users[1].negativity) ? 'energia positiva fuori controllo' : 'caos creativo dominante';

  return (
    <section className='wrapped-panel wrapped-hero'>
      <div className='wrapped-hero-grid'>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        >
          <p className='wrapped-kicker'><Sparkles size={14} /> Il recap della chat</p>
          <h1 className='wrapped-title'>
            <motion.span
              className='wrapped-title-user-a'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
            >
              {data.users[0].name}
            </motion.span>
            <span className='wrapped-title-plus'> + </span>
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.35 }}
            >
              Wrapped
            </motion.span>
          </h1>
          <motion.p
            className='wrapped-subtitle'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Questa chat è un piccolo universo fatto di testo, sticker, audio, caos e rituali notturni.
          </motion.p>
          <div className='wrapped-hero-pill-row'>
            {[
              { icon: HeartHandshake, text: `${data.users[0].name} + ${data.users[1].name}` },
              { icon: Flame, text: `${activeDays.toLocaleString('it-IT')} giorni attivi` },
              { icon: Zap, text: `${stickerPerDay.toLocaleString('it-IT', { maximumFractionDigits: 1 })} sticker/giorno` },
              { icon: Stars, text: topChatMood },
            ].map((pill, i) => (
              <motion.span className='wrapped-hero-pill' key={pill.text} {...popIn(0.4 + i * 0.08)}>
                <pill.icon size={15} /> {pill.text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className='wrapped-hero-side'>
          <motion.div className='wrapped-mini-card wrapped-mini-card-accent' {...slideFromRight(0.1)}>
            <p className='wrapped-mini-label'>🔥 Giorni passati a scriversi</p>
            <CountUp className='wrapped-mini-value' value={data.global.streak.maxStreak} />
            <p className='wrapped-mini-detail'>Giorni unici con almeno un messaggio</p>
          </motion.div>
          <motion.div className='wrapped-mini-card' {...slideFromRight(0.2)}>
            <p className='wrapped-mini-label'>💬 Avete fatto rumore con</p>
            <CountUp className='wrapped-mini-value' value={data.global.totalMessages} />
            <p className='wrapped-mini-detail'>{data.stickers.total.toLocaleString('it-IT')} sticker · {data.global.totalLoveWords} parole ad alta intensità</p>
          </motion.div>
          <motion.div className='wrapped-mini-card wrapped-mini-card-secondary' {...slideFromRight(0.3)}>
            <p className='wrapped-mini-label'>⚡ Pressione emotiva</p>
            <CountUp className='wrapped-mini-value' prefix={emotionalDelta >= 0 ? '+' : ''} value={emotionalDelta} />
            <p className='wrapped-mini-detail'>saldo tra parole positive e negative</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}