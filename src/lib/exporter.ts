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
  // Try the tracked blob registry first (more reliable)
  const { getTrackedBlob } = await import('./analytics/parser');
  const tracked = getTrackedBlob(blobUrl);
  if (tracked) {
    return blobToBase64(tracked);
  }
  // Fallback to fetch
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blobToBase64(blob);
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------------------
// HTML / MEDIA HELPERS
// ---------------------------------------------------------------------------

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function numFmt(n: number): string {
  return n.toLocaleString('it-IT');
}

function dateFmt(d: Date | string | null | undefined): string {
  if (!d) return 'N/D';
  return new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d));
}

function mediaTag(
  url: string | undefined,
  blobMap: Map<string, string>,
  isAnimated = false,
  cssClass = '',
): string {
  if (!url) {
    return `<div class="wrapped-media-frame ${cssClass}"><span class="wrapped-footnote">–</span></div>`;
  }
  const resolved = (url.startsWith('blob:') ? blobMap.get(url) : url) ?? url;
  const isVideo = isAnimated || resolved.startsWith('data:video');
  if (isVideo) {
    return `<div class="wrapped-media-frame ${cssClass}"><video src="${resolved}" autoplay loop muted playsinline></video></div>`;
  }
  return `<div class="wrapped-media-frame ${cssClass}"><img src="${resolved}" alt="sticker"></div>`;
}

// ---------------------------------------------------------------------------
// SECTION BUILDERS
// ---------------------------------------------------------------------------

function buildHeroSection(data: WrappedData): string {
  const [u1, u2] = data.users;
  const activeDays = Math.max(data.global.dailyVolume.length, 1);
  const ed = u1.positivity + u2.positivity - u1.negativity - u2.negativity;
  return `
  <section class="wrapped-panel wrapped-hero anim-fade-up">
    <div class="wrapped-hero-grid">
      <div>
        <p class="wrapped-kicker">Il recap della chat</p>
        <h1 class="wrapped-title">
          <span class="wrapped-title-user-a">${escapeHtml(u1.name)}</span>
          <span class="wrapped-title-plus"> + </span>
          <span class="wrapped-title-user-b">${escapeHtml(u2.name)}</span><br>Wrapped
        </h1>
        <p class="wrapped-subtitle">Questa chat è un piccolo universo fatto di testo, sticker, audio, caos e rituali notturni.</p>
      </div>
      <div class="wrapped-hero-side">
        <div class="wrapped-mini-card wrapped-mini-card-accent"><p class="wrapped-mini-label">🔥 Giorni attivi</p><p class="wrapped-mini-value">${numFmt(activeDays)}</p></div>
        <div class="wrapped-mini-card"><p class="wrapped-mini-label">💬 Messaggi totali</p><p class="wrapped-mini-value">${numFmt(data.global.totalMessages)}</p><p class="wrapped-mini-detail">${numFmt(data.stickers.total)} sticker · ${numFmt(data.global.totalLoveWords)} parole ad alta intensità</p></div>
        <div class="wrapped-mini-card wrapped-mini-card-secondary"><p class="wrapped-mini-label">⚡ Pressione emotiva</p><p class="wrapped-mini-value">${ed >= 0 ? '+' : ''}${numFmt(ed)}</p></div>
      </div>
    </div>
  </section>`;
}

