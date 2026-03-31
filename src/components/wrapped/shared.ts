import type { StickerUserStats, WrappedData } from '../../lib/analytics/types';

export const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'] as const;
export const USER_COLORS = ['#b4ff00', '#bd00ff'] as const;
export const RADAR_LABELS = ['Volume', 'Calore', 'Risate', 'Caos', 'Media'] as const;

export interface HeadlineStat {
  emoji: string;
  label: string;
  value: string;
  detail: string;
  numericValue?: number;
  suffix?: string;
}

export interface InsightCard {
  eyebrow: string;
  title: string;
  detail: string;
  accent: string;
}

export function fadeUp(delay = 0, distance = 18) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16, margin: '0px 0px -120px 0px' },
    transition: { duration: 0.48, delay, ease: 'easeOut' },
  } as const;
}

export function formatDisplayDate(value: Date | string | null | undefined): string {
  if (!value) {
    return 'N/A';
  }

  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export function emptyStickerStats(userName: string): StickerUserStats {
  return {
    userName,
    count: 0,
    animatedCount: 0,
    uniqueCount: 0,
    podium: [],
    onesies: [],
    radarStats: [0, 0, 0, 0, 0],
  };
}

export function buildHeadlineStats(data: WrappedData): HeadlineStat[] {
  if (data.global.highlightCards.length > 0) {
    return data.global.highlightCards.map((entry, index) => ({
      emoji: index === 0 ? '🏆' : index === 1 ? '🍌' : index === 2 ? '⚡' : '💨',
      label: entry.title,
      value: entry.value,
      detail: entry.description,
      numericValue: entry.numericValue,
      suffix: entry.suffix,
    }));
  }

  const activeDays = Math.max(data.global.dailyVolume.length, 1);
  const totalPositive = data.users.reduce((sum, user) => sum + user.positivity, 0);
  const totalNegative = data.users.reduce((sum, user) => sum + user.negativity, 0);
  const stickerDensity = data.global.totalMessages === 0
    ? 0
    : (data.stickers.total / data.global.totalMessages) * 100;
  const replyChampion = [...data.users]
    .filter((user) => user.avgResponseTime > 0)
    .sort((left, right) => left.avgResponseTime - right.avgResponseTime)[0] ?? data.users[0];

  return [
    {
      emoji: '⌨️',
      label: 'Avete fatto tremare le tastiere con',
      value: (data.global.totalMessages / activeDays).toLocaleString('it-IT', { maximumFractionDigits: 1 }),
      detail: `${activeDays.toLocaleString('it-IT')} giorni attivi in media`,
      numericValue: data.global.totalMessages / activeDays,
    },
    {
      emoji: '🍌',
      label: 'Densita sticker',
      value: `${stickerDensity.toLocaleString('it-IT', { maximumFractionDigits: 1 })}%`,
      detail: 'sticker ogni 100 messaggi testuali',
      numericValue: stickerDensity,
      suffix: '%',
    },
    {
      emoji: '⚡',
      label: 'Saldo emotivo',
      value: `${totalPositive - totalNegative >= 0 ? '+' : ''}${(totalPositive - totalNegative).toLocaleString('it-IT')}`,
      detail: `${totalPositive} segnali positivi vs ${totalNegative} negativi`,
      numericValue: totalPositive - totalNegative,
    },
    {
      emoji: '💨',
      label: 'Risposta lampo',
      value: replyChampion.avgResponseTimeLabel || formatDuration(replyChampion.avgResponseTime),
      detail: `${replyChampion.name} e il piu rapido in media`,
    },
  ];
}

export function buildInsightCards(data: WrappedData): InsightCard[] {
  const [userOne, userTwo] = data.users;
  const stickerLeader = [...data.users].sort(
    (left, right) => (data.stickers.byUser[right.name]?.count ?? 0) - (data.stickers.byUser[left.name]?.count ?? 0),
  )[0] ?? userOne;
  const lexicalLeader = [...data.users].sort((left, right) => right.lexicalRichness - left.lexicalRichness)[0] ?? userOne;
  const nightSync = Math.round((userOne.nightPercentage + userTwo.nightPercentage) / 2);
  const weekendGap = Math.abs(userOne.weekendPercentage - userTwo.weekendPercentage);

  return [
    {
      eyebrow: 'Voce dominante',
      title: `${userOne.msgCount >= userTwo.msgCount ? userOne.name : userTwo.name} ha retto il palco della chat`,
      detail: `${Math.max(userOne.msgCount, userTwo.msgCount).toLocaleString('it-IT')} messaggi mandati in archivio.`,
      accent: USER_COLORS[0],
    },
    {
      eyebrow: 'Lessico deluxe',
      title: `${lexicalLeader.name} scrive con piu varieta`,
      detail: `${lexicalLeader.lexicalRichness}% di ricchezza lessicale e ${lexicalLeader.vocabularySize.toLocaleString('it-IT')} termini unici.`,
      accent: USER_COLORS[1],
    },
    {
      eyebrow: 'Creature sticker',
      title: `${stickerLeader.name} domina il canale meme`,
      detail: `${(data.stickers.byUser[stickerLeader.name]?.count ?? 0).toLocaleString('it-IT')} sticker sparati, di cui ${(data.stickers.byUser[stickerLeader.name]?.animatedCount ?? 0).toLocaleString('it-IT')} animati.`,
      accent: '#00d1ff',
    },
    {
      eyebrow: 'Sincronia circadiana',
      title: `${nightSync}% di energia notturna condivisa`,
      detail: `${100 - weekendGap}% di allineamento nel weekend tra voi due.`,
      accent: '#ff9d00',
    },
  ];
}