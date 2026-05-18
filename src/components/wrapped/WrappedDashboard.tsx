'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Sticker, Swords, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { WRAPPED_DASHBOARD_STYLES } from '../../lib/exporter';
import { ChartsSection } from './ChartsSection';
import { CultureSection } from './CultureSection';
import { AwardsSection } from './AwardsSection';
import { ExportButton } from './ExportButton';
import { HeroSection } from './HeroSection';
import { ShareCard } from './ShareCard';
import { MediaChaosSection } from './MediaChaosSection';
import { OverviewSection } from './OverviewSection';
import { StickerSection } from './StickerSection';
import { TimelineSection } from './TimelineSection';
import { buildHeadlineStats, buildInsightCards } from './shared';

type WrappedTab = 'challenges' | 'timeline' | 'language' | 'stickers';

const TABS: Array<{ id: WrappedTab; label: string; icon: LucideIcon }> = [
  { id: 'timeline', label: 'La Storia', icon: TrendingUp },
  { id: 'challenges', label: 'Le Sfide', icon: Swords },
  { id: 'language', label: 'Il Linguaggio', icon: MessageSquare },
  { id: 'stickers', label: 'Stickers', icon: Sticker },
];

const TAB_TONES: Record<WrappedTab, string> = {
  timeline: 'Apertura, numeri chiave e viaggio mese per mese della vostra chat.',
  challenges: 'Le rivalita, i record e le piccole vittorie private.',
  language: 'Le parole che avete reso vostre e i rituali del lessico.',
  stickers: 'Il museo visuale del vostro caos condiviso.',
};

export function WrappedDashboard({ data }: { data: WrappedData }) {
  const [activeTab, setActiveTab] = useState<WrappedTab>('timeline');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headlineStats = useMemo(() => buildHeadlineStats(data), [data]);
  const insightCards = useMemo(() => buildInsightCards(data), [data]);
  const exportContainerRef = useRef<HTMLDivElement>(null);
  const activeTabMeta = useMemo(() => TABS.find((tab) => tab.id === activeTab) ?? TABS[0], [activeTab]);

  // Callback passed to ExportButton — returns the hidden export container
  const getExportContainer = useCallback(() => exportContainerRef.current, []);

  // Removed mouse-tracking ambient glow (contemporary design: static gradient)

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const shouldShow = currentY < 48 || currentY <= lastY;
      setIsHeaderVisible(shouldShow);
      lastY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function renderTabContent() {
    if (activeTab === 'timeline') {
      return (
        <>
          <HeroSection data={data} />
          <OverviewSection headlineStats={headlineStats} insightCards={insightCards} />
          <TimelineSection data={data} />
          <ChartsSection data={data} />
          <MediaChaosSection data={data} />
          <ShareCard data={data} />
        </>
      );
    }

    if (activeTab === 'challenges') {
      return <AwardsSection data={data} />;
    }

    if (activeTab === 'language') {
      return <CultureSection data={data} />;
    }

    return <StickerSection data={data} />;
  }

  return (
    <div className='wrapped-shell'>
      <style dangerouslySetInnerHTML={{ __html: WRAPPED_DASHBOARD_STYLES }} />
      <div className='wrapped-page wrapped-story-stage'>
        <section className={`wrapped-story-header${isHeaderVisible ? ' is-visible' : ' is-hidden'}`}>
          <div className='wrapped-story-header-copy'>
            <p className='wrapped-story-overline'>{data.chatName}</p>
            <h2 className='wrapped-story-title'>{activeTabMeta.label}</h2>
            <p className='wrapped-story-subtitle'>{TAB_TONES[activeTab]}</p>
          </div>

          <div className='wrapped-story-toolbar'>
            <nav className='wrapped-story-nav' aria-label='Sezioni'>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  aria-pressed={activeTab === tab.id}
                  className={`wrapped-tab-btn${activeTab === tab.id ? ' is-active' : ''}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type='button'
                >
                  <span className='wrapped-tab-btn-icon'><Icon size={16} /></span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
            </nav>
            <div className='wrapped-action-row'>
              <ExportButton data={data} getExportContainer={getExportContainer} />
            </div>
          </div>
        </section>

        <main className='wrapped-dashboard-main'>
          <AnimatePresence mode='wait'>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className='wrapped-tab-content'
              initial={{ opacity: 0, y: 14 }}
              exit={{ opacity: 0, y: -8 }}
              key={activeTab}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Hidden export snapshot: all tabs rendered simultaneously ── */}
      <div
        ref={exportContainerRef}
        aria-hidden='true'
        style={{ position: 'fixed', left: '-200vw', top: 0, width: '1200px', pointerEvents: 'none', opacity: 0 }}
      >
        <div className='wrapped-shell'>
          <div className='wrapped-page wrapped-story-stage wrapped-export-stage'>
            <section className='wrapped-story-header wrapped-story-header-static'>
              <div className='wrapped-story-header-copy'>
                <p className='wrapped-story-overline'>{data.chatName}</p>
                <h2 className='wrapped-story-title'>La vostra storia completa</h2>
                <p className='wrapped-story-subtitle'>Apertura, numeri chiave e capitoli mese per mese della conversazione.</p>
              </div>
              <nav className='wrapped-story-nav' aria-label='Sezioni esportate'>
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      className={`wrapped-tab-btn${tab.id === 'timeline' ? ' is-active' : ''}`}
                      data-tab={tab.id}
                      key={tab.id}
                      type='button'
                    >
                      <span className='wrapped-tab-btn-icon'><Icon size={16} /></span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </section>

            <main className='wrapped-dashboard-main wrapped-export-main'>
              <div className='wrapped-tab-content wrapped-export-stack'>
              <div data-export-tab='timeline'>
                <HeroSection data={data} />
                <OverviewSection headlineStats={headlineStats} insightCards={insightCards} />
                <TimelineSection data={data} disableLazy />
                <ChartsSection data={data} />
                <MediaChaosSection data={data} />
                <ShareCard data={data} />
              </div>
              <div data-export-tab='challenges'>
                <AwardsSection data={data} />
              </div>
              <div data-export-tab='language'>
                <CultureSection data={data} />
              </div>
              <div data-export-tab='stickers'>
                <StickerSection data={data} />
              </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}