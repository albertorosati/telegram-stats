// =============================================================================
// EXPORTER — Standalone HTML export + shared dashboard CSS
// =============================================================================

import type { WrappedData } from './analytics/types';

// ---------------------------------------------------------------------------
// SHARED CSS — injected both in the React app and in the standalone export
// ---------------------------------------------------------------------------

export const WRAPPED_DASHBOARD_STYLES = /* css */ `
/* ===== SHELL & PAGE ===== */
.wrapped-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(180,255,0,0.14), transparent 30%),
    radial-gradient(circle at top right, rgba(189,0,255,0.14), transparent 26%),
    linear-gradient(180deg, #050505, #030303);
}
.wrapped-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 80px;
}
.wrapped-stack {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* ===== PANELS ===== */
.wrapped-panel {
  border-radius: 28px;
  background: rgba(17,17,17,0.82);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 24px 80px rgba(0,0,0,0.45);
  backdrop-filter: blur(20px);
}
.wrapped-scene {
  padding: 32px 28px;
}
.wrapped-panel-inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ===== UPLOAD (pre-dashboard) ===== */
.wrapped-upload-card {
  width: min(720px, 100%);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.wrapped-kicker {
  margin: 0;
  color: #8b8b95;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 0.78rem;
}
.wrapped-title {
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  line-height: 0.94;
  letter-spacing: -0.05em;
  font-weight: 800;
}
.wrapped-title-gradient {
  background: linear-gradient(90deg, #b4ff00, #bd00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.wrapped-subtitle {
  margin: 0;
  color: #c9cad2;
  max-width: 58ch;
  line-height: 1.7;
  font-size: 0.95rem;
}
.wrapped-upload-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(180,255,0,0.22), rgba(189,0,255,0.18));
  border: 1px solid rgba(255,255,255,0.14);
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s;
}
.wrapped-upload-button:hover {
  border-color: rgba(255,255,255,0.24);
}
input[type='file'] {
  display: none;
}
.wrapped-progress {
  height: 6px;
  border-radius: 99px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
}
.wrapped-progress-bar {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #b4ff00, #bd00ff);
  transition: width 0.35s ease;
}
.wrapped-status {
  margin: 0;
  color: #8b8b95;
  font-size: 0.82rem;
}
.wrapped-error {
  margin: 0;
  color: #ff4d7a;
  font-size: 0.85rem;
}
.wrapped-footnote {
  margin: 0;
  color: #666;
  font-size: 0.78rem;
  line-height: 1.5;
}

/* ===== HERO ===== */
.wrapped-hero {
  padding: 40px 32px;
}
.wrapped-hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 32px;
  align-items: start;
}
@media (max-width: 860px) {
  .wrapped-hero-grid {
    grid-template-columns: 1fr;
  }
}
.wrapped-title-user-a {
  color: #b4ff00;
}
.wrapped-title-user-b {
  color: #bd00ff;
}
.wrapped-title-plus {
  color: #666;
}
.wrapped-hero-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}
.wrapped-hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 14px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 0.78rem;
  color: #c9cad2;
}
.wrapped-hero-side {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.wrapped-mini-card {
  padding: 18px 20px;
  border-radius: 22px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
}
.wrapped-mini-card-accent {
  border-color: rgba(180,255,0,0.18);
  background: rgba(180,255,0,0.04);
}
.wrapped-mini-card-secondary {
  border-color: rgba(189,0,255,0.18);
  background: rgba(189,0,255,0.04);
}
.wrapped-mini-label {
  margin: 0 0 4px;
  font-size: 0.82rem;
  color: #8b8b95;
}
.wrapped-mini-value {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
}
.wrapped-mini-detail {
  margin: 4px 0 0;
  font-size: 0.76rem;
  color: #666;
}

/* ===== TAB NAV ===== */
.wrapped-tab-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding: 0 4px;
}
.wrapped-tab-bar {
  display: flex;
  gap: 6px;
  overflow-x: auto;
}
.wrapped-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  color: #8b8b95;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.wrapped-tab-btn:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}
.wrapped-tab-btn.is-active {
  background: linear-gradient(90deg, rgba(180,255,0,0.16), rgba(189,0,255,0.12));
  border-color: rgba(180,255,0,0.24);
  color: #fff;
}
.wrapped-tab-btn-icon {
  display: inline-flex;
}
.wrapped-tab-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.wrapped-action-row {
  display: flex;
  gap: 10px;
}
.wrapped-export-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #b4ff00, #00d1ff);
  border: none;
  color: #030303;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s;
}
.wrapped-export-button:hover {
  opacity: 0.88;
}
.wrapped-export-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== SECTION HEADING ===== */
.wrapped-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.wrapped-section-kicker {
  display: block;
  margin-bottom: 6px;
  color: #8b8b95;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.72rem;
}
.wrapped-section-title {
  margin: 0;
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}
.wrapped-section-description {
  margin: 6px 0 0;
  color: #c9cad2;
  max-width: 58ch;
  line-height: 1.65;
  font-size: 0.9rem;
}

/* ===== BENTO GRID / METRIC CARDS ===== */
.wrapped-bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}
.wrapped-bento-stat,
.wrapped-chaos-card {
  padding: 22px 20px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.wrapped-bento-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.wrapped-bento-emoji {
  font-size: 1.5rem;
}
.wrapped-bento-icon {
  color: #8b8b95;
}
.wrapped-metric-label {
  margin: 0;
  color: #8b8b95;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  font-weight: 600;
}
.wrapped-metric-value {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.wrapped-metric-detail {
  margin: 0;
  color: #666;
  font-size: 0.78rem;
  line-height: 1.5;
}
.wrapped-chaos-value {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.wrapped-chaos-copy {
  margin: 0;
  color: #999;
  font-size: 0.82rem;
  line-height: 1.6;
}

/* ===== HIGHLIGHT / STORY ===== */
.wrapped-highlight-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}
.wrapped-story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}
.wrapped-story-card {
  padding: 22px 20px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 3px solid var(--wrapped-story-accent, rgba(180,255,0,0.3));
}
.wrapped-story-eyebrow {
  margin: 0;
  color: #8b8b95;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.68rem;
}
.wrapped-story-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}
.wrapped-story-copy {
  margin: 0;
  color: #999;
  font-size: 0.82rem;
  line-height: 1.6;
}

/* ===== VERSUS / AWARDS ===== */
.wrapped-versus-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 18px;
}
.wrapped-versus-card {
  padding: 22px 20px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.wrapped-versus-head {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.wrapped-versus-title-block {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.wrapped-versus-emoji {
  font-size: 1.5rem;
}
.wrapped-versus-icon {
  color: #8b8b95;
}
.wrapped-break-words {
  overflow-wrap: break-word;
  word-break: break-word;
  min-width: 0;
}
.wrapped-versus-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.wrapped-versus-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.wrapped-versus-row-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.wrapped-versus-name {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #d4d5dd;
}
.wrapped-award-mega {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #b4ff00;
}
.wrapped-versus-secondary-score {
  font-size: 1.2rem;
  font-weight: 700;
  color: #8b8b95;
}
.wrapped-versus-track {
  height: 8px;
  border-radius: 99px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
}
.wrapped-versus-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.6s ease;
}
.wrapped-versus-fill-winner {
  background: linear-gradient(90deg, #b4ff00, #00d1ff);
}
.wrapped-versus-fill-loser {
  background: rgba(189,0,255,0.5);
}

/* ===== CHARTS ===== */
.wrapped-chart-slide {
  /* no extra spacing needed */
}
.wrapped-chart-frame {
  width: 100%;
  height: 340px;
}
.wrapped-chart-clip {
  overflow: hidden;
  border-radius: 16px;
}
.wrapped-chart-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ===== HEATMAP ===== */
.wrapped-heatmap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-x: auto;
}
.wrapped-heatmap-grid {
  display: grid;
  grid-template-columns: 40px repeat(24, 1fr);
  gap: 2px;
}
.wrapped-heatmap-hour {
  text-align: center;
  font-size: 0.6rem;
  color: #8b8b95;
  padding: 2px 0;
}
.wrapped-heatmap-day {
  font-size: 0.7rem;
  color: #8b8b95;
  display: flex;
  align-items: center;
}
.wrapped-heatmap-cell {
  aspect-ratio: 1;
  border-radius: 4px;
  min-width: 12px;
}
.wrapped-heatmap-legend {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.68rem;
  color: #8b8b95;
}
.wrapped-heatmap-scale {
  display: flex;
  gap: 3px;
}
.wrapped-heatmap-scale span {
  width: 18px;
  height: 12px;
  border-radius: 3px;
}

/* ===== WORD CLOUD ===== */
.wrapped-word-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  align-items: baseline;
  justify-content: center;
  padding: 12px 0;
}
.wrapped-word {
  display: inline-block;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  transition: transform 0.2s;
}
.wrapped-word:hover {
  transform: scale(1.12) !important;
}

/* ===== MINI KPI GRID ===== */
.wrapped-mini-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

/* ===== STAT BOX (shared) ===== */
.wrapped-stat-box {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.wrapped-stat-label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  color: #8b8b95;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.68rem;
  font-weight: 600;
}
.wrapped-stat-value {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.wrapped-stat-subvalue {
  margin: 0;
  color: #666;
  font-size: 0.74rem;
}

/* ===== ANCHOR GRID (first/last sticker) ===== */
.wrapped-anchor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 18px;
}
.wrapped-anchor-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;
}

/* ===== MEDIA FRAME ===== */
.wrapped-media-frame {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
}
.wrapped-media-frame img,
.wrapped-media-frame video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.wrapped-media-frame-hero {
  width: 140px;
  height: 140px;
}

/* ===== STICKER SECTION ===== */
.wrapped-sticker-battle-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
@media (max-width: 700px) {
  .wrapped-sticker-battle-grid {
    grid-template-columns: 1fr;
  }
}
.wrapped-sticker-user-card {
  padding: 24px 22px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.wrapped-sticker-user-card:hover {
  border-color: color-mix(in srgb, var(--sticker-accent, #b4ff00) 30%, transparent);
  box-shadow: 0 0 40px color-mix(in srgb, var(--sticker-accent, #b4ff00) 10%, transparent);
}
.sticker-card-winner {
  border-color: rgba(180,255,0,0.18);
  background: linear-gradient(160deg, rgba(180,255,0,0.04), rgba(17,17,17,0.82) 50%);
}
.sticker-winner-tag {
  position: absolute;
  top: 14px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #030303;
  background: #b4ff00;
}
.sticker-user-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
}
.sticker-big-number {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.sticker-big-count {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
}
.sticker-big-suffix {
  font-size: 0.9rem;
  color: #8b8b95;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}
.wrapped-user-name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
}
.wrapped-sticker-user-kpis {
  display: flex;
  gap: 24px;
}
.wrapped-sticker-total-score {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.wrapped-sticker-top-grid {
  display: flex;
  gap: 14px;
}
.wrapped-sticker-top-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 100px;
  cursor: default;
}
.wrapped-sticker-top-count {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #b4ff00;
}
.wrapped-sticker-footer {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

/* ===== STICKER HERO ===== */
.sticker-hero-section {
  position: relative;
  overflow: hidden;
  padding-bottom: 0;
}
.sticker-hero-mosaic-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}
.sticker-hero-mosaic-track {
  display: flex;
  gap: 8px;
  animation: stickerScroll 60s linear infinite;
  width: max-content;
}
.sticker-hero-mosaic-item .wrapped-media-frame {
  width: 56px;
  height: 56px;
  border-radius: 10px;
}
.sticker-hero-mosaic-item .wrapped-media-frame .wrapped-footnote { display: none; }
@keyframes stickerScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.sticker-hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.sticker-hero-headline {
  text-align: center;
}
.sticker-hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 0;
}
.sticker-hero-number {
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
  background: linear-gradient(135deg, #b4ff00, #00d1ff, #bd00ff);
  background-size: 200% 200%;
  animation: gradientShift 4s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
@keyframes gradientShift {
  0%,100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.sticker-hero-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #8b8b95;
  font-weight: 700;
}
.sticker-hero-stats {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.sticker-hero-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 20px;
  border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  min-width: 100px;
  backdrop-filter: blur(12px);
  transition: border-color 0.3s, transform 0.3s;
}
.sticker-hero-pill:hover {
  border-color: rgba(180,255,0,0.2);
  transform: translateY(-2px);
}
.sticker-hero-pill-icon {
  font-size: 1.4rem;
}
.sticker-hero-pill-value {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.sticker-hero-pill-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #8b8b95;
  font-weight: 600;
}
.sticker-hero-anchors {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}
.sticker-anchor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 24px;
  border-radius: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  min-width: 160px;
}
.sticker-anchor-badge {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #b4ff00;
}
.sticker-anchor-media .wrapped-media-frame {
  width: 80px;
  height: 80px;
}
.sticker-anchor-meta {
  margin: 0;
  font-size: 0.74rem;
  color: #8b8b95;
  text-align: center;
}

/* ===== STICKER PODIUM ===== */
.sticker-podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 16px;
  padding-top: 20px;
}
.sticker-podium-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 20px 20px;
  border-radius: 24px;
  position: relative;
  cursor: default;
  transition: box-shadow 0.3s;
}
.sticker-podium-gold {
  background: linear-gradient(180deg, rgba(255,215,0,0.1), rgba(17,17,17,0.9));
  border: 1px solid rgba(255,215,0,0.25);
  box-shadow: 0 0 50px rgba(255,215,0,0.12);
  min-width: 170px;
  padding-top: 36px;
}
.sticker-podium-gold:hover { box-shadow: 0 0 70px rgba(255,215,0,0.2); }
.sticker-podium-silver {
  background: linear-gradient(180deg, rgba(192,192,192,0.08), rgba(17,17,17,0.9));
  border: 1px solid rgba(192,192,192,0.15);
  min-width: 140px;
}
.sticker-podium-bronze {
  background: linear-gradient(180deg, rgba(205,127,50,0.08), rgba(17,17,17,0.9));
  border: 1px solid rgba(205,127,50,0.15);
  min-width: 140px;
}
.sticker-podium-crown {
  color: #ffd700;
  animation: crownBob 2s ease-in-out infinite;
}
@keyframes crownBob {
  0%,100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-6px) rotate(5deg); }
}
.sticker-podium-medal {
  font-size: 0.8rem;
  font-weight: 800;
  color: #b4ff00;
}
.sticker-podium-media .wrapped-media-frame {
  width: 120px;
  height: 120px;
}
.sticker-podium-gold .sticker-podium-media .wrapped-media-frame {
  width: 140px;
  height: 140px;
}
.sticker-podium-count {
  font-size: 1.1rem;
  font-weight: 800;
  color: #b4ff00;
}

/* ===== STICKER BATTLE ===== */
.sticker-battle-section { overflow: visible; }
.sticker-battle-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}
.sticker-battle-icon {
  color: #b4ff00;
  filter: drop-shadow(0 0 12px rgba(180,255,0,0.4));
}
.sticker-vs-container {
  position: relative;
}
.sticker-vs-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 14px;
  border-radius: 50%;
  background: #111;
  border: 2px solid rgba(180,255,0,0.4);
  box-shadow: 0 0 30px rgba(180,255,0,0.2);
  font-size: 0.72rem;
  font-weight: 900;
  color: #b4ff00;
  letter-spacing: 0.12em;
}
@media (max-width: 700px) {
  .sticker-vs-badge { display: none; }
}

/* ===== STICKER GRAVEYARD ===== */
.sticker-graveyard-section {
  background: linear-gradient(180deg, rgba(17,17,17,0.82), rgba(10,10,15,0.95));
}
.sticker-graveyard-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.sticker-graveyard-cell .wrapped-media-frame {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.04);
  filter: grayscale(0.4);
  transition: filter 0.3s;
}
.sticker-graveyard-cell:hover .wrapped-media-frame {
  filter: grayscale(0);
}
.sticker-graveyard-cell .wrapped-media-frame .wrapped-footnote { display: none; }
.sticker-graveyard-epitaph {
  text-align: center;
  margin: 16px 0 0;
  color: #666;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* ===== STICKER MUSEUM ===== */
.wrapped-sticker-museum-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}
.wrapped-sticker-museum-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px;
  border-radius: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  transition: border-color 0.3s, transform 0.3s;
}
.wrapped-sticker-museum-card:hover {
  border-color: rgba(180,255,0,0.15);
}
.wrapped-sticker-museum-card .wrapped-media-frame {
  width: 72px;
  height: 72px;
}
.wrapped-sticker-museum-count {
  font-size: 0.72rem;
  font-weight: 700;
  color: #8b8b95;
}

/* ===== STICKER MOSAIC ===== */
.sticker-mosaic-section { overflow: hidden; }
.sticker-mosaic-scroll {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
}
.sticker-mosaic-track {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}
.sticker-mosaic-cell .wrapped-media-frame {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  transition: transform 0.2s;
}
.sticker-mosaic-cell .wrapped-media-frame .wrapped-footnote { display: none; }

/* ===== TIMELINE ===== */
.wrapped-timeline-rail {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 8px;
}
.wrapped-month-card {
  min-width: 260px;
  max-width: 300px;
  padding: 20px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
}
.wrapped-month-card-warm {
  border-color: rgba(180,255,0,0.16);
}
.wrapped-month-card-sad {
  border-color: rgba(100,149,237,0.2);
}
.wrapped-month-card-sticker {
  border-color: rgba(255,200,0,0.2);
}
.wrapped-month-card-chaos {
  border-color: rgba(189,0,255,0.18);
}
.wrapped-month-sticker {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}
.wrapped-month-media {
  width: 80px;
  height: 80px;
}

/* ===== USER BATTLE / CARD ===== */
.wrapped-users {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 18px;
}
.wrapped-user-card {
  padding: 24px 22px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 2px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: opacity 0.3s;
}
.wrapped-user-card.is-muted {
  opacity: 0.4;
}
.wrapped-user-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.wrapped-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.06);
  font-size: 0.72rem;
  color: #c9cad2;
  white-space: nowrap;
  flex-shrink: 0;
}
.wrapped-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.wrapped-user-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.wrapped-user-media {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.wrapped-user-top-sticker {
  display: flex;
  gap: 16px;
  align-items: center;
}
.wrapped-user-behavior {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.wrapped-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.wrapped-pill {
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.06);
  font-size: 0.76rem;
  color: #c9cad2;
}
.wrapped-long-copy {
  margin: 0;
  color: #999;
  font-size: 0.82rem;
  line-height: 1.6;
  font-style: italic;
}

/* ===== UTILITY ===== */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .wrapped-versus-list,
  .wrapped-bento-grid,
  .wrapped-highlight-list,
  .wrapped-story-grid,
  .wrapped-sticker-battle-grid,
  .wrapped-users {
    grid-template-columns: 1fr;
  }
  .wrapped-user-metrics,
  .wrapped-user-media {
    grid-template-columns: repeat(2, 1fr);
  }
  .wrapped-hero-grid {
    grid-template-columns: 1fr;
  }
  .wrapped-hero {
    padding: 24px 18px;
  }
  .wrapped-scene {
    padding: 22px 16px;
  }
}
`;

