// =============================================================================
// EXPORTER — Standalone HTML export + shared dashboard CSS
// =============================================================================

import type { WrappedData } from './analytics/types';

// ---------------------------------------------------------------------------
// SHARED CSS — injected both in the React app and in the standalone export
// ---------------------------------------------------------------------------

export const WRAPPED_DASHBOARD_STYLES = /* css */ `
/* ===== CSS CUSTOM PROPERTIES ===== */
:root {
  --bg-base: #030303;
  --bg-surface: #111111;
  --bg-elevated: #1a1a1a;
  --bg-card: rgba(17, 17, 17, 0.82);
  --accent-1: #b4ff00;
  --accent-2: #bd00ff;
  --accent-3: #00d1ff;
  --accent-gold: #ffd700;
  --accent-error: #ff4d7a;
  --text-primary: #ffffff;
  --text-secondary: #a0a0b0;
  --text-muted: #666666;
  --text-label: #8b8b95;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.14);
  --border-accent: rgba(180, 255, 0, 0.25);
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 9999px;
  --shadow-card: 0 24px 80px rgba(0, 0, 0, 0.45);
  --shadow-glow-accent: 0 0 40px rgba(180, 255, 0, 0.12);
  --shadow-glow-purple: 0 0 40px rgba(189, 0, 255, 0.12);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ===== SHELL & PAGE ===== */
.wrapped-shell {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(180,255,0,0.18), transparent 50%),
    radial-gradient(ellipse at 80% 0%, rgba(189,0,255,0.14), transparent 45%),
    radial-gradient(ellipse at 50% 100%, rgba(0,209,255,0.08), transparent 50%),
    linear-gradient(180deg, #050505, var(--bg-base));
  position: relative;
}
.wrapped-shell::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(180,255,0,0.045), transparent 60%);
  pointer-events: none;
  z-index: 0;
}
.wrapped-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 80px;
  position: relative;
  z-index: 1;
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
  box-shadow:
    0 24px 80px rgba(0,0,0,0.45),
    inset 0 1px 0 rgba(255,255,255,0.04);
  backdrop-filter: blur(20px);
  transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(.16,1,.3,1);
}
.wrapped-panel:hover {
  border-color: rgba(255,255,255,0.12);
  box-shadow:
    0 32px 100px rgba(0,0,0,0.55),
    inset 0 1px 0 rgba(255,255,255,0.06);
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
  padding: 48px 36px;
  position: relative;
  overflow: hidden;
}
.wrapped-hero::before {
  content: '';
  position: absolute;
  top: -80px;
  left: -80px;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(180,255,0,0.22), transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}
.wrapped-hero::after {
  content: '';
  position: absolute;
  bottom: -60px;
  right: -60px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(189,0,255,0.16), transparent 70%);
  filter: blur(60px);
  pointer-events: none;
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
  text-shadow: 0 0 40px rgba(180,255,0,0.35), 0 0 80px rgba(180,255,0,0.15);
}
.wrapped-title-user-b {
  color: #bd00ff;
  text-shadow: 0 0 40px rgba(189,0,255,0.35), 0 0 80px rgba(189,0,255,0.15);
}
.wrapped-title-plus {
  color: #555;
  font-weight: 400;
}
.wrapped-title-wrapped {
  background: linear-gradient(135deg, #b4ff00, #00d1ff, #bd00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientShift 4s ease-in-out infinite;
}
.wrapped-hero-subtitle {
  font-size: 1rem;
  color: #c9cad2;
  max-width: 50ch;
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
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  font-size: 0.78rem;
  color: #c9cad2;
  animation: pillPulse 3s ease-in-out infinite;
  animation-delay: calc(var(--reveal-i, 0) * 0.3s);
}
@keyframes pillPulse {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; border-color: rgba(180,255,0,0.2); }
}
.wrapped-hero-side {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.wrapped-mini-card {
  padding: 20px 22px;
  border-radius: 22px;
  background: rgba(255,255,255,0.04);
  border: 2px solid rgba(255,255,255,0.08);
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.wrapped-mini-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.35);
}
.wrapped-mini-card-accent {
  border-color: rgba(180,255,0,0.22);
  background: linear-gradient(135deg, rgba(180,255,0,0.08), rgba(17,17,17,0.5));
}
.wrapped-mini-card-accent:hover {
  border-color: rgba(180,255,0,0.4);
  box-shadow: 0 16px 48px rgba(180,255,0,0.1);
}
.wrapped-mini-card-secondary {
  border-color: rgba(189,0,255,0.22);
  background: linear-gradient(135deg, rgba(189,0,255,0.08), rgba(17,17,17,0.5));
}
.wrapped-mini-card-secondary:hover {
  border-color: rgba(189,0,255,0.4);
  box-shadow: 0 16px 48px rgba(189,0,255,0.1);
}
.wrapped-mini-label {
  margin: 0 0 4px;
  font-size: 0.82rem;
  color: #8b8b95;
}
.wrapped-mini-value {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1.1;
  background: linear-gradient(135deg, #fff, #d4d5dd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  position: sticky;
  top: 0;
  z-index: 50;
  padding-top: 8px;
  padding-bottom: 8px;
}
.wrapped-tab-bar {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 6px;
  border-radius: 9999px;
  background: rgba(17,17,17,0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.06);
}
.wrapped-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: #8b8b95;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(.16,1,.3,1);
  white-space: nowrap;
}
.wrapped-tab-btn:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}
.wrapped-tab-btn.is-active {
  background: linear-gradient(135deg, rgba(180,255,0,0.2), rgba(189,0,255,0.15));
  color: #fff;
  box-shadow: 0 0 20px rgba(180,255,0,0.1);
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
  padding: 0 20px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #b4ff00, #00d1ff);
  border: none;
  color: #030303;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}
.wrapped-export-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}
.wrapped-export-button:hover::before { left: 100%; }
.wrapped-export-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(180,255,0,0.25);
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(180,255,0,0.06);
  border: 1px solid rgba(180,255,0,0.12);
  color: #b4ff00;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.68rem;
  font-weight: 700;
}
.wrapped-section-title {
  margin: 0;
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.1;
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
  gap: 20px;
}
.wrapped-bento-stat,
.wrapped-chaos-card {
  padding: 26px 22px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.wrapped-bento-stat::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(180,255,0,0.08), transparent 70%);
  pointer-events: none;
  transition: opacity 0.3s;
  opacity: 0;
}
.wrapped-bento-stat:hover::before { opacity: 1; }
.wrapped-bento-stat:hover {
  border-color: rgba(180,255,0,0.2);
  box-shadow: 0 12px 40px rgba(180,255,0,0.06);
}
.wrapped-bento-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.wrapped-bento-emoji {
  font-size: 2rem;
  text-shadow: 0 0 20px rgba(255,255,255,0.1);
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
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, #fff 30%, #b4ff00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.wrapped-metric-detail {
  margin: 0;
  color: #888;
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
  gap: 20px;
}
.wrapped-story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.wrapped-story-card {
  padding: 24px 22px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 3px solid var(--wrapped-story-accent, rgba(180,255,0,0.3));
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.wrapped-story-card-lead {
  grid-column: span 2;
}
@media (max-width: 640px) {
  .wrapped-story-card-lead { grid-column: span 1; }
}
.wrapped-story-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--wrapped-story-accent, rgba(180,255,0,0.3)) 8%, transparent), transparent);
  pointer-events: none;
}
.wrapped-story-card:hover {
  border-color: color-mix(in srgb, var(--wrapped-story-accent, #b4ff00) 35%, transparent);
  box-shadow: 0 12px 40px color-mix(in srgb, var(--wrapped-story-accent, #b4ff00) 10%, transparent);
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
  gap: 20px;
}
.wrapped-versus-card {
  padding: 24px 22px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.wrapped-versus-card:hover {
  border-color: rgba(255,255,255,0.14);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
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
  position: relative;
  overflow: hidden;
}
.wrapped-versus-fill-winner::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: barShimmer 2s ease-in-out infinite;
}
@keyframes barShimmer {
  0% { left: -100%; }
  100% { left: 200%; }
}
.wrapped-versus-fill-loser {
  background: linear-gradient(90deg, rgba(189,0,255,0.6), rgba(189,0,255,0.3));
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
  border-radius: 5px;
  min-width: 12px;
  transition: transform 0.15s, box-shadow 0.15s;
}
.wrapped-heatmap-cell:hover {
  transform: scale(1.3);
  z-index: 2;
  box-shadow: 0 0 8px rgba(180,255,0,0.3);
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
  padding: 16px 0;
}
.wrapped-word {
  display: inline-block;
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
  transition: transform 0.2s, opacity 0.2s;
  cursor: default;
}
.wrapped-word:hover {
  transform: scale(1.25) !important;
  opacity: 1 !important;
  z-index: 10;
  position: relative;
  text-shadow: 0 0 20px currentColor;
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
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #030303;
  background: linear-gradient(135deg, #b4ff00, #00d1ff);
  box-shadow: 0 0 20px rgba(180,255,0,0.3);
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
  background: radial-gradient(circle, #1a1a1a, #111);
  border: 2px solid rgba(180,255,0,0.5);
  box-shadow:
    0 0 30px rgba(180,255,0,0.25),
    0 0 60px rgba(180,255,0,0.08),
    inset 0 0 15px rgba(180,255,0,0.05);
  font-size: 0.72rem;
  font-weight: 900;
  color: #b4ff00;
  letter-spacing: 0.12em;
  animation: vsPulse 3s ease-in-out infinite;
}
@keyframes vsPulse {
  0%,100% { box-shadow: 0 0 30px rgba(180,255,0,0.25), 0 0 60px rgba(180,255,0,0.08); }
  50% { box-shadow: 0 0 40px rgba(180,255,0,0.35), 0 0 80px rgba(180,255,0,0.12); }
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
  filter: grayscale(0.3);
  transition: filter 0.3s, transform 0.3s;
}
.sticker-graveyard-cell:hover .wrapped-media-frame {
  filter: grayscale(0);
  transform: scale(1.1);
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

/* ===== AWARD CARD (unified duel) ===== */
.award-card {
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.award-card:hover {
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}
.award-card-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.award-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
}
.award-card-emoji {
  font-size: 2.2rem;
  flex-shrink: 0;
  text-shadow: 0 0 16px rgba(255,255,255,0.1);
}
.award-card-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.award-card-desc {
  margin: 2px 0 0;
  color: #666;
  font-size: 0.76rem;
}
.award-card-duel {
  display: flex;
  align-items: center;
  gap: 0;
}
.award-card-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
}
.award-card-side-right {
  text-align: right;
  align-items: flex-end;
}
.award-card-crown {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #0a0a0a;
  background: #a3e635;
  align-self: flex-start;
}
.award-card-side-right .award-card-crown {
  align-self: flex-end;
}
.award-card-name {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 700;
}
.award-card-score {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
}
.award-card-detail {
  margin: 0;
  color: #555;
  font-size: 0.72rem;
}

/* Center divider */
.award-card-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
  align-self: stretch;
}
.award-card-divider-line {
  flex: 1;
  width: 1px;
  background: rgba(255,255,255,0.08);
}
.award-card-badge {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  display: grid;
  place-items: center;
  color: #a3e635;
  flex-shrink: 0;
  animation: badgePulse 2.5s ease-in-out infinite;
}
@keyframes badgePulse {
  0%,100% { box-shadow: 0 0 0 rgba(163,230,53,0); }
  50% { box-shadow: 0 0 16px rgba(163,230,53,0.25); }
}

/* Shared progress bar */
.award-card-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.award-card-bar {
  display: flex;
  height: 6px;
  border-radius: 99px;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
}
.award-card-bar-fill {
  height: 100%;
  transition: width 0.6s;
}
.award-card-bar-fill:first-child {
  border-radius: 99px 0 0 99px;
}
.award-card-bar-fill:last-child {
  border-radius: 0 99px 99px 0;
}
.award-card-pcts {
  display: flex;
  justify-content: space-between;
  font-size: 0.66rem;
  font-weight: 700;
}
@media (max-width: 640px) {
  .award-card-duel {
    flex-direction: column;
    gap: 16px;
  }
  .award-card-divider {
    flex-direction: row;
    align-self: stretch;
  }
  .award-card-divider-line {
    flex: 1; width: auto; height: 1px;
  }
  .award-card-side { padding: 0; }
  .award-card-side-right { text-align: left; align-items: flex-start; }
}

/* ===== CHAOS CHAMPION ===== */
.chaos-champion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.chaos-champion-card {
  padding: 26px 22px;
  border-radius: 22px;
  background: linear-gradient(160deg, color-mix(in srgb, var(--chaos-accent, #b4ff00) 4%, transparent), rgba(17,17,17,0.82) 40%);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  border-top: 3px solid var(--chaos-accent, #b4ff00);
}
.chaos-champion-card:hover {
  border-color: color-mix(in srgb, var(--chaos-accent, #b4ff00) 40%, transparent);
  box-shadow: 0 0 50px color-mix(in srgb, var(--chaos-accent, #b4ff00) 14%, transparent);
  transform: translateY(-6px);
}
.chaos-champion-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chaos-champion-emoji { font-size: 1.6rem; }
.chaos-champion-icon { color: var(--chaos-accent, #8b8b95); font-size: 1.2rem; }
.chaos-champion-title {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #8b8b95;
}
.chaos-champion-value {
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  background: linear-gradient(135deg, #fff 30%, var(--chaos-accent, #b4ff00));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.chaos-champion-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #030303;
  background: var(--chaos-accent, #b4ff00);
  align-self: flex-start;
  margin-top: auto;
}

/* ===== TIMELINE (vertical elegant) ===== */
.tl-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-left: 24px;
}
.tl-line {
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #b4ff00, #bd00ff, #00d1ff);
  opacity: 0.4;
}
.tl-node {
  display: flex;
  gap: 0;
  position: relative;
  padding-bottom: 24px;
}
.tl-dot-col {
  position: absolute;
  left: -24px;
  top: 20px;
  width: 15px;
  display: flex;
  justify-content: center;
}
.tl-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  font-weight: 700;
  color: #a3e635;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.tl-mood {
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
}
.tl-mood-love { background: rgba(255,80,120,0.1); color: #ff5078; }
.tl-mood-sad { background: rgba(100,149,237,0.1); color: #6495ed; }
.tl-mood-pos { background: rgba(163,230,53,0.08); color: #a3e635; }
.tl-mood-chaos { background: rgba(217,70,239,0.08); color: #d946ef; }
.tl-flavor {
  margin: 0;
  color: #999;
  font-size: 0.82rem;
  font-style: italic;
  line-height: 1.5;
  border-left: 2px solid rgba(163,230,53,0.2);
  padding-left: 10px;
}
.tl-metrics {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
}
.tl-hero {
  display: flex;
  align-items: baseline;
  gap: 5px;
}
.tl-hero-value {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  color: #fff;
}
.tl-hero-suffix {
  font-size: 0.72rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}
.tl-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.tl-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.05);
  font-size: 0.68rem;
  color: #aaa;
  font-weight: 600;
}
.tl-pill strong {
  color: #a3e635;
}
.tl-users {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tl-user-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tl-user-name {
  font-size: 0.72rem;
  font-weight: 700;
  min-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tl-user-track {
  flex: 1;
  height: 4px;
  border-radius: 99px;
  background: rgba(255,255,255,0.05);
  overflow: hidden;
}
.tl-user-fill {
  height: 100%;
  border-radius: 99px;
}
.tl-user-pct {
  font-size: 0.68rem;
  font-weight: 700;
  color: #666;
  min-width: 28px;
  text-align: right;
}
.tl-user-crown { font-size: 0.76rem; }
.tl-bottom {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.tl-stickers {
  display: flex;
  gap: 8px;
}
.tl-sticker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.tl-sticker .wrapped-media-frame {
  width: 48px;
  height: 48px;
}
.tl-sticker-count {
  font-size: 0.64rem;
  font-weight: 700;
  color: #a3e635;
}
.tl-words {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
  min-width: 140px;
}
.tl-word {
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  font-size: 0.68rem;
  color: #aaa;
}
.tl-word strong {
  color: #a3e635;
  margin-left: 3px;
}
.tl-emojis {
  display: flex;
  gap: 6px;
}
.tl-emoji {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 1.1rem;
}
.tl-emoji small {
  font-size: 0.64rem;
  color: #666;
  font-weight: 700;
}

/* ===== TIMELINE: PROGRESSION INDICATORS ===== */

/* Volume bar — horizontal strip at the top of each card */
.tl-vol-bar {
  height: 4px;
  border-radius: 99px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;
  margin-bottom: 4px;
}
.tl-vol-fill {
  height: 100%;
  width: var(--vol-pct, 0%);
  border-radius: 99px;
  background: linear-gradient(90deg, var(--tl-dominant-color, #b4ff00), color-mix(in srgb, var(--tl-dominant-color, #b4ff00) 60%, #00d1ff));
  transition: width 0.8s cubic-bezier(.16,1,.3,1);
}

/* Dynamic dot color */
.tl-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--tl-dominant-color, #a3e635);
  border: 2px solid #111;
  box-shadow: 0 0 14px color-mix(in srgb, var(--tl-dominant-color, #a3e635) 45%, transparent), 0 0 30px color-mix(in srgb, var(--tl-dominant-color, #a3e635) 15%, transparent);
}

/* Dominant-color left border accent on card */
.tl-card {
  flex: 1;
  padding: 22px;
  border-radius: 18px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-left: 3px solid var(--tl-dominant-color, rgba(163,230,53,0.3));
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.tl-card:hover {
  border-color: color-mix(in srgb, var(--tl-dominant-color, #a3e635) 35%, transparent);
  border-left-color: var(--tl-dominant-color, #a3e635);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px color-mix(in srgb, var(--tl-dominant-color, #a3e635) 8%, transparent);
}

/* Volume tiers */
.tl-card-peak {
  background: linear-gradient(135deg, color-mix(in srgb, var(--tl-dominant-color, #b4ff00) 5%, transparent), rgba(17,17,17,0.82) 60%);
  box-shadow: 0 0 40px color-mix(in srgb, var(--tl-dominant-color, #b4ff00) 8%, transparent);
  border-left-width: 4px;
}
.tl-card-high {
  border-left-width: 4px;
}
.tl-card-quiet {
  opacity: 0.72;
}
.tl-card-quiet:hover { opacity: 1; }
.tl-card-silent {
  opacity: 0.5;
  padding: 16px;
}
.tl-card-silent:hover { opacity: 0.85; }

/* Header layout */
.tl-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.tl-label-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tl-ordinal {
  font-size: 0.64rem;
  color: #555;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.tl-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

/* Delta badge (vs previous month) */
.tl-delta {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}
.tl-delta-up {
  background: rgba(180,255,0,0.1);
  color: #b4ff00;
  border: 1px solid rgba(180,255,0,0.2);
}
.tl-delta-down {
  background: rgba(255,77,122,0.08);
  color: #ff6b8a;
  border: 1px solid rgba(255,77,122,0.15);
}
.tl-delta-flat {
  background: rgba(255,255,255,0.04);
  color: #666;
  border: 1px solid rgba(255,255,255,0.06);
}

/* Epoch badges (first / last month) */
.tl-epoch {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.66rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.tl-epoch-first {
  background: rgba(180,255,0,0.1);
  color: #b4ff00;
  border: 1px solid rgba(180,255,0,0.2);
}
.tl-epoch-last {
  background: rgba(0,209,255,0.1);
  color: #00d1ff;
  border: 1px solid rgba(0,209,255,0.2);
}

/* ===== TIMELINE: CHAPTER REDESIGN ===== */

/* Chapter list — overrides .tl-timeline padding/gap */
.tl-chapter-list {
  padding-left: 0;
  gap: 24px;
}
.tl-chapter-list .tl-line { display: none; }
.tl-chapter-list .tl-node {
  display: block;
  padding-bottom: 0;
  width: 100%;
}

/* Chapter card (extends .tl-card with position:relative for bg-num) */
.tl-chapter-card {
  position: relative;
  overflow: hidden;
}

/* Huge decorative ordinal in background */
.tl-chapter-bg-num {
  position: absolute;
  right: 8px;
  top: -20px;
  font-size: 9rem;
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 1;
  color: #fff;
  opacity: 0.03;
  pointer-events: none;
  user-select: none;
  font-variant-numeric: tabular-nums;
}
.tl-card-peak .tl-chapter-bg-num {
  color: var(--tl-dominant-color, #b4ff00);
  opacity: 0.07;
}
.tl-card-high .tl-chapter-bg-num {
  color: var(--tl-dominant-color, #b4ff00);
  opacity: 0.05;
}

/* Chapter header */
.tl-chapter-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}
.tl-chapter-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tl-chapter-num {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #555;
}
.tl-chapter-month {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0;
  line-height: 1.1;
}
.tl-chapter-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--tl-dominant-color, #b4ff00);
  margin: 0;
  text-align: right;
  line-height: 1.4;
  max-width: 220px;
}

/* Volume bar — taller in chapter mode */
.tl-chapter-card .tl-vol-bar {
  height: 8px;
  margin-bottom: 8px;
}

/* Hero count — the big number */
.tl-chapter-hero {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 8px 0 6px;
  position: relative;
  z-index: 1;
}
.tl-chapter-count {
  font-size: 3.8rem;
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
  color: #fff;
}
.tl-chapter-count-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Insights row */
.tl-chapter-insights {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}
.tl-chapter-dominant {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
}

/* Sticky progress indicator */
.tl-sticky {
  position: sticky;
  top: 72px;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: 999px;
  background: rgba(13,13,13,0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.1);
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 28px;
  width: fit-content;
  box-shadow: 0 4px 20px rgba(0,0,0,0.55);
}
.tl-sticky-cap {
  color: #b4ff00;
  font-weight: 900;
  letter-spacing: 0.02em;
}
.tl-sticky-sep { color: #444; }
.tl-sticky-label { color: #aaa; }
.tl-sticky-prog {
  width: 56px;
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 99px;
  overflow: hidden;
}
.tl-sticky-prog-fill {
  height: 100%;
  background: #b4ff00;
  border-radius: 99px;
  transition: width 0.4s ease;
}

/* Story cover card */
.tl-cover {
  padding: 56px 48px 40px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(180,255,0,0.04) 0%, rgba(17,17,17,0.98) 50%, rgba(189,0,255,0.04) 100%);
  border: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 48px;
  position: relative;
  overflow: hidden;
}
.tl-cover::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 15% 50%, rgba(180,255,0,0.06) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 50%, rgba(189,0,255,0.06) 0%, transparent 55%);
  pointer-events: none;
}
.tl-cover > * { position: relative; z-index: 1; }
.tl-cover-eyebrow {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #555;
  margin: 0 0 16px;
}
.tl-cover-title {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 16px;
  line-height: 1;
}
.tl-cover-n {
  font-size: 7rem;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: #b4ff00;
  line-height: 1;
}
.tl-cover-cap {
  font-size: 2.4rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
}
.tl-cover-range {
  font-size: 0.96rem;
  color: #777;
  margin: 0 0 20px;
  font-weight: 600;
}
.tl-cover-users {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 10px;
}
.tl-cover-amp { color: #333; font-size: 1.1rem; }
.tl-cover-total {
  font-size: 0.84rem;
  color: #666;
  margin: 0;
  font-weight: 600;
}

/* Sparkline */
.tl-sparkline {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 64px;
  margin-top: 36px;
  padding-top: 4px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.tl-spark-bar {
  flex: 1;
  height: var(--spark-h, 10%);
  background: var(--spark-color, #b4ff00);
  border-radius: 3px 3px 0 0;
  opacity: 0.75;
  min-height: 4px;
  transition: opacity 0.2s, transform 0.2s;
  transform-origin: bottom;
  cursor: default;
}
.tl-spark-bar:hover {
  opacity: 1;
  transform: scaleY(1.12);
}

/* ===== CULTURE SECTION ===== */
.culture-evolution-strip {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.culture-month-pill-group {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.05);
}
.culture-month-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #b4ff00;
  min-width: 60px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.culture-word-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.culture-word-pill {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 0.74rem;
  color: #c9cad2;
}
.culture-word-pill strong {
  color: #bd00ff;
  margin-left: 4px;
}
.culture-emoji-row {
  display: flex;
  gap: 4px;
  font-size: 1.1rem;
}
.culture-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
}
.culture-kpi-card {
  padding: 20px 18px;
  border-radius: 22px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 3px solid var(--culture-accent, #b4ff00);
  transition: border-color 0.3s, transform 0.3s;
}
.culture-kpi-card:hover {
  border-color: color-mix(in srgb, var(--culture-accent, #b4ff00) 40%, transparent);
}
.culture-kpi-icon {
  color: var(--culture-accent, #8b8b95);
  margin-bottom: 4px;
}

/* ===== STICKER EVOLUTION ===== */
.sticker-evolution-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.sticker-evolution-month {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.05);
}
.sticker-evolution-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #b4ff00;
  min-width: 60px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.sticker-evolution-row {
  display: flex;
  gap: 10px;
}
.sticker-evolution-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: default;
}
.sticker-evolution-item .wrapped-media-frame {
  width: 56px;
  height: 56px;
}
.sticker-evolution-count {
  font-size: 0.68rem;
  font-weight: 700;
  color: #b4ff00;
}

/* ===== TIMELINE (legacy rail fallback) ===== */
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

/* ===== SHARE CARD (premium minimal) ===== */
.share-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.share-card {
  width: 360px;
  min-height: 640px;
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  background: #0a0a0a;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 32px 80px rgba(0,0,0,0.7);
}
.share-card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 20%, rgba(163,230,53,0.08), transparent 60%);
  pointer-events: none;
}
.share-card-content {
  position: relative;
  z-index: 1;
  padding: 44px 28px 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  text-align: center;
  min-height: 640px;
  justify-content: center;
}
.share-card-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.share-card-kicker {
  margin: 0;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: #555;
}
.share-card-divider {
  width: 32px;
  height: 1px;
  background: rgba(255,255,255,0.1);
}
.share-card-title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.2;
}
.share-card-amp {
  color: #444;
  font-weight: 400;
  margin: 0 4px;
}
.share-card-hero-num {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.share-card-big-value {
  font-size: 3.4rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  background: linear-gradient(180deg, #fff 40%, rgba(255,255,255,0.5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.share-card-big-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #666;
  font-weight: 700;
}
.share-card-metrics {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 12px 20px;
  border-radius: 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
}
.share-card-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 0 16px;
}
.share-card-metric-sep {
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.08);
}
.share-card-metric-value {
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #fff;
}
.share-card-metric-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #666;
  font-weight: 700;
}
.share-card-highlights {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.share-card-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  font-size: 0.8rem;
  color: #aaa;
  font-weight: 600;
}
.share-card-pill-icon {
  font-size: 1rem;
  flex-shrink: 0;
}
.share-card-footer {
  margin: 0;
  font-size: 0.62rem;
  color: #444;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
}
.share-card-btn {
  gap: 6px;
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
  clone.querySelectorAll('.wrapped-panel, .wrapped-sticker-user-card, .sticker-podium-card, .sticker-graveyard-cell, .wrapped-sticker-museum-card, .sticker-hero-pill, .sticker-anchor, .wrapped-versus-card, .wrapped-bento-stat, .wrapped-story-card, .wrapped-mini-card, .award-card, .award-card-side, .chaos-champion-card, .tl-node, .culture-month-pill-group, .culture-kpi-card, .sticker-evolution-month')
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
.wrapped-sticker-top-grid .export-reveal,
.award-card-duel .export-reveal,
.chaos-champion-grid .export-reveal,
.tl-timeline .export-reveal,
.culture-evolution-strip .export-reveal,
.culture-kpi-grid .export-reveal,
.sticker-evolution-grid .export-reveal{transition-delay:calc(var(--reveal-i,0) * 60ms)}

/* Hover micro-interactions (replaces Framer whileHover) */
.wrapped-versus-card:hover,.wrapped-bento-stat:hover,.wrapped-story-card:hover,
.wrapped-sticker-museum-card:hover,.sticker-podium-card:hover,
.award-card:hover,.chaos-champion-card:hover,.tl-card:hover,
.culture-kpi-card:hover{transform:translateY(-6px)!important}
.wrapped-sticker-top-card:hover{transform:scale(1.1) rotate(3deg)!important}
.sticker-mosaic-cell:hover{transform:scale(1.3);z-index:10}
.sticker-graveyard-cell:hover{opacity:1!important;transform:scale(1.2) rotate(5deg)!important}
.tl-sticker:hover,.sticker-evolution-item:hover{transform:scale(1.12)!important}

/* Pop-in for podium & pills */
.sticker-podium-card.is-visible,.sticker-hero-pill.is-visible{animation:popIn .5s cubic-bezier(.16,1,.3,1) both}
@keyframes popIn{from{opacity:0;transform:scale(.5) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}

/* Slide-from-side for battle cards */
.wrapped-sticker-battle-grid > :first-child.is-visible{animation:slideLeft .55s cubic-bezier(.16,1,.3,1) both}
.wrapped-sticker-battle-grid > :last-child.is-visible{animation:slideRight .55s cubic-bezier(.16,1,.3,1) both}
.award-card-duel > :first-child.is-visible{animation:slideLeft .55s cubic-bezier(.16,1,.3,1) both}
.award-card-duel > :last-child.is-visible{animation:slideRight .55s cubic-bezier(.16,1,.3,1) both}
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

  /* ── Sticky chapter indicator ── */
  var stickyEl=document.getElementById('tl-sticky');
  if(stickyEl&&'IntersectionObserver' in window){
    var chapNodes=document.querySelectorAll('.tl-chapter-list .tl-node[data-chapter-ordinal]');
    var totalChap=chapNodes.length;
    var chapObs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var el=entry.target;
          var ord=el.getAttribute('data-chapter-ordinal');
          var lbl=el.getAttribute('data-chapter-label');
          if(ord&&lbl){
            var capEl=stickyEl.querySelector('.tl-sticky-cap');
            var lblEl=stickyEl.querySelector('.tl-sticky-label');
            var fillEl=stickyEl.querySelector('.tl-sticky-prog-fill');
            if(capEl)capEl.textContent='Cap. '+ord+'/'+totalChap;
            if(lblEl)lblEl.textContent=lbl;
            if(fillEl)fillEl.style.width=Math.round(parseInt(ord)/totalChap*100)+'%';
          }
        }
      });
    },{threshold:0.4});
    chapNodes.forEach(function(el){chapObs.observe(el)});
  }
})();
</script>
</body>
</html>`;

  report('Fatto!', 100);
  return html;
}
