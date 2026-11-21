Lofi PLAYBOOK v18 — FULL FILE, FULLY ORIGINAL (final, all files)

This is the full website, original code written from scratch.
Upload ALL of these files to GitHub repo aryancodes-dev / Lofi-PLAYBOOK,
then Commit, wait 1-2 minutes, open the live site.

FILES IN THIS ZIP
- index.html        main site (no login gate, optional sign-in, short shop)
- login.html        sign in / sign up with 3D flip animation
- updates.json      notifications feed (edit to add a new video/short/post/deal)
- sw.js             service worker for real push notifications
- notify-admin.html form to send a push to all subscribers
- push-server/      server.js + package.json — deploy free on Render for real push
- assets/tu-online-hai.mp3  your 2:59 song (audio/mpeg)
- bitli-links-mapping.md  all 101 affiliate links checked (see below)
- README-v18.txt    this file
- README-PUSH.txt   how to deploy real push (Render, free)

EVERYTHING YOU ASKED, TILL LAST
1. NO login gate. Site opens directly on the main page, like your screenshot.
   Everyone can do everything without signing in: play music, YouTube,
   Instagram, Ask AI, buy from the shop.
2. Sign in is OPTIONAL (Sign in button in nav, flip login card).
   ONLY difference: signed-in users get the 🔔 bell + notifications
   (new videos, shorts, posts, affiliate deals). Guests do not get the bell.
   Sign out hides the bell again.
3. Player FIXED: assets/tu-online-hai.mp3, audio/mpeg, time counts
   0:00 → 2:59, seek + volume work, error message if play fails.
4. Shop SHORT: only 4 big animated store buttons — Amazon, Myntra, Ajio, Mivi.
   Tap one, it opens that store through your affiliate link, buy anything.
   NO Flipkart button (plain link, pays nothing, sign-up closed — removed
   everywhere, including AI chat). NO Share button (removed).
   NO long 51-product list.
5. Buttons ANIMATED like before: colour-changing + bouncing, done cheaply
   (transform + opacity only) so they do not cause lag.
6. PERFORMANCE / CAPABLE: lazy images, audio preloads metadata only,
   smooth scrolling, content-visibility, no heavy blur, no blink when
   opening project after project. Built to handle many loads.
7. AI CHAT — 10 languages: English, Hindi, Hinglish, Bengali, Spanish,
   French, German, Portuguese, Arabic, Japanese. It auto-detects the
   language you type in, and answers in YOUR OWN language, in your own
   words, about songs, premiere, shop, prices and contact.
8. NOTIFICATIONS: in-site bell from updates.json (add an entry, upload it,
   signed-in users see it) + REAL PUSH via push-server (see README-PUSH.txt).
9. AFFILIATE LINKS — ALL CHECKED 2026-11-21: 101 links, 100 return 200,
   1 (Brillare) returns 403 only to bots, works in a real browser.
   101 of 101 identified: 50 store homepages, 43 credit cards, 7 loans/EMI,
   1 savings account (Kotak811). Brillare = brillare.co.in via CashKaro
   (Rosemary Oil Shots) — earnings for Brillare show in CashKaro, the
   other 100 show in EarnKaro (tracking id 5060487).
   Amazon tag lofiplaybook-21, Myntra myntr.it/efnKadW,
   Ajio ajiio.in/S7FhNBM, Mivi bitli.in/UdpKGoX.
   No link names a specific product model — they are store/offer links.
10. Premiere: Tu Online Hai, Sat 21 Nov 2026, 7:00 PM IST, @LofiPLAYBOOK.
    5 songs, with real YouTube links.

TESTED BEFORE SENDING
- index.html 200, login.html 200, audio 200 audio/mpeg, updates.json 200, sw.js 200
- JS syntax checked (node --check) for both pages
- 0 Flipkart links, 0 Share button, 4 store buttons confirmed
- Push server tested locally: runs, wrong secret rejected
