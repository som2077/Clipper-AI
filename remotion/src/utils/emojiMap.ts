/**
 * Zero-cost keyword-to-emoji mapping for viral social media dynamic captions.
 * No external LLM API calls needed - 100% offline and instant!
 */
export const EMOJI_MAP: Record<string, string> = {
  // Money & Wealth
  money: "💰",
  cash: "💵",
  dollar: "💵",
  dollars: "💵",
  rich: "🤑",
  wealth: "💎",
  million: "💸",
  billion: "🏦",
  profit: "📈",
  crypto: "🪙",
  bitcoin: "🪙",

  // Energy & Emotion
  fire: "🔥",
  lit: "🔥",
  crazy: "🤯",
  insane: "🤯",
  mindblowing: "🤯",
  shocking: "😱",
  love: "❤️",
  heart: "❤️",
  hate: "😡",
  angry: "🤬",
  funny: "😂",
  laugh: "🤣",

  // Growth & Success
  grow: "🌱",
  growth: "📈",
  rocket: "🚀",
  moon: "🚀",
  boost: "⚡",
  fast: "⚡",
  speed: "🏎️",
  win: "🏆",
  winner: "🥇",
  victory: "✌️",
  champion: "👑",
  king: "👑",

  // Ideas & Strategy
  secret: "🤫",
  hack: "💡",
  idea: "💡",
  smart: "🧠",
  brain: "🧠",
  target: "🎯",
  focus: "🎯",
  goal: "🥅",
  warning: "⚠️",
  danger: "🚨",
  stop: "🛑",
  mistake: "❌",
  wrong: "❌",
  correct: "✅",
  truth: "💯",

  // Action & Time
  time: "⏳",
  clock: "⏰",
  now: "⏱️",
  start: "🎬",
  video: "📹",
  subscribe: "🔔",
  look: "👀",
  watch: "👀",
  listen: "👂",
  question: "❓",
};

export function getWordEmoji(tokenText: string): string | null {
  const clean = tokenText.toLowerCase().replace(/[^a-z0-9]/g, "");
  return EMOJI_MAP[clean] || null;
}
