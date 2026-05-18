'use client';

import { Fragment, useMemo, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
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
import { DAY_LABELS, fadeUp, popIn, RADAR_LABELS } from './shared';

const CHART_COLORS = {
  bg: 'rgba(7,17,26,0.96)',
  border: 'rgba(42,171,238,0.3)',
  axis: '#A9C2D4',
  grid: 'rgba(126,200,238,0.08)',
  blue: '#2AABEE',
  mint: '#2EE6A6',
  cyan: '#64D2FF',
  coral: '#FF6B4A',
};

const tooltipStyle: CSSProperties = {
  background: CHART_COLORS.bg,
  border: `1px solid ${CHART_COLORS.border}`,
  borderRadius: 14,
  boxShadow: '0 18px 60px rgba(0,13,24,0.42)',
  padding: '12px 16px',
};

const axisTickStyle = { fill: CHART_COLORS.axis, fontSize: 12, fontWeight: 500 };
const gridStroke = CHART_COLORS.grid;

function heatmapColor(ratio: number): string {
  if (ratio === 0) return 'rgba(126,200,238,0.045)';
  if (ratio < 0.25) return `rgba(42,171,238,${0.22 + ratio * 1.6})`;
  if (ratio < 0.5) return `rgba(100,210,255,${0.28 + (ratio - 0.25) * 2})`;
  if (ratio < 0.75) return `rgba(46,230,166,${0.48 + (ratio - 0.5) * 1.6})`;
  return `rgba(255,176,32,${0.62 + (ratio - 0.75) * 1.2})`;
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
          <span style={{ background: 'rgba(42,171,238,0.45)' }} />
          <span style={{ background: 'rgba(100,210,255,0.65)' }} />
          <span style={{ background: 'rgba(46,230,166,0.78)' }} />
          <span style={{ background: 'rgba(255,176,32,0.9)' }} />
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

  const emotionalClimate = useMemo(() => {
    const totalPositive = data.users.reduce((sum, user) => sum + user.positivity, 0);
    const totalNegative = data.users.reduce((sum, user) => sum + user.negativity, 0);
    const totalLove = data.global.totalLoveWords;
    const bands = [
      {
        label: 'Tenerezza',
        value: totalLove,
        detail: 'Parole che suonavano come vicinanza.',
        color: CHART_COLORS.mint,
      },
      {
        label: 'Luce',
        value: totalPositive,
        detail: 'Momenti in cui il tono si e fatto piu leggero.',
        color: CHART_COLORS.cyan,
      },
      {
        label: 'Attrito',
        value: totalNegative,
        detail: 'I passaggi in cui la chat si e fatta piu ruvida.',
        color: CHART_COLORS.coral,
      },
    ];
    const maxValue = Math.max(...bands.map((band) => band.value), 1);
    const narrative = totalLove + totalPositive >= totalNegative
      ? 'Guardata tutta insieme, questa conversazione lascia piu calore che attrito: anche quando accelera, tende a tornare verso la vicinanza.'
      : 'Guardata tutta insieme, questa conversazione porta addosso piu attrito che tregua, ma continua comunque a non lasciare andare il filo.';

    return { bands, maxValue, narrative };
  }, [data]);

  return (
    <section className='wrapped-chart-mosaic'>
      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide wrapped-chart-volume' {...fadeUp(0)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Il respiro dei giorni' title='I giorni che si alzano di voce' description='I picchi e i rientri del vostro ritmo quotidiano.' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <LineChart data={lineData} margin={{ top: 12, right: 12, left: -10, bottom: 8 }}>
                <CartesianGrid stroke={gridStroke} vertical={false} />
                <XAxis dataKey='date' minTickGap={28} stroke='transparent' tick={axisTickStyle} />
                <YAxis stroke='transparent' tick={axisTickStyle} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(42,171,238,0.35)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Line
                  activeDot={{ r: 6, fill: CHART_COLORS.blue, stroke: '#07111A', strokeWidth: 2 }}
                  dataKey='messages'
                  dot={false}
                  stroke={CHART_COLORS.blue}
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

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide wrapped-chart-sentiment' {...fadeUp(0.08)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Clima emotivo' title='Quello che vi siete lasciati addosso' description='Il viaggio mese per mese resta in La Storia; qui rimane il tono complessivo della conversazione.' />
          <div className='wrapped-emotion-climate'>
            <p className='wrapped-emotion-climate-copy'>{emotionalClimate.narrative}</p>
            <div className='wrapped-emotion-band-list'>
              {emotionalClimate.bands.map((band, index) => (
                <motion.div
                  className='wrapped-emotion-band'
                  key={band.label}
                  style={{
                    '--emotion-color': band.color,
                    '--emotion-width': `${Math.max((band.value / emotionalClimate.maxValue) * 100, band.value > 0 ? 8 : 0)}%`,
                  } as CSSProperties}
                  {...fadeUp(0.12 + index * 0.06)}
                >
                  <div className='wrapped-emotion-band-head'>
                    <span className='wrapped-emotion-band-label'>{band.label}</span>
                    <span className='wrapped-emotion-band-value'>{band.value.toLocaleString('it-IT')}</span>
                  </div>
                  <div className='wrapped-emotion-band-track'>
                    <span className='wrapped-emotion-band-fill' />
                  </div>
                  <p className='wrapped-emotion-band-detail'>{band.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide wrapped-chart-radar' {...popIn(0.05)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='La vostra forma' title='Come vi muovete insieme' description='Cinque modi diversi di stare dentro la conversazione.' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <RadarChart data={radarData} outerRadius='72%'>
                <PolarGrid stroke={CHART_COLORS.grid} />
                <PolarAngleAxis dataKey='metric' tick={{ fill: '#F7FBFF', fontSize: 13, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} axisLine={false} domain={[0, 100]} tick={false} />
                <Radar dataKey={userOne.name} fill={CHART_COLORS.blue} fillOpacity={0.26} name={userOne.name} stroke={CHART_COLORS.blue} strokeWidth={2} />
                <Radar dataKey={userTwo.name} fill={CHART_COLORS.mint} fillOpacity={0.22} name={userTwo.name} stroke={CHART_COLORS.mint} strokeWidth={2} />
                <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '0.82rem', fontWeight: 600 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide wrapped-chart-hourly' {...fadeUp(0.1)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Le ore che tornano' title='Quando vi ritrovate' description='Le fasce del giorno in cui la chat torna a riaccendersi.' />
          <div className='wrapped-chart-frame wrapped-chart-clip'>
            <ResponsiveContainer height='100%' width='100%'>
              <AreaChart data={hourlyWaveData} margin={{ top: 12, right: 12, left: -10, bottom: 8 }}>
                <defs>
                  <linearGradient id='hourlyWaveFill' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor={CHART_COLORS.cyan} stopOpacity={0.58} />
                    <stop offset='100%' stopColor={CHART_COLORS.cyan} stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={gridStroke} vertical={false} />
                <XAxis dataKey='hour' stroke='transparent' tick={axisTickStyle} />
                <YAxis stroke='transparent' tick={axisTickStyle} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(100,210,255,0.35)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                  dataKey='messages'
                  fill='url(#hourlyWaveFill)'
                  stroke={CHART_COLORS.cyan}
                  strokeWidth={2.5}
                  type='monotone'
                  isAnimationActive
                  animationDuration={1500}
                  dot={false}
                  activeDot={{ r: 5, fill: CHART_COLORS.cyan, stroke: '#07111A', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.article>

      <motion.article className='wrapped-panel wrapped-scene wrapped-chart-slide wrapped-chart-heatmap' {...fadeUp(0.12)}>
        <div className='wrapped-panel-inner'>
          <SectionHeading eyebrow='Settimana emotiva' title='Le ore che vi somigliano' description="Ogni cella e un'ora della settimana. Piu si illumina, piu siete tornati a scrivervi." />
          <HeatmapGrid cells={data.global.heatmap} />
        </div>
      </motion.article>
    </section>
  );
}