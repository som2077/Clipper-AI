import React from "react";
import { Composition } from "remotion";
import { DynamicCaptions } from "./DynamicCaptions";
import sampleCaptions from "./assets/sample-captions.json";

export const Root: React.FC = () => {
  // Duration: 10.5 seconds at 30fps = 315 frames
  const durationInFrames = Math.ceil(
    (sampleCaptions[sampleCaptions.length - 1].endMs / 1000) * 30 + 30
  );

  return (
    <>
      {/* 1. Hormozi Style (Green Pill Box + All Caps + Emojis) */}
      <Composition
        id="DynamicCaptions-Hormozi"
        component={DynamicCaptions}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          captions: sampleCaptions,
          template: "hormozi",
        }}
      />

      {/* 2. MrBeast Style (Yellow + Red Pop + Thick Outline) */}
      <Composition
        id="DynamicCaptions-MrBeast"
        component={DynamicCaptions}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          captions: sampleCaptions,
          template: "mrbeast",
        }}
      />

      {/* 3. TikTok Style (Pink Accent + Modern Font) */}
      <Composition
        id="DynamicCaptions-TikTok"
        component={DynamicCaptions}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          captions: sampleCaptions,
          template: "tiktok",
        }}
      />

      {/* 4. Neon Cyberpunk Style (Cyan + Glowing Magenta Pop) */}
      <Composition
        id="DynamicCaptions-Neon"
        component={DynamicCaptions}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          captions: sampleCaptions,
          template: "neon",
        }}
      />

      {/* 5. Minimalist Style (Clean & Understated) */}
      <Composition
        id="DynamicCaptions-Minimal"
        component={DynamicCaptions}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          captions: sampleCaptions,
          template: "minimal",
        }}
      />
    </>
  );
};
