# Owsis

A bookable marketplace app for local hair, beauty, and wellness providers.

This is a Progressive Web App (PWA) — once deployed, people can install it
straight from their browser (no app store needed), and it'll show up on
their home screen with the gold flower icon on a black background.

## Files

```
index.html              the whole app (HTML/CSS/JS bundled into one file)
manifest.json            tells the browser the app's name, colors, and icons
service-worker.js        lets the app be installed and open once more offline
favicon.ico              browser tab icon (16/32/48/64px, gold flower on black)
icons/                   every icon size the manifest and iOS/Android need
```

## Deploy with GitHub Pages (free, no server needed)

1. Create a new GitHub repo and upload every file in this folder, keeping
   the `icons/` folder structure exactly as-is (paths in `index.html` and
   `manifest.json` are relative, e.g. `icons/icon-192.png`).
2. In the repo: **Settings → Pages → Source**, pick the `main` branch and
   `/ (root)` folder, then save.
3. GitHub gives you a URL like `https://yourusername.github.io/your-repo/`.
   That's the live app.

GitHub Pages serves over HTTPS automatically, which is required for the
install prompt and service worker to work — no extra setup needed.

## How people "download" it

Installing is done from the browser, not an app store:

- **Android (Chrome):** open the URL → tap the **Install** icon in the
  address bar, or the "Add Owsis to Home screen" banner that appears
  automatically.
- **iPhone (Safari):** open the URL → tap **Share** → **Add to Home Screen**.
- **Desktop (Chrome/Edge):** open the URL → click the **install icon** at
  the right edge of the address bar.

Once installed, it opens in its own window without browser chrome, using
the flower icon, exactly like a native app.

## Updating the app later

If you regenerate `index.html` (new features, fixes, etc.), bump the
version number in `service-worker.js`:

```js
const CACHE_NAME = "owsis-cache-v1";   // change to v2, v3, ... on every update
```

Without this, people who already installed the app may keep seeing a
cached older version for a while.

## Changing the icon later

The icon is generated from a simple 6-circle "flower" mark in the app's
gold gradient (`#ffd35c` → `#d99e00`) on a `#0e0e0e` background. All
`icons/icon-*.png` files and `favicon.ico` are just that mark rendered at
different sizes — if you ever change the logo, regenerate every size in
`icons/` and `favicon.ico` so the app icon looks consistent across
browsers, home screens, and app switchers.
