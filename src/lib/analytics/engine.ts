// =============================================================================
// ENGINE — Telegram Wrapped
// Pure analytics functions. No I/O, no browser APIs.
// All functions are deterministic and can be tested in isolation.
// =============================================================================

import type {
  TelegramMessage,
  TelegramTextContent,
  UserAccumulator,
  UserStats,
  StickerUserStats,
  StickerGlobalStats,
  StickerPodiumEntry,
  GlobalStats,
  StreakInfo,
  HeatmapCell,
  MonthlySentimentPoint,
  MonthlyJourneyEntry,
  MonthlySnapshot,
  MediaChaosStats,
  ChatChallenge,
  HighlightCardStat,
  WrappedData,
} from './types';

// =============================================================================
// CONSTANTS — mirroring the Python dictionaries
// =============================================================================

const STOPWORDS = new Set([
  'il','lo','la','i','gli','le','un','uno','una','di','a','da','in','con','su','per','tra','fra',
  'e','o','ma','se','che','non','si','no','sì','c','l','d','t','s','v','n','m','è','ho','hai','ha',
  'abbiamo','avete','hanno','sono','sei','siamo','siete','era','eri','ti','mi','ci','vi','li','me',
  'te','lui','lei','noi','voi','loro','questo','questa','quello','quella','tutto','tutti','cosa','chi',
  'dove','quando','perché','come','ok','va','bhe','beh','po','fa','sto','sta','fai','quindi','poi',
  'però','anche','solo','dopo','ora','adesso','qui','lì','cui','io','tu','egli','essa','essi','esse',
  'mio','mia','tuo','tua','suo','sua','nostro','vostro','cio','ecc','comunque','infatti','insomma',
  'proprio','già','gia','allora','stato','stati','fatto','fare','dire','detto','posso','puoi',
  'voglio','vuoi','devo','devi','sai','so','ce','ne','eh','ah','oh','mh','mhh','vabb','cioè','tipo',
  'quella','quelli','quelle','nessuno','ogni','altri','altro','altra','sempre','mai','forse',
]);

const POSITIVE_WORDS = new Set([
  'bene','bravo','brava','bello','bella','bellissimo','ottimo','grande','super','top','adoro','amo',
  'felice','contento','sì','si','certo','sicuro','esatto','giusto','vero','ahah','haha','lol','grazie',
  'prego','yep','yeah','perfetto','fantastico','auguri','buono','migliore','vinto','riuscito','ok','daje',
  'spacca','fuoco','volo','god','hype','adoroh','muoro','godo','sium','fiero','onesto',
]);

const NEGATIVE_WORDS = new Set([
  'no','mai','niente','nulla','brutto','male','triste','arrabbiato','odio','schifo','errore','sbagliato',
  'falso','bugia','problema','ansia','paura','peggio','difficile','impossibile','basta','uff','uffa',
  'stanco','stanca','morto','morta','dolore','piango','casino','disastro','sbatti','noia','ansietta',
  'tristezza','delusione','pianto','lacrime','rabbia','tilt','rip','f','piangere','stancante',
]);

const LOVE_WORDS = new Set([
  'amo','amore','love','tesoro','cuore','vita','bimbo','bimba','bb','baby','cucciolo','piccolo',
  'stellina','patato','patata','heart','loveyou','miss','manchi','amooo','amoremio','cucciolino',
]);

const SLANG_WORDS = new Set([
  'bro','fra','vecchio','zio','bestie','cringe','based','cap','nocap','snitch','drip',
  'flex','ghostare','pov','sus','vibe','mood','chilla','scialla','palese','letteralmente',
  'morto','volo','basito','scioccobasito','raga','regà','easy','gg','wp','lol','lmao',
]);

const LAUGH_PATTERN = /^(ah+a+h+|ha+h+a+|lol|xd|jaja|eheh|ihih|uauau|ksksks)/i;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/** Flattens a Telegram text object (string | entity array) into a plain string */
export function extractText(textObj: TelegramTextContent | undefined): string {
  if (!textObj) return '';
  if (typeof textObj === 'string') return textObj;
  return textObj.reduce<string>((acc, part) => {
    if (typeof part === 'string') return acc + part;
    if (typeof part === 'object' && 'text' in part) return acc + part.text;
    return acc;
  }, '');
}

/** Returns true for emoji characters (multi-plane Unicode) */
export function isEmoji(char: string): boolean {
  const cp = char.codePointAt(0) ?? 0;
  return (cp >= 0x10000 && cp <= 0x10ffff) || (cp >= 0x2600 && cp <= 0x26ff);
}

/** Normalise a value to 0-100 relative to a max */
export function normalize(val: number, maxVal: number): number {
  if (maxVal === 0) return 0;
  return Math.min(100, (val / maxVal) * 100);
}

/** Format seconds into a human-readable duration string */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

/** Safe division, returns 0 when denominator is 0 */
function safeDiv(a: number, b: number): number {
  return b === 0 ? 0 : a / b;
}

function formatCount(value: number): string {
  return value.toLocaleString('it-IT');
}

// =============================================================================
// ACTIVE DAYS CALCULATION
// =============================================================================

