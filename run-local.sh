#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
POSTGRES_DATA="/home/som2077/.local/share/supoclip-postgres/data"
POSTGRES_LOG="/home/som2077/.local/share/supoclip-postgres/logfile"
REDIS_DIR="/home/som2077/.local/share/supoclip-redis"

start_services() {
    echo "============================================"
    echo "  Starting Clipper AI Services (Local)"
    echo "============================================"

    # 1. Start PostgreSQL if not already running
    if ! pg_ctl -D "$POSTGRES_DATA" status >/dev/null 2>&1; then
        echo "Starting PostgreSQL on port 5432..."
        pg_ctl -D "$POSTGRES_DATA" -l "$POSTGRES_LOG" -o "-p 5432 -k /tmp" start
    else
        echo "PostgreSQL is already running."
    fi

    # 2. Start Redis if not already running
    if ! redis-cli ping >/dev/null 2>&1; then
        echo "Starting Redis on port 6379..."
        redis-server --daemonize yes --dir "$REDIS_DIR" --port 6379
    else
        echo "Redis is already running."
    fi

    # 3. Start pm2 ecosystem (backend, worker, frontend)
    echo "Starting Backend, Worker, and Frontend via pm2..."
    cd "$DIR"
    pm2 start ecosystem.config.js

    echo ""
    echo "Waiting for services to be ready..."
    sleep 3

    check_status
}

stop_services() {
    echo "============================================"
    echo "  Stopping Clipper AI Services"
    echo "============================================"

    cd "$DIR"
    pm2 stop ecosystem.config.js || true
    pm2 delete ecosystem.config.js || true

    echo "Services stopped."
}

check_status() {
    echo "============================================"
    echo "  Clipper AI Service Status"
    echo "============================================"

    # PostgreSQL
    if pg_ctl -D "$POSTGRES_DATA" status >/dev/null 2>&1; then
        echo "[✓] PostgreSQL: Running on port 5432"
    else
        echo "[✗] PostgreSQL: Stopped"
    fi

    # Redis
    if redis-cli ping >/dev/null 2>&1; then
        echo "[✓] Redis: Running on port 6379 (PONG)"
    else
        echo "[✗] Redis: Stopped"
    fi

    pm2 status

    echo ""
    echo "Testing API and Web responses:"
    if curl -s -f -o /dev/null http://localhost:8000/docs; then
        echo "[✓] Backend API: http://localhost:8000 (Docs at http://localhost:8000/docs)"
    else
        echo "[!] Backend API: Waiting for readiness on http://localhost:8000"
    fi

    if curl -s -f -o /dev/null http://localhost:3107; then
        echo "[✓] Frontend Web: http://localhost:3107"
    else
        echo "[!] Frontend Web: Still starting / compiling on http://localhost:3107"
    fi
    echo "============================================"
}

case "$1" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        stop_services
        sleep 2
        start_services
        ;;
    status)
        check_status
        ;;
    logs)
        pm2 logs
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs}"
        exit 1
        ;;
esac
