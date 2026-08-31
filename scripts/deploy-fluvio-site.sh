#!/usr/bin/env bash
# Deploy the website to the Grafana server as the auth-gated /fluvio-site/ path.
# Requires the "GrafanaFluvio" host entry in ~/.ssh/config (macOS sed syntax).
set -euo pipefail
cd "$(dirname "$0")/.."
trap 'git checkout -- src/config.yaml' EXIT
sed -i '' "s|site: 'https://fluvio.com.au'|site: 'https://data.fluvio.com.au'|; s|base: '/'|base: '/fluvio-site'|" src/config.yaml
npm run build
rsync -az --delete dist/ GrafanaFluvio:/var/www/fluvio-site/
git checkout -- src/config.yaml
npm run build >/dev/null   # leave dist/ matching the canonical config
echo "deployed to https://data.fluvio.com.au/fluvio-site/"
