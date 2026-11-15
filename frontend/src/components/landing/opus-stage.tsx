"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import { DEMO_CLIPS } from "@/lib/demo";
import { cn } from "@/lib/utils";

type CaptionPreset = "none" | "to-get-started" | "karaoke" | "style";
type ActiveTab = "presets" | "font" | "effects";

const PRESET_OPTIONS: {
  id: CaptionPreset;
  title: string;
  badge?: string;
  previewClass?: string;
  description: string;
}[] = [
  {
    id: "none",
    title: "No captions",
    description: "Original clean video without subtitle overlay",
  },
  {
    id: "to-get-started",
    title: "TO GET STARTED",
    badge: "VIRAL",
    previewClass: "bg-[#53fc18] text-black font-black uppercase tracking-tight",
    description: "High-contrast bold font with bright green focus word",
  },
  {
    id: "karaoke",
    title: "Karaoke",
    badge: "POPULAR",
    previewClass: "text-[#ffd700] font-black uppercase drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]",
    description: "Word-by-word synced glowing yellow highlight",
  },
  {
    id: "style",
    title: "CHOOSE A STYLE",
    badge: "MODERN",
    previewClass: "bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent font-black uppercase",
    description: "Dynamic multi-color gradient with punchy drop shadow",
  },
];

const FONTS = [
  { name: "The Bold Font", tag: "Most used for Shorts" },
  { name: "Montserrat Black", tag: "High legibility" },
  { name: "Anton Display", tag: "Tall impactful headline" },
  { name: "Bebas Neue", tag: "Clean cinematic style" },
];

const EFFECTS = [
  { name: "Word Bounce", desc: "Active word pops up slightly when spoken" },
  { name: "Glow Pulse", desc: "Soft ambient glow on emphasized words" },
  { name: "Emoji Pop", desc: "Auto-inserts relevant emojis on keywords" },
];

