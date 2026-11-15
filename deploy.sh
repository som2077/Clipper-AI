#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "=================================================="
echo "  🚀 Clipper AI - One-Command Deployment"
echo "=================================================="

# 1. Environment check
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "Creating .env from .env.example..."
        cp .env.example .env
        echo "Please add your API keys to .env before starting!"
    else
        echo "Error: .env file missing."
        exit 1
    fi
fi

# 2. Deploy with Docker if docker is installed
if command -v docker &> /dev/null && (docker compose version &> /dev/null || command -v docker-compose &> /dev/null); then
    echo "Docker detected. Starting with Docker Compose..."
    if docker compose version &> /dev/null; then
        docker compose up -d --build
    else
        docker-compose up -d --build
    fi
    echo ""
    echo "=================================================="
    echo "  ✅ Clipper AI Deployed via Docker!"
    echo "=================================================="
    echo "  Web UI:      http://localhost:3107"
    echo "  Backend API: http://localhost:8000"
    echo "  API Docs:    http://localhost:8000/docs"
    echo "  View Logs:   docker compose logs -f"
    echo "=================================================="
    exit 0
fi

# 3. Bare-metal / PM2 Deployment
echo "Docker not detected. Deploying with PM2 / Local stack..."

# Sync backend
if [ -d "backend" ]; then
    echo "Syncing backend dependencies..."
    cd backend
    if command -v uv &> /dev/null; then
        uv sync
    fi
    cd "$DIR"
fi

# Build frontend
if [ -d "frontend" ]; then
    echo "Preparing frontend..."
    cd frontend
    if command -v pnpm &> /dev/null; then
        pnpm install --frozen-lockfile
        pnpm run build
    fi
    cd "$DIR"
fi

# Start services
./run-local.sh restart

echo ""
echo "=================================================="
echo "  ✅ Clipper AI Deployed Successfully!"
echo "=================================================="
echo "  Web UI:      http://localhost:3107"
echo "  Backend API: http://localhost:8000"
echo "  API Docs:    http://localhost:8000/docs"
echo "  Status:      ./run-local.sh status (or 'make status')"
echo "  View Logs:   ./run-local.sh logs   (or 'make logs')"
echo "  Stop:        ./run-local.sh stop   (or 'make stop')"
echo "=================================================="
