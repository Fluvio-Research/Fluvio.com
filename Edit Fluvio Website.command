#!/bin/zsh
# Double-click this file to edit the Fluvio website.
# It opens the editor in your browser; keep this window open while editing.
cd "$(dirname "$0")"
exec node admin/serve.mjs
