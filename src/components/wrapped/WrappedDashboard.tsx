'use client';

import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LayoutDashboard, MessageSquare, Sticker, Swords, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { WrappedData } from '../../lib/analytics/types';
import { WRAPPED_DASHBOARD_STYLES } from '../../lib/exporter';
import { ChartsSection } from './ChartsSection';
import { CultureSection } from './CultureSection';
import { AwardsSection } from './AwardsSection';
import { ExportButton } from './ExportButton';
import { HeroSection } from './HeroSection';
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

  function renderTabContent() {
    if (activeTab === 'summary') {
      return (
        <>
          <HeroSection data={data} />
          <OverviewSection headlineStats={headlineStats} insightCards={insightCards} />
          <MediaChaosSection data={data} />
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
            <ExportButton data={data} />
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
    </div>
  );
}