/** Calculates total unique active chat days (non-consecutive) from message dates */
export function calculateActiveDaysDetails(dates: Date[]): StreakInfo {
  if (dates.length === 0) {
    return { maxStreak: 0, startDate: null, endDate: null, label: 'N/A' };
  }

  const uniqueDays = Array.from(new Set(dates.map((d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }))).sort();

  const firstDay = new Date(`${uniqueDays[0]}T00:00:00`);
  const lastDay = new Date(`${uniqueDays[uniqueDays.length - 1]}T00:00:00`);
  const MONTHS_IT = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
  const fmtDate = (d: Date) => `${d.getDate()} ${MONTHS_IT[d.getMonth()]} ${d.getFullYear()}`;

  return {
    maxStreak: uniqueDays.length,
    startDate: firstDay,
    endDate: lastDay,
    label: `${fmtDate(firstDay)} - ${fmtDate(lastDay)}`,
  };
}

// =============================================================================
// ACCUMULATOR FACTORY
// =============================================================================

function createAccumulator(name: string): UserAccumulator {
  return {
    name,
    msgCount: 0, wordCount: 0, charCount: 0,
    words: new Map(), laughs: 0, screams: 0, questions: 0,
    loveScore: 0, positivity: 0, negativity: 0, slangScore: 0,
    emojis: new Map(), vocabularySet: new Set(), linksShared: 0,
    voiceNotes: 0, voiceDuration: 0, videoFiles: 0, videoDuration: 0,
    imagesSent: 0, initiations: 0, responseTimes: [], activeHours: new Map(),
    doubleTexts: 0, vampireMsgs: 0, maxConsecutiveMessages: 0,
    morningMsgs: 0, nightMsgs: 0, weekendMsgs: 0, weekdayMsgs: 0,
    longestMsg: { len: 0, text: '', date: '' },
  };
}

// =============================================================================
// MAIN ANALYTICS PASS
// =============================================================================

export interface AnalyticsInput {
  messages: TelegramMessage[];
  /** path → blobUrl for all sticker/media files found in the zip */
  blobUrlMap: Map<string, string>;
}

export interface AnalyticsResult {
  wrappedData: WrappedData;
  chatName: string;
}

/**
 * Full single-pass analytics engine.
 * Processes all messages and returns WrappedData ready for the UI.
 */
