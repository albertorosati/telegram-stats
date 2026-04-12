'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, MessageSquare, Sticker, Swords, TrendingUp } from 'lucide-react';
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

type WrappedTab = 'summary' | 'challenges' | 'timeline' | 'language' | 'stickers';

const TABS: Array<{ id: WrappedTab; label: string; icon: LucideIcon }> = [
  { id: 'summary', label: 'Riassunto', icon: LayoutDashboard },
  { id: 'challenges', label: 'Le Sfide', icon: Swords },
  { id: 'timeline', label: "L'Andamento", icon: TrendingUp },
  { id: 'language', label: 'Il Linguaggio', icon: MessageSquare },
  { id: 'stickers', label: 'Stickers', icon: Sticker },
];

export function WrappedDashboard({ data }: { data: WrappedData }) {
  const [activeTab, setActiveTab] = useState<WrappedTab>('summary');
  const headlineStats = useMemo(() => buildHeadlineStats(data), [data]);
  const insightCards = useMemo(() => buildInsightCards(data), [data]);
  const exportContainerRef = useRef<HTMLDivElement>(null);

  // Callback passed to ExportButton — returns the hidden export container
  const getExportContainer = useCallback(() => exportContainerRef.current, []);

  // Mouse-tracking ambient glow
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  function renderTabContent() {
    if (activeTab === 'summary') {
      return (
        <>
          <HeroSection data={data} />
          <OverviewSection headlineStats={headlineStats} insightCards={insightCards} />
          <MediaChaosSection data={data} />
          <ShareCard data={data} />
        </>
      );
    }

    if (activeTab === 'challenges') {
      return <AwardsSection data={data} />;
    }

    if (activeTab === 'timeline') {
      return (
        <>
          <ChartsSection data={data} />
          <TimelineSection data={data} />
        </>
      );
    }

    if (activeTab === 'language') {
      return <CultureSection data={data} />;
    }

    return <StickerSection data={data} />;
  }

  return (
    <div className='wrapped-shell'>
      <style dangerouslySetInnerHTML={{ __html: WRAPPED_DASHBOARD_STYLES }} />
      <div className='wrapped-page wrapped-stack'>

        <section className='wrapped-tab-nav'>
          <div className='wrapped-tab-bar'>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
              <button
                className={`wrapped-tab-btn${activeTab === tab.id ? ' is-active' : ''}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type='button'
              >
                <span className='wrapped-tab-btn-icon'><Icon size={16} /></span>
                {tab.label}
              </button>
              );
            })}
          </div>
          <div className='wrapped-action-row'>
            <ExportButton data={data} getExportContainer={getExportContainer} />
          </div>
        </section>


        <AnimatePresence mode='wait'>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='wrapped-tab-content'
            initial={{ opacity: 0, y: 14 }}
            key={activeTab}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Hidden export snapshot: all tabs rendered simultaneously ── */}
      <div
        ref={exportContainerRef}
        aria-hidden='true'
        style={{ position: 'fixed', left: '-200vw', top: 0, width: '1200px', pointerEvents: 'none', opacity: 0 }}
      >
        <div className='wrapped-shell'>
          <div className='wrapped-page wrapped-stack'>
            <section className='wrapped-tab-nav'>
              <div className='wrapped-tab-bar'>
                {TABS.map((tab, i) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      className={`wrapped-tab-btn${i === 0 ? ' is-active' : ''}`}
                      data-tab={tab.id}
                      key={tab.id}
                      type='button'
                    >
                      <span className='wrapped-tab-btn-icon'><Icon size={16} /></span>
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <div className='wrapped-tab-content'>
              <div data-export-tab='summary'>
                <HeroSection data={data} />
                <OverviewSection headlineStats={headlineStats} insightCards={insightCards} />
                <MediaChaosSection data={data} />
              </div>
              <div data-export-tab='challenges'>
                <AwardsSection data={data} />
              </div>
              <div data-export-tab='timeline'>
                <ChartsSection data={data} />
                <TimelineSection data={data} />
              </div>
              <div data-export-tab='language'>
                <CultureSection data={data} />
              </div>
              <div data-export-tab='stickers'>
                <StickerSection data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}