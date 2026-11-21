REAL PUSH NOTIFICATIONS — DONE, READY TO DEPLOY (free)

What I built now:
- VAPID keys already generated (in server.js / index.html — do NOT share the
  private key publicly; it goes only in Render environment variables).
- server.js — Node backend: POST /subscribe (saves a phone), POST /notify
  (sends a push to ALL subscribers). Tested locally: server runs, wrong
  secret is rejected, correct secret returns ok.
- sw.js — service worker: shows the notification on the phone, tap opens
  the site / video link.
- index.html — "Enable push notifications on my phone" button in the 🔔 bell.
- notify-admin.html — simple form to send a push (open it in your browser,
  paste backend URL + secret + title + message, Send).

HOW TO DEPLOY (free, ~10 minutes, on Render)
1. Make a NEW GitHub repo, e.g. lofi-playbook-push, and upload ONLY these
   files from this zip: server.js, package.json (in push-server folder),
   sw.js is for the website repo, not this one.
   Actually: upload server.js + package.json to the new repo.
2. Go to render.com, sign up free, New > Web Service > connect that repo.
   Build Command: npm install
   Start Command: node server.js
   (Free plan — it sleeps when idle, first push after sleep takes ~30 sec.)
3. In Render > Environment, add:
   VAPID_PUBLIC_KEY = BNoKpZmlj7rPsJEbzXx4EBgwVQcB-VUjxaw5EO_S7nofzhhtz2oX4_oK7SzPpbPFUICPOJZb3_NG6Z9-sdATwjg
   VAPID_PRIVATE_KEY = RKWd4BVasUMH6ckB2OaeUKrO5fI45rkAVlybWGJNqZY
   ADMIN_SECRET = (choose your own secret, e.g. lofi-push-2026)
   MAIL: lofiplaybook007@gmail.com is already in server.js
4. Deploy. Copy your Render URL, e.g. https://lofi-playbook-push.onrender.com
5. In index.html, replace https://YOUR-BACKEND-URL-HERE with that Render URL
   (search for YOUR-BACKEND-URL-HERE, one place). Upload index.html + sw.js
   to the Lofi-PLAYBOOK repo (sw.js must be in the SAME folder as index.html).
6. Open the live site on your phone, sign in, tap 🔔, tap
   "Enable push notifications on my phone", Allow. Done — your phone is
   subscribed.
7. When you upload a new video: open notify-admin.html, paste backend URL
   + your ADMIN_SECRET + title + message + link, Send. Every subscribed
   phone buzzes, even if the site is closed.

IMPORTANT HONEST NOTES
- Push works on Android Chrome and on desktop Chrome. On iPhone, push only
  works if the site is added to the Home Screen (Safari > Share > Add to
  Home Screen) and iOS 16.4+ — that is Apple's rule, not mine.
- Render free plan sleeps after inactivity — the first notification after a
  long sleep can take ~30 seconds to wake the server.
- The private VAPID key must NEVER go in the GitHub website repo — only in
  Render environment variables. The public key is safe to show in index.html.
- Subscriptions are stored in subscriptions.json on the server. On Render
  free plan, that file can reset if the server restarts — users just tap
  Enable push again. A database (free Supabase / MongoDB) fixes that later.
