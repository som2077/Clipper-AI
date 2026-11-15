<p align="center">
  <img src="assets/banner.jpg" alt="Clipper AI Dashboard" width="100%" />
</p>

# Clipper AI

> **Clipper AI** is an advanced AI-powered video clipping and repurposing platform. Turn long videos — podcasts, interviews, webinars, streams, and recordings — into viral-ready vertical shorts (9:16) with smart face tracking, word-synced animated subtitles, AI hooks, and automatic virality scoring.

---

## Key Features

- **Multi-Source Video Ingestion**: Supports YouTube videos, Twitch/Kick streams & VODs, and direct local MP4/MOV/MKV uploads up to 4GB.
- **AI Highlight Detection & Virality Scoring**: Leverages LLMs (OpenAI, Gemini, Anthropic, or local Ollama) to analyze transcripts and identify engaging hook points, punchlines, and narrative arcs.
- **Intelligent 9:16 Reframing**: Automated computer vision face detection and speaker tracking keeps subjects centered in portrait aspect ratio.
- **Dynamic Word-Synced Captions**: Precise subtitles generated with AssemblyAI or Whisper, rendered with customizable styling, karaoke animations, and templates.
- **Integrated Video Editor**: Fine-tune cuts, customize aspect ratio, adjust captions, alter text, and preview frames in real-time.
- **Social Scheduling & Direct Publishing**: Connect TikTok, YouTube Shorts, and Instagram to schedule and publish clips directly.
- **MCP & REST API Support**: Bundled Model Context Protocol (MCP) server and REST API for agentic workflows and automated video pipelines.

---

## Architecture

- **Frontend**: Next.js 15 (App Router, React 19, Tailwind CSS, Radix UI, Better Auth, Prisma).
- **Backend API**: FastAPI (Python 3.11, Pydantic, SQLAlchemy 2.0 async, Redis, ARQ job worker).
- **Video Pipeline**: FFmpeg, OpenCV face tracking, Whisper / AssemblyAI transcription, Remotion render engine.
- **Database & Storage**: PostgreSQL, Redis, and local or S3-compatible media storage.

---

## Local Development & Setup

### Prerequisites
- Node.js >= 20, pnpm >= 9
- Python >= 3.11, `uv` package manager
- FFmpeg installed locally
- PostgreSQL and Redis

### Quick Start with Docker
```bash
docker-compose up -d --build
```
Frontend runs on `http://localhost:3107`, Backend API on `http://localhost:8000`.

### Local Execution (without Docker)
```bash
./run-local.sh
```

---

## License

Proprietary and Confidential. Copyright (c) 2026 Clipper AI. All rights reserved.
