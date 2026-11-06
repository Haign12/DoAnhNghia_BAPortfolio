#!/usr/bin/env bash
set -euo pipefail

# Deterministic Chromium bootstrap for GitHub Actions.
# Keeps dependency installation and browser download separate so a transient
# apt/CDN stall cannot consume the whole workflow without a clear failure.

export DEBIAN_FRONTEND=noninteractive
export PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT="${PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT:-120000}"

run_with_retry() {
  local label="$1"
  local seconds="$2"
  local attempts="$3"
  shift 3

  local attempt
  for attempt in $(seq 1 "$attempts"); do
    echo "::group::${label} — attempt ${attempt}/${attempts}"
    if timeout --signal=TERM --kill-after=15s "${seconds}s" "$@"; then
      echo "::endgroup::"
      return 0
    else
      code=$?
    fi
    echo "${label} failed/timed out with exit code ${code}."
    echo "::endgroup::"
    if [ "$attempt" -lt "$attempts" ]; then
      sleep $((attempt * 5))
    fi
  done

  echo "::error::${label} failed after ${attempts} attempts."
  return 1
}

# Browser download is cached by the workflows. On a cache miss, retry bounded
# downloads instead of leaving the job stuck until the global timeout.
run_with_retry "Chromium browser download" 120 3 npx playwright install chromium

# Installation is not considered complete until Chromium can launch headless.
smoke_chromium() {
  node <<'NODE'
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent('<!doctype html><title>chromium-smoke</title><p>ok</p>');
  const title = await page.title();
  if (title !== 'chromium-smoke') throw new Error(`Unexpected smoke title: ${title}`);
  await browser.close();
  console.log('Chromium smoke launch: PASS');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
NODE
}

# Hosted runners often already have the required libraries. Only use apt when
# the pinned browser cannot launch, then require the same smoke check to pass.
if ! smoke_chromium; then
  run_with_retry "Chromium system dependencies" 180 2 npx playwright install-deps chromium
  smoke_chromium
fi