function buildOverviewSection(data: WrappedData): string {
  const activeDays = Math.max(data.global.dailyVolume.length, 1);
  const msgPerDay = (data.global.totalMessages / activeDays).toFixed(1);
  const stickerDensity = data.global.totalMessages === 0 ? '0' : ((data.stickers.total / data.global.totalMessages) * 100).toFixed(1);
  const totalPos = data.users.reduce((s, u) => s + u.positivity, 0);
  const totalNeg = data.users.reduce((s, u) => s + u.negativity, 0);
  const fastest = [...data.users].filter(u => u.avgResponseTime > 0).sort((a, b) => a.avgResponseTime - b.avgResponseTime)[0] ?? data.users[0];

  const cards = [
    { emoji: '⌨️', label: 'Media messaggi al giorno', value: msgPerDay, detail: `${numFmt(activeDays)} giorni attivi` },
    { emoji: '🍌', label: 'Densità sticker', value: `${stickerDensity}%`, detail: 'sticker ogni 100 messaggi' },
    { emoji: '⚡', label: 'Saldo emotivo', value: `${totalPos - totalNeg >= 0 ? '+' : ''}${numFmt(totalPos - totalNeg)}`, detail: `${numFmt(totalPos)} pos vs ${numFmt(totalNeg)} neg` },
    { emoji: '💨', label: 'Risposta lampo', value: fastest.avgResponseTimeLabel, detail: `${escapeHtml(fastest.name)} è il più rapido` },
  ];

  return `
  <section class="wrapped-panel wrapped-scene anim-fade-up">
    <div class="wrapped-panel-inner">
      <div class="wrapped-section-head"><div><span class="wrapped-section-kicker">I grandi numeri</span><h2 class="wrapped-section-title">I grandi numeri</h2></div></div>
      <div class="wrapped-highlight-list">
        ${cards.map((c, i) => `
          <article class="wrapped-bento-stat anim-fade-up" style="animation-delay:${i * 0.06}s">
            <div class="wrapped-bento-head"><span class="wrapped-bento-emoji">${c.emoji}</span></div>
            <p class="wrapped-metric-label">${escapeHtml(c.label)}</p>
            <p class="wrapped-metric-value">${c.value}</p>
            <p class="wrapped-metric-detail">${c.detail}</p>
          </article>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function buildAwardsSection(data: WrappedData): string {
  if (!data.global.awards?.length) return '';
  return `
  <section class="wrapped-panel wrapped-scene anim-fade-up">
    <div class="wrapped-panel-inner">
      <div class="wrapped-section-head"><div><span class="wrapped-section-kicker">Le sfide</span><h2 class="wrapped-section-title">Le sfide</h2></div></div>
      <div class="wrapped-versus-list">
        ${data.global.awards.map((a, i) => {
          const base = Math.max(a.winnerScore, a.loserScore, 1);
          return `
          <article class="wrapped-versus-card anim-fade-up" style="animation-delay:${i * 0.05}s">
            <div class="wrapped-versus-head"><div class="wrapped-versus-title-block"><span class="wrapped-versus-emoji">${a.emoji}</span></div><div><h3 style="margin:0;font-size:1rem;font-weight:700">${escapeHtml(a.title)}</h3><p class="wrapped-metric-detail">${escapeHtml(a.description)}</p></div></div>
            <div class="wrapped-versus-body">
              <div class="wrapped-versus-row"><div class="wrapped-versus-row-head"><p class="wrapped-versus-name">${escapeHtml(a.winnerName)}</p><span class="wrapped-award-mega">${a.winnerValue}</span></div><div class="wrapped-versus-track"><div class="wrapped-versus-fill wrapped-versus-fill-winner" style="width:${(a.winnerScore / base * 100).toFixed(1)}%"></div></div></div>
              <div class="wrapped-versus-row"><div class="wrapped-versus-row-head"><p class="wrapped-versus-name">${escapeHtml(a.loserName)}</p><span class="wrapped-versus-secondary-score">${a.loserValue}</span></div><div class="wrapped-versus-track"><div class="wrapped-versus-fill wrapped-versus-fill-loser" style="width:${(a.loserScore / base * 100).toFixed(1)}%"></div></div></div>
            </div>
          </article>`;
        }).join('')}
      </div>
    </div>
  </section>`;
}

function buildUsersSection(data: WrappedData): string {
  const colors = ['#b4ff00', '#bd00ff'];
  return `
  <section class="wrapped-panel wrapped-scene anim-fade-up">
    <div class="wrapped-panel-inner">
      <div class="wrapped-section-head"><div><span class="wrapped-section-kicker">Ritratti</span><h2 class="wrapped-section-title">Due profili, due manie</h2></div></div>
      <div class="wrapped-users">
        ${data.users.map((u, i) => {
          const c = colors[i];
          const bal = u.positivity - u.negativity;
          return `
          <article class="wrapped-user-card anim-fade-up" style="border-color:${c}33;animation-delay:${i * 0.1}s">
            <div class="wrapped-user-head"><div><h3 class="wrapped-user-name">${escapeHtml(u.name)}</h3><p class="wrapped-subtitle" style="margin-top:8px">${numFmt(u.wordCount)} parole, ${numFmt(u.vocabularySize)} termini unici, ${u.lexicalRichness}% ricchezza lessicale.</p></div></div>
            <div class="wrapped-user-metrics">
              <div class="wrapped-stat-box"><span class="wrapped-stat-label">Messaggi</span><span class="wrapped-stat-value">${numFmt(u.msgCount)}</span><span class="wrapped-stat-subvalue">${u.avgWordsPerMsg} parole/msg</span></div>
              <div class="wrapped-stat-box"><span class="wrapped-stat-label">Bilancio emotivo</span><span class="wrapped-stat-value">${bal >= 0 ? '+' : ''}${numFmt(bal)}</span><span class="wrapped-stat-subvalue">${u.positivity} pos · ${u.negativity} neg</span></div>
            </div>
            <div class="wrapped-user-media">
              <div class="wrapped-stat-box"><span class="wrapped-stat-label">Foto</span><span class="wrapped-stat-value">${numFmt(u.imagesSent)}</span></div>
              <div class="wrapped-stat-box"><span class="wrapped-stat-label">Vocali</span><span class="wrapped-stat-value">${numFmt(u.voiceNotes)}</span></div>
              <div class="wrapped-stat-box"><span class="wrapped-stat-label">Iniziative</span><span class="wrapped-stat-value">${numFmt(u.initiations)}</span><span class="wrapped-stat-subvalue">${u.doubleTexts} rincorse</span></div>
            </div>
            <div><p class="wrapped-metric-label">Top parole</p><div class="wrapped-pill-row">${u.topWords.slice(0, 8).map(w => `<span class="wrapped-pill">${escapeHtml(w.word)} <strong>${w.count}</strong></span>`).join('')}</div></div>
            <div><p class="wrapped-metric-label">Top emoji</p><div class="wrapped-pill-row">${u.topEmojis.length ? u.topEmojis.slice(0, 6).map(e => `<span class="wrapped-pill">${e.emoji} <strong>${e.count}</strong></span>`).join('') : '<span class="wrapped-footnote">Nessuna</span>'}</div></div>
          </article>`;
        }).join('')}
      </div>
    </div>
  </section>`;
}

function buildWordCloudSection(data: WrappedData): string {
  if (!data.global.topWords?.length) return '';
  return `
  <section class="wrapped-panel wrapped-scene anim-fade-up">
    <div class="wrapped-panel-inner">
      <div class="wrapped-section-head"><div><span class="wrapped-section-kicker">Il linguaggio</span><h2 class="wrapped-section-title">La nuvola delle parole</h2></div></div>
      <div class="wrapped-word-cloud">
        ${data.global.topWords.slice(0, 50).map(w => {
          const size = 1 + w.relativeSize * 4.8;
          const hue = Math.floor(Math.random() * 60 + 70);
          return `<span class="wrapped-word" style="font-size:${size}rem;color:hsl(${hue},80%,65%)">${escapeHtml(w.word)}</span>`;
        }).join(' ')}
      </div>
    </div>
  </section>`;
}

function buildStickerSections(data: WrappedData, blobMap: Map<string, string>): string {
  const stickers = data.stickers;
  if (stickers.total === 0) return '<section class="wrapped-panel wrapped-scene"><div class="wrapped-panel-inner"><p class="wrapped-footnote">Nessun sticker trovato.</p></div></section>';

  const density = data.global.totalMessages > 0 ? ((stickers.total / data.global.totalMessages) * 100).toFixed(1) : '0';
  const [u1, u2] = data.users;
  const userColors = ['#b4ff00', '#bd00ff'];

  // ── Hero ──
  let html = `
  <section class="wrapped-panel wrapped-scene sticker-hero-section anim-fade-up">
    ${stickers.mosaicUrls.length > 0 ? `
    <div class="sticker-hero-mosaic-bg" aria-hidden="true"><div class="sticker-hero-mosaic-track">
      ${stickers.mosaicUrls.slice(0, 30).map(url => `<div class="sticker-hero-mosaic-item">${mediaTag(url, blobMap)}</div>`).join('')}
      ${stickers.mosaicUrls.slice(0, 30).map(url => `<div class="sticker-hero-mosaic-item">${mediaTag(url, blobMap)}</div>`).join('')}
    </div></div>` : ''}
    <div class="wrapped-panel-inner sticker-hero-content">
      <div class="sticker-hero-headline"><p class="wrapped-kicker">La galassia degli sticker</p>
        <h2 class="sticker-hero-title"><span class="sticker-hero-number">${numFmt(stickers.total)}</span><span class="sticker-hero-label">sticker inviati</span></h2>
      </div>
      <div class="sticker-hero-stats">
        <div class="sticker-hero-pill anim-fade-up"><span class="sticker-hero-pill-icon">🎨</span><span class="sticker-hero-pill-value">${numFmt(stickers.uniqueCount)}</span><span class="sticker-hero-pill-label">unici</span></div>
        <div class="sticker-hero-pill anim-fade-up" style="animation-delay:.06s"><span class="sticker-hero-pill-icon">🎬</span><span class="sticker-hero-pill-value">${numFmt(stickers.animatedCount)}</span><span class="sticker-hero-pill-label">animati</span></div>
        <div class="sticker-hero-pill anim-fade-up" style="animation-delay:.12s"><span class="sticker-hero-pill-icon">🖼️</span><span class="sticker-hero-pill-value">${numFmt(stickers.staticCount)}</span><span class="sticker-hero-pill-label">statici</span></div>
        <div class="sticker-hero-pill anim-fade-up" style="animation-delay:.18s"><span class="sticker-hero-pill-icon">⚡</span><span class="sticker-hero-pill-value">${density}%</span><span class="sticker-hero-pill-label">densità</span></div>
      </div>
      <div class="sticker-hero-anchors">
        <div class="sticker-anchor anim-fade-up"><div class="sticker-anchor-badge">🏁 Primo</div><div class="sticker-anchor-media">${mediaTag(stickers.firstSticker?.blobUrl, blobMap, stickers.firstSticker?.isAnimated)}</div><p class="sticker-anchor-meta">${stickers.firstSticker ? `${escapeHtml(stickers.firstSticker.userName)} · ${dateFmt(stickers.firstSticker.date)}` : 'N/D'}</p></div>
        <div class="sticker-anchor anim-fade-up" style="animation-delay:.08s"><div class="sticker-anchor-badge">🔚 Ultimo</div><div class="sticker-anchor-media">${mediaTag(stickers.lastSticker?.blobUrl, blobMap, stickers.lastSticker?.isAnimated)}</div><p class="sticker-anchor-meta">${stickers.lastSticker ? `${escapeHtml(stickers.lastSticker.userName)} · ${dateFmt(stickers.lastSticker.date)}` : 'N/D'}</p></div>
      </div>
    </div>
  </section>`;

  // ── Holy Trinity ──
  if (stickers.holyTrinity.length > 0) {
    const order = [1, 0, 2];
    html += `
    <section class="wrapped-panel wrapped-scene anim-fade-up">
      <div class="wrapped-panel-inner">
        <div class="wrapped-section-head"><div><span class="wrapped-section-kicker">La santa trinità</span><h2 class="wrapped-section-title">I 3 sticker più usati in assoluto</h2></div></div>
        <div class="sticker-podium">
          ${order.map(rank => {
            const s = stickers.holyTrinity[rank];
            if (!s) return '';
            const cls = rank === 0 ? 'sticker-podium-gold' : rank === 1 ? 'sticker-podium-silver' : 'sticker-podium-bronze';
            return `
            <div class="sticker-podium-card ${cls} anim-fade-up" style="animation-delay:${rank * 0.08}s">
              ${rank === 0 ? '<div class="sticker-podium-crown">👑</div>' : ''}
              <div class="sticker-podium-medal">#${rank + 1}</div>
              <div class="sticker-podium-media">${mediaTag(s.blobUrl, blobMap, s.isAnimated)}</div>
              <span class="sticker-podium-count">${numFmt(s.count)}x</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </section>`;
  }

  // ── Battle ──
  const entries = [stickers.byUser[u1.name], stickers.byUser[u2.name]].map((e, i) => e ?? { userName: data.users[i].name, count: 0, animatedCount: 0, uniqueCount: 0, podium: [], onesies: [], radarStats: [0, 0, 0, 0, 0] as [number, number, number, number, number] });
  const winnerIdx = entries[0].count >= entries[1].count ? 0 : 1;

  html += `
  <section class="wrapped-panel wrapped-scene sticker-battle-section anim-fade-up">
    <div class="wrapped-panel-inner">
      <div class="sticker-battle-header"><div class="wrapped-section-head" style="text-align:center"><div><span class="wrapped-section-kicker">La battaglia degli sticker</span><h2 class="wrapped-section-title">La battaglia degli sticker</h2></div></div></div>
      <div class="sticker-vs-container">
        <div class="sticker-vs-badge">⚡<span>VS</span></div>
        <div class="wrapped-sticker-battle-grid">
          ${entries.map((entry, idx) => {
            const animPct = entry.count === 0 ? 0 : Math.round((entry.animatedCount / entry.count) * 100);
            const isWinner = idx === winnerIdx;
            const color = userColors[idx];
            return `
            <article class="wrapped-sticker-user-card ${isWinner ? 'sticker-card-winner' : ''} anim-fade-up" style="--sticker-accent:${color};animation-delay:${idx * 0.12}s">
              ${isWinner ? '<div class="sticker-winner-tag">🏆 Vincitore</div>' : ''}
              <h3 class="wrapped-user-name"><span class="sticker-user-dot" style="background:${color}"></span>${escapeHtml(entry.userName)}</h3>
              <div class="sticker-big-number"><span class="sticker-big-count">${numFmt(entry.count)}</span><span class="sticker-big-suffix">sticker</span></div>
              <div class="wrapped-sticker-user-kpis">
                <div class="wrapped-stat-box"><span class="wrapped-stat-label">Unici</span><span class="wrapped-stat-value">${numFmt(entry.uniqueCount)}</span></div>
                <div class="wrapped-stat-box"><span class="wrapped-stat-label">Animati</span><span class="wrapped-stat-value">${animPct}%</span></div>
              </div>
              <div class="wrapped-sticker-top-grid">
                ${entry.podium.slice(0, 3).map((s, r) => `
                  <div class="wrapped-sticker-top-card">${mediaTag(s.blobUrl, blobMap, s.isAnimated)}<p class="wrapped-metric-label">#${r + 1}</p><p class="wrapped-sticker-top-count">${numFmt(s.count)}x</p></div>
                `).join('') || '<p class="wrapped-footnote">Nessuno sticker.</p>'}
              </div>
            </article>`;
          }).join('')}
        </div>
      </div>
    </div>
  </section>`;

  // ── Graveyard ──
  const allOnesies = entries.flatMap(e => e.onesies);
  if (allOnesies.length > 0) {
    html += `
    <section class="wrapped-panel wrapped-scene sticker-graveyard-section anim-fade-up">
      <div class="wrapped-panel-inner">
        <div class="wrapped-section-head"><div><span class="wrapped-section-kicker">Il cimitero degli sticker</span><h2 class="wrapped-section-title">I Dimenticati</h2><p class="wrapped-section-description">Usati una sola volta e mai più.</p></div></div>
        <div class="sticker-graveyard-grid">
          ${allOnesies.map(s => `<div class="sticker-graveyard-cell">${mediaTag(s.blobUrl, blobMap, s.isAnimated)}</div>`).join('')}
        </div>
        <p class="sticker-graveyard-epitaph">👻 Qui giacciono ${allOnesies.length} sticker dimenticati dal tempo</p>
      </div>
    </section>`;
  }

  // ── Museum ──
  if (stickers.museumEntries.length > 0) {
    html += `
    <section class="wrapped-panel wrapped-scene anim-fade-up">
      <div class="wrapped-panel-inner">
        <div class="wrapped-section-head"><div><span class="wrapped-section-kicker">Il museo degli sticker</span><h2 class="wrapped-section-title">Il museo degli sticker</h2></div></div>
        <div class="wrapped-sticker-museum-grid">
          ${stickers.museumEntries.map(s => `<div class="wrapped-sticker-museum-card">${mediaTag(s.blobUrl, blobMap, s.isAnimated)}<span class="wrapped-sticker-museum-count">${numFmt(s.count)}x</span></div>`).join('')}
        </div>
      </div>
    </section>`;
  }

  // ── Mosaic ──
  if (stickers.mosaicUrls.length > 0) {
    html += `
    <section class="wrapped-panel wrapped-scene sticker-mosaic-section anim-fade-up">
      <div class="wrapped-panel-inner">
        <div class="wrapped-section-head"><div><span class="wrapped-section-kicker">Mosaico sticker</span><h2 class="wrapped-section-title">La parete degli sticker</h2></div></div>
        <div class="sticker-mosaic-scroll"><div class="sticker-mosaic-track">
          ${stickers.mosaicUrls.map(url => `<div class="sticker-mosaic-cell">${mediaTag(url, blobMap)}</div>`).join('')}
        </div></div>
      </div>
    </section>`;
  }

  return html;
}

// ---------------------------------------------------------------------------
// STANDALONE HTML EXPORT — Self-contained interactive single file
// ---------------------------------------------------------------------------

export async function exportToSingleHTML(
  data: WrappedData,
  onProgress?: (label: string, percent: number) => void,
): Promise<string> {
  const report = (label: string, pct: number) => onProgress?.(label, pct);

  // ── Collect all blob URLs ──
  report('Raccolta media…', 5);
  const blobUrls = new Set<string>();
  const collect = (url: string | undefined) => {
    if (url?.startsWith('blob:')) blobUrls.add(url);
  };

  if (data.stickers.firstSticker) collect(data.stickers.firstSticker.blobUrl);
  if (data.stickers.lastSticker) collect(data.stickers.lastSticker.blobUrl);
  data.stickers.holyTrinity.forEach(s => collect(s.blobUrl));
  data.stickers.museumEntries.forEach(s => collect(s.blobUrl));
  data.stickers.mosaicUrls.forEach(url => collect(url));
  for (const userStats of Object.values(data.stickers.byUser)) {
    userStats.podium.forEach(s => collect(s.blobUrl));
    userStats.onesies.forEach(s => collect(s.blobUrl));
  }
  data.global.stickerTimeline.forEach(e => collect(e.topStickerBlobUrl));
  data.global.monthlyJourney.forEach(e => collect(e.stickerBlobUrl));

  // ── Convert blob → data URIs ──
  report('Conversione media in data URI…', 10);
  const blobMap = new Map<string, string>();
  const urlList = [...blobUrls];
  const batchSize = 10;
  for (let i = 0; i < urlList.length; i += batchSize) {
    const batch = urlList.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(url => blobUrlToDataUrl(url)));
    batch.forEach((url, idx) => { if (results[idx]) blobMap.set(url, results[idx]); });
    const pct = 10 + Math.floor((i / urlList.length) * 60);
    report(`Conversione media… (${Math.min(i + batchSize, urlList.length)}/${urlList.length})`, pct);
  }

  // ── Build sections ──
  report('Costruzione pagina…', 75);

  const tabs = [
    { id: 'summary', label: '📊 Riassunto', content: buildHeroSection(data) + buildOverviewSection(data) },
    { id: 'challenges', label: '⚔️ Le Sfide', content: buildAwardsSection(data) },
    { id: 'profiles', label: '👤 I Profili', content: buildUsersSection(data) },
    { id: 'language', label: '💬 Linguaggio', content: buildWordCloudSection(data) },
    { id: 'stickers', label: '🎭 Stickers', content: buildStickerSections(data, blobMap) },
  ];

  const tabNav = `
  <nav class="wrapped-tab-nav">
    <div class="wrapped-tab-bar">
      ${tabs.map((t, i) => `<button class="wrapped-tab-btn${i === 0 ? ' is-active' : ''}" data-tab="${t.id}" type="button">${t.label}</button>`).join('')}
    </div>
  </nav>`;

  const tabPanels = tabs.map((t, i) => `
    <div class="export-tab-panel" data-panel="${t.id}" style="${i > 0 ? 'display:none' : ''}">
      ${t.content}
    </div>
  `).join('');

  const footer = `<p class="export-banner">Generato con <strong>Telegram Wrapped</strong> — nessun dato inviato a server esterni.</p>`;

  report('Finalizzazione HTML…', 90);

  const html = `<!DOCTYPE html>
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

/* ===== EXPORT-SPECIFIC ===== */
.export-tab-panel{display:flex;flex-direction:column;gap:28px}
.export-banner{text-align:center;padding:24px;color:#666;font-size:.78rem}
.export-banner strong{color:#b4ff00}

/* Scroll fade-in animation */
.anim-fade-up{opacity:0;transform:translateY(24px);animation:exportFadeUp .6s ease-out forwards}
@keyframes exportFadeUp{to{opacity:1;transform:translateY(0)}}

/* Stagger via intersection observer — start hidden, revealed by JS */
.anim-observed{opacity:0;transform:translateY(24px);transition:opacity .5s ease-out,transform .5s ease-out}
.anim-observed.is-visible{opacity:1;transform:translateY(0)}
</style>
</head>
<body>
<div class="wrapped-shell">
<div class="wrapped-page wrapped-stack">
${tabNav}
<div class="wrapped-tab-content">
${tabPanels}
</div>
${footer}
</div>
</div>
<script>
(function(){
  // Tab switching
  var btns=document.querySelectorAll('.wrapped-tab-btn');
  var panels=document.querySelectorAll('.export-tab-panel');
  btns.forEach(function(btn){
    btn.addEventListener('click',function(){
      btns.forEach(function(b){b.classList.remove('is-active')});
      btn.classList.add('is-active');
      var id=btn.getAttribute('data-tab');
      panels.forEach(function(p){p.style.display=p.getAttribute('data-panel')===id?'':'none'});
    });
  });

  // Scroll-triggered fade-in via IntersectionObserver
  if('IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}
      });
    },{threshold:0.08,rootMargin:'0px 0px -60px 0px'});
    document.querySelectorAll('.anim-fade-up').forEach(function(el){
      el.classList.remove('anim-fade-up');
      el.classList.add('anim-observed');
      obs.observe(el);
    });
  }
})();
</script>
</body>
</html>`;

  report('Fatto!', 100);
  return html;
}
