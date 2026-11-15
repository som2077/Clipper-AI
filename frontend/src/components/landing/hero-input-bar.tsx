"use client";

import { useState, useRef, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroInputBarProps {
  className?: string;
  authEnabled?: boolean;
}

export function HeroInputBar({ className, authEnabled = true }: HeroInputBarProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (mode: "clips" | "auto" = "clips") => {
    const trimmed = url.trim();

    // If empty and no file, set a default sample video so user can test immediately
    if (!trimmed && !fileName) {
      const sampleUrl = "https://www.youtube.com/watch?v=OpANpfEjNw8";
      setUrl(sampleUrl);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
      return;
    }

    setSubmitting(true);

    try {
      if (typeof window !== "undefined" && trimmed) {
        window.sessionStorage.setItem("clipper_pending_source_url", trimmed);
      }
    } catch {
      // storage unavailable
    }

    const targetUrl = authEnabled
      ? `/sign-up?source_url=${encodeURIComponent(trimmed)}&mode=${mode}`
      : `/?source_url=${encodeURIComponent(trimmed)}`;

    router.push(targetUrl);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit("clips");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUrl(`Local file: ${file.name}`);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setFileName(file.name);
      setUrl(`Local file: ${file.name}`);
    }
  };

  return (
    <div className={cn("mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-3xl", className)}>
      {/* ─── 1. Main Input Capsule ─── */}
      <form
        onSubmit={handleFormSubmit}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "group relative flex w-full sm:flex-1 items-center rounded-full border bg-[#18181e]/90 p-1.5 sm:p-2 pl-3 sm:pl-4 shadow-[0_12px_45px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300",
          isDragging
            ? "border-white bg-white/10 ring-4 ring-white/10"
            : "border-white/15 focus-within:border-white/35 focus-within:ring-2 focus-within:ring-white/10"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Plus / Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Upload video file"
          className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-neutral-300 transition hover:border-white hover:bg-white/20 hover:text-white"
        >
          {fileName ? <Upload className="size-3.5 sm:size-4" /> : <Plus className="size-4 sm:size-4.5" />}
        </button>

        {/* Input Field */}
        <input
          ref={textInputRef}
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (fileName) setFileName(null);
          }}
          placeholder="Drop a video link or upload a file"
          className="min-w-0 flex-1 bg-transparent px-3 text-xs sm:text-sm md:text-base font-normal text-white placeholder:text-neutral-400 outline-none"
        />

        {/* Get free clips Button */}
        <button
          type="submit"
          disabled={submitting}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-black transition-all hover:bg-neutral-200 active:scale-95 disabled:opacity-50 shadow-sm"
        >
          {submitting ? (
            <Loader2 className="size-3.5 sm:size-4 animate-spin" />
          ) : (
            <span>Get free clips</span>
          )}
        </button>
      </form>

      {/* ─── 2. "or" separator ─── */}
      <span className="hidden select-none text-sm text-neutral-400 font-medium sm:inline-block">
        or
      </span>

      {/* ─── 3. Auto-edit Separate Button ─── */}
      <button
        type="button"
        onClick={() => handleSubmit("auto")}
        disabled={submitting}
        className="hidden rounded-full border border-white/20 bg-black/60 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95 backdrop-blur-md sm:inline-flex items-center justify-center shadow-lg"
      >
        Auto-edit
      </button>
    </div>
  );
}
