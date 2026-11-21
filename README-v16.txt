Lofi PLAYBOOK v16 — FULL FILE, ORIGINAL CODE (final)

This is a fresh, original build written from scratch — not the old 15 MB file.
index.html is only ~44 KB. All your real data is kept: 5 songs, 51 shop products
with your real affiliate links (Amazon tag lofiplaybook-21, Flipkart, Myntra,
Ajio, Mivi), premiere Sat 21 Nov 2026, 7:00 PM IST.

FILES IN THIS ZIP
- index.html        main site (original code)
- login.html        login / sign-up page with 3D flip animation
- assets/tu-online-hai.mp3   your 2:59 song (audio/mpeg)
- updates.json      notifications feed — EDIT THIS when you upload anything
- README-v16.txt    this file

HOW TO UPLOAD (extract, then upload ALL of these)
Repo: aryancodes-dev / Lofi-PLAYBOOK
1. Delete the old index.html in the repo, upload the new index.html
2. Upload login.html (same folder as index.html)
3. Upload updates.json (same folder)
4. Upload the assets folder, with tu-online-hai.mp3 inside it
5. Commit, wait 1-2 minutes, open the live site.
   First you see the login page. Sign up once, then the site opens.

WHAT IS IN IT
- Login first, with FLIP animation: tap Sign up, the whole card flips over
  to the sign-up form (Your name field appears, button becomes
  "Create account & Enter →"); tap Sign in, it flips back.
  "Skip for now — explore as guest" is also there, as you said visitors
  can use the site without login.
- Player FIXED: song is a real file, assets/tu-online-hai.mp3, served as
  audio/mpeg — time counts 0:00 → 2:59, seek bar moves, volume works.
  If play ever fails, a message appears instead of silent 0:00.
- NOTIFICATIONS — new video / short / post / affiliate deal:
  Signed-in users tap the 🔔 bell (top-right) and see every update from
  updates.json, with a red dot until they tap "Mark all read".
  HOW TO ADD A NOTIFICATION: open updates.json, copy one entry, change
  id / date / type (video, short or affiliate) / title / text / link,
  save and upload it. It appears in the bell for everyone automatically.
  No code change needed.
  HONEST LIMIT: this is in-site notification. Real push notification to
  a phone needs a backend (Firebase / Supabase) later — it cannot be
  done on GitHub Pages alone, and no one can honestly promise it there.
- AI CHAT — 10 languages: English, Hindi, Hinglish, Bengali, Spanish,
  French, German, Portuguese, Arabic, Japanese. Auto-detects Hindi /
  Bengali / Arabic / Japanese typing. Main answers (songs, premiere,
  shop, prices, contact) are translated; other questions get a short
  note in that language. Full free-form translation needs a server API.
- Music Shop: 51 products, search + category filter, prices live from
  the page data.
- STABILITY / MILLIONS: static site on GitHub Pages CDN, no server, no
  database, tiny 44 KB page + cached audio — that is what scales.
  Login is saved on the device only (localStorage); real accounts for
  millions need a backend later.

TESTED BEFORE SENDING
- index.html 200, login.html 200, audio 200 audio/mpeg, updates.json 200
- JS syntax checked (node --check) for both pages
- 51 Amazon-tagged products, 5 songs, 10 chat languages confirmed
