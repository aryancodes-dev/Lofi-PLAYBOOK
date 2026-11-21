# Lofi PLAYBOOK — Official Website

Official midnight lofi music hub for **Lofi PLAYBOOK** (`@LofiPLAYBOOK`), featuring slowed + reverb tracks, live premiere countdown, interactive audio player, and creator portfolio showcase.

## Project Structure

```text
├── index.html                  # Clean semantic HTML (~25 KB, zero heavy inline blobs)
├── css/
│   └── styles.css              # All animations, themes, responsive layouts & button styles
├── js/
│   ├── app.js                  # Audio player, countdown timer, filters, modals & YouTube sync
│   └── effects.js              # Starfield, rain canvas, floating notes & interactive visuals
└── assets/
    ├── images/                 # Deduplicated WebP artworks & avatars
    └── audio/                  # Full audio track for the built-in player
```

## Deploy on GitHub Pages

1. Upload all files and folders (`index.html`, `css/`, `js/`, `assets/`, `README.md`) to your GitHub repository.
2. Open **Settings → Pages** in your repository.
3. Under **Build and deployment**, select **Deploy from a branch**, choose `main` (or `master`) and `/ (root)`, and click **Save**.
