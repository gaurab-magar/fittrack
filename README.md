# FitTrack

FitTrack is a small workout tracker built with Next.js, React, TypeScript, and
Tailwind CSS. It lets you add, edit, and delete workouts and shows simple
summary totals.

Workouts are saved in the browser's local storage, so the list stays available
after refreshing the page. No account or database is required.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful commands

```bash
npm run lint
npm run build
```

## Project structure

- `app/` contains the pages and global styles.
- `components/` contains reusable UI components.
- `hooks/` contains the workout state and browser storage logic.
- `lib/` contains small, reusable helper functions.
- `types/` contains shared TypeScript types.

The main user flows are available at `/` and `/dashboard`.
