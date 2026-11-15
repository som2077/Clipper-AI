import { CaptionStyleTemplate } from "../utils/types";

export const CAPTION_TEMPLATES: Record<string, CaptionStyleTemplate> = {
  hormozi: {
    name: "Hormozi",
    description: "Bold green highlight with rounded pill background behind active word",
    fontFamily: "Montserrat, 'The Bold Font', Arial Black, sans-serif",
    fontSize: 58,
    fontColor: "#FFFFFF",
    highlightColor: "#FFFFFF",
    emphasisColor: "#FFE000",
    strokeColor: "#000000",
    strokeWidth: 4,
    pillBox: true,
    pillBoxColor: "#00BF49", // Vivid Hormozi green pill
    wordPop: true,
    emoji: true,
    uppercase: true,
    shadow: true,
    glow: false,
    positionY: 0.72,
    combineTokensWithinMs: 1100, // Punchy 2-3 words per page
  },

  mrbeast: {
    name: "MrBeast",
    description: "Vibrant yellow text with intense red pop highlight and emojis",
    fontFamily: "'The Bold Font', Impact, Arial Black, sans-serif",
    fontSize: 62,
    fontColor: "#FFFF00",
    highlightColor: "#FF2D2D", // Bright punchy red
    emphasisColor: "#FFFFFF",
    strokeColor: "#000000",
    strokeWidth: 6,
    pillBox: false,
    wordPop: true,
    emoji: true,
    uppercase: true,
    shadow: true,
    glow: false,
    positionY: 0.70,
    combineTokensWithinMs: 1200,
  },

  tiktok: {
    name: "TikTok",
    description: "Modern TikTok style with signature pink highlight and fast pop",
    fontFamily: "Inter, 'TikTok Sans', sans-serif",
    fontSize: 54,
    fontColor: "#FFFFFF",
    highlightColor: "#FE2C55", // Signature TikTok red/pink
    emphasisColor: "#25F4EE", // TikTok cyan
    strokeColor: "#000000",
    strokeWidth: 4,
    pillBox: false,
    wordPop: true,
    emoji: true,
    uppercase: true,
    shadow: true,
    glow: false,
    positionY: 0.75,
    combineTokensWithinMs: 1000,
  },

  neon: {
    name: "Neon Glow",
    description: "Glowing cyberpunk cyan text with energetic magenta pop",
    fontFamily: "Montserrat, 'The Bold Font', sans-serif",
    fontSize: 56,
    fontColor: "#00FFFF", // Cyan
    highlightColor: "#FF00FF", // Magenta
    emphasisColor: "#FFE000",
    strokeColor: "#002A6B",
    strokeWidth: 3,
    pillBox: false,
    wordPop: true,
    emoji: false,
    uppercase: true,
    shadow: false,
    glow: true,
    positionY: 0.72,
    combineTokensWithinMs: 1100,
  },

  minimal: {
    name: "Minimalist",
    description: "Clean, elegant subtitling with a gentle dark background",
    fontFamily: "Inter, Roboto, sans-serif",
    fontSize: 44,
    fontColor: "#FFFFFF",
    highlightColor: "#FFD700",
    strokeColor: "transparent",
    strokeWidth: 0,
    pillBox: false,
    wordPop: false,
    emoji: false,
    uppercase: false,
    shadow: false,
    glow: false,
    positionY: 0.80,
    combineTokensWithinMs: 1800,
  },
};

export function getTemplate(templateName?: string): CaptionStyleTemplate {
  if (templateName && CAPTION_TEMPLATES[templateName.toLowerCase()]) {
    return CAPTION_TEMPLATES[templateName.toLowerCase()];
  }
  return CAPTION_TEMPLATES.hormozi;
}
