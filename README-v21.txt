Lofi PLAYBOOK v21 — FULL FIXED, YouTube listen (no in-website player)

CHANGE YOU ASKED FOR (your screenshot, 16:36 IST):
The bottom player in your screenshot showed "The song file could not be
loaded — please check your connection and tap play again." at 0:00 / 2:59.
REMOVED that whole in-website player. Nobody listens on the website now.
If anyone taps to listen to "Tu Online Hai", they are redirected to
YouTube (https://www.youtube.com/watch?v=6ghXpBX9ieg) and listen THERE.

WHAT WAS REMOVED
- Bottom player bar with play / seek / volume / repeat / sleep / speed
- The <audio> element and all player JS (play, pause, seek, volume,
  visualizer, repeat, sleep timer, speed, keyboard shortcuts)
- "Plays in full here" / "Preview the song here" buttons

WHAT REPLACED IT
- Bottom bar is now one button: "▶ Listen on YouTube — Tu Online Hai 💔"
  + "Tap to listen on YouTube, not here"
- Hero button, song-card play button, premiere preview button and the
  AI-chat "play this song" action all open the same YouTube link in a
  new tab. The other 4 songs already linked to YouTube — unchanged.

EVERYTHING ELSE IS THE SAME AS v20
- That animation: colour-changing (lpFadeSoft) + bounce (perfBounce),
  lazy Creator / GitHub 17 cards, smooth scrolling, no blink
- No login gate, Sign in optional, bell only for signed-in users
- Shop: Amazon, Myntra, Ajio, Mivi only — Flipkart 0, Share 0
- AI chat in 10 languages, notifications (updates.json + real push server)

FILES — upload ALL to aryancodes-dev / Lofi-PLAYBOOK
- index.html, login.html, updates.json, sw.js, notify-admin.html
- push-server/ (server.js + package.json — Render deploy, see README-PUSH.txt)
- bitli-links-mapping.md, README-v21.txt, README-PUSH.txt, CHECKLIST.md
- NO audio file in this zip — the song is only on YouTube now.

CHECKED BEFORE SENDING
- JS syntax OK (node --check)
- "could not be loaded" 0, <audio> 0, playBtn 0, seek 0, volume slider 0
- YouTube Tu Online Hai links: 6 places, all watch?v=6ghXpBX9ieg
- index / login / updates / sw.js all 200 locally
