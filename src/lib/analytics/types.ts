// =============================================================================
// TYPES — Telegram Wrapped
// All TypeScript interfaces for the analytics engine.
// =============================================================================

// ---------------------------------------------------------------------------
// RAW TELEGRAM JSON TYPES
// ---------------------------------------------------------------------------

export interface TelegramTextEntity {
  type: string;
  text: string;
}

/** A message's text field can be a plain string or an array of strings/entities */
export type TelegramTextContent = string | Array<string | TelegramTextEntity>;

export interface TelegramMessage {
  id: number;
  type: string;
  date: string; // ISO 8601
  date_unixtime?: string;
  from?: string;
  from_id?: string;
  text?: TelegramTextContent;
  sticker_emoji?: string;
  media_type?: string; // 'sticker' | 'voice_message' | 'video_file' | 'photo' | …
  file?: string; // relative path inside zip
  mime_type?: string; // 'video/webm' = animated sticker
  duration_seconds?: number;
  photo?: string; // path when media_type === 'photo'
  thumbnail?: string;
  width?: number;
  height?: number;
  forwarded_from?: string;
  reply_to_message_id?: number;
  edited?: string;
}

export interface TelegramExport {
  name: string;
  type: string;
  id: number;
  messages: TelegramMessage[];
}

// ---------------------------------------------------------------------------
// PER-USER STATISTICS
// ---------------------------------------------------------------------------

export interface LongestMessage {
  len: number;
  /** Truncated to 150 chars + "…" */
  text: string;
  date: string; // "DD Mon YYYY"
}

/** Raw accumulators used during the single-pass loop */
export interface UserAccumulator {
  name: string;
  msgCount: number;
  wordCount: number;
  charCount: number;
  words: Map<string, number>;
  laughs: number;
  screams: number;
  questions: number;
  loveScore: number;
  positivity: number;
  negativity: number;
  slangScore: number;
  emojis: Map<string, number>;
  vocabularySet: Set<string>;
  linksShared: number;
  voiceNotes: number;
  voiceDuration: number;
  videoFiles: number;
  videoDuration: number;
  imagesSent: number;
  initiations: number;
  responseTimes: number[];
  activeHours: Map<number, number>;
  doubleTexts: number;
  vampireMsgs: number;
  maxConsecutiveMessages: number;
  morningMsgs: number;
  nightMsgs: number;
  weekendMsgs: number;
  weekdayMsgs: number;
  longestMsg: LongestMessage;
}

/** Finalised per-user stats (derived values pre-calculated, Sets replaced with counts) */
export interface UserStats {
  name: string;
  msgCount: number;
  wordCount: number;
  charCount: number;

  /** top-30 words after stopword filter */
  topWords: Array<{ word: string; count: number }>;
  topEmojis: Array<{ emoji: string; count: number }>;

  /** Unique vocabulary size */
  vocabularySize: number;
  /** (vocabularySize / wordCount) * 100 */
  lexicalRichness: number;
  /** wordCount / msgCount */
  avgWordsPerMsg: number;

  laughs: number;
  screams: number;
  questions: number;
  loveScore: number;
  positivity: number;
  negativity: number;
  slangScore: number;

  linksShared: number;
  voiceNotes: number;
  voiceDuration: number;
  videoFiles: number;
  videoDuration: number;
  imagesSent: number;

  initiations: number;
  /** Mean response time in seconds */
  avgResponseTime: number;
  doubleTexts: number;
  vampireMsgs: number;
  maxConsecutiveMessages: number;

  morningMsgs: number;
  nightMsgs: number;
  weekendMsgs: number;
  weekdayMsgs: number;
  /** 0-100 */
  weekendPercentage: number;
  /** 0-100 */
  nightPercentage: number;

  longestMsg: LongestMessage;

  /** Formatted average response time string, e.g. "3m" */
  avgResponseTimeLabel: string;
  /** Total voice + video + images + stickers */
  totalMedia: number;

  /** 5-axis radar vector [Volume, Love, Fun, Hype, Media] each 0-100 */
  radarStats: [number, number, number, number, number];
}

// ---------------------------------------------------------------------------
// STICKER STATISTICS
// ---------------------------------------------------------------------------

export interface StickerPodiumEntry {
  /** Original path key inside the zip */
  path: string;
  /** Browser blob URL for rendering */
  blobUrl: string;
  count: number;
  isAnimated: boolean;
}

