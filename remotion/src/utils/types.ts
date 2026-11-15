export interface CaptionToken {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs?: number | null;
  confidence?: number | null;
}

export interface CaptionStyleTemplate {
  name: string;
  description: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  highlightColor: string;
  emphasisColor?: string;
  strokeColor: string;
  strokeWidth: number;
  pillBox: boolean;
  pillBoxColor?: string;
  wordPop: boolean;
  emoji: boolean;
  uppercase: boolean;
  shadow: boolean;
  glow: boolean;
  positionY: number; // 0.0 - 1.0 (relative to vertical height)
  combineTokensWithinMs: number;
}

export interface DynamicCaptionsProps {
  captions?: CaptionToken[];
  template?: string;
  videoSrc?: string;
  customStyle?: Partial<CaptionStyleTemplate>;
}
