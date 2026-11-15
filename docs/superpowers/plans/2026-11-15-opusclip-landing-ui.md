# OpusClip-Style Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the first-time visitor landing page UI to closely mirror the modern OpusClip UI shown in `/home/som2077/Pictures/Screenshots/Screenshot From 2026-11-15 08-53-02.png`.

**Architecture:** Create modular, high-performance React components inside `frontend/src/components/landing/` matching the visual hierarchy of OpusClip: announcement banner, header, hero with glowing frosted-glass capsule badge, central unified input/upload pill, and an interactive video preview with caption styling preset controls. Connect the hero input to redirect/pass the link into the clipping creation flow (`/sign-up?source_url=...` or `/` when logged in).

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS, Lucide icons, Framer Motion (`motion/react`), next-intl.

**Spec:** Redesign specification matching `/home/som2077/Pictures/Screenshots/Screenshot From 2026-11-15 08-53-02.png`.

## Global Constraints

- Preserve Next.js App Router conventions and existing routing logic in `frontend/src/components/home-router.tsx`.
- Dark-theme first, high-contrast typography, glassmorphism blur cards, responsive layout down to mobile.
- Support internationalization keys (`next-intl`) with English fallback.
- Must pass `pnpm run typecheck` and `pnpm run lint`.
- Update root `CHANGELOG.md` and pass `changelog.test.ts`.

---

### Task 1: Component Structure & Hero Styling Design

- Create `frontend/src/components/landing/opus-hero.tsx` and associated styles.
- Define layout for top announcement ribbon, navigation bar with dropdown items and "My dashboard" button, hero typography, frosted glass pill badge.

### Task 2: Hero Direct Action Input Bar

- Create `frontend/src/components/landing/hero-input-bar.tsx` with:
  - `+` icon with text input for video link / upload
  - Solid "Get free clips" pill button
  - "or" separator
  - Outlined "Auto-edit" button
  - State handling: validation for YouTube/Twitch/Kick/upload URLs, routing to sign-up/tasks with pre-filled video URL.

### Task 3: Interactive Video Preview & Caption Presets Card

- Create `frontend/src/components/landing/hero-showcase.tsx` reproducing the video player with caption style inspector panel ("Presets", "Font", "Effects", "No captions", "TO GET STARTED", "Karaoke", "CHOOSE A STYLE").
- Connect real or demo video playback with interactive style switching to delight first-time visitors.

### Task 4: Integration in `landing-page.tsx`

- Replace or enhance the top section of `frontend/src/components/landing-page.tsx` with the new OpusClip-style hero.
- Ensure seamless transition to the rest of the landing page sections (features, bento, pricing, FAQ, footer).

### Task 5: Testing, Linting & Changelog

- Run `pnpm run typecheck` and `pnpm run lint`.
- Update `CHANGELOG.md` following repository rules and verify with `pnpm exec vitest run src/lib/changelog.test.ts`.
