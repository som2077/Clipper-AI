# Remotion Dynamic Subtitles & Kinetic Captions (Zero-AI Cost)

High-engagement, viral animated subtitles for TikTok, Instagram Reels, and YouTube Shorts built using **[Remotion](https://github.com/remotion-dev/remotion)** and **`@remotion/captions`**.

Inspired by **Alex Hormozi**, **MrBeast**, and **VEED Dynamic Subtitles**.

---

## 🚀 Key Features

1. **Word-by-Word Karaoke Highlight**:
   - Each word lights up in real-time right as it is spoken.
2. **Kinetic Spring Pop & Bounce**:
   - Physics-based bounce animation using Remotion's `spring()` on every active word.
3. **Hormozi Pill Box**:
   - High-contrast rounded pill background behind the active word.
4. **Contextual Emojis ($0 LLM Cost)**:
   - Built-in rule dictionary maps power words (`money`, `fire`, `crazy`, `rocket`, `secret`) to emojis with zero OpenAI/Claude token costs.
5. **Trending Preset Styles**:
   - **`DynamicCaptions-Hormozi`**: Vivid green pill + white text + all caps.
   - **`DynamicCaptions-MrBeast`**: Yellow font + punchy red highlight + thick black stroke.
   - **`DynamicCaptions-TikTok`**: Clean white text + TikTok pink pop (`#FE2C55`).
   - **`DynamicCaptions-Neon`**: Cyan glow + energetic magenta pop.
   - **`DynamicCaptions-Minimal`**: Understated elegant styling.
6. **Zero-Cost Local Transcription**:
   - Bundled Whisper script transcribes your audio/video locally with $0 cloud API costs.

---

## 🛠️ Quickstart

### 1. Preview in Remotion Studio
```bash
cd remotion
npm start
```
This opens the Remotion Web Studio player in your browser at `http://localhost:3000`. You can scrub through the timeline, switch between templates, and test animations in real time.

### 2. Transcribe Any Video for Free ($0 AI Cost)
Run the local Whisper transcription script on your video/audio file:
```bash
# Uses the project's local virtualenv Whisper model
../backend/.venv/bin/python scripts/transcribe_local.py path/to/your/video.mp4 src/assets/sample-captions.json
```

### 3. Render Final Video (MP4)
```bash
# Render Hormozi style video
npm run build -- DynamicCaptions-Hormozi out/hormozi_captions.mp4

# Or render with your background video overlay
npx remotion render src/index.ts DynamicCaptions-Hormozi out/final.mp4 --props='{"videoSrc": "/path/to/video.mp4"}'
```

---

## 🎨 Customizing Styles

Edit `src/styles/templates.ts` to adjust:
- `fontSize`, `fontFamily`
- `strokeWidth`, `strokeColor`
- `pillBoxColor`, `highlightColor`
- `combineTokensWithinMs` (lower = faster 1-2 word cuts; higher = 3-4 word phrases)
- `positionY` (vertical placement on 9:16 canvas)
