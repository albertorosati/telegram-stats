'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Globe } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { SectionHeading } from './SectionHeading';
import { popIn, USER_COLORS } from './shared';

function WordCloud({ words }: { words: WrappedData['global']['topWords'] }) {
  const maxCount = words[0]?.count ?? 1;
  return (
    <div className='wrapped-word-cloud'>
      {words.map((entry, index) => {
        const ratio = entry.count / maxCount;
        const hue = index % 3 === 0 ? 'rgba(42,171,238,' : index % 3 === 1 ? 'rgba(46,230,166,' : 'rgba(100,210,255,';
        const opacity = Math.min(0.95, 0.35 + ratio * 0.6);
        const fontSize = `${1 + ratio * 4.8}rem`;
        const rotate = (index % 5) * 4 - 8;
        const y = (index % 3) * 4 - 4;

        return (
          <motion.span
            className='wrapped-word'
            key={entry.word}
            style={{
              fontSize,
              color: `${hue}${opacity})`,
              opacity,
              transform: `translateY(${y}px) rotate(${rotate}deg)`,
              textShadow: index % 3 === 0
                ? '0 0 18px rgba(42,171,238,0.16)'
                : index % 3 === 1
                  ? '0 0 18px rgba(46,230,166,0.14)'
                  : '0 0 18px rgba(100,210,255,0.14)',
            }}
            {...popIn(index * 0.02)}
            whileHover={{ scale: 1.2 }}
          >
            {entry.word}
          </motion.span>
        );
      })}
    </div>
  );
}

interface CultureSectionProps {
  data: WrappedData;
}

export function CultureSection({ data }: CultureSectionProps) {
  const peakHour = [...data.global.hourlyWave].sort((left, right) => right.count - left.count)[0];
  const totalLinks = data.users.reduce((sum, user) => sum + user.linksShared, 0);
  const weekendAlignment = 100 - Math.abs(data.users[0].weekendPercentage - data.users[1].weekendPercentage);

  return (
    <section className='wrapped-stack'>
      <section className='wrapped-panel wrapped-scene'>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Le vostre parole' title='Il DNA della conversazione' description='Qui resta il lessico complessivo della chat. Il viaggio mese per mese vive dentro La Storia.' />
          <WordCloud words={data.global.topWords.slice(0, 36)} />
        </div>
      </section>

      <section className='wrapped-panel wrapped-scene'>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='I dettagli' title='I numeri dietro il vocabolario' description='' />

          <div className='culture-kpi-grid'>
            {[
              { icon: Clock, label: 'Ora di picco', value: `${String(peakHour?.hour ?? 0).padStart(2, '0')}:00`, sub: `${peakHour?.count ?? 0} messaggi`, color: '#2AABEE' },
              { icon: Globe, label: 'Link lanciati', value: String(totalLinks), sub: 'nell\'intero archivio', color: '#2EE6A6' },
              { icon: BookOpen, label: 'Sincronia weekend', value: `${weekendAlignment}%`, sub: 'allineamento fra entrambi', color: '#64D2FF' },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  className='culture-kpi-card'
                  key={kpi.label}
                  style={{ '--culture-accent': kpi.color } as React.CSSProperties}
                  {...popIn(i * 0.1)}
                  whileHover={{ y: -3 }}
                >
                  <Icon size={20} className='culture-kpi-icon' />
                  <span className='wrapped-stat-label'>{kpi.label}</span>
                  <span className='wrapped-stat-value'>{kpi.value}</span>
                  <span className='wrapped-stat-subvalue'>{kpi.sub}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}