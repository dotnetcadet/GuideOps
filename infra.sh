#!/usr/bin/env bash
# GuideOps infrastructure management script
# Supports both Docker and Podman container runtimes

set -euo pipefail

# Auto-detect container runtime
detect_runtime() {
  if command -v podman &>/dev/null; then
    RUNTIME="podman"
    if command -v podman-compose &>/dev/null; then
      COMPOSE="podman-compose"
    elif podman compose version &>/dev/null 2>&1; then
      COMPOSE="podman compose"
    else
      echo "Error: podman found but neither 'podman-compose' nor 'podman compose' is available."
      echo "Install with: pip install podman-compose  OR  dnf install podman-compose"
      exit 1
    fi
  elif command -v docker &>/dev/null; then
    RUNTIME="docker"
    if docker compose version &>/dev/null 2>&1; then
      COMPOSE="docker compose"
    elif command -v docker-compose &>/dev/null; then
      COMPOSE="docker-compose"
    else
      echo "Error: docker found but neither 'docker compose' nor 'docker-compose' is available."
      exit 1
    fi
  else
    echo "Error: No container runtime found. Install Docker or Podman."
    exit 1
  fi

  echo "Using runtime: $RUNTIME ($COMPOSE)"
}

# Navigate to project root (where docker-compose.yml lives)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

detect_runtime

case "${1:-help}" in
  up)
    echo "Starting GuideOps infrastructure..."
    $COMPOSE up -d "${@:2}"
    echo ""
    echo "SQL Server is starting on localhost:1433"
    echo "  User: sa"
    echo "  Password: GuideOps@Dev2026!"
    ;;
  down)
    echo "Stopping GuideOps infrastructure..."
    $COMPOSE down "${@:2}"
    ;;
  logs)
    $COMPOSE logs "${@:2}"
    ;;
  status)
    $COMPOSE ps "${@:2}"
    ;;
  reset)
    echo "Resetting GuideOps infrastructure (removes volumes)..."
    $COMPOSE down -v "${@:2}"
    echo "All data cleared. Run './infra.sh up' to start fresh."
    ;;
  help|*)
    echo "GuideOps Infrastructure Manager"
    echo ""
    echo "Usage: ./infra.sh <command>"
    echo ""
    echo "Commands:"
    echo "  up       Start SQL Server and other services"
    echo "  down     Stop all services"
    echo "  logs     View container logs (pass service name to filter)"
    echo "  status   Show running containers"
    echo "  reset    Stop services and remove all data volumes"
    echo "  help     Show this help message"
    echo ""
    echo "Detected runtime: $RUNTIME"
    ;;
esac
