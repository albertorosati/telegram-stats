'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, BarChart3, Download, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  { icon: Lock, title: '100% Privato', desc: 'I tuoi dati restano nel browser. Zero server.', accent: '#b4ff00' },
  { icon: BarChart3, title: 'Statistiche Deep', desc: 'Heatmap, radar, timeline, sentiment e molto altro.', accent: '#bd00ff' },
  { icon: Download, title: 'Esporta in HTML', desc: 'Un file autonomo da condividere con chiunque.', accent: '#00d1ff' },
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
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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