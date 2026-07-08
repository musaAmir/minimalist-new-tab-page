---
name: verify
description: Drive the Minimalist New Tab Page extension in a real Chromium to verify changes at its surface (the new-tab override).
---

# Verifying this extension

No build step — the repo root is the unpacked extension.

Launch Chromium with the extension loaded via Playwright (install `playwright` in the scratchpad, not this repo):

```js
const ctx = await chromium.launchPersistentContext(fs.mkdtempSync('/tmp/ntp-'), {
  headless: false, // extensions don't load in classic headless
  args: [
    `--disable-extensions-except=${EXT_DIR}`,
    `--load-extension=${EXT_DIR}`,
    '--no-first-run',
  ],
});
await page.goto('chrome://newtab'); // redirects to chrome-extension://.../index.html
```

If the bundled Playwright browser build is missing, point `executablePath` at an existing
`~/Library/Caches/ms-playwright/chromium-*/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`.

Flows worth driving:
- First run: `#time` shows a clock, `.list` shows the "Click edit" instructions.
- Click `#edit-button`, fill `#textarea` (format: `url title`, bare headers, `---` column breaks), change `#theme` / `#font` selects, click `#edit-button` again to save.
- Open a second `chrome://newtab` page in the same context to confirm `chrome.storage.sync` persistence (body class, rendered links, textarea prefill).
- Watch `pageerror` and console errors throughout.