// ---------------------------------------------------------------------------
// FILE-NAME HELPER
// ---------------------------------------------------------------------------

export function getWrappedExportFileName(chatName: string): string {
  const safe = chatName
    .replace(/[^a-zA-Z0-9_\- ]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 60)
    || 'telegram';
  return `${safe}_wrapped.html`;
}

// ---------------------------------------------------------------------------
// BLOB → DATA-URL CONVERTER (uses tracked blob registry)
// ---------------------------------------------------------------------------

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  const { getTrackedBlob } = await import('./analytics/parser');
  const tracked = getTrackedBlob(blobUrl);
  if (tracked) {
    return blobToBase64(tracked);
  }
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blobToBase64(blob);
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------------------
// DOM-CAPTURE EXPORT — captures the live React DOM, inlines all assets,
// wraps in a standalone HTML shell. Single source of truth = zero drift.
// ---------------------------------------------------------------------------

/**
 * Captures every rendered tab panel from the live React dashboard,
 * replaces blob: URLs with inlined data URIs, and produces a fully
 * self-contained HTML file that is visually identical to the live app.
 *
 * The React components remain the single source of truth — we never
 * duplicate layout / section builders.
 */
export async function exportToSingleHTML(
  data: WrappedData,
  sourceContainer: HTMLElement,
  onProgress?: (label: string, percent: number) => void,
): Promise<string> {
  const report = (label: string, pct: number) => onProgress?.(label, pct);
  report('Preparazione snapshot…', 2);

  // ── 1. Clone the export container so we can mutate freely ──
  //    The container is the hidden off-screen div that has ALL tabs rendered.
  //    We grab the inner .wrapped-shell to strip the positioning wrapper.
  const rawClone = sourceContainer.cloneNode(true) as HTMLElement;
  const clone = rawClone.querySelector('.wrapped-shell') as HTMLElement;
  if (!clone) throw new Error('Dashboard non trovato nel container di esportazione.');

  // ── 3. Remove elements that don't belong in the export ──
  clone.querySelectorAll('.wrapped-action-row, .wrapped-export-button, button[class*="export"]')
    .forEach(el => el.remove());
  // Remove inline <style> — the CSS is injected in the <head> of the export.
  clone.querySelectorAll('style').forEach(el => el.remove());

  // ── 4. Collect all unique blob: URLs from media elements ──
  report('Raccolta media…', 5);
  const blobSrcs = new Set<string>();
  clone.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img[src^="blob:"], video[src^="blob:"]')
    .forEach(el => blobSrcs.add(el.src));

  // ── 5. Convert blob → data URI in batches ──
  const blobMap = new Map<string, string>();
  const urlList = [...blobSrcs];
  const batchSize = 10;
  for (let i = 0; i < urlList.length; i += batchSize) {
    const batch = urlList.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(url => blobUrlToDataUrl(url)));
    batch.forEach((url, idx) => { if (results[idx]) blobMap.set(url, results[idx]); });
    const done = Math.min(i + batchSize, urlList.length);
    report(`Conversione media… (${done}/${urlList.length})`, 5 + Math.floor((done / urlList.length) * 65));
  }

  // ── 6. Replace blob: src with data URIs in the cloned DOM ──
  report('Sostituzione URL media…', 72);
  clone.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img[src^="blob:"], video[src^="blob:"]')
    .forEach(el => {
      const dataUri = blobMap.get(el.src);
      if (dataUri) el.src = dataUri;
    });

  // ── 7. Normalise Framer Motion artefacts ──
  //    Framer sets inline `opacity`, `transform`, `will-change` etc.
  //    on animated elements. For the export we "freeze" the final
  //    visible state and let CSS handle scroll-reveal animations.
  report('Pulizia DOM…', 76);
  clone.querySelectorAll<HTMLElement>('[style]').forEach(el => {
    // Keep only intentional inline styles (CSS custom props, explicit widths, etc.)
    const keep: string[] = [];
    for (let i = 0; i < el.style.length; i++) {
      const prop = el.style[i];
      // Preserve CSS custom properties and explicit layout/presentation styles
      if (
        prop.startsWith('--') ||
        prop === 'width' ||
        prop === 'height' ||
        prop === 'border-color' ||
        prop === 'background' ||
        prop === 'color' ||
        prop === 'font-size' ||
        prop === 'grid-template-columns' ||
        prop === 'animation-delay'
      ) {
        keep.push(`${prop}:${el.style.getPropertyValue(prop)}`);
      }
    }
    if (keep.length > 0) {
      el.setAttribute('style', keep.join(';'));
    } else {
      el.removeAttribute('style');
    }
  });

  // Bake CountUp final values (the off-screen container never triggers useInView)
  clone.querySelectorAll<HTMLElement>('[data-countup-value]').forEach(el => {
    const raw = Number(el.getAttribute('data-countup-value') ?? 0);
    const decimals = Number(el.getAttribute('data-countup-decimals') ?? 0);
    const prefix = el.getAttribute('data-countup-prefix') ?? '';
    const suffix = el.getAttribute('data-countup-suffix') ?? '';
    el.textContent = prefix + raw.toLocaleString('it-IT', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix;
    el.removeAttribute('data-countup-value');
    el.removeAttribute('data-countup-decimals');
    el.removeAttribute('data-countup-prefix');
    el.removeAttribute('data-countup-suffix');
  });

  // Remove React/Framer-specific data attributes
  clone.querySelectorAll('[data-framer-appear-id], [data-projection-id]').forEach(el => {
    el.removeAttribute('data-framer-appear-id');
    el.removeAttribute('data-projection-id');
  });

  // ── 8. Convert data-export-tab panels into proper tab panels ──
  report('Preparazione layout…', 80);

  // The hidden container has [data-export-tab="xxx"] divs — convert them
  // into togglable panels. First tab visible, rest hidden.
  const exportPanels = clone.querySelectorAll<HTMLElement>('[data-export-tab]');
  exportPanels.forEach((panel, i) => {
    panel.setAttribute('data-panel', panel.getAttribute('data-export-tab')!);
    panel.removeAttribute('data-export-tab');
    panel.classList.add('export-tab-panel');
    if (i > 0) panel.style.display = 'none';
  });

  // ── 9. Add scroll-reveal class to major sections ──
  clone.querySelectorAll('.wrapped-panel, .wrapped-sticker-user-card, .sticker-podium-card, .sticker-graveyard-cell, .wrapped-sticker-museum-card, .sticker-hero-pill, .sticker-anchor, .wrapped-versus-card, .wrapped-bento-stat, .wrapped-story-card, .wrapped-mini-card')
    .forEach(el => el.classList.add('export-reveal'));

  // ── 10. Get the final cleaned innerHTML ──
  report('Costruzione HTML…', 85);
  const bodyContent = clone.outerHTML;

  const chatTitle = data.chatName
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  report('Finalizzazione HTML…', 92);

  const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${chatTitle} — Telegram Wrapped</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
html,body{min-height:100%;background:#030303;color:#fff;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}

${WRAPPED_DASHBOARD_STYLES}

/* ===== EXPORT: scroll-reveal (replaces Framer Motion) ===== */
.export-reveal{opacity:0;transform:translateY(22px);transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1)}
.export-reveal.is-visible{opacity:1;transform:translateY(0)}

/* Stagger children inside grids */
.wrapped-highlight-list .export-reveal,
.wrapped-versus-list .export-reveal,
.wrapped-sticker-museum-grid .export-reveal,
.sticker-graveyard-grid .export-reveal,
.sticker-podium .export-reveal,
.sticker-hero-stats .export-reveal,
.sticker-hero-anchors .export-reveal,
.wrapped-sticker-top-grid .export-reveal{transition-delay:calc(var(--reveal-i,0) * 60ms)}

/* Hover micro-interactions (replaces Framer whileHover) */
.wrapped-versus-card:hover,.wrapped-bento-stat:hover,.wrapped-story-card:hover,
.wrapped-sticker-museum-card:hover,.sticker-podium-card:hover{transform:translateY(-6px)!important}
.wrapped-sticker-top-card:hover{transform:scale(1.1) rotate(3deg)!important}
.sticker-mosaic-cell:hover{transform:scale(1.3);z-index:10}
.sticker-graveyard-cell:hover{opacity:1!important;transform:scale(1.2) rotate(5deg)!important}

/* Pop-in for podium & pills */
.sticker-podium-card.is-visible,.sticker-hero-pill.is-visible{animation:popIn .5s cubic-bezier(.16,1,.3,1) both}
@keyframes popIn{from{opacity:0;transform:scale(.5) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}

/* Slide-from-side for battle cards */
.wrapped-sticker-battle-grid > :first-child.is-visible{animation:slideLeft .55s cubic-bezier(.16,1,.3,1) both}
.wrapped-sticker-battle-grid > :last-child.is-visible{animation:slideRight .55s cubic-bezier(.16,1,.3,1) both}
@keyframes slideLeft{from{opacity:0;transform:translateX(-60px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideRight{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}

/* VS badge pop */
.sticker-vs-badge.is-visible{animation:vsPop .4s cubic-bezier(.16,1,.3,1) .4s both}
@keyframes vsPop{from{opacity:0;transform:translate(-50%,-50%) scale(0)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}

/* Graveyard cells: ghostly entrance */
.sticker-graveyard-cell.is-visible{animation:ghostIn .45s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--reveal-i,0) * 40ms)}
@keyframes ghostIn{from{opacity:0;transform:scale(.3) rotate(-15deg)}to{opacity:.65;transform:scale(1) rotate(0)}}

.export-tab-panel{display:flex;flex-direction:column;gap:28px}
.export-banner{text-align:center;padding:24px;color:#666;font-size:.78rem}
.export-banner strong{color:#b4ff00}
</style>
</head>
<body>
${bodyContent}
<p class="export-banner">Generato con <strong>Telegram Wrapped</strong> — nessun dato inviato a server esterni.</p>
<script>
(function(){
  /* ── Tab switching ── */
  var btns=document.querySelectorAll('.wrapped-tab-btn[data-tab]');
  var panels=document.querySelectorAll('.export-tab-panel[data-panel]');
  btns.forEach(function(btn){
    btn.addEventListener('click',function(){
      btns.forEach(function(b){b.classList.remove('is-active')});
      btn.classList.add('is-active');
      var id=btn.getAttribute('data-tab');
      panels.forEach(function(p){p.style.display=p.getAttribute('data-panel')===id?'':'none'});
      /* Re-observe newly-visible reveal elements */
      if(typeof obs!=='undefined'){
        document.querySelectorAll('.export-tab-panel[data-panel="'+id+'"] .export-reveal:not(.is-visible)').forEach(function(el){obs.observe(el)});
      }
    });
  });

  /* ── Scroll-reveal via IntersectionObserver ── */
  var obs;
  if('IntersectionObserver' in window){
    obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}
      });
    },{threshold:0.06,rootMargin:'0px 0px -80px 0px'});

    document.querySelectorAll('.export-reveal').forEach(function(el,i){
      el.style.setProperty('--reveal-i',String(i%12));
      obs.observe(el);
    });

    /* Also observe VS badge separately */
    document.querySelectorAll('.sticker-vs-badge').forEach(function(el){obs.observe(el)});
  } else {
    /* Fallback: just show everything */
    document.querySelectorAll('.export-reveal').forEach(function(el){el.classList.add('is-visible')});
  }
})();
</script>
</body>
</html>`;

  report('Fatto!', 100);
  return html;
}
