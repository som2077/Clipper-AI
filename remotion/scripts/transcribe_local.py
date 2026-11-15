#!/usr/bin/env python3
"""
Zero-Cost Local Transcription Script for Remotion Dynamic Subtitles.
Uses local Whisper (runs on your CPU/GPU with $0 cloud cost) to produce
word-level timestamp JSON ready for Remotion's @remotion/captions.

Usage:
  python transcribe_local.py <input_audio_or_video_file> [output_json_path]
"""

import sys
import json
from pathlib import Path

def transcribe_zero_cost(media_file: str, output_path: str = "src/assets/sample-captions.json"):
    path = Path(media_file)
    if not path.exists():
        print(f"Error: File '{media_file}' not found.")
        sys.exit(1)

    print(f"Transcribing '{media_file}' locally ($0 AI Cost)...")
    
    try:
        import whisper
    except ImportError:
        print("Whisper not found. Please run with the project's virtualenv:")
        print("  ../backend/.venv/bin/python scripts/transcribe_local.py <file>")
        sys.exit(1)

    # Use 'base' or 'tiny' for fast CPU transcription, 'small' for higher accuracy
    model = whisper.load_model("base")
    result = model.transcribe(str(path), word_timestamps=True)

    captions = []
    for segment in result.get("segments", []):
        for word_info in segment.get("words", []):
            captions.append({
                "text": word_info["word"],
                "startMs": int(word_info["start"] * 1000),
                "endMs": int(word_info["end"] * 1000),
                "timestampMs": int(word_info["start"] * 1000),
            })

    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(captions, indent=2), encoding="utf-8")

    print(f"Successfully generated {len(captions)} word timestamps!")
    print(f"Saved to: {output_path}")
    print("Now run 'npm start' in remotion/ to preview your dynamic captions!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python transcribe_local.py <media_file> [output_json]")
        print("Example: python transcribe_local.py video.mp4 src/assets/sample-captions.json")
        sys.exit(1)

    input_file = sys.argv[1]
    out_file = sys.argv[2] if len(sys.argv) > 2 else "src/assets/sample-captions.json"
    transcribe_zero_cost(input_file, out_file)
