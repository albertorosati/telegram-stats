// =============================================================================
// EXPORTER — Standalone HTML export + shared dashboard CSS
// =============================================================================

import type { WrappedData } from './analytics/types';

// ---------------------------------------------------------------------------
// SHARED CSS — injected both in the React app and in the standalone export
// ---------------------------------------------------------------------------

export const WRAPPED_DASHBOARD_STYLES = /* css */ `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600;700&display=swap');

/* ===== CSS CUSTOM PROPERTIES ===== */
:root {
  --bg-base: #07111A;
  --bg-surface: #0B1B27;
  --bg-elevated: #102637;
  --bg-card: rgba(13, 34, 49, 0.86);
  --accent-1: #2AABEE;
  --accent-2: #2EE6A6;
  --accent-3: #64D2FF;
  --accent-coral: #FF6B4A;
  --accent-gold: #FFB020;
  --accent-error: #FF4D5E;
  --text-primary: #F7FBFF;
  --text-secondary: #A9C2D4;
  --text-muted: #668496;
  --text-label: #7EA4B8;
  --border-subtle: rgba(126, 200, 238, 0.12);
  --border-hover: rgba(100, 210, 255, 0.24);
  --border-accent: rgba(42, 171, 238, 0.34);
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 20px;
  --radius-pill: 9999px;
  --shadow-card: 0 18px 60px rgba(0, 13, 24, 0.36);
  --shadow-card-hover: 0 22px 70px rgba(0, 13, 24, 0.46);
  --shadow-glow-accent: 0 0 44px rgba(42, 171, 238, 0.16);
  --shadow-glow-secondary: 0 0 44px rgba(46, 230, 166, 0.14);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ===== SHELL & PAGE ===== */
.wrapped-shell {
  min-height: 100vh;
  background:
    linear-gradient(115deg, rgba(42,171,238,0.08) 0 1px, transparent 1px 100%),
    radial-gradient(circle at 80% 12%, rgba(46,230,166,0.10), transparent 30%),
    radial-gradient(circle at 18% 20%, rgba(100,210,255,0.12), transparent 34%),
    linear-gradient(180deg, var(--bg-surface), var(--bg-base));
  background-size: 100% 100%, auto, auto, auto;
  position: relative;
}
.wrapped-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 28px 20px 80px;
  position: relative;
  z-index: 1;
}
.wrapped-story-stage {
  display: flex;
  flex-direction: column;
  gap: 26px;
}
.wrapped-story-header {
  position: sticky;
  top: 16px;
  z-index: 60;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: end;
  padding: 20px 22px;
  border-radius: 24px;
  background: rgba(7,17,26,0.78);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
  transition: transform 0.32s cubic-bezier(.16,1,.3,1), opacity 0.32s ease;
}
.wrapped-story-header.is-hidden {
  transform: translateY(-18px);
  opacity: 0;
}
.wrapped-story-header.is-visible,
.wrapped-story-header-static {
  transform: translateY(0);
  opacity: 1;
}
.wrapped-story-header-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.wrapped-story-overline {
  margin: 0;
  color: var(--accent-1);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.wrapped-story-title {
  margin: 0;
  font-size: clamp(1.3rem, 2.2vw, 2.1rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
}
.wrapped-story-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
}
.wrapped-story-toolbar {
  display: flex;
  align-items: center;
  gap: 14px;
}
.wrapped-story-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
}
.wrapped-story-nav .wrapped-tab-btn {
  white-space: nowrap;
}
.wrapped-dashboard-canvas {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}
.wrapped-dashboard-main,
.wrapped-export-main {
  min-width: 0;
}
.wrapped-command-rail {
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 18px;
  border-radius: 22px;
  background: rgba(9, 28, 40, 0.84);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
}
.wrapped-command-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.wrapped-command-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  box-shadow: var(--shadow-glow-accent);
}
@media (max-width: 980px) {
  .wrapped-dashboard-canvas {
    grid-template-columns: 1fr;
  }
  .wrapped-command-rail {
    position: static;
  }
}
.wrapped-stack {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ===== PANELS ===== */
.wrapped-panel {
  border-radius: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s cubic-bezier(.16,1,.3,1);
}
.wrapped-panel:hover {
  border-color: rgba(255,255,255,0.12);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}
.wrapped-scene {
  padding: 40px 36px;
}
.wrapped-panel-inner {
  display: flex;
  flex-direction: column;
  gap: 28px;
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
  color: var(--accent-1);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.72rem;
  font-weight: 700;
}
.wrapped-title {
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  line-height: 1;
  letter-spacing: -0.03em;
  font-weight: 900;
}
.wrapped-title-gradient {
  background: linear-gradient(90deg, var(--accent-1), var(--accent-3), var(--accent-2));
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
  background: var(--accent-1);
  border: 1px solid var(--accent-1);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.wrapped-upload-button:hover {
  background: var(--accent-3);
  border-color: var(--accent-3);
  transform: translateY(-2px);
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
  background: linear-gradient(90deg, var(--accent-1), var(--accent-3), var(--accent-2));
  transition: width 0.35s ease;
}
.wrapped-status {
  margin: 0;
  color: #8b8b95;
  font-size: 0.82rem;
}
.wrapped-error {
  margin: 0;
  color: #DC2626;
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
  padding: 40px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 78% 18%, rgba(46,230,166,0.12), transparent 24%),
    radial-gradient(circle at 18% 20%, rgba(42,171,238,0.18), transparent 34%),
    linear-gradient(180deg, rgba(11,27,39,0.92), rgba(7,17,26,0.96));
  border-radius: 30px;
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card-hover);
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.9fr);
  gap: 28px;
  align-items: center;
  min-height: min(900px, calc(100dvh - 140px));
}
.wrapped-hero-orbit {
  align-items: center;
}
.wrapped-hero-copy {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}
.wrapped-hero-context {
  margin: -8px 0 0;
  color: var(--text-label);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.wrapped-orbit-stage {
  position: relative;
  min-height: 360px;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(16,38,55,0.92), rgba(7,17,26,0.76));
  border: 1px solid rgba(100,210,255,0.18);
  overflow: hidden;
}
.wrapped-orbit-ring {
  position: absolute;
  border: 1px solid rgba(126,200,238,0.16);
  border-radius: 999px;
}
.wrapped-orbit-ring-a { inset: 44px; }
.wrapped-orbit-ring-b { inset: 88px; }
.wrapped-orbit-core {
  position: absolute;
  inset: 50%;
  width: 190px;
  height: 190px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: linear-gradient(160deg, rgba(42,171,238,0.26), rgba(46,230,166,0.18));
  border: 1px solid rgba(247,251,255,0.14);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: var(--shadow-glow-accent);
}
.wrapped-orbit-label {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.wrapped-orbit-value {
  margin: 6px 0 0;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--text-primary);
}
.wrapped-orbit-whisper {
  position: absolute;
  left: 28px;
  bottom: 24px;
  max-width: 180px;
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.5;
}
.wrapped-orbit-chip {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  min-width: 132px;
  border-radius: 18px;
  background: rgba(7,17,26,0.74);
  border: 1px solid var(--border-subtle);
}
.wrapped-orbit-chip span {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-label);
}
.wrapped-orbit-chip strong {
  font-size: 0.95rem;
  line-height: 1.2;
  color: var(--text-primary);
}
.wrapped-orbit-chip-a { top: 38px; left: 28px; }
.wrapped-orbit-chip-b { right: 24px; bottom: 48px; }
.wrapped-orbit-chip-c { right: 22px; top: 72px; }
.wrapped-hero-kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  grid-column: 1 / -1;
}
.wrapped-mini-card-wide {
  grid-column: span 2;
}
@media (max-width: 980px) {
  .wrapped-story-header {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
  .wrapped-story-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .wrapped-hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}
@media (max-width: 640px) {
  .wrapped-hero,
  .wrapped-hero-kpi-grid {
    grid-template-columns: 1fr;
  }
  .wrapped-mini-card-wide {
    grid-column: span 1;
  }
  .wrapped-orbit-stage {
    min-height: 300px;
  }
  .wrapped-orbit-core {
    width: 160px;
    height: 160px;
  }
  .wrapped-story-title {
    font-size: 1.5rem;
  }
}
.wrapped-title-user-a {
  color: var(--accent-1);
}
.wrapped-title-user-b {
  color: var(--accent-2);
}
.wrapped-title-plus {
  color: #555;
  font-weight: 400;
}
.wrapped-title-wrapped {
  background: linear-gradient(135deg, var(--accent-1), var(--accent-3), var(--accent-2));
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
.wrapped-hero-manifesto {
  margin: 0;
  max-width: 46ch;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  line-height: 1.55;
  color: var(--text-primary);
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
  border: 1px solid rgba(255,255,255,0.09);
  font-size: 0.78rem;
  color: #c9cad2;
}
.wrapped-mini-card {
  padding: 20px 22px;
  border-radius: 18px;
  background: var(--bg-elevated);
  border: 1px solid rgba(255,255,255,0.08);
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.wrapped-mini-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}
.wrapped-mini-card-accent {
  border-color: rgba(42,171,238,0.22);
  border-left: 3px solid var(--accent-1);
}
.wrapped-mini-card-accent:hover {
  border-color: rgba(42,171,238,0.4);
}
.wrapped-mini-card-secondary {
  border-color: rgba(46,230,166,0.22);
  border-left: 3px solid var(--accent-2);
}
.wrapped-mini-card-secondary:hover {
  border-color: rgba(46,230,166,0.4);
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
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #ffffff;
  font-family: var(--font-mono, 'Geist Mono', monospace);
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
  flex-direction: column;
  gap: 8px;
}
.wrapped-tab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  min-height: 48px;
  padding: 12px 14px;
  border-radius: 16px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(.16,1,.3,1);
}
.wrapped-tab-btn:hover {
  background: rgba(42,171,238,0.12);
  color: var(--text-primary);
}
.wrapped-tab-btn.is-active {
  background: var(--accent-1);
  color: #07111A;
  box-shadow: none;
}
.wrapped-tab-btn-icon {
  display: inline-flex;
}
.wrapped-tab-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
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
  background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
  border: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}
.wrapped-export-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
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
  margin-bottom: 8px;
  padding: 0;
  color: var(--accent-1);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.72rem;
  font-weight: 800;
}
.wrapped-section-title {
  margin: 0;
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
}
.wrapped-section-description {
  margin: 6px 0 0;
  color: var(--text-secondary);
  max-width: 58ch;
  line-height: 1.65;
  font-size: 0.9rem;
}
@media (max-width: 980px) {
  .wrapped-tab-bar {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .wrapped-command-rail {
    gap: 14px;
  }
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
  border-radius: 18px;
  background: var(--bg-elevated);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.wrapped-bento-stat:hover {
  border-color: rgba(200,0,223,0.2);
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}
.wrapped-bento-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.wrapped-bento-emoji {
  font-size: 2rem;
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
  letter-spacing: -0.03em;
  color: #ffffff;
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
.wrapped-overview-board {
  display: grid;
  gap: 20px;
}
.wrapped-overview-header {
  padding: 0 4px;
}
.wrapped-overview-letter {
  padding: 28px 30px;
  border-radius: 26px;
  background: linear-gradient(180deg, rgba(16,38,55,0.95), rgba(7,17,26,0.88));
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.wrapped-overview-letter-label {
  margin: 0;
  color: var(--accent-2);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.wrapped-overview-letter-title {
  margin: 0;
  max-width: 14ch;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
}
.wrapped-overview-letter-copy {
  margin: 0;
  max-width: 58ch;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;
}
.wrapped-overview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
  gap: 20px;
}
.wrapped-highlight-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
.wrapped-highlight-bento {
  align-content: start;
}
.wrapped-bento-stat-lead {
  grid-column: span 2;
  min-height: 220px;
  justify-content: flex-end;
}
.wrapped-story-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
.wrapped-story-strips .wrapped-story-card {
  min-height: auto;
  gap: 6px;
}
.wrapped-story-card {
  padding: 24px 22px;
  border-radius: 18px;
  background: var(--bg-elevated);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 3px solid var(--wrapped-story-accent, rgba(200,0,223,0.3));
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
.wrapped-story-card:hover {
  border-color: color-mix(in srgb, var(--wrapped-story-accent, #C800DF) 35%, transparent);
  transform: translateX(6px);
  box-shadow: var(--shadow-card);
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
.awards-summary-board {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 20px;
}
.awards-summary-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.awards-summary-card-primary {
  background: linear-gradient(180deg, rgba(16,38,55,0.96), rgba(7,17,26,0.92));
}
.awards-summary-card-meta {
  justify-content: flex-end;
}
.awards-summary-totals {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.awards-summary-metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(7,17,26,0.46);
  border: 1px solid var(--border-subtle);
}
.awards-summary-name {
  font-size: 0.82rem;
  font-weight: 700;
}
.awards-summary-value {
  font-size: 2.6rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
}
.awards-summary-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-label);
}
.awards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.wrapped-versus-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}
.wrapped-versus-card {
  padding: 24px 22px;
  border-radius: 18px;
  background: var(--bg-elevated);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.wrapped-versus-card:hover {
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
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
  color: var(--accent-1);
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
  background: linear-gradient(90deg, var(--accent-1), var(--accent-3));
}
.wrapped-versus-fill-loser {
  background: linear-gradient(90deg, rgba(255,107,74,0.72), rgba(255,107,74,0.3));
}

/* ===== CHARTS ===== */
.wrapped-chart-mosaic {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 20px;
}
.wrapped-chart-slide {
  /* no extra spacing needed */
}
.wrapped-chart-volume { grid-column: span 8; }
.wrapped-chart-radar { grid-column: span 4; }
.wrapped-chart-sentiment { grid-column: span 4; }
.wrapped-chart-hourly { grid-column: span 4; }
.wrapped-chart-heatmap { grid-column: span 12; }
.wrapped-chart-frame {
  width: 100%;
  height: 340px;
}
.wrapped-chart-clip {
  overflow: hidden;
  border-radius: 16px;
}
.wrapped-emotion-climate {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.wrapped-emotion-climate-copy {
  margin: 0;
  max-width: 50ch;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.75;
}
.wrapped-emotion-band-list {
  display: grid;
  gap: 12px;
}
.wrapped-emotion-band {
  padding: 18px 20px;
  border-radius: 20px;
  background: rgba(16,38,55,0.82);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.wrapped-emotion-band-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.wrapped-emotion-band-label {
  color: var(--text-primary);
  font-size: 0.86rem;
  font-weight: 700;
}
.wrapped-emotion-band-value {
  color: var(--text-label);
  font-size: 0.86rem;
  font-weight: 700;
}
.wrapped-emotion-band-track {
  height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
}
.wrapped-emotion-band-fill {
  display: block;
  width: var(--emotion-width, 0%);
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--emotion-color, var(--accent-1)), color-mix(in srgb, var(--emotion-color, var(--accent-1)) 55%, #ffffff));
}
.wrapped-emotion-band-detail {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.6;
}
.wrapped-chart-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
@media (max-width: 1100px) {
  .wrapped-overview-grid,
  .wrapped-chart-mosaic {
    grid-template-columns: 1fr;
  }
  .wrapped-highlight-list {
    grid-template-columns: 1fr;
  }
  .wrapped-bento-stat-lead {
    grid-column: span 1;
  }
  .wrapped-chart-volume,
  .wrapped-chart-radar,
  .wrapped-chart-sentiment,
  .wrapped-chart-hourly,
  .wrapped-chart-heatmap {
    grid-column: auto;
  }
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
  box-shadow: 0 0 8px rgba(42,171,238,0.28);
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
  border-color: color-mix(in srgb, var(--sticker-accent, #C800DF) 30%, transparent);
  box-shadow: 0 0 40px color-mix(in srgb, var(--sticker-accent, #C800DF) 10%, transparent);
}
.sticker-card-winner {
  border-color: rgba(200,0,223,0.18);
  background: linear-gradient(160deg, rgba(200,0,223,0.04), rgba(15,15,26,0.82) 50%);
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
  color: #ffffff;
  background: linear-gradient(135deg, #C800DF, #7B2FFF);
  box-shadow: 0 0 20px rgba(200,0,223,0.3);
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
  color: #C800DF;
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
  background: linear-gradient(135deg, #C800DF, #7B2FFF, #E60076);
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
  background: var(--bg-elevated);
  border: 1px solid rgba(255,255,255,0.06);
  min-width: 100px;
  transition: border-color 0.3s, transform 0.3s;
}
.sticker-hero-pill:hover {
  border-color: rgba(200,0,223,0.2);
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
  color: #C800DF;
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
  background: linear-gradient(180deg, rgba(255,215,0,0.1), rgba(15,15,26,0.9));
  border: 1px solid rgba(255,215,0,0.25);
  box-shadow: 0 0 50px rgba(255,215,0,0.12);
  min-width: 170px;
  padding-top: 36px;
}
.sticker-podium-gold:hover { box-shadow: 0 0 70px rgba(255,215,0,0.2); }
.sticker-podium-silver {
  background: linear-gradient(180deg, rgba(192,192,192,0.08), rgba(15,15,26,0.9));
  border: 1px solid rgba(192,192,192,0.15);
  min-width: 140px;
}
.sticker-podium-bronze {
  background: linear-gradient(180deg, rgba(205,127,50,0.08), rgba(15,15,26,0.9));
  border: 1px solid rgba(205,127,50,0.15);
  min-width: 140px;
}
.sticker-podium-crown {
  color: #F59E0B;
  animation: crownBob 2s ease-in-out infinite;
}
@keyframes crownBob {
  0%,100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-3px) rotate(3deg); }
}
.sticker-podium-medal {
  font-size: 0.8rem;
  font-weight: 800;
  color: #C800DF;
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
  color: #C800DF;
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
  color: #C800DF;
  filter: drop-shadow(0 0 12px rgba(200,0,223,0.4));
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
  background: radial-gradient(circle, #161626, #111);
  border: 2px solid rgba(200,0,223,0.5);
  box-shadow:
    0 0 30px rgba(200,0,223,0.25),
    0 0 60px rgba(200,0,223,0.08),
    inset 0 0 15px rgba(200,0,223,0.05);
  font-size: 0.72rem;
  font-weight: 900;
  color: #C800DF;
  letter-spacing: 0.12em;
  animation: vsPulse 3s ease-in-out infinite;
}
@keyframes vsPulse {
  0%,100% { box-shadow: 0 0 30px rgba(200,0,223,0.25), 0 0 60px rgba(200,0,223,0.08); }
  50% { box-shadow: 0 0 40px rgba(200,0,223,0.35), 0 0 80px rgba(200,0,223,0.12); }
}
@media (max-width: 700px) {
  .sticker-vs-badge { display: none; }
}

/* ===== STICKER GRAVEYARD ===== */
.sticker-graveyard-section {
  background: linear-gradient(180deg, rgba(15,15,26,0.82), rgba(10,10,15,0.95));
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
  border-color: rgba(200,0,223,0.15);
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
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
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
  color: #ffffff;
  background: var(--accent-1);
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
  color: var(--accent-1);
  flex-shrink: 0;
  animation: badgePulse 2.5s ease-in-out infinite;
}
@keyframes badgePulse {
  0%,100% { box-shadow: 0 0 0 rgba(42,171,238,0); }
  50% { box-shadow: 0 0 16px rgba(42,171,238,0.22); }
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
  .awards-summary-board,
  .awards-grid,
  .awards-summary-totals {
    grid-template-columns: 1fr;
  }
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
  background: linear-gradient(160deg, color-mix(in srgb, var(--chaos-accent, var(--accent-1)) 8%, transparent), rgba(13,34,49,0.82) 44%);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  border-top: 3px solid var(--chaos-accent, var(--accent-1));
}
.chaos-champion-card:hover {
  border-color: color-mix(in srgb, var(--chaos-accent, var(--accent-1)) 40%, transparent);
  box-shadow: var(--shadow-card);
  transform: translateY(-3px);
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
  color: var(--text-primary);
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
  color: #08080F;
  background: var(--chaos-accent, var(--accent-1));
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
  background: linear-gradient(to bottom, var(--accent-1), var(--accent-3), var(--accent-2));
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
  color: #C800DF;
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
.tl-mood-pos { background: rgba(200,0,223,0.08); color: #C800DF; }
.tl-mood-chaos { background: rgba(217,70,239,0.08); color: #d946ef; }
.tl-flavor {
  margin: 0;
  color: #999;
  font-size: 0.82rem;
  font-style: italic;
  line-height: 1.5;
  border-left: 2px solid rgba(200,0,223,0.2);
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
  color: #C800DF;
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
  color: #C800DF;
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
  color: #C800DF;
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
  background: linear-gradient(90deg, var(--tl-dominant-color, #C800DF), color-mix(in srgb, var(--tl-dominant-color, #C800DF) 60%, #7B2FFF));
  transition: width 0.8s cubic-bezier(.16,1,.3,1);
}

/* Dynamic dot color */
.tl-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--tl-dominant-color, #C800DF);
  border: 2px solid #111;
  box-shadow: 0 0 14px color-mix(in srgb, var(--tl-dominant-color, #C800DF) 45%, transparent), 0 0 30px color-mix(in srgb, var(--tl-dominant-color, #C800DF) 15%, transparent);
}

/* Dominant-color left border accent on card */
.tl-card {
  flex: 1;
  padding: 22px;
  border-radius: 18px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-left: 3px solid var(--tl-dominant-color, rgba(200,0,223,0.3));
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.tl-card:hover {
  border-color: color-mix(in srgb, var(--tl-dominant-color, #C800DF) 35%, transparent);
  border-left-color: var(--tl-dominant-color, #C800DF);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px color-mix(in srgb, var(--tl-dominant-color, #C800DF) 8%, transparent);
}

/* Volume tiers */
.tl-card-peak {
  background: linear-gradient(135deg, color-mix(in srgb, var(--tl-dominant-color, #C800DF) 5%, transparent), rgba(15,15,26,0.82) 60%);
  box-shadow: 0 0 40px color-mix(in srgb, var(--tl-dominant-color, #C800DF) 8%, transparent);
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
  background: rgba(200,0,223,0.1);
  color: #C800DF;
  border: 1px solid rgba(200,0,223,0.2);
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
  background: rgba(200,0,223,0.1);
  color: #C800DF;
  border: 1px solid rgba(200,0,223,0.2);
}
.tl-epoch-last {
  background: rgba(123,47,255,0.1);
  color: #7B2FFF;
  border: 1px solid rgba(123,47,255,0.2);
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
  color: var(--tl-dominant-color, #C800DF);
  opacity: 0.07;
}
.tl-card-high .tl-chapter-bg-num {
  color: var(--tl-dominant-color, #C800DF);
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
  color: var(--tl-dominant-color, #C800DF);
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
  background: var(--bg-elevated);
  border: 1px solid rgba(255,255,255,0.1);
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 28px;
  width: fit-content;
  box-shadow: var(--shadow-card);
}
.tl-sticky-cap {
  color: #C800DF;
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
  background: #C800DF;
  border-radius: 99px;
  transition: width 0.4s ease;
}

/* Story cover card */
.tl-cover {
  padding: 56px 48px 40px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(200,0,223,0.04) 0%, rgba(15,15,26,0.98) 50%, rgba(230,0,118,0.04) 100%);
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
    radial-gradient(ellipse at 15% 50%, rgba(200,0,223,0.06) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 50%, rgba(230,0,118,0.06) 0%, transparent 55%);
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
  color: #C800DF;
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
  background: var(--spark-color, #C800DF);
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

/* ===== TIMELINE: EDITORIAL OVERRIDES ===== */
.wrapped-timeline-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.wrapped-timeline-stage::before {
  content: '';
  position: absolute;
  left: 50%;
  top: clamp(420px, 50vw, 560px);
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, rgba(42,171,238,0.1), rgba(100,210,255,0.34), rgba(46,230,166,0.16));
  opacity: 0.9;
  pointer-events: none;
}
.tl-timeline {
  padding-left: 0;
  gap: 42px;
}
.tl-chapter-list {
  position: relative;
  gap: 42px;
}
.tl-node {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 40px;
  align-items: start;
  padding-bottom: 0;
}
.tl-node::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 34px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: var(--tl-dominant-color, var(--accent-1));
  border: 3px solid var(--bg-base);
  box-shadow: 0 0 0 10px rgba(11,27,39,0.92), 0 0 24px color-mix(in srgb, var(--tl-dominant-color, var(--accent-1)) 44%, transparent);
  transform: translateX(-50%);
}
.tl-node-left .tl-chapter-card {
  grid-column: 1;
}
.tl-node-right .tl-chapter-card {
  grid-column: 2;
}
.tl-card {
  padding: 28px 30px 24px;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(16,38,55,0.92), rgba(7,17,26,0.9));
  border: 1px solid color-mix(in srgb, var(--tl-dominant-color, var(--accent-1)) 18%, rgba(255,255,255,0.06));
  border-left: none;
  gap: 16px;
  box-shadow: 0 22px 70px rgba(0,13,24,0.32);
}
.tl-card:hover {
  border-color: color-mix(in srgb, var(--tl-dominant-color, var(--accent-1)) 38%, transparent);
  transform: translateY(-8px) rotate(-0.3deg);
  box-shadow: 0 28px 84px color-mix(in srgb, var(--tl-dominant-color, var(--accent-1)) 12%, rgba(0,13,24,0.4));
}
.tl-card-peak {
  background: linear-gradient(180deg, color-mix(in srgb, var(--tl-dominant-color, var(--accent-1)) 9%, rgba(16,38,55,0.96)), rgba(7,17,26,0.92));
}
.tl-card-high {
  background: linear-gradient(180deg, color-mix(in srgb, var(--tl-dominant-color, var(--accent-1)) 5%, rgba(16,38,55,0.95)), rgba(7,17,26,0.9));
}
.tl-card-quiet {
  opacity: 0.9;
}
.tl-card-silent {
  opacity: 0.76;
}
.tl-mood {
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.tl-mood-love { background: rgba(46,230,166,0.12); color: var(--accent-2); }
.tl-mood-sad { background: rgba(255,77,94,0.1); color: var(--accent-error); }
.tl-mood-pos { background: rgba(100,210,255,0.12); color: var(--accent-3); }
.tl-mood-chaos { background: rgba(255,176,32,0.12); color: var(--accent-gold); }
.tl-flavor {
  color: var(--text-secondary);
  font-size: 0.96rem;
  line-height: 1.7;
  border-left: 1px solid color-mix(in srgb, var(--tl-dominant-color, var(--accent-1)) 28%, transparent);
  padding-left: 14px;
  max-width: 58ch;
}
.tl-chapter-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.tl-chapter-fact {
  padding: 16px 18px;
  border-radius: 20px;
  background: rgba(7,17,26,0.52);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tl-chapter-fact-label {
  color: var(--text-label);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tl-chapter-fact-value {
  color: var(--text-primary);
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
}
.tl-chapter-fact-detail {
  color: var(--text-secondary);
  font-size: 0.78rem;
  line-height: 1.5;
}
.tl-bottom-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.tl-bottom-kicker {
  margin: 0;
  color: var(--text-label);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tl-bottom-meta {
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 700;
}
.tl-pill {
  gap: 6px;
  padding: 6px 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}
.tl-pill strong {
  color: var(--text-primary);
}
.tl-user-track {
  height: 6px;
  background: rgba(255,255,255,0.06);
}
.tl-user-pct {
  color: var(--text-label);
}
.tl-sticker .wrapped-media-frame {
  width: 56px;
  height: 56px;
  border-radius: 18px;
}
.tl-sticker-count {
  color: var(--text-primary);
}
.tl-word {
  padding: 5px 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}
.tl-word strong {
  color: var(--text-primary);
}
.tl-emoji small {
  color: var(--text-label);
}
.tl-vol-bar {
  height: 6px;
  background: rgba(255,255,255,0.05);
}
.tl-vol-fill {
  background: linear-gradient(90deg, var(--tl-dominant-color, var(--accent-1)), color-mix(in srgb, var(--tl-dominant-color, var(--accent-1)) 62%, var(--accent-3)));
}
.tl-chapter-card {
  min-height: 100%;
}
.tl-chapter-bg-num {
  right: 18px;
  top: 10px;
  font-size: clamp(5rem, 11vw, 9rem);
  opacity: 0.05;
}
.tl-chapter-head {
  gap: 18px;
}
.tl-chapter-num {
  color: var(--text-label);
}
.tl-chapter-month {
  font-size: clamp(1.7rem, 3.2vw, 2.6rem);
  color: var(--text-primary);
}
.tl-chapter-title {
  max-width: 24ch;
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-secondary);
}
.tl-chapter-card .tl-vol-bar {
  height: 10px;
  margin-bottom: 10px;
}
.tl-chapter-hero {
  margin: 12px 0 8px;
  gap: 12px;
}
.tl-chapter-count {
  font-size: clamp(3.4rem, 8vw, 5.6rem);
  color: var(--text-primary);
}
.tl-chapter-count-label {
  color: var(--text-label);
}
.tl-chapter-insights {
  gap: 10px;
}
.tl-delta-up {
  background: rgba(46,230,166,0.12);
  color: var(--accent-2);
  border-color: rgba(46,230,166,0.2);
}
.tl-delta-down {
  background: rgba(255,77,94,0.1);
  color: var(--accent-error);
  border-color: rgba(255,77,94,0.16);
}
.tl-delta-flat {
  background: rgba(255,255,255,0.04);
  color: var(--text-label);
  border-color: rgba(255,255,255,0.06);
}
.tl-sticky {
  top: 96px;
  gap: 12px;
  padding: 10px 18px;
  background: rgba(11,27,39,0.9);
  border: 1px solid var(--border-subtle);
}
.tl-sticky-cap {
  color: var(--accent-2);
}
.tl-sticky-sep,
.tl-sticky-label {
  color: var(--text-secondary);
}
.tl-sticky-prog {
  width: 72px;
  height: 4px;
  background: rgba(255,255,255,0.08);
}
.tl-sticky-prog-fill {
  background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
}
.tl-cover {
  padding: clamp(36px, 6vw, 72px);
  border-radius: 36px;
  background: linear-gradient(135deg, rgba(16,38,55,0.98), rgba(7,17,26,0.96));
  border: 1px solid var(--border-subtle);
  margin-bottom: 0;
  box-shadow: var(--shadow-card-hover);
}
.tl-cover::before {
  background:
    radial-gradient(circle at 18% 18%, rgba(42,171,238,0.22), transparent 32%),
    radial-gradient(circle at 84% 26%, rgba(46,230,166,0.18), transparent 30%),
    linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 100%);
}
.tl-cover-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 28px;
  align-items: end;
}
.tl-cover-copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tl-cover-eyebrow {
  margin: 0;
  color: var(--accent-1);
}
.tl-cover-headline {
  margin: 0;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.92;
  letter-spacing: -0.07em;
}
.tl-cover-manifesto {
  margin: 0;
  max-width: 22ch;
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  line-height: 1.5;
  color: var(--text-primary);
}
.tl-cover-range {
  margin: 0;
  color: var(--text-label);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tl-cover-aside {
  display: flex;
  justify-content: flex-end;
}
.tl-cover-mini {
  max-width: 320px;
  padding: 22px;
  border-radius: 24px;
  background: rgba(7,17,26,0.52);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tl-cover-mini-label {
  margin: 0;
  color: var(--accent-2);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tl-cover-mini-title {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.05;
  letter-spacing: -0.04em;
}
.tl-cover-mini-copy {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}
.tl-cover-users {
  margin-top: 22px;
  margin-bottom: 0;
}
.tl-cover-amp {
  color: var(--text-label);
}
.tl-cover-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 24px;
}
.tl-cover-stat {
  padding: 18px 20px;
  border-radius: 22px;
  background: rgba(7,17,26,0.52);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tl-cover-stat-value {
  font-size: clamp(1.7rem, 3.6vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  color: var(--text-primary);
}
.tl-cover-stat-label {
  color: var(--text-label);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tl-sparkline {
  margin-top: 30px;
  height: 84px;
  padding-top: 0;
  border-top: none;
}
.tl-spark-bar {
  border-radius: 4px 4px 0 0;
}
@media (max-width: 980px) {
  .wrapped-timeline-stage::before {
    left: 18px;
    top: 560px;
  }
  .tl-chapter-facts {
    grid-template-columns: 1fr 1fr;
  }
  .tl-cover-grid,
  .tl-cover-stats,
  .tl-node {
    grid-template-columns: 1fr;
  }
  .tl-cover-aside {
    justify-content: flex-start;
  }
  .tl-node {
    gap: 24px;
    padding-left: 34px;
  }
  .tl-node::before {
    left: 18px;
    top: 32px;
    transform: none;
  }
  .tl-node-left .tl-chapter-card,
  .tl-node-right .tl-chapter-card {
    grid-column: 1;
  }
}
@media (max-width: 640px) {
  .wrapped-timeline-stage {
    gap: 22px;
  }
  .tl-chapter-facts {
    grid-template-columns: 1fr;
  }
  .wrapped-timeline-stage::before {
    top: 620px;
  }
  .tl-node {
    padding-left: 24px;
  }
  .tl-node::before {
    left: 12px;
    width: 12px;
    height: 12px;
  }
  .tl-cover-headline {
    font-size: 2.9rem;
  }
  .tl-cover-manifesto {
    max-width: none;
  }
  .tl-cover-users {
    flex-wrap: wrap;
    font-size: 1.15rem;
  }
  .tl-card {
    padding: 22px 20px 18px;
    border-radius: 24px;
  }
  .tl-chapter-count {
    font-size: 3.1rem;
  }
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
  color: var(--accent-1);
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
  color: var(--accent-2);
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
  background: rgba(16,38,55,0.84);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 3px solid var(--culture-accent, var(--accent-1));
  transition: border-color 0.3s, transform 0.3s;
}
.culture-kpi-card:hover {
  border-color: color-mix(in srgb, var(--culture-accent, var(--accent-1)) 40%, transparent);
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
  color: var(--accent-1);
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
  color: var(--accent-1);
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
  border-color: rgba(200,0,223,0.16);
}
.wrapped-month-card-sad {
  border-color: rgba(100,149,237,0.2);
}
.wrapped-month-card-sticker {
  border-color: rgba(255,200,0,0.2);
}
.wrapped-month-card-chaos {
  border-color: rgba(230,0,118,0.18);
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
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: var(--shadow-card-hover);
}
.share-card-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(200,0,223,0.045), transparent 55%);
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
  //    on animated elements. For the export we strip only those animation
  //    properties and preserve everything else (background-color, fill, etc.).
  //    NOTE: Using a blocklist instead of a whitelist because Chrome expands
  //    CSS shorthand properties (e.g. `background`) into sub-properties
  //    (`background-color`, `background-image`…) when reading el.style.
  //    A whitelist on `background` would never match and would strip cell colors.
  report('Pulizia DOM…', 76);
  const FRAMER_STRIP = new Set([
    'opacity', 'transform', 'will-change', 'visibility',
    'pointer-events', 'transform-origin', 'perspective',
    'translate', 'scale', 'rotate', 'filter',
  ]);
  clone.querySelectorAll<HTMLElement>('[style]').forEach(el => {
    const keep: string[] = [];
    for (let i = 0; i < el.style.length; i++) {
      const prop = el.style[i];
      if (!FRAMER_STRIP.has(prop)) {
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
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
html,body{min-height:100%;background:#08080F;color:#fff;font-family:'Geist',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
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
.culture-kpi-card:hover{transform:translateY(-3px)!important}
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
.export-banner strong{color:#C800DF}
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
    var chapNodes=document.querySelectorAll('.tl-chapter-list [data-chapter-ordinal]');
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