export function runAnalytics(
  messages: TelegramMessage[],
  blobUrlMap: Map<string, string>,
  chatName: string,
): WrappedData {
  // Sort chronologically
  const sorted = [...messages]
    .filter((m) => !!m.date)
    .sort((a, b) => a.date.localeCompare(b.date));

  // ─── Accumulators ────────────────────────────────────────────────────────
  const userAccs = new Map<string, UserAccumulator>();
  const allDates: Date[] = [];
  const dailyVol = new Map<string, number>();           // 'YYYY-MM-DD' → count
  const heatmapRaw = new Map<string, number>();          // 'day,hour' → count
  const monthlySentimentRaw = new Map<string, { pos: number; neg: number }>();
  const monthlyStoryRaw = new Map<string, { pos: number; neg: number; love: number; messages: number }>();
  const globalHourlyRaw = new Map<number, number>();    // hour → count
  const globalWords = new Map<string, number>();
  let totalMessages = 0;

  // Sticker accumulators
  const stickerUserCounts = new Map<string, number>();   // userName → total stickers
  const stickerUserMaps = new Map<string, Map<string, number>>();   // userName → {path → count}
  const stickerAnimated = new Map<string, Map<string, number>>();   // userName → {path → count}
  const stickerUnique = new Map<string, Set<string>>();
  const stickerTimeline = new Map<string, Map<string, number>>();   // 'YYYY-MM' → {path → count}
  const globalStickerMap = new Map<string, number>();
  const globalAnimatedStickerMap = new Map<string, number>();
  let stickerTotal = 0;
  const allStickerPaths = new Set<string>();
  let firstSticker: { path: string; date: Date; userName: string; isAnimated: boolean } | null = null;
  let lastSticker: { path: string; date: Date; userName: string; isAnimated: boolean } | null = null;

  // Monthly snapshot accumulators
  const monthlyWordMap = new Map<string, Map<string, number>>();
  const monthlyEmojiMap = new Map<string, Map<string, number>>();
  const monthlyUserMsgMap = new Map<string, Map<string, number>>();
  const monthlyMediaMap = new Map<string, { voice: number; voiceDuration: number; photos: number; videos: number; stickers: number }>();
  const monthlyLoveMap = new Map<string, number>();
  const monthlyDailyMap = new Map<string, Map<string, number>>(); // YYYY-MM → Map<YYYY-MM-DD, count>

  let lastMsgTime: Date | null = null;
  let lastSender: string | null = null;
  let currentSenderStreak = 0;

  for (const msg of sorted) {
    if (msg.type !== 'message') continue;

    const sender = msg.from ?? 'Unknown';
    const dt = new Date(msg.date);
    allDates.push(dt);

    // Ensure accumulator exists
    if (!userAccs.has(sender)) userAccs.set(sender, createAccumulator(sender));
    const u = userAccs.get(sender)!;

    // ─── Temporal ───────────────────────────────────────────────────────────
    const dateKey = dt.toISOString().slice(0, 10);
    dailyVol.set(dateKey, (dailyVol.get(dateKey) ?? 0) + 1);

    const heatKey = `${dt.getDay() === 0 ? 6 : dt.getDay() - 1},${dt.getHours()}`;
    heatmapRaw.set(heatKey, (heatmapRaw.get(heatKey) ?? 0) + 1);

    const hour = dt.getHours();
    globalHourlyRaw.set(hour, (globalHourlyRaw.get(hour) ?? 0) + 1);

    u.activeHours.set(hour, (u.activeHours.get(hour) ?? 0) + 1);
    if (hour >= 1 && hour <= 5) u.vampireMsgs++;

    const dow = dt.getDay(); // 0=Sun, 6=Sat
    if (dow === 0 || dow === 6) u.weekendMsgs++;
    else u.weekdayMsgs++;

    if (hour >= 0 && hour < 5) u.nightMsgs++;
    else if (hour >= 6 && hour < 12) u.morningMsgs++;

    // ─── Initiation / Response / Double-text ────────────────────────────────
    if (lastMsgTime !== null) {
      const diffSec = (dt.getTime() - lastMsgTime.getTime()) / 1000;
      if (diffSec > 6 * 3600) {
        u.initiations++;
      } else if (lastSender && lastSender !== sender) {
        u.responseTimes.push(diffSec);
      } else if (lastSender && lastSender === sender && diffSec < 120) {
        u.doubleTexts++;
      }
    } else {
      u.initiations++;
    }

    if (lastSender === sender) currentSenderStreak++;
    else currentSenderStreak = 1;
    u.maxConsecutiveMessages = Math.max(u.maxConsecutiveMessages, currentSenderStreak);

    lastMsgTime = dt;
    lastSender = sender;

    const monthKey = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyStoryRaw.has(monthKey)) {
      monthlyStoryRaw.set(monthKey, { pos: 0, neg: 0, love: 0, messages: 0 });
    }
    monthlyStoryRaw.get(monthKey)!.messages++;

    // Monthly snapshot accumulators
    if (!monthlyUserMsgMap.has(monthKey)) monthlyUserMsgMap.set(monthKey, new Map());
    const muMap = monthlyUserMsgMap.get(monthKey)!;
    muMap.set(sender, (muMap.get(sender) ?? 0) + 1);

    if (!monthlyWordMap.has(monthKey)) monthlyWordMap.set(monthKey, new Map());
    if (!monthlyEmojiMap.has(monthKey)) monthlyEmojiMap.set(monthKey, new Map());
    if (!monthlyMediaMap.has(monthKey)) monthlyMediaMap.set(monthKey, { voice: 0, voiceDuration: 0, photos: 0, videos: 0, stickers: 0 });
    if (!monthlyDailyMap.has(monthKey)) monthlyDailyMap.set(monthKey, new Map());
    const mdMap = monthlyDailyMap.get(monthKey)!;
    mdMap.set(dateKey, (mdMap.get(dateKey) ?? 0) + 1);

    // ─── Media ──────────────────────────────────────────────────────────────
    const mType = msg.media_type;
    if (mType === 'voice_message') {
      u.voiceNotes++;
      u.voiceDuration += msg.duration_seconds ?? 0;
      monthlyMediaMap.get(monthKey)!.voice++;
      monthlyMediaMap.get(monthKey)!.voiceDuration += msg.duration_seconds ?? 0;
    } else if (mType === 'video_file') {
      u.videoFiles++;
      u.videoDuration += msg.duration_seconds ?? 0;
      monthlyMediaMap.get(monthKey)!.videos++;
    } else if (msg.photo || mType === 'photo') {
      u.imagesSent++;
      monthlyMediaMap.get(monthKey)!.photos++;
    }

    // ─── Text analysis ──────────────────────────────────────────────────────
    const rawText = msg.text;
    const textContent = extractText(rawText);

    if (textContent) {
      totalMessages++;
      u.msgCount++;
      u.charCount += textContent.length;

      // Essayist (longest message)
      if (textContent.length > u.longestMsg.len) {
        const MONTHS_IT = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
        u.longestMsg = {
          len: textContent.length,
          text: textContent.slice(0, 150) + (textContent.length > 150 ? '…' : ''),
          date: `${dt.getDate()} ${MONTHS_IT[dt.getMonth()]} ${dt.getFullYear()}`,
        };
      }

      if (textContent.includes('http')) u.linksShared++;

      const cleaned = textContent.replace(/[^\p{L}\s]/gu, '');
      if (cleaned.length > 3 && cleaned === cleaned.toUpperCase()) u.screams++;
      u.questions += (textContent.match(/\?/g) ?? []).length;

      if (!monthlySentimentRaw.has(monthKey)) {
        monthlySentimentRaw.set(monthKey, { pos: 0, neg: 0 });
      }
      const monthSent = monthlySentimentRaw.get(monthKey)!;

      for (const wRaw of textContent.split(/\s+/)) {
        // Emoji extraction (character by character)
        const mwEmoji = monthlyEmojiMap.get(monthKey)!;
        for (const char of wRaw) {
          if (isEmoji(char)) {
            u.emojis.set(char, (u.emojis.get(char) ?? 0) + 1);
            mwEmoji.set(char, (mwEmoji.get(char) ?? 0) + 1);
          }
        }

        const wClean = wRaw.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
        if (!wClean) continue;

        u.wordCount++;
        u.vocabularySet.add(wClean);

        if (LAUGH_PATTERN.test(wClean)) {
          u.laughs++;
          continue;
        }

        if (LOVE_WORDS.has(wClean)) { u.loveScore++; monthlyStoryRaw.get(monthKey)!.love++; monthlyLoveMap.set(monthKey, (monthlyLoveMap.get(monthKey) ?? 0) + 1); }
        if (POSITIVE_WORDS.has(wClean)) { u.positivity++; monthSent.pos++; monthlyStoryRaw.get(monthKey)!.pos++; }
        if (NEGATIVE_WORDS.has(wClean)) { u.negativity++; monthSent.neg++; monthlyStoryRaw.get(monthKey)!.neg++; }
        if (SLANG_WORDS.has(wClean)) u.slangScore++;

        if (wClean.length >= 2 && !STOPWORDS.has(wClean)) {
          globalWords.set(wClean, (globalWords.get(wClean) ?? 0) + 1);
          u.words.set(wClean, (u.words.get(wClean) ?? 0) + 1);
          const mwWords = monthlyWordMap.get(monthKey)!;
          mwWords.set(wClean, (mwWords.get(wClean) ?? 0) + 1);
        }
      }
    }

    // ─── Sticker analysis ───────────────────────────────────────────────────
    if (mType === 'sticker') {
      const path = msg.file;
      const mime = msg.mime_type ?? '';
      if (path) {
        stickerTotal++;
        allStickerPaths.add(path);
        const isAnimatedSticker = mime === 'video/webm';

        if (stickerTotal === 1) {
          firstSticker = { path, date: dt, userName: sender, isAnimated: isAnimatedSticker };
        }
        lastSticker = { path, date: dt, userName: sender, isAnimated: isAnimatedSticker };

        // Per-user sticker maps
        if (!stickerUserMaps.has(sender)) stickerUserMaps.set(sender, new Map());
        if (!stickerAnimated.has(sender)) stickerAnimated.set(sender, new Map());
        if (!stickerUnique.has(sender)) stickerUnique.set(sender, new Set());

        const userStickerMap = stickerUserMaps.get(sender)!;
        userStickerMap.set(path, (userStickerMap.get(path) ?? 0) + 1);
        globalStickerMap.set(path, (globalStickerMap.get(path) ?? 0) + 1);

        if (mime === 'video/webm') {
          const animMap = stickerAnimated.get(sender)!;
          animMap.set(path, (animMap.get(path) ?? 0) + 1);
          globalAnimatedStickerMap.set(path, (globalAnimatedStickerMap.get(path) ?? 0) + 1);
        }

        stickerUnique.get(sender)!.add(path);
        stickerUserCounts.set(sender, (stickerUserCounts.get(sender) ?? 0) + 1);

        // Timeline
        const monthKey = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
        if (!stickerTimeline.has(monthKey)) stickerTimeline.set(monthKey, new Map());
        const tMap = stickerTimeline.get(monthKey)!;
        tMap.set(path, (tMap.get(path) ?? 0) + 1);
        if (!monthlyMediaMap.has(monthKey)) monthlyMediaMap.set(monthKey, { voice: 0, voiceDuration: 0, photos: 0, videos: 0, stickers: 0 });
        monthlyMediaMap.get(monthKey)!.stickers++;
      }
    }
  }

  // =============================================================================
  // FINALIZE: USER STATS
  // =============================================================================

  // Sort users by message count descending, take top 2
  const sortedUserEntries = Array.from(userAccs.entries())
    .sort((a, b) => b[1].msgCount - a[1].msgCount)
    .slice(0, 2);

  // Ensure we always have exactly 2 users
  while (sortedUserEntries.length < 2) {
    sortedUserEntries.push(['Ghost', createAccumulator('Ghost')]);
  }

  const [u1Name, u1Acc] = sortedUserEntries[0];
  const [u2Name, u2Acc] = sortedUserEntries[1];

  // Radar normalization bases
  const maxVol = Math.max(u1Acc.msgCount, u2Acc.msgCount, 1);
  const maxLov = Math.max(u1Acc.loveScore, u2Acc.loveScore, 1);
  const maxFun = Math.max(u1Acc.laughs, u2Acc.laughs, 1);
  const maxHyp = Math.max(u1Acc.screams, u2Acc.screams, 1);

  const u1StickerCount = stickerUserCounts.get(u1Name) ?? 0;
  const u2StickerCount = stickerUserCounts.get(u2Name) ?? 0;
  const u1MediaTot = u1Acc.imagesSent + u1Acc.voiceNotes + u1Acc.videoFiles + u1StickerCount;
  const u2MediaTot = u2Acc.imagesSent + u2Acc.voiceNotes + u2Acc.videoFiles + u2StickerCount;
  const maxMed = Math.max(u1MediaTot, u2MediaTot, 1);

  function finalizeUser(acc: UserAccumulator, totalMedia: number): UserStats {
    const topWords = Array.from(acc.words.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word, count]) => ({ word, count }));

    const topEmojis = Array.from(acc.emojis.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([emoji, count]) => ({ emoji, count }));

    const avgResponseTime = safeDiv(
      acc.responseTimes.reduce((s, v) => s + v, 0),
      acc.responseTimes.length,
    );

    const lexicalRichness = safeDiv(acc.vocabularySet.size, acc.wordCount) * 100;

    return {
      name: acc.name,
      msgCount: acc.msgCount,
      wordCount: acc.wordCount,
      charCount: acc.charCount,
      topWords,
      topEmojis,
      vocabularySize: acc.vocabularySet.size,
      lexicalRichness: Math.round(lexicalRichness),
      avgWordsPerMsg: Math.round(safeDiv(acc.wordCount, acc.msgCount)),
      laughs: acc.laughs,
      screams: acc.screams,
      questions: acc.questions,
      loveScore: acc.loveScore,
      positivity: acc.positivity,
      negativity: acc.negativity,
      slangScore: acc.slangScore,
      linksShared: acc.linksShared,
      voiceNotes: acc.voiceNotes,
      voiceDuration: acc.voiceDuration,
      videoFiles: acc.videoFiles,
      videoDuration: acc.videoDuration,
      imagesSent: acc.imagesSent,
      initiations: acc.initiations,
      avgResponseTime,
      avgResponseTimeLabel: formatDuration(avgResponseTime),
      doubleTexts: acc.doubleTexts,
      vampireMsgs: acc.vampireMsgs,
      maxConsecutiveMessages: acc.maxConsecutiveMessages,
      morningMsgs: acc.morningMsgs,
      nightMsgs: acc.nightMsgs,
      weekendMsgs: acc.weekendMsgs,
      weekdayMsgs: acc.weekdayMsgs,
      weekendPercentage: Math.round(safeDiv(acc.weekendMsgs, acc.msgCount) * 100),
      nightPercentage: Math.round(safeDiv(acc.nightMsgs, acc.msgCount) * 100),
      longestMsg: acc.longestMsg,
      totalMedia,
      radarStats: [
        normalize(acc.msgCount, maxVol),
        normalize(acc.loveScore, maxLov),
        normalize(acc.laughs, maxFun),
        normalize(acc.screams, maxHyp),
        normalize(totalMedia, maxMed),
      ],
    };
  }

  const user1Stats = finalizeUser(u1Acc, u1MediaTot);
  const user2Stats = finalizeUser(u2Acc, u2MediaTot);

  // =============================================================================
  // FINALIZE: STICKER STATS
  // =============================================================================

  function makeStickerPodium(
    stickerMap: Map<string, number>,
    animatedMap: Map<string, number>,
    top: number,
  ): StickerPodiumEntry[] {
    return Array.from(stickerMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, top)
      .map(([path, count]) => ({
        path,
        blobUrl: blobUrlMap.get(path) ?? '',
        count,
        isAnimated: (animatedMap.get(path) ?? 0) > 0,
      }));
  }

  const stickerByUser: Record<string, StickerUserStats> = {};
  const maxStickerVol = Math.max(...Array.from(stickerUserCounts.values()), 1);

  const makeGlobalStickerEntries = (entries: Array<[string, number]>, top: number): StickerPodiumEntry[] => entries
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([path, count]) => ({
      path,
      blobUrl: blobUrlMap.get(path) ?? '',
      count,
      isAnimated: (globalAnimatedStickerMap.get(path) ?? 0) > 0,
    }));

  for (const [uName] of sortedUserEntries) {
    const totalSt = stickerUserCounts.get(uName) ?? 0;
    const sMap = stickerUserMaps.get(uName) ?? new Map<string, number>();
    const aMap = stickerAnimated.get(uName) ?? new Map<string, number>();
    const uSet = stickerUnique.get(uName) ?? new Set<string>();

    const podium = makeStickerPodium(sMap, aMap, 3);
    const animatedCount = Array.from(aMap.values()).reduce((s, v) => s + v, 0);
    const uniqueCount = uSet.size;

    const onesies: StickerPodiumEntry[] = Array.from(sMap.entries())
      .filter(([, cnt]) => cnt === 1)
      .map(([path]) => ({
        path,
        blobUrl: blobUrlMap.get(path) ?? '',
        count: 1,
        isAnimated: (aMap.get(path) ?? 0) > 0,
      }))
      // shuffle and cap at 6 for the "Forgotten" graveyard
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    const topStickerCount = podium[0]?.count ?? 0;
    const radarStats: [number, number, number, number, number] = [
      normalize(totalSt, maxStickerVol),
      normalize(animatedCount, Math.max(totalSt, 1)),
      normalize(uniqueCount, Math.max(totalSt, 1)) * 1.5,
      normalize(topStickerCount, Math.max(totalSt, 1)) * 2,
      Math.min(100, normalize(totalSt, Math.max(userAccs.get(uName)?.msgCount ?? 1, 1)) * 50),
    ];

    stickerByUser[uName] = {
      userName: uName,
      count: totalSt,
      animatedCount,
      uniqueCount,
      podium,
      onesies,
      radarStats,
    };
  }

  // Mosaic: up to 100 random sticker blob URLs
  const allStickerBlobUrls = Array.from(allStickerPaths)
    .sort(() => Math.random() - 0.5)
    .slice(0, 100)
    .map((p) => blobUrlMap.get(p))
    .filter((u): u is string => !!u);

  const sortedGlobalStickers = Array.from(globalStickerMap.entries()).sort((a, b) => b[1] - a[1]);
  const holyTrinity = makeGlobalStickerEntries([...sortedGlobalStickers], 3);
  const museumEntries = makeGlobalStickerEntries(sortedGlobalStickers.slice(3), 12);
  const animatedStickerCount = Array.from(globalAnimatedStickerMap.values()).reduce((sum, value) => sum + value, 0);

  const stickerGlobal: StickerGlobalStats = {
    total: stickerTotal,
    uniqueCount: allStickerPaths.size,
    animatedCount: animatedStickerCount,
    staticCount: Math.max(stickerTotal - animatedStickerCount, 0),
    byUser: stickerByUser,
    holyTrinity,
    museumEntries,
    mosaicUrls: allStickerBlobUrls,
    firstSticker: firstSticker
      ? {
          blobUrl: blobUrlMap.get(firstSticker.path) ?? '',
          date: firstSticker.date,
          userName: firstSticker.userName,
          isAnimated: firstSticker.isAnimated,
        }
      : null,
    lastSticker: lastSticker
      ? {
          blobUrl: blobUrlMap.get(lastSticker.path) ?? '',
          date: lastSticker.date,
          userName: lastSticker.userName,
          isAnimated: lastSticker.isAnimated,
        }
      : null,
  };

  // =============================================================================
  // FINALIZE: GLOBAL STATS
  // =============================================================================

  const streak = calculateActiveDaysDetails(allDates);

  // Daily volume
  const dailyVolume = Array.from(dailyVol.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));

  // Heatmap (7 days × 24 hours)
  const maxHeat = Math.max(...Array.from(heatmapRaw.values()), 1);
  const heatmap: HeatmapCell[] = [];
  for (let day = 0; day < 7; day++) {
    for (let h = 0; h < 24; h++) {
      const count = heatmapRaw.get(`${day},${h}`) ?? 0;
      heatmap.push({ day, hour: h, count, intensity: count / maxHeat });
    }
  }

  // Monthly sentiment
  const MONTHS_SHORT = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
  const monthlySentiment: MonthlySentimentPoint[] = Array.from(
    monthlySentimentRaw.entries(),
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, { pos, neg }]) => {
      const [, mm] = month.split('-');
      return { month, label: MONTHS_SHORT[parseInt(mm, 10) - 1], pos, neg };
    });

  // Hourly wave
  const hourlyWave = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    count: globalHourlyRaw.get(h) ?? 0,
  }));

  // Word cloud (top 70)
  const sortedWords = Array.from(globalWords.entries()).sort((a, b) => b[1] - a[1]);
  const maxWordCount = sortedWords[0]?.[1] ?? 1;
  const topWords = sortedWords.slice(0, 70).map(([word, count]) => ({
    word,
    count,
    /** Relative font size multiplier 0.8–3.8 — mirrors Python logic */
    relativeSize: 0.8 + (count / maxWordCount) * 3,
  }));

  // Sticker timeline
  const monthlyStickerCandidates = new Map<string, Array<[string, number]>>(
    Array.from(stickerTimeline.entries()).map(([month, pathMap]) => {
      const ranked = Array.from(pathMap.entries()).sort((a, b) => b[1] - a[1]);
      return [month, ranked];
    }),
  );
  const usedMonthlyStickers = new Set<string>();

  const stickerTimlineEntries = Array.from(monthlyStickerCandidates.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, rankedPaths]) => {
      const selected = rankedPaths.find(([path]) => !usedMonthlyStickers.has(path)) ?? rankedPaths[0];
      const [topPath, topCount] = selected;
      usedMonthlyStickers.add(topPath);
      const [yy, mm] = month.split('-');
      const MONTHS_SHORT_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return {
        month,
        label: `${MONTHS_SHORT_EN[parseInt(mm, 10) - 1]} '${yy.slice(2)}`,
        topStickerPath: topPath,
        topStickerBlobUrl: blobUrlMap.get(topPath) ?? '',
        count: topCount,
        isAnimated: topPath.endsWith('.webm'),
      };
    });

  const totalLoveWords = Array.from(userAccs.values()).reduce(
    (sum, u) => sum + u.loveScore,
    0,
  );

  const pickChampion = (selector: (user: UserStats) => number, fallback: UserStats): UserStats => {
    const sortedUsers = [user1Stats, user2Stats].sort((a, b) => selector(b) - selector(a));
    return sortedUsers[0] ?? fallback;
  };

  const mediaChaos: MediaChaosStats = {
    totalVoiceNotes: user1Stats.voiceNotes + user2Stats.voiceNotes,
    totalVoiceDuration: user1Stats.voiceDuration + user2Stats.voiceDuration,
    totalPhotos: user1Stats.imagesSent + user2Stats.imagesSent,
    totalVideos: user1Stats.videoFiles + user2Stats.videoFiles,
    totalLinks: user1Stats.linksShared + user2Stats.linksShared,
    voiceChampion: pickChampion((user) => user.voiceNotes, user1Stats).name,
    photoChampion: pickChampion((user) => user.imagesSent, user1Stats).name,
    videoChampion: pickChampion((user) => user.videoFiles, user1Stats).name,
    linkChampion: pickChampion((user) => user.linksShared, user1Stats).name,
  };

  const duelUsers = [user1Stats, user2Stats];

  const mostActiveUser = [...duelUsers].sort((left, right) => right.msgCount - left.msgCount)[0] ?? user1Stats;
  const otherUser = mostActiveUser.name === user1Stats.name ? user2Stats : user1Stats;
  const chatIntensity = totalLoveWords - (user1Stats.negativity + user2Stats.negativity);
  const fastestResponder = [...duelUsers]
    .filter((user) => user.avgResponseTime > 0)
    .sort((left, right) => left.avgResponseTime - right.avgResponseTime)[0] ?? user1Stats;

  const highlightCards: HighlightCardStat[] = [
    {
      title: 'Il piu attivo',
      value: mostActiveUser.name,
      description: `+${(mostActiveUser.msgCount - otherUser.msgCount).toLocaleString('it-IT')} messaggi inviati`,
    },
    {
      title: 'Densita sticker',
      value: `${((stickerTotal / Math.max(totalMessages, 1)) * 100).toLocaleString('it-IT', { maximumFractionDigits: 1 })}%`,
      description: `${stickerTotal.toLocaleString('it-IT')} sticker su ${totalMessages.toLocaleString('it-IT')} messaggi`,
      numericValue: (stickerTotal / Math.max(totalMessages, 1)) * 100,
      suffix: '%',
    },
    {
      title: 'Mood della chat',
      value: `${chatIntensity >= 0 ? '+' : ''}${chatIntensity.toLocaleString('it-IT')}`,
      description: `${(user1Stats.positivity + user2Stats.positivity).toLocaleString('it-IT')} segnali positivi vs ${(user1Stats.negativity + user2Stats.negativity).toLocaleString('it-IT')} negativi`,
      numericValue: chatIntensity,
    },
    {
      title: 'Risposta lampo',
      value: fastestResponder.name,
      description: `Tempo medio risposta: ${fastestResponder.avgResponseTimeLabel}`,
    },
  ];

  const awardTemplates = [
    {
      key: 'night-owl',
      title: "L'Animale Notturno",
      emoji: '🌙',
      description: 'Conta i messaggi partiti tra l\'una e l\'alba, quando la chat smette di essere civile.',
      scoreSuffix: '',
      balanceThreshold: 0.34,
      getScore: (user: UserStats) => user.vampireMsgs,
      getSecondary: (user: UserStats) => user.nightPercentage,
      formatValue: (value: number) => `${formatCount(value)} messaggi`,
    },
    {
      key: 'podcaster',
      title: 'Il Podcaster Logorroico',
      emoji: '🎙️',
      description: 'Premia chi ha trasformato la chat in una puntata audio infinita.',
      scoreSuffix: ' min',
      balanceThreshold: 0.32,
      getScore: (user: UserStats) => Math.round(user.voiceDuration / 60),
      getSecondary: (user: UserStats) => user.voiceNotes,
      formatValue: (value: number) => `${formatCount(value)} min`,
    },
    {
      key: 'novelist',
      title: 'Il Romanziere',
      emoji: '📜',
      description: 'Qui vince il papiro definitivo: il messaggio singolo piu lungo di tutta la saga.',
      scoreSuffix: ' car',
      balanceThreshold: 0.26,
      getScore: (user: UserStats) => user.longestMsg.len,
      getSecondary: (user: UserStats) => user.avgWordsPerMsg,
      formatValue: (value: number) => `${formatCount(value)} caratteri`,
    },
    {
      key: 'anxious',
      title: "L'Ansioso",
      emoji: '📨',
      description: 'Misura il doppio testo compulsivo: quante volte una risposta ha deciso di non aspettare.',
      scoreSuffix: ' di fila',
      balanceThreshold: 0.38,
      getScore: (user: UserStats) => user.maxConsecutiveMessages,
      getSecondary: (user: UserStats) => user.doubleTexts,
      formatValue: (value: number, user: UserStats) => `${formatCount(value)} di fila · ${formatCount(user.doubleTexts)} rincorse`,
    },
    {
      key: 'jester',
      title: 'Il Giullare',
      emoji: '😂',
      description: 'Risate, ahah, lol e collassi teatrali: il premio va a chi ha tenuto alto il tasso di sceneggiata.',
      scoreSuffix: ' risate',
      balanceThreshold: 0.3,
      getScore: (user: UserStats) => user.laughs,
      getSecondary: (user: UserStats) => user.screams,
      formatValue: (value: number) => `${formatCount(value)} risate`,
    },
    {
      key: 'paparazzo',
      title: 'Il Paparazzo',
      emoji: '📸',
      description: 'Somma foto e video per trovare chi ha vissuto la chat con la fotocamera sempre in mano.',
      scoreSuffix: ' scatti',
      balanceThreshold: 0.33,
      getScore: (user: UserStats) => user.imagesSent + user.videoFiles,
      getSecondary: (user: UserStats) => user.videoFiles,
      formatValue: (value: number, user: UserStats) => `${formatCount(value)} scatti · ${formatCount(user.videoFiles)} video`,
    },
  ] as const;

  const awardCandidates = awardTemplates.map((template) => {
    const first = {
      user: duelUsers[0],
      score: template.getScore(duelUsers[0]),
      secondary: template.getSecondary(duelUsers[0]),
    };
    const second = {
      user: duelUsers[1],
      score: template.getScore(duelUsers[1]),
      secondary: template.getSecondary(duelUsers[1]),
    };

    let winner = first;
    let loser = second;

    if (second.score > first.score) {
      winner = second;
      loser = first;
    } else if (second.score === first.score) {
      if (second.secondary > first.secondary) {
        winner = second;
        loser = first;
      } else if (second.secondary === first.secondary && second.user.name.localeCompare(first.user.name) < 0) {
        winner = second;
        loser = first;
      }
    }

    return {
      ...template,
      winner,
      loser,
    };
  });

  const awards: ChatChallenge[] = awardCandidates.map((candidate) => ({
    key: candidate.key,
    title: candidate.title,
    emoji: candidate.emoji,
    description: candidate.description,
    winnerName: candidate.winner.user.name,
    loserName: candidate.loser.user.name,
    winnerScore: candidate.winner.score,
    loserScore: candidate.loser.score,
    winnerValue: candidate.formatValue(candidate.winner.score, candidate.winner.user),
    loserValue: candidate.formatValue(candidate.loser.score, candidate.loser.user),
    scoreSuffix: candidate.scoreSuffix,
    balanceNote: undefined,
  }));

  const monthlyJourney: MonthlyJourneyEntry[] = Array.from(monthlyStoryRaw.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, entry]) => {
      const [, mm] = month.split('-');
      const label = MONTHS_SHORT[parseInt(mm, 10) - 1];
      const stickerOfMonth = stickerTimlineEntries.find((item) => item.month === month);

      if (entry.love >= Math.max(entry.pos, entry.neg) && entry.love > 0) {
        return {
          month,
          label,
          title: 'Il mese piu caldo',
          description: `${entry.love} parole ad alta intensita hanno preso il sopravvento.`,
          mood: 'warm',
          stickerBlobUrl: stickerOfMonth?.topStickerBlobUrl,
          isAnimated: stickerOfMonth?.isAnimated,
        };
      }

      if (entry.neg > entry.pos && entry.neg > 0) {
        return {
          month,
          label,
          title: 'Il mese più triste',
          description: `${entry.neg} segnali negativi hanno superato i momenti positivi.`,
          mood: 'sad',
          stickerBlobUrl: stickerOfMonth?.topStickerBlobUrl,
          isAnimated: stickerOfMonth?.isAnimated,
        };
      }

      if (stickerOfMonth) {
        return {
          month,
          label,
          title: 'Lo sticker del mese',
          description: `${stickerOfMonth.count} invii per lo sticker dominante del periodo.`,
          mood: 'sticker',
          stickerBlobUrl: stickerOfMonth.topStickerBlobUrl,
          isAnimated: stickerOfMonth.isAnimated,
        };
      }

      return {
        month,
        label,
        title: 'Il mese del caos',
        description: `${entry.messages} messaggi hanno mosso la timeline senza un unico tema dominante.`,
        mood: 'chaos',
      };
    });

  // ── Monthly Snapshots ─────────────────────────────────────────────────────
  const allMonthKeys = new Set([
    ...monthlyWordMap.keys(),
    ...monthlyStoryRaw.keys(),
    ...stickerTimeline.keys(),
  ]);
  const MONTHS_SHORT_LABEL = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];

  const monthlySnapshots: MonthlySnapshot[] = Array.from(allMonthKeys)
    .sort()
    .map((mk) => {
      const [yy, mm] = mk.split('-');
      const label = `${MONTHS_SHORT_LABEL[parseInt(mm, 10) - 1]} '${yy.slice(2)}`;

      // Top words
      const wMap = monthlyWordMap.get(mk);
      const topW = wMap
        ? Array.from(wMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([word, count]) => ({ word, count }))
        : [];

      // Top emojis
      const eMap = monthlyEmojiMap.get(mk);
      const topE = eMap
        ? Array.from(eMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([emoji, count]) => ({ emoji, count }))
        : [];

      // Top 3 stickers
      const stMap = stickerTimeline.get(mk);
      const topSt: StickerPodiumEntry[] = stMap
        ? Array.from(stMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([path, count]) => ({
              path,
              blobUrl: blobUrlMap.get(path) ?? '',
              count,
              isAnimated: (globalAnimatedStickerMap.get(path) ?? 0) > 0,
            }))
        : [];

      // Per-user messages
      const userMsgs: Record<string, number> = {};
      const umMap = monthlyUserMsgMap.get(mk);
      if (umMap) { for (const [name, cnt] of umMap) userMsgs[name] = cnt; }

      const story = monthlyStoryRaw.get(mk);
      const media = monthlyMediaMap.get(mk);

      // Peak day + average
      const dMap = monthlyDailyMap.get(mk);
      let peakDay: { label: string; count: number } | null = null;
      let avgMsgsPerDay = 0;
      if (dMap && dMap.size > 0) {
        let maxDate = '';
        let maxCount = 0;
        for (const [d, c] of dMap) {
          if (c > maxCount) { maxCount = c; maxDate = d; }
        }
        const pd = new Date(maxDate);
        const DAY_LABEL_SHORT = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
        peakDay = { label: `${pd.getDate()} ${DAY_LABEL_SHORT[pd.getMonth()]}`, count: maxCount };
        avgMsgsPerDay = Math.round((story?.messages ?? 0) / dMap.size);
      }

      // Flavor text
      const total = story?.messages ?? 0;
      const pos = story?.pos ?? 0;
      const neg = story?.neg ?? 0;
      const love = monthlyLoveMap.get(mk) ?? 0;
      const dominantName = Object.entries(userMsgs).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
      let flavorText = '';
      if (total === 0) {
        flavorText = 'Silenzio radio. Non una sola parola.';
      } else if (love > pos && love > neg) {
        flavorText = `Un mese di fuoco 🔥 — ${dominantName} ha dominato con il cuore in mano.`;
      } else if (neg > pos * 1.5) {
        flavorText = `Turbolenze in arrivo. ${neg} parole cariche di caos.`;
      } else if (pos > neg * 3) {
        flavorText = `Vibrazioni altissime: ${pos} parole positive. Mese da incorniciare.`;
      } else if (total > 1000) {
        flavorText = `Mese esplosivo: ${total.toLocaleString('it-IT')} messaggi. La chat non dormiva mai.`;
      } else if (total < 100) {
        flavorText = 'Un mese tranquillo, poche parole ma buone.';
      } else {
        flavorText = `${total.toLocaleString('it-IT')} messaggi scambiati. ${dominantName} ha parlato di più.`;
      }

      return {
        month: mk,
        label,
        totalMessages: total,
        messagesPerUser: userMsgs,
        topWords: topW,
        topEmojis: topE,
        topStickers: topSt,
        sentiment: { pos, neg, love },
        voiceNotes: media?.voice ?? 0,
        voiceDuration: media?.voiceDuration ?? 0,
        photos: media?.photos ?? 0,
        videos: media?.videos ?? 0,
        stickerCount: media?.stickers ?? 0,
        peakDay,
        avgMsgsPerDay,
        flavorText,
      };
    });

  const global: GlobalStats = {
    totalMessages,
    totalLoveWords,
    streak,
    mediaChaos,
    awards,
    highlightCards,
    dailyVolume,
    heatmap,
    monthlySentiment,
    hourlyWave,
    monthlyJourney,
    topWords,
    stickerTimeline: stickerTimlineEntries,
    monthlySnapshots,
  };

  return {
    chatName,
    global,
    users: [user1Stats, user2Stats],
    stickers: stickerGlobal,
  };
}
