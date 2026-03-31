'use client';

import { motion } from 'framer-motion';

import type { UserStats } from '../../lib/analytics/types';
import { CountUp } from './CountUp';
import { SectionHeading } from './SectionHeading';
import { fadeUp } from './shared';

interface UserBattleSectionProps {
  users: readonly UserStats[];
  activeUser: string;
  userColors: readonly string[];
}

function UserCard({ user, accent, muted }: { user: UserStats; accent: string; muted: boolean }) {
  const positivityBalance = user.positivity - user.negativity;

  return (
    <motion.article className={`wrapped-user-card${muted ? ' is-muted' : ''}`} style={{ borderColor: `${accent}33` }} {...fadeUp()} whileHover={{ y: -6 }}>
      <div className='wrapped-user-head'>
        <div>
          <h3 className='wrapped-user-name'>{user.name}</h3>
          <p className='wrapped-subtitle' style={{ marginTop: 8 }}>
            {user.wordCount.toLocaleString('it-IT')} parole, {user.vocabularySize.toLocaleString('it-IT')} termini unici, {user.lexicalRichness}% ricchezza lessicale.
          </p>
        </div>
        <span className='wrapped-chip'>
          <span className='wrapped-dot' style={{ background: accent }} />
          Sotto i riflettori
        </span>
      </div>

      <div className='wrapped-user-metrics'>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Messaggi</span>
          <CountUp className='wrapped-stat-value' value={user.msgCount} />
          <span className='wrapped-stat-subvalue'>{user.avgWordsPerMsg} parole per msg</span>
        </div>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Bilancio emotivo</span>
          <CountUp className='wrapped-stat-value' prefix={positivityBalance >= 0 ? '+' : ''} value={positivityBalance} />
          <span className='wrapped-stat-subvalue'>{user.positivity} pos · {user.negativity} neg</span>
        </div>
      </div>

      <div className='wrapped-user-media'>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Foto</span>
          <CountUp className='wrapped-stat-value' value={user.imagesSent} />
        </div>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Vocali</span>
          <CountUp className='wrapped-stat-value' value={user.voiceNotes} />
          <span className='wrapped-stat-subvalue'>{user.avgResponseTimeLabel}</span>
        </div>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Iniziative</span>
          <CountUp className='wrapped-stat-value' value={user.initiations} />
          <span className='wrapped-stat-subvalue'>{user.doubleTexts} rincorse</span>
        </div>
      </div>

      <div className='wrapped-user-behavior'>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Quota weekend</span>
          <span className='wrapped-stat-subvalue'>{user.weekendPercentage}%</span>
        </div>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Quota notturna</span>
          <span className='wrapped-stat-subvalue'>{user.nightPercentage}%</span>
        </div>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Domande fatte</span>
          <span className='wrapped-stat-subvalue'>{user.questions}</span>
        </div>
        <div className='wrapped-stat-box'>
          <span className='wrapped-stat-label'>Indice tenerezza</span>
          <span className='wrapped-stat-subvalue'>{user.loveScore}</span>
        </div>
      </div>

      <div>
        <p className='wrapped-metric-label'>Parole distintive</p>
        <div className='wrapped-pill-row'>
          {user.topWords.slice(0, 6).map((entry) => (
            <span className='wrapped-pill' key={entry.word}>
              {entry.word} <strong>{entry.count}</strong>
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className='wrapped-metric-label'>Lingua emoji</p>
        <div className='wrapped-pill-row'>
          {user.topEmojis.length > 0
            ? user.topEmojis.slice(0, 5).map((entry) => (
                <span className='wrapped-pill' key={entry.emoji}>
                  {entry.emoji} <strong>{entry.count}</strong>
                </span>
              ))
            : <span className='wrapped-footnote'>Nessuna emoji rilevata</span>}
        </div>
      </div>

      <div>
        <p className='wrapped-metric-label'>Messaggio piu lungo</p>
        <p className='wrapped-long-copy'>“{user.longestMsg.text || 'Nessun papiro degno di nota.'}”</p>
        <p className='wrapped-footnote'>{user.longestMsg.date || 'N/D'}</p>
      </div>
    </motion.article>
  );
}

export function UserBattleSection({ users, activeUser, userColors }: UserBattleSectionProps) {
  return (
    <section className='wrapped-panel wrapped-scene'>
      <div className='wrapped-panel-inner'>
        <SectionHeading
          eyebrow='Ritratti'
          title='Due profili, due manie, zero diplomazia'
          description='Ogni persona ha il suo ritratto: velocità di risposta, intensità lessicale e tic emotivi separati in blocchi molto più leggibili.'
        />
        <div className='wrapped-users'>
          {users.map((user, index) => (
            <UserCard
              accent={userColors[index % userColors.length]}
              key={user.name}
              muted={activeUser !== 'all' && activeUser !== user.name}
              user={user}
            />
          ))}
        </div>
      </div>
    </section>
  );
}