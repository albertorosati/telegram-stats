# Telegram Stats Wrapped

Next.js app that parses a Telegram export ZIP entirely in the browser, renders the Wrapped dashboard, and exports a self-contained HTML version.

## Requirements

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000` and go to `/wrapped`.

## Production build

```bash
npm run build
npm run start
```

## Type check

```bash
npm run typecheck
```

## Current structure

- `src/app/` Next.js App Router pages
- `src/components/wrapped/` dashboard UI and export button
- `src/lib/analytics/` Telegram parsing and analytics engine
- `src/lib/exporter.ts` standalone HTML export engine

## Notes

- All parsing and export generation happen client-side.
- Sticker and media assets are converted to data URLs during export so the generated HTML file is portable.