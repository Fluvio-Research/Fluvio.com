#!/usr/bin/env bash
#
# Fluvio content editing, start to finish:
#
#   ./edit-content.sh
#
# 1. Starts the local content admin and opens it in your browser
# 2. You edit projects, team, expertise or site text (EN / FR / ES tabs)
# 3. When you close this script (press Enter), it shows what changed,
#    runs the content checks, and offers to publish. Publishing commits
#    and pushes; the live site rebuilds itself in about two minutes.
#
set -euo pipefail
cd "$(dirname "$0")"

PORT="${PORT:-4322}"
BOLD=$(tput bold 2>/dev/null || true)
DIM=$(tput dim 2>/dev/null || true)
RESET=$(tput sgr0 2>/dev/null || true)

say() { printf '%s\n' "${BOLD}$1${RESET}"; }

# --- 1. Start the admin -------------------------------------------------
say "Starting the Fluvio content admin..."
node admin/serve.mjs &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
sleep 1

URL="http://localhost:${PORT}"
say "Admin running at ${URL}"
printf '%s\n' "${DIM}Use Chrome or Edge. Choose \"Work with Local Repository\" and select this folder:${RESET}"
printf '%s\n\n' "${DIM}  $(pwd)${RESET}"
if command -v open >/dev/null 2>&1; then open "$URL"; fi

# --- 2. Wait for the editor to finish ----------------------------------
printf '%s' "${BOLD}When you are done editing, come back here and press Enter... ${RESET}"
read -r _ || true
kill "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
trap - EXIT

# --- 3. Show what changed ----------------------------------------------
CHANGES=$(git status --porcelain -- src/data/fluvio/content src/assets/images/fluvio)
if [ -z "$CHANGES" ]; then
  say "No content changes were made. Nothing to publish."
  exit 0
fi

echo
say "You changed:"
git status --short -- src/data/fluvio/content src/assets/images/fluvio | sed 's/^/  /'
echo

# --- 4. Verify the content still passes the checks ----------------------
say "Checking the content..."
if ! npm test --silent > /tmp/fluvio-content-check.log 2>&1; then
  say "The checks FAILED. Your edits are still saved locally, but they were not published."
  printf '%s\n' "${DIM}Details: /tmp/fluvio-content-check.log${RESET}"
  printf '%s\n' "${DIM}A common cause is an emptied required field or a missing translation.${RESET}"
  printf '%s\n' "${DIM}Reopen the admin with ./edit-content.sh and fix the entry, or ask a developer.${RESET}"
  exit 1
fi
say "All checks passed."
echo

# --- 5. Publish ----------------------------------------------------------
printf '%s' "${BOLD}Publish these changes to the live site now? [y/N] ${RESET}"
read -r ANSWER || true
case "${ANSWER:-n}" in
  y | Y | yes | YES)
    printf '%s' "${BOLD}Short description of the change (or press Enter for a default): ${RESET}"
    read -r MESSAGE || true
    MESSAGE=${MESSAGE:-"update site content"}
    git add src/data/fluvio/content src/assets/images/fluvio
    git commit -m "content: ${MESSAGE}"
    git push origin main
    echo
    say "Published. The live site rebuilds automatically; give it about two minutes:"
    printf '%s\n' "  https://fluvio-research.github.io/Fluvio.com/"
    ;;
  *)
    say "Not published. Your edits are saved locally; run ./edit-content.sh again to continue or publish."
    ;;
esac
