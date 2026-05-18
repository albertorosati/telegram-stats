'use client';

import { Fragment, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { HeatmapCell, WrappedData } from '../../lib/analytics/types';
import { SectionHeading } from './SectionHeading';
import { DAY_LABELS, fadeUp, popIn, slideFromLeft, slideFromRight, RADAR_LABELS } from './shared';

const tooltipStyle: React.CSSProperties = {
  background: 'rgba(3,3,3,0.96)',
  border: '2px solid rgba(180,255,0,0.4)',
  borderRadius: 14,
  boxShadow: '0 8px 32px rgba(180,255,0,0.12), 0 2px 8px rgba(0,0,0,0.4)',
  padding: '12px 16px',
};

const axisTickStyle = { fill: '#a0a0b0', fontSize: 12, fontWeight: 500 };
const gridStroke = 'rgba(255,255,255,0.04)';

function heatmapColor(ratio: number): string {
  if (ratio === 0) return 'rgba(255,255,255,0.025)';
  if (ratio < 0.25) return `rgba(0,60,130,${0.3 + ratio * 1.6})`;
  if (ratio < 0.5) return `rgba(180,255,0,${0.15 + (ratio - 0.25) * 2.4})`;
  if (ratio < 0.75) return `rgba(180,255,0,${0.75 + (ratio - 0.5) * 0.6})`;
  return `rgba(255,255,255,${0.7 + (ratio - 0.75) * 1.2})`;
}

function HeatmapGrid({ cells }: { cells: HeatmapCell[] }) {
  const maxIntensity = cells.reduce((max, cell) => Math.max(max, cell.intensity), 0) || 1;

  return (
    <div className='wrapped-heatmap'>
      <div className='wrapped-heatmap-grid'>
        <div />
        {Array.from({ length: 24 }, (_, hour) => (
          <div className='wrapped-heatmap-hour' key={`hour-${hour}`}>
            {hour}
          </div>
        ))}
        {DAY_LABELS.map((dayLabel, dayIndex) => (
          <Fragment key={dayLabel}>
            <div className='wrapped-heatmap-day'>{dayLabel}</div>
            {cells
              .filter((cell) => cell.day === dayIndex)
              .sort((left, right) => left.hour - right.hour)
              .map((cell) => {
                const ratio = cell.intensity / maxIntensity;
                const background = heatmapColor(ratio);

                return (
                  <div
                    className='wrapped-heatmap-cell'
                    key={`${dayLabel}-${cell.hour}`}
                    style={{ background }}
                    title={`${dayLabel} ${cell.hour}:00 — ${cell.count} messaggi`}
                  />
                );
              })}
          </Fragment>
        ))}
      </div>
      <div className='wrapped-heatmap-legend'>
        <span>Calmo</span>
        <div className='wrapped-heatmap-scale'>
          <span style={{ background: 'rgba(255,255,255,0.03)' }} />
          <span style={{ background: 'rgba(0,60,130,0.6)' }} />
          <span style={{ background: 'rgba(180,255,0,0.55)' }} />
          <span style={{ background: 'rgba(180,255,0,0.85)' }} />
          <span style={{ background: 'rgba(255,255,255,0.9)' }} />
        </div>
        <span>Picco</span>
      </div>
    </div>
  );
}

interface ChartsSectionProps {
  data: WrappedData;
}

export function ChartsSection({ data }: ChartsSectionProps) {
  const [userOne, userTwo] = data.users;

  const lineData = useMemo(
    () => data.global.dailyVolume.map((point) => ({ date: point.date.slice(5), messages: point.count })),
    [data.global.dailyVolume],
  );

  const sentimentData = useMemo(
    () => data.global.monthlySentiment.map((entry) => ({
      month: entry.label,
      positive: entry.pos,
      negative: -entry.neg,
    })),
    [data.global.monthlySentiment],
  );

  const radarData = useMemo(
    () => RADAR_LABELS.map((label, index) => ({
      metric: label,
      [userOne.name]: userOne.radarStats[index],
      [userTwo.name]: userTwo.radarStats[index],
    })),
    [userOne, userTwo],
  );

  const hourlyWaveData = useMemo(
    () => data.global.hourlyWave.map((entry) => ({ hour: `${entry.hour}`.padStart(2, '0'), messages: entry.count })),
    [data.global.hourlyWave],
  );

  return (
    <section className='wrapped-stack'>
      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp(0)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Volume giornaliero' title='Sulle montagne russe' description='Il polso quotidiano della vostra conversazione.' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <LineChart data={lineData} margin={{ top: 12, right: 12, left: -10, bottom: 8 }}>
                <defs>
                  <filter id='glowLine'>
                    <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='3' />
                    <feMerge>
                      <feMergeNode in='blur' />
                      <feMergeNode in='SourceGraphic' />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid stroke={gridStroke} vertical={false} />
                <XAxis dataKey='date' minTickGap={28} stroke='transparent' tick={axisTickStyle} />
                <YAxis stroke='transparent' tick={axisTickStyle} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(180,255,0,0.25)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Line
                  activeDot={{ r: 6, fill: '#b4ff00', stroke: '#030303', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(180,255,0,0.6))' }}
                  dataKey='messages'
                  dot={false}
                  filter='url(#glowLine)'
                  stroke='#b4ff00'
                  strokeWidth={2.5}
                  type='monotone'
                  isAnimationActive
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp(0.08)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Sentimento' title='Mood mensile' description='Come oscilla il tono emotivo mese per mese.' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <BarChart data={sentimentData} margin={{ top: 12, right: 12, left: -10, bottom: 8 }}>
                <defs>
                  <linearGradient id='barGradientPos' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor='#b4ff00' stopOpacity={1} />
                    <stop offset='100%' stopColor='#b4ff00' stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id='barGradientNeg' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor='#ff4d7a' stopOpacity={0.7} />
                    <stop offset='100%' stopColor='#ff4d7a' stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={gridStroke} vertical={false} />
                <XAxis dataKey='month' stroke='transparent' tick={axisTickStyle} />
                <YAxis stroke='transparent' tick={axisTickStyle} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey='positive' fill='url(#barGradientPos)' radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1200} />
                <Bar dataKey='negative' fill='url(#barGradientNeg)' radius={[0, 0, 6, 6]} isAnimationActive animationDuration={1200} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...popIn(0.05)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Personalità' title='Il radar' description='Cinque dimensioni a confronto.' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <RadarChart data={radarData} outerRadius='72%'>
                <defs>
                  <filter id='glowRadar1'>
                    <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='2' />
                    <feMerge><feMergeNode in='blur' /><feMergeNode in='SourceGraphic' /></feMerge>
                  </filter>
                  <filter id='glowRadar2'>
                    <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='2' />
                    <feMerge><feMergeNode in='blur' /><feMergeNode in='SourceGraphic' /></feMerge>
                  </filter>
                </defs>
                <PolarGrid stroke='rgba(255,255,255,0.08)' />
                <PolarAngleAxis dataKey='metric' tick={{ fill: '#d4d5dd', fontSize: 13, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} axisLine={false} domain={[0, 100]} tick={false} />
                <Radar dataKey={userOne.name} fill='#b4ff00' fillOpacity={0.35} name={userOne.name} stroke='#b4ff00' strokeWidth={2} filter='url(#glowRadar1)' />
                <Radar dataKey={userTwo.name} fill='#bd00ff' fillOpacity={0.28} name={userTwo.name} stroke='#bd00ff' strokeWidth={2} filter='url(#glowRadar2)' />
                <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '0.82rem', fontWeight: 600 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp(0.1)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Ritmo circadiano' title='Ora per ora' description='Quando siete più attivi durante la giornata.' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <AreaChart data={hourlyWaveData} margin={{ top: 12, right: 12, left: -10, bottom: 8 }}>
                <defs>
                  <linearGradient id='hourlyWaveFill' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor='#00d1ff' stopOpacity={0.7} />
                    <stop offset='100%' stopColor='#00d1ff' stopOpacity={0.05} />
                  </linearGradient>
                  <filter id='glowArea'>
                    <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='2.5' />
                    <feMerge><feMergeNode in='blur' /><feMergeNode in='SourceGraphic' /></feMerge>
                  </filter>
                </defs>
                <CartesianGrid stroke={gridStroke} vertical={false} />
                <XAxis dataKey='hour' stroke='transparent' tick={axisTickStyle} />
                <YAxis stroke='transparent' tick={axisTickStyle} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(0,209,255,0.25)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                  dataKey='messages'
                  fill='url(#hourlyWaveFill)'
                  stroke='#00d1ff'
                  strokeWidth={2.5}
                  type='monotone'
                  filter='url(#glowArea)'
                  isAnimationActive
                  animationDuration={1500}
                  dot={false}
                  activeDot={{ r: 5, fill: '#00d1ff', stroke: '#030303', strokeWidth: 2, filter: 'drop-shadow(0 0 6px rgba(0,209,255,0.6))' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp(0.12)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Heatmap' title='La costanza' description='Ogni cella è un&apos;ora della settimana. Più è luminosa, più avete scritto.' />
          <HeatmapGrid cells={data.global.heatmap} />
        </div>
      </motion.article>
    </section>
  );
}