export function OpusStage({ className }: { className?: string }) {
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [activePreset, setActivePreset] = useState<CaptionPreset>("to-get-started");
  const [activeTab, setActiveTab] = useState<ActiveTab>("presets");
  const [activeFont, setActiveFont] = useState(0);
  const [activeEffect, setActiveEffect] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const clip = DEMO_CLIPS[activeClipIndex] ?? DEMO_CLIPS[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [activeClipIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = muted;
    }
  }, [muted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <div className={cn("relative mx-auto w-full max-w-5xl", className)}>
      {/* Background ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-b from-purple-600/10 via-indigo-600/5 to-transparent blur-3xl"
      />

      {/* Main Container Card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c10]/95 p-4 sm:p-6 lg:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          
          {/* Left Column: 9:16 Vertical Video Player */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <div className="relative aspect-[9/16] w-full max-w-[280px] sm:max-w-[310px] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_16px_50px_rgba(0,0,0,0.8)]">
              <video
                ref={videoRef}
                src={clip.src}
                poster={clip.poster}
                playsInline
                loop
                muted={muted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="size-full cursor-pointer object-cover"
              />

              {/* Virality score pill */}
              <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                <Sparkles className="size-3 text-amber-400" />
                <span>97 Virality Score</span>
              </div>

              {/* Clip switcher pills on top right */}
              <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
                {DEMO_CLIPS.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveClipIndex(i)}
                    className={cn(
                      "size-6 rounded-full text-[10px] font-bold transition border",
                      activeClipIndex === i
                        ? "bg-white text-black border-white shadow-md"
                        : "bg-black/60 text-white/70 border-white/20 hover:text-white"
                    )}
                    title={`Clip ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* Dynamic Caption Overlay on the video */}
              {activePreset === "none" ? null : activePreset === "to-get-started" ? (
                <div className="pointer-events-none absolute inset-x-3 bottom-14 z-10 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="inline-block rounded-md bg-[#53fc18] px-2.5 py-1 text-sm sm:text-base font-black tracking-tight text-black shadow-lg">
                    TO GET STARTED
                  </div>
                  <div className="mt-1 font-extrabold uppercase tracking-wide text-white text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    {clip.hook}
                  </div>
                </div>
              ) : activePreset === "karaoke" ? (
                <div className="pointer-events-none absolute inset-x-3 bottom-14 z-10 text-center animate-in fade-in zoom-in-95 duration-200">
                  <p className="font-black uppercase tracking-wider text-xs sm:text-sm text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    {clip.hook.split(" ").slice(0, 3).join(" ")}{" "}
                    <span className="rounded bg-yellow-400/20 px-1.5 py-0.5 text-[#ffd700] underline decoration-[#ffd700] decoration-2 underline-offset-4 shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                      {clip.hook.split(" ")[3] || "VIRAL"}
                    </span>{" "}
                    {clip.hook.split(" ").slice(4).join(" ")}
                  </p>
                </div>
              ) : (
                <div className="pointer-events-none absolute inset-x-3 bottom-14 z-10 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="inline-block rounded-lg bg-black/75 px-3 py-1 border border-white/20 backdrop-blur-md">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text font-black uppercase tracking-widest text-xs sm:text-sm text-transparent drop-shadow-sm">
                      YAP MEDIA
                    </span>
                  </div>
                  <p className="mt-1 font-extrabold uppercase text-[11px] sm:text-xs text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {clip.hook}
                  </p>
                </div>
              )}

              {/* Bottom Playback Bar & Audio Controls */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6">
                <button
                  onClick={togglePlay}
                  className="rounded-full bg-white/20 p-1.5 text-white backdrop-blur-sm transition hover:bg-white/30"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                </button>

                <div className="mx-2 h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button
                  onClick={() => setMuted((m) => !m)}
                  className="rounded-full bg-white/20 p-1.5 text-white backdrop-blur-sm transition hover:bg-white/30"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                </button>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-neutral-400">
              Interactive 9:16 Vertical Preview • Click to play/pause
            </p>
          </div>

          {/* Right Column: Style & Presets Inspector Panel */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#14141a]/95 p-5 sm:p-6 shadow-xl backdrop-blur-xl">
              
              {/* Header Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                {(["presets", "font", "effects"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold capitalize transition",
                      activeTab === tab
                        ? "bg-white/15 text-white shadow-sm"
                        : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content: Presets */}
              {activeTab === "presets" && (
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>CHOOSE CAPTION PRESET</span>
                    <span className="text-[11px] text-neutral-500">Auto-synced</span>
                  </div>

                  {PRESET_OPTIONS.map((opt) => {
                    const isSelected = activePreset === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setActivePreset(opt.id)}
                        className={cn(
                          "group relative flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all duration-200",
                          isSelected
                            ? "border-white/30 bg-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                            : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex size-5 items-center justify-center rounded-full border text-xs transition",
                              isSelected
                                ? "border-white bg-white text-black"
                                : "border-neutral-700 bg-transparent text-transparent group-hover:border-neutral-500"
                            )}
                          >
                            <Check className="size-3 stroke-[3]" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-sm font-bold transition",
                                  opt.previewClass ? opt.previewClass : isSelected ? "text-white" : "text-neutral-300"
                                )}
                              >
                                {opt.title}
                              </span>
                              {opt.badge && (
                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold text-neutral-300">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-neutral-400">{opt.description}</p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="hidden sm:block text-[11px] font-medium text-neutral-400">
                            Active
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab Content: Font */}
              {activeTab === "font" && (
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>FONT FAMILIES</span>
                    <span className="text-[11px] text-neutral-500">Licensed for social use</span>
                  </div>

                  {FONTS.map((font, idx) => {
                    const isSelected = activeFont === idx;
                    return (
                      <div
                        key={font.name}
                        onClick={() => setActiveFont(idx)}
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition",
                          isSelected
                            ? "border-white/30 bg-white/[0.08]"
                            : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                        )}
                      >
                        <div>
                          <p className="text-sm font-bold text-white">{font.name}</p>
                          <p className="text-xs text-neutral-400">{font.tag}</p>
                        </div>
                        {isSelected && (
                          <div className="flex size-5 items-center justify-center rounded-full bg-white text-black">
                            <Check className="size-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab Content: Effects */}
              {activeTab === "effects" && (
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>ANIMATION & HIGHLIGHTS</span>
                    <span className="text-[11px] text-neutral-500">Rendered with FFmpeg</span>
                  </div>

                  {EFFECTS.map((eff, idx) => {
                    const isSelected = activeEffect === idx;
                    return (
                      <div
                        key={eff.name}
                        onClick={() => setActiveEffect(idx)}
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition",
                          isSelected
                            ? "border-white/30 bg-white/[0.08]"
                            : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                        )}
                      >
                        <div>
                          <p className="text-sm font-bold text-white">{eff.name}</p>
                          <p className="text-xs text-neutral-400">{eff.desc}</p>
                        </div>
                        {isSelected && (
                          <div className="flex size-5 items-center justify-center rounded-full bg-white text-black">
                            <Check className="size-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-neutral-300" />
                  Try clicking presets to test styles in real-time
                </span>
                <span className="text-neutral-500">9:16 Shorts / Reels / TikTok</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
