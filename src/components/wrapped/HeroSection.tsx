'use client';

import { motion } from 'framer-motion';
import { Flame, HeartHandshake, Sparkles, Stars } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { fadeUp } from './shared';

interface HeroSectionProps {
  data: WrappedData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const activeDays = Math.max(data.global.dailyVolume.length, 1);
  const stickerPerDay = data.stickers.total / activeDays;
  const emotionalDelta = data.users.reduce((sum, user) => sum + user.positivity, 0) - data.users.reduce((sum, user) => sum + user.negativity, 0);
  const topChatMood = data.global.totalLoveWords >= (data.users[0].negativity + data.users[1].negativity) ? 'energia positiva fuori controllo' : 'caos creativo dominante';

  return (
    <motion.section className='wrapped-panel wrapped-hero' initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
      <div className='wrapped-hero-grid'>
        <div>
          <p className='wrapped-kicker'>Il recap della chat</p>
          <h1 className='wrapped-title'>
            <span className='wrapped-title-user-a'>{data.users[0].name}</span>
            <span className='wrapped-title-plus'> + </span>
            <span className='wrapped-title-user-b'>{data.users[1].name}</span>
            <br />
            Wrapped
          </h1>
          <p className='wrapped-subtitle'>
            Questa chat e un piccolo universo fatto di testo, sticker, audio, caos e rituali notturni. Qui sotto non ci sono solo numeri: c&apos;e una storia visiva da scorrere, assorbire e riguardare.
          </p>
          <div className='wrapped-hero-pill-row'>
            <span className='wrapped-hero-pill'><HeartHandshake size={15} /> {data.users[0].name} + {data.users[1].name}</span>
            <span className='wrapped-hero-pill'><Flame size={15} /> {activeDays.toLocaleString('it-IT')} giorni attivi</span>
            <span className='wrapped-hero-pill'><Sparkles size={15} /> {stickerPerDay.toLocaleString('it-IT', { maximumFractionDigits: 1 })} sticker al giorno</span>
            <span className='wrapped-hero-pill'><Stars size={15} /> {topChatMood}</span>
          </div>
        </div>

        <div className='wrapped-hero-side'>
          <motion.div className='wrapped-mini-card wrapped-mini-card-accent' {...fadeUp(0.08)}>
            <p className='wrapped-mini-label'>🔥 Giorni passati a scriversi</p>
            <CountUp className='wrapped-mini-value' value={data.global.streak.maxStreak} />
            <p className='wrapped-mini-detail'>Giorni unici con almeno un messaggio</p>
          </motion.div>
          <motion.div className='wrapped-mini-card' {...fadeUp(0.14)}>
            <p className='wrapped-mini-label'>💬 Avete fatto rumore con</p>
            <CountUp className='wrapped-mini-value' value={data.global.totalMessages} />
            <p className='wrapped-mini-detail'>{data.stickers.total.toLocaleString('it-IT')} sticker · {data.global.totalLoveWords} parole ad alta intensita</p>
          </motion.div>
          <motion.div className='wrapped-mini-card wrapped-mini-card-secondary' {...fadeUp(0.2)}>
            <p className='wrapped-mini-label'>⚡ Pressione emotiva</p>
            <CountUp className='wrapped-mini-value' prefix={emotionalDelta >= 0 ? '+' : ''} value={emotionalDelta} />
            <p className='wrapped-mini-detail'>saldo tra parole positive e negative</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}