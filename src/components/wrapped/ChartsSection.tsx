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
import { DAY_LABELS, fadeUp, RADAR_LABELS } from './shared';

const tooltipStyle = {
  background: 'rgba(3,3,3,0.92)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 16,
};

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
                const alpha = 0.08 + (cell.intensity / maxIntensity) * 0.92;
                const background = cell.count > 0
                  ? `linear-gradient(135deg, rgba(180,255,0,${alpha}), rgba(189,0,255,${alpha * 0.9}))`
                  : 'rgba(255,255,255,0.02)';

                return (
                  <div
                    className='wrapped-heatmap-cell'
                    key={`${dayLabel}-${cell.hour}`}
                    style={{ background }}
                    title={`${dayLabel} ${cell.hour}:00 - ${cell.count} messaggi`}
                  />
                );
              })}
          </Fragment>
        ))}
      </div>
      <div className='wrapped-heatmap-legend'>
        <span>Calmo</span>
        <div className='wrapped-heatmap-scale'>
          <span style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span style={{ background: 'rgba(180,255,0,0.32)' }} />
          <span style={{ background: 'rgba(180,255,0,0.7)' }} />
          <span style={{ background: 'rgba(189,0,255,0.8)' }} />
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
      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp()}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Sulle montagne russe' title='Sulle montagne russe' description='' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <LineChart data={lineData} margin={{ top: 8, right: 8, left: -14, bottom: 8 }}>
                <CartesianGrid stroke='rgba(255,255,255,0.07)' vertical={false} />
                <XAxis dataKey='date' minTickGap={28} stroke='#8b8b95' tick={{ fill: '#8b8b95', fontSize: 12 }} />
                <YAxis stroke='#8b8b95' tick={{ fill: '#8b8b95', fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(180,255,0,0.35)', strokeWidth: 1 }} />
                <Line activeDot={{ r: 4, fill: '#bd00ff' }} dataKey='messages' dot={false} stroke='#b4ff00' strokeWidth={3} type='monotone' />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp(0.03)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Mood mensile' title='Mood mensile' description='' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <BarChart data={sentimentData} margin={{ top: 8, right: 8, left: -14, bottom: 8 }}>
                <CartesianGrid stroke='rgba(255,255,255,0.07)' vertical={false} />
                <XAxis dataKey='month' stroke='#8b8b95' tick={{ fill: '#8b8b95', fontSize: 12 }} />
                <YAxis stroke='#8b8b95' tick={{ fill: '#8b8b95', fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey='positive' fill='#b4ff00' radius={[8, 8, 0, 0]} />
                <Bar dataKey='negative' fill='#ff4d7a' radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp(0.06)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Il radar' title='Il radar' description='' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <RadarChart data={radarData} outerRadius='72%'>
                <PolarGrid stroke='rgba(255,255,255,0.14)' />
                <PolarAngleAxis dataKey='metric' tick={{ fill: '#d4d5dd', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} axisLine={false} domain={[0, 100]} tick={false} />
                <Radar dataKey={userOne.name} fill='#b4ff00' fillOpacity={0.28} name={userOne.name} stroke='#b4ff00' />
                <Radar dataKey={userTwo.name} fill='#bd00ff' fillOpacity={0.22} name={userTwo.name} stroke='#bd00ff' />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp(0.09)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Ora per ora' title='Ora per ora' description='' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <AreaChart data={hourlyWaveData} margin={{ top: 8, right: 8, left: -14, bottom: 8 }}>
                <defs>
                  <linearGradient id='hourlyWaveFill' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor='#00d1ff' stopOpacity={0.55} />
                    <stop offset='100%' stopColor='#00d1ff' stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke='rgba(255,255,255,0.07)' vertical={false} />
                <XAxis dataKey='hour' stroke='#8b8b95' tick={{ fill: '#8b8b95', fontSize: 12 }} />
                <YAxis stroke='#8b8b95' tick={{ fill: '#8b8b95', fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(0,209,255,0.35)', strokeWidth: 1 }} />
                <Area dataKey='messages' fill='url(#hourlyWaveFill)' stroke='#00d1ff' strokeWidth={3} type='monotone' />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide' {...fadeUp(0.12)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='La costanza' title='La costanza' description='' />
          <HeatmapGrid cells={data.global.heatmap} />
        </div>
      </motion.article>
    </section>
  );
}