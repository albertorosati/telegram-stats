'use client';

import { motion } from 'framer-motion';

/**
 * Lightweight skeleton placeholder for a month card in the timeline.
 * Rendered when the card is outside the viewport — prevents DOM bloat
 * while maintaining layout stability (fixed height, no CLS).
 */
export function MonthCardSkeleton() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        minHeight: 320,
        background: 'rgba(17, 17, 17, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Pulsing neon border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: '1px solid rgba(180, 255, 0, 0.08)',
          boxShadow: '0 0 20px rgba(180, 255, 0, 0.03)',
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Skeleton content lines */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div
          className="h-6 w-1/3 rounded"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
        />
        {/* Subtitle skeleton */}
        <div
          className="h-4 w-1/2 rounded"
          style={{ background: 'rgba(255, 255, 255, 0.03)' }}
        />
        {/* Stats row skeleton */}
        <div className="flex gap-4 mt-6">
          <div
            className="h-16 w-20 rounded-lg"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          />
          <div
            className="h-16 w-20 rounded-lg"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          />
          <div
            className="h-16 w-20 rounded-lg"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          />
        </div>
        {/* Bar skeleton */}
        <div
          className="h-3 w-full rounded mt-4"
          style={{ background: 'rgba(255, 255, 255, 0.03)' }}
        />
        {/* Text lines skeleton */}
        <div className="space-y-2 mt-4">
          <div
            className="h-3 w-4/5 rounded"
            style={{ background: 'rgba(255, 255, 255, 0.02)' }}
          />
          <div
            className="h-3 w-3/5 rounded"
            style={{ background: 'rgba(255, 255, 255, 0.02)' }}
          />
        </div>
      </div>
    </div>
  );
}