export interface StickerUserStats {
  userName: string;
  count: number;
  animatedCount: number;
  uniqueCount: number;
  /** Top 3 stickers by frequency */
  podium: StickerPodiumEntry[];
  /** Stickers sent only once ("The Forgotten") */
  onesies: StickerPodiumEntry[];
  /** 5-axis radar vector [Volume, Animated%, Variety, Loyalty, Ratio] each 0-100 */
  radarStats: [number, number, number, number, number];
}

export interface StickerGlobalStats {
  total: number;
  uniqueCount: number;
  animatedCount: number;
  staticCount: number;
  byUser: Record<string, StickerUserStats>;
  holyTrinity: StickerPodiumEntry[];
  museumEntries: StickerPodiumEntry[];
  /** Up to 100 blob URLs for the mosaic background */
  mosaicUrls: string[];
  firstSticker: { blobUrl: string; date: Date; userName: string; isAnimated: boolean } | null;
  lastSticker: { blobUrl: string; date: Date; userName: string; isAnimated: boolean } | null;
}

// ---------------------------------------------------------------------------
// TEMPORAL / CHART DATA
// ---------------------------------------------------------------------------

export interface DailyVolumePoint {
  /** ISO date string YYYY-MM-DD */
  date: string;
  count: number;
}

export interface HeatmapCell {
  /** 0 = Monday … 6 = Sunday */
  day: number;
  hour: number;
  count: number;
  /** Normalised 0-1 for opacity */
  intensity: number;
}

export interface MonthlySentimentPoint {
  /** YYYY-MM */
  month: string;
  /** Human-readable label, e.g. "Mar" */
  label: string;
  pos: number;
  neg: number;
}

export interface HourlyWavePoint {
  hour: number;
  count: number;
}

export interface StickerTimelineEntry {
  /** YYYY-MM */
  month: string;
  /** Human-readable label, e.g. "Mar '24" */
  label: string;
  topStickerPath: string;
  topStickerBlobUrl: string;
  count: number;
  isAnimated: boolean;
}

export interface MonthlyJourneyEntry {
  month: string;
  label: string;
  title: string;
  description: string;
  mood: 'warm' | 'sad' | 'sticker' | 'chaos';
  stickerBlobUrl?: string;
  isAnimated?: boolean;
}

export interface ChatChallenge {
  key: string;
  title: string;
  emoji: string;
  description: string;
  winnerName: string;
  loserName: string;
  winnerScore: number;
  loserScore: number;
  winnerValue: string;
  loserValue: string;
  scoreSuffix?: string;
  balanceNote?: string;
}

export interface HighlightCardStat {
  title: string;
  value: string;
  description: string;
  numericValue?: number;
  suffix?: string;
}

export interface MediaChaosStats {
  totalVoiceNotes: number;
  totalVoiceDuration: number;
  totalPhotos: number;
  totalVideos: number;
  totalLinks: number;
  voiceChampion: string;
  photoChampion: string;
  videoChampion: string;
  linkChampion: string;
}

// ---------------------------------------------------------------------------
// STREAK
// ---------------------------------------------------------------------------

export interface StreakInfo {
  maxStreak: number;
  startDate: Date | null;
  endDate: Date | null;
  /** Formatted label, e.g. "Dal 12 Gen al 28 Mar 2024" */
  label: string;
}

// ---------------------------------------------------------------------------
// GLOBAL STATS
// ---------------------------------------------------------------------------

export interface GlobalStats {
  totalMessages: number;
  totalLoveWords: number;
  streak: StreakInfo;
  mediaChaos: MediaChaosStats;
  awards: ChatChallenge[];
  highlightCards: HighlightCardStat[];

  dailyVolume: DailyVolumePoint[];
  heatmap: HeatmapCell[];
  monthlySentiment: MonthlySentimentPoint[];
  hourlyWave: HourlyWavePoint[];
  monthlyJourney: MonthlyJourneyEntry[];

  /** Top 70 words for word cloud */
  topWords: Array<{ word: string; count: number; relativeSize: number }>;

  stickerTimeline: StickerTimelineEntry[];
}

// ---------------------------------------------------------------------------
// TOP-LEVEL OUTPUT
// ---------------------------------------------------------------------------

export interface WrappedData {
  chatName: string;
  global: GlobalStats;
  /** Always the top-2 users by message count */
  users: [UserStats, UserStats];
  stickers: StickerGlobalStats;
}

// ---------------------------------------------------------------------------
// PARSER PROGRESS CALLBACK
// ---------------------------------------------------------------------------

export type ProgressCallback = (step: string, percent: number) => void;
