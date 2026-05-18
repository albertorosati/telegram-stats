'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, BarChart3, Download, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  { icon: Lock, title: '100% Privato', desc: 'I tuoi dati restano nel browser. Zero server.', accent: '#2AABEE' },
  { icon: BarChart3, title: 'Statistiche Deep', desc: 'Heatmap, radar, timeline, sentiment e molto altro.', accent: '#2EE6A6' },
  { icon: Download, title: 'Esporta in HTML', desc: 'Un file autonomo da condividere con chiunque.', accent: '#64D2FF' },
];

const previewStats = [
  { label: 'giorni attivi', value: '312', detail: 'la chat torna quasi ogni giorno' },
  { label: 'sticker', value: '1.284', detail: 'una lingua tutta vostra' },
  { label: 'vocali', value: '18h 42m', detail: 'tempo lasciato in voce' },
];

export default function HomePage() {
  return (
    <main className='home-shell'>
      <div className='home-content'>
        <motion.div
          className='home-badge'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Sparkles size={13} /> Open Source · Client-Side · Nessun tracciamento
        </motion.div>

        <motion.h1
          className='home-title'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
        >
          <span className='home-title-gradient'>Telegram</span> Wrapped
        </motion.h1>

        <motion.p
          className='home-copy'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Carica il tuo archivio Telegram e scopri statistiche, pattern e curiosità nascoste nella tua chat. Come Spotify Wrapped, ma per le tue conversazioni.
        </motion.p>

        <motion.div
          className='home-actions'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link className='home-link home-link-primary' href='/wrapped'>
            Inizia ora <ArrowRight size={18} />
          </Link>
        </motion.div>

        <motion.section
          className='home-story-preview'
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42 }}
        >
          <div className='home-story-preview-copy'>
            <p className='home-story-preview-kicker'>Anteprima del racconto</p>
            <h2 className='home-story-preview-title'>La prima scena del wrapped entra subito nel vivo.</h2>
            <p className='home-story-preview-desc'>Non apre con una dashboard: apre con ritmo, presenza e numeri che fanno capire subito che tipo di storia c&apos;è dentro la chat.</p>
            <div className='home-story-preview-stats'>
              {previewStats.map((item) => (
                <div className='home-story-preview-stat' key={item.label}>
                  <span className='home-story-preview-stat-label'>{item.label}</span>
                  <strong className='home-story-preview-stat-value'>{item.value}</strong>
                  <span className='home-story-preview-stat-detail'>{item.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='home-story-preview-orbit'>
            <span className='home-story-preview-ring home-story-preview-ring-a' />
            <span className='home-story-preview-ring home-story-preview-ring-b' />
            <div className='home-story-preview-core'>
              <span className='home-story-preview-core-label'>messaggi</span>
              <strong className='home-story-preview-core-value'>124.532</strong>
            </div>
            <div className='home-story-preview-chip home-story-preview-chip-a'>
              <span>giorno top</span>
              <strong>12 Mar · 418</strong>
            </div>
            <div className='home-story-preview-chip home-story-preview-chip-b'>
              <span>attivita notturna</span>
              <strong>61%</strong>
            </div>
            <div className='home-story-preview-chip home-story-preview-chip-c'>
              <span>durata vocali</span>
              <strong>18h 42m</strong>
            </div>
          </div>
        </motion.section>

        <motion.div
          className='home-features'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {features.map((f) => (
            <div className='home-feature' key={f.title} style={{ '--feature-accent': f.accent } as React.CSSProperties}>
              <div className='home-feature-icon'><f.icon size={22} /></div>
              <h3 className='home-feature-title'>{f.title}</h3>
              <p className='home-feature-desc'>{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}