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
// BLOB → DATA-URL CONVERTER
// ---------------------------------------------------------------------------

async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------------------
// STANDALONE HTML EXPORT
// ---------------------------------------------------------------------------

export async function exportToSingleHTML(data: WrappedData): Promise<string> {
  // Collect all blob URLs that need conversion
  const blobUrls = new Set<string>();

  function collect(url: string | undefined) {
    if (url && url.startsWith('blob:')) {
      blobUrls.add(url);
    }
  }

  // Sticker podium / mosaic / first / last
  if (data.stickers.firstSticker) collect(data.stickers.firstSticker.blobUrl);
  if (data.stickers.lastSticker) collect(data.stickers.lastSticker.blobUrl);
  data.stickers.holyTrinity.forEach((s) => collect(s.blobUrl));
  data.stickers.museumEntries.forEach((s) => collect(s.blobUrl));
  data.stickers.mosaicUrls.forEach((url) => collect(url));

  for (const userStats of Object.values(data.stickers.byUser)) {
    userStats.podium.forEach((s) => collect(s.blobUrl));
    userStats.onesies.forEach((s) => collect(s.blobUrl));
  }

  data.global.stickerTimeline.forEach((entry) => collect(entry.topStickerBlobUrl));
  data.global.monthlyJourney.forEach((entry) => collect(entry.stickerBlobUrl));

  // Convert blob URLs to data URLs
  const blobMap = new Map<string, string>();
  const entries = [...blobUrls];
  const batchSize = 8;
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const results = await Promise.all(batch.map((url) => blobUrlToDataUrl(url)));
    batch.forEach((url, idx) => {
      if (results[idx]) blobMap.set(url, results[idx]);
    });
  }

  // Serialise data with data URLs instead of blob URLs
  const serialised = JSON.stringify(data, (_key, value) => {
    if (typeof value === 'string' && value.startsWith('blob:') && blobMap.has(value)) {
      return blobMap.get(value);
    }
    return value;
  });

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(data.chatName)} — Telegram Wrapped</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
html,body{min-height:100%;background:#030303;color:#fff;font-family:'Inter',system-ui,sans-serif}
a{color:inherit;text-decoration:none}
${WRAPPED_DASHBOARD_STYLES}
.export-banner{text-align:center;padding:18px;color:#8b8b95;font-size:.78rem}
.export-section{padding:28px 22px;border-radius:22px;background:rgba(17,17,17,.82);border:1px solid rgba(255,255,255,.08);margin-bottom:18px}
.export-section h2{font-size:1.4rem;font-weight:800;margin-bottom:14px}
.export-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.export-card{padding:18px;border-radius:18px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06)}
.export-card h3{font-size:1rem;font-weight:700;margin-bottom:6px}
.export-card p{color:#999;font-size:.82rem;line-height:1.6}
.export-sticker{width:80px;height:80px;object-fit:contain;border-radius:12px}
.export-bar{height:8px;border-radius:99px;background:rgba(255,255,255,.06);overflow:hidden;margin:6px 0}
.export-bar-fill{height:100%;border-radius:99px}
</style>
</head>
<body>
<div class="wrapped-shell">
<div class="wrapped-page wrapped-stack" id="root"></div>
</div>
<script>
var DATA=${serialised};
(function(d){
  var root=document.getElementById('root');
  var h=function(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!==undefined)e.innerHTML=html;return e};

  // Hero
  var hero=h('section','wrapped-panel wrapped-hero');
  hero.innerHTML='<div class="wrapped-hero-grid"><div>'
    +'<p class="wrapped-kicker">Il recap della chat</p>'
    +'<h1 class="wrapped-title"><span class="wrapped-title-user-a">'+esc(d.users[0].name)+'</span>'
    +'<span class="wrapped-title-plus"> + </span>'
    +'<span class="wrapped-title-user-b">'+esc(d.users[1].name)+'</span><br>Wrapped</h1>'
    +'<p class="wrapped-subtitle">Export statico generato dal browser.</p>'
    +'</div><div class="wrapped-hero-side">'
    +'<div class="wrapped-mini-card wrapped-mini-card-accent"><p class="wrapped-mini-label">Messaggi totali</p><p class="wrapped-mini-value">'+num(d.global.totalMessages)+'</p></div>'
    +'<div class="wrapped-mini-card"><p class="wrapped-mini-label">Streak massima</p><p class="wrapped-mini-value">'+num(d.global.streak.maxStreak)+' giorni</p></div>'
    +'<div class="wrapped-mini-card wrapped-mini-card-secondary"><p class="wrapped-mini-label">Sticker totali</p><p class="wrapped-mini-value">'+num(d.stickers.total)+'</p></div>'
    +'</div></div>';
  root.appendChild(hero);

  // Awards
  if(d.global.awards&&d.global.awards.length){
    var aw=h('section','export-section');
    aw.innerHTML='<h2>Le Sfide</h2><div class="export-grid">'+d.global.awards.map(function(a){
      var base=Math.max(a.winnerScore,a.loserScore,1);
      return '<div class="export-card"><h3>'+esc(a.emoji)+' '+esc(a.title)+'</h3><p>'+esc(a.description)+'</p>'
        +'<p style="margin-top:8px"><strong style="color:#b4ff00">'+esc(a.winnerName)+'</strong>: '+num(a.winnerScore)+'</p>'
        +'<div class="export-bar"><div class="export-bar-fill" style="width:'+(a.winnerScore/base*100)+'%;background:linear-gradient(90deg,#b4ff00,#00d1ff)"></div></div>'
        +'<p><strong style="color:#bd00ff">'+esc(a.loserName)+'</strong>: '+num(a.loserScore)+'</p>'
        +'<div class="export-bar"><div class="export-bar-fill" style="width:'+(a.loserScore/base*100)+'%;background:rgba(189,0,255,.5)"></div></div>'
        +'</div>';
    }).join('')+'</div>';
    root.appendChild(aw);
  }

  // Users
  d.users.forEach(function(u,i){
    var c=['#b4ff00','#bd00ff'][i];
    var sec=h('section','export-section');
    var stk=d.stickers.byUser[u.name]||{count:0,animatedCount:0,podium:[]};
    sec.innerHTML='<h2 style="color:'+c+'">'+esc(u.name)+'</h2>'
      +'<div class="export-grid">'
      +'<div class="export-card"><h3>Messaggi</h3><p style="font-size:2rem;font-weight:800">'+num(u.msgCount)+'</p><p>'+num(u.wordCount)+' parole</p></div>'
      +'<div class="export-card"><h3>Lessico</h3><p style="font-size:2rem;font-weight:800">'+u.lexicalRichness+'%</p><p>'+num(u.vocabularySize)+' termini unici</p></div>'
      +'<div class="export-card"><h3>Sticker</h3><p style="font-size:2rem;font-weight:800">'+num(stk.count)+'</p><p>'+stk.animatedCount+' animati</p></div>'
      +'<div class="export-card"><h3>Media</h3><p>'+u.imagesSent+' foto · '+u.voiceNotes+' vocali · '+u.videoFiles+' video</p></div>'
      +'</div>'
      +'<div style="margin-top:14px"><p class="wrapped-metric-label">Top parole</p><div class="wrapped-pill-row">'
      +u.topWords.slice(0,8).map(function(w){return '<span class="wrapped-pill">'+esc(w.word)+' <strong>'+w.count+'</strong></span>'}).join('')
      +'</div></div>'
      +'<div style="margin-top:10px"><p class="wrapped-metric-label">Top emoji</p><div class="wrapped-pill-row">'
      +(u.topEmojis.length?u.topEmojis.slice(0,6).map(function(e){return '<span class="wrapped-pill">'+e.emoji+' <strong>'+e.count+'</strong></span>'}).join(''):'<span class="wrapped-footnote">Nessuna</span>')
      +'</div></div>';
    root.appendChild(sec);
  });

  // Sticker podium
  var byU=d.stickers.byUser;
  var podiumHtml='';
  d.users.forEach(function(u){
    var su=byU[u.name];
    if(!su||!su.podium.length)return;
    podiumHtml+='<h3 style="margin:14px 0 8px">'+esc(u.name)+'</h3><div style="display:flex;gap:14px;flex-wrap:wrap">';
    su.podium.slice(0,3).forEach(function(s,i){
      var tag=s.isAnimated?'<video class="export-sticker" src="'+s.blobUrl+'" autoplay loop muted playsinline></video>':'<img class="export-sticker" src="'+s.blobUrl+'" alt="sticker">';
      podiumHtml+='<div style="text-align:center">'+tag+'<p style="color:#b4ff00;font-weight:700;font-size:.85rem">#'+(i+1)+' · '+s.count+'x</p></div>';
    });
    podiumHtml+='</div>';
  });
  if(podiumHtml){
    var stkSec=h('section','export-section');
    stkSec.innerHTML='<h2>Podio Sticker</h2>'+podiumHtml;
    root.appendChild(stkSec);
  }

  // Footer
  root.appendChild(h('p','export-banner','Generato con Telegram Wrapped — nessun dato inviato a server esterni.'));

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function num(n){return Number(n).toLocaleString('it-IT')}
})(DATA);
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// HTML-ESCAPE HELPER
// ---------------------------------------------------------------------------

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
