import React, { useMemo } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  AbsoluteFill,
  Video,
  Track,
} from "remotion";
import { createTikTokStyleCaptions, Caption } from "@remotion/captions";
import { DynamicCaptionsProps } from "./utils/types";
import { getTemplate } from "./styles/templates";
import { getWordEmoji } from "./utils/emojiMap";
import defaultSampleCaptions from "./assets/sample-captions.json";

export const DynamicCaptions: React.FC<DynamicCaptionsProps> = ({
  captions = defaultSampleCaptions,
  template = "hormozi",
  videoSrc,
  customStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;

  // Resolve base template and optional custom user overrides
  const styleConfig = useMemo(() => {
    const base = getTemplate(template);
    return { ...base, ...customStyle };
  }, [template, customStyle]);

  // Group tokens into punchy, high-retention 2-3 word pages
  const { pages } = useMemo(() => {
    return createTikTokStyleCaptions({
      captions: captions as Caption[],
      combineTokensWithinMilliseconds: styleConfig.combineTokensWithinMs || 1100,
    });
  }, [captions, styleConfig.combineTokensWithinMs]);

  // Find the currently active subtitle page
  const activePage = pages.find((page) => {
    return (
      currentTimeMs >= page.startMs &&
      currentTimeMs < page.startMs + page.durationMs
    );
  });

  return (
    <Track name="AbsoluteFill">
      <AbsoluteFill
        style={{
          backgroundColor: videoSrc ? "transparent" : "#0d0d11",
          overflow: "hidden",
          scale: 1.034,
          color: "#d12020"
        }}
        durationInFrames={291}
      >
      {/* Optional Background Video */}
      {videoSrc && (
        <Video
          src={videoSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Dynamic Subtitles Overlay */}
      {activePage && (
        <div
          style={{
            position: "absolute",
            top: `${styleConfig.positionY * 100}%`,
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 48px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px 10px",
              maxWidth: width - 100,
            }}
          >
            {activePage.tokens.map((token, index) => {
              const isWordActive =
                currentTimeMs >= token.fromMs && currentTimeMs < token.toMs;

              // Kinetic Spring Pop Animation
              const activeFrame = Math.max(
                0,
                ((currentTimeMs - token.fromMs) / 1000) * fps
              );

              const popScale =
                styleConfig.wordPop && isWordActive
                  ? spring({
                      frame: activeFrame,
                      fps,
                      config: { damping: 10, stiffness: 220, mass: 0.4 },
                      from: 0.88,
                      to: 1.18,
                    })
                  : 1.0;

              // Check for zero-cost offline emoji
              const emoji = styleConfig.emoji ? getWordEmoji(token.text) : null;

              // Display text (uppercase or original)
              const displayText = styleConfig.uppercase
                ? token.text.toUpperCase()
                : token.text;

              // Active vs Inactive colors
              const textColor = isWordActive
                ? styleConfig.pillBox
                  ? "#FFFFFF"
                  : styleConfig.highlightColor
                : styleConfig.fontColor;

              // Pill Box background styling (Hormozi style)
              const isPill = styleConfig.pillBox && isWordActive;

              return (
                <div
                  key={`${token.fromMs}-${index}`}
                  style={{
                    transform: `scale(${popScale})`,
                    transformOrigin: "center center",
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: isPill
                      ? styleConfig.pillBoxColor || "#00BF49"
                      : "transparent",
                    padding: isPill ? "8px 18px" : "8px 4px",
                    borderRadius: isPill ? "16px" : "0px",
                    boxShadow: isPill
                      ? "0px 10px 28px rgba(0, 191, 73, 0.5)"
                      : "none",
                    filter:
                      styleConfig.glow && isWordActive
                        ? `drop-shadow(0 0 18px ${styleConfig.highlightColor})`
                        : styleConfig.glow
                        ? `drop-shadow(0 0 8px ${styleConfig.fontColor})`
                        : "none",
                    transition: "background-color 0.06s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: styleConfig.fontFamily,
                      fontSize: `${styleConfig.fontSize}px`,
                      fontWeight: 900,
                      color: textColor,
                      WebkitTextStroke:
                        styleConfig.strokeWidth > 0
                          ? `${styleConfig.strokeWidth}px ${styleConfig.strokeColor}`
                          : "none",
                      textShadow: styleConfig.shadow
                        ? "0 4px 12px rgba(0, 0, 0, 0.85)"
                        : "none",
                      whiteSpace: "pre",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {displayText}
                  </span>

                  {/* Contextual Emoji with Pop */}
                  {emoji && isWordActive && (
                    <span
                      style={{
                        fontSize: `${styleConfig.fontSize * 0.85}px`,
                        marginLeft: "8px",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
                      }}
                    >
                      {emoji}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundColor: videoSrc ? "transparent" : "#0d0d11",
          overflow: "hidden",
          scale: 1.034,
          color: "#d12020"
        }}
        from={291}
        trimBefore={291}
      >
      {/* Optional Background Video */}
      {videoSrc && (
        <Video
          src={videoSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Dynamic Subtitles Overlay */}
      {activePage && (
        <div
          style={{
            position: "absolute",
            top: `${styleConfig.positionY * 100}%`,
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 48px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px 10px",
              maxWidth: width - 100,
            }}
          >
            {activePage.tokens.map((token, index) => {
              const isWordActive =
                currentTimeMs >= token.fromMs && currentTimeMs < token.toMs;

              // Kinetic Spring Pop Animation
              const activeFrame = Math.max(
                0,
                ((currentTimeMs - token.fromMs) / 1000) * fps
              );

              const popScale =
                styleConfig.wordPop && isWordActive
                  ? spring({
                      frame: activeFrame,
                      fps,
                      config: { damping: 10, stiffness: 220, mass: 0.4 },
                      from: 0.88,
                      to: 1.18,
                    })
                  : 1.0;

              // Check for zero-cost offline emoji
              const emoji = styleConfig.emoji ? getWordEmoji(token.text) : null;

              // Display text (uppercase or original)
              const displayText = styleConfig.uppercase
                ? token.text.toUpperCase()
                : token.text;

              // Active vs Inactive colors
              const textColor = isWordActive
                ? styleConfig.pillBox
                  ? "#FFFFFF"
                  : styleConfig.highlightColor
                : styleConfig.fontColor;

              // Pill Box background styling (Hormozi style)
              const isPill = styleConfig.pillBox && isWordActive;

              return (
                <div
                  key={`${token.fromMs}-${index}`}
                  style={{
                    transform: `scale(${popScale})`,
                    transformOrigin: "center center",
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: isPill
                      ? styleConfig.pillBoxColor || "#00BF49"
                      : "transparent",
                    padding: isPill ? "8px 18px" : "8px 4px",
                    borderRadius: isPill ? "16px" : "0px",
                    boxShadow: isPill
                      ? "0px 10px 28px rgba(0, 191, 73, 0.5)"
                      : "none",
                    filter:
                      styleConfig.glow && isWordActive
                        ? `drop-shadow(0 0 18px ${styleConfig.highlightColor})`
                        : styleConfig.glow
                        ? `drop-shadow(0 0 8px ${styleConfig.fontColor})`
                        : "none",
                    transition: "background-color 0.06s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: styleConfig.fontFamily,
                      fontSize: `${styleConfig.fontSize}px`,
                      fontWeight: 900,
                      color: textColor,
                      WebkitTextStroke:
                        styleConfig.strokeWidth > 0
                          ? `${styleConfig.strokeWidth}px ${styleConfig.strokeColor}`
                          : "none",
                      textShadow: styleConfig.shadow
                        ? "0 4px 12px rgba(0, 0, 0, 0.85)"
                        : "none",
                      whiteSpace: "pre",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {displayText}
                  </span>

                  {/* Contextual Emoji with Pop */}
                  {emoji && isWordActive && (
                    <span
                      style={{
                        fontSize: `${styleConfig.fontSize * 0.85}px`,
                        marginLeft: "8px",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
                      }}
                    >
                      {emoji}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
    </Track>
  );
};
