"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WordsPullUp } from "@/components/ui/prisma-hero";
import { AnimatedGroup } from "@/components/ui/hero-page";
import { HeroInputBar } from "@/components/landing/hero-input-bar";
import { OpusStage } from "@/components/landing/opus-stage";
import { VercelNavbar } from "@/components/ui/vercel-navbar";
import { SocialProviderIcon } from "@/components/social-provider-icon";
import { VIDEO_SOURCE_LABELS, VideoSourceIcon } from "@/components/video-source-icon";

interface OpusHeroProps {
  authEnabled?: boolean;
}

const ROTATING_CAPSULE_TEXTS = [
  "a week of posts",
  "a polished interview",
  "10 viral clips",
];

export function OpusHero({ authEnabled = true }: OpusHeroProps) {
  const [textIndex, setTextIndex] = React.useState(0);

  // Cycle through the animated headline phrases every 3 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROTATING_CAPSULE_TEXTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#000000] text-foreground">
      {/* ─── 1. MODERN VERCEL / NEXT.JS MEGA-MENU NAVBAR ─── */}
      <VercelNavbar authEnabled={authEnabled} />

      {/* ─── 2. HERO CONTENT SECTION ─── */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-16 lg:pb-28">

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-5xl lg:max-w-6xl text-center">
            
            {/* Top Eyebrow (clean minimal typography matching screenshot) */}
            <p className="mb-4 sm:mb-6 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-neutral-400">
              #1 AI VIDEO EDITOR AND CLIPPING TOOL
            </p>

            {/* Main Headline with Animated Rotating Capsule matching Opus screenshots */}
            <h1 className="font-sans text-3xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-extrabold tracking-tight text-white text-center leading-[1.2] text-balance">
              <span className="block mb-2 sm:mb-3">
                <WordsPullUp text="Turn any footage into" className="inline" />
              </span>

              <span className="inline-flex items-center justify-center align-middle flex-wrap sm:flex-nowrap gap-x-2 sm:gap-x-3.5 gap-y-2">
                {/* ─── Animated Morphing Capsule ─── */}
                <motion.span
                  layout
                  transition={{
                    layout: { type: "spring", stiffness: 240, damping: 28, mass: 0.8 },
                  }}
                  className="relative inline-flex items-center justify-center align-middle overflow-hidden rounded-full border border-white/20 bg-white/[0.08] px-5 sm:px-8 py-1 sm:py-2 shadow-[0_0_40px_rgba(255,255,255,0.16)] backdrop-blur-2xl"
                >
                  {/* Subtle warm glow breathing gently inside the capsule */}
                  <motion.div
                    aria-hidden
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.36),rgba(217,119,6,0.2),transparent_75%)] blur-sm"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-35 mix-blend-screen blur-md scale-110"
                    style={{ backgroundImage: "url('/clips/podcast-1.jpg')" }}
                  />

                  {/* Smooth Rotating Animated Text with simultaneous entry/exit */}
                  <div className="relative inline-block overflow-hidden py-0.5">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={textIndex}
                        initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: "-110%", opacity: 0, filter: "blur(8px)" }}
                        transition={{
                          y: { type: "spring", stiffness: 220, damping: 24, mass: 0.85 },
                          opacity: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                          filter: { duration: 0.38 },
                        }}
                        className="inline-block whitespace-nowrap text-white font-extrabold tracking-tight"
                      >
                        {ROTATING_CAPSULE_TEXTS[textIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </motion.span>

                <span className="whitespace-nowrap">
                  <WordsPullUp text="10x faster" className="inline" />
                </span>
              </span>
            </h1>

            {/* Subtitle with fluid entrance */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-400 font-normal"
            >
              Paste a link or drop a raw take, and Clipper AI clips, edits, sizes and publishes them to all social platforms in one click.
            </motion.p>

            {/* Central Unified Input Pill Bar matching screenshot layout */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10"
            >
              <HeroInputBar authEnabled={authEnabled} />
            </motion.div>
          </div>

          {/* Staggered spring entrance for interactive stage using AnimatedGroup */}
          <AnimatedGroup
            preset="blur-slide"
            className="mt-12 sm:mt-16"
          >
            <OpusStage />
          </AnimatedGroup>

          {/* Sources and Destination Platforms Bar */}
          <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-y-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs text-neutral-400 sm:flex-row sm:gap-x-8 sm:text-sm">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span className="font-medium text-neutral-500">Clip from</span>
              {(["youtube", "twitch", "kick"] as const).map((source) => (
                <span key={source} className="flex items-center gap-1.5 text-neutral-300">
                  <VideoSourceIcon source={source} className="size-3.5" aria-hidden />
                  {VIDEO_SOURCE_LABELS[source]}
                </span>
              ))}
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Upload className="size-3.5" />
                Your files
              </span>
            </div>

            <span className="hidden h-4 w-px bg-white/10 sm:block" />

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span className="font-medium text-neutral-500">Post to</span>
              {(["youtube", "tiktok"] as const).map((provider) => (
                <span key={provider} className="flex items-center gap-1.5 text-neutral-300">
                  <SocialProviderIcon provider={provider} className="size-3.5" />
                  <span className="capitalize">{provider}</span>
                </span>
              ))}
              <span className="flex items-center gap-1.5 text-neutral-300">
                <SocialProviderIcon provider="instagram" className="size-3.5" />
                <span>Reels</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
