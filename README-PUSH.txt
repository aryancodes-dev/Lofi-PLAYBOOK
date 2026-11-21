REAL PUSH + AUTO YOUTUBE NOTIFICATIONS — how to deploy (free, Render)

WHAT IS REAL NOW
- The site reads notifications from updates.json (you edit it) AND from your backend /updates,
  which the backend fills AUTOMATICALLY from your YouTube channel's official RSS feed (checked every 10 min).
- When a new YouTube video appears, the backend sends a phone push to every subscriber by itself.
- notify-admin.html still lets you send a manual push (e.g. an affiliate deal); it also shows in the bell.

STEPS
1. On your computer:  npx web-push generate-vapid-keys
   Save the PRIVATE key somewhere safe. NEVER put it in GitHub or share it in chat.
   (The old key that was in earlier READMEs was exposed - do not use it.)
2. New GitHub repo (e.g. lofi-playbook-push) with ONLY server.js + package.json from push-server/.
3. render.com > New > Web Service > that repo. Build: npm install   Start: node server.js
4. Render > Environment:
     VAPID_PUBLIC_KEY  = (public key from step 1)
     VAPID_PRIVATE_KEY = (private key from step 1)
     ADMIN_SECRET      = (your own long secret)
     YT_CHANNEL_ID     = (optional but best: your channel id, starts with UC..., YouTube Studio > Settings > Channel > Advanced)
     DATA_DIR          = /var/data   (only if you add a Render Disk, so subscribers survive restarts)
5. Copy the Render URL. In index.html set  var BACKEND_URL = 'https://your-app.onrender.com';  (top of the first <script>)
6. Upload index.html + sw.js + updates.json to the website repo (sw.js in the same folder as index.html).
7. On your phone: open the site, Sign in, tap the bell, tap "Enable push notifications on my phone", Allow.

HONEST NOTES
- Until BACKEND_URL is set, the bell shows only updates.json and the push button says the backend is not set.
- Push: Android Chrome and desktop Chrome work. iPhone needs "Add to Home Screen" and iOS 16.4+.
- Render free plan sleeps when idle (first call can take ~30 s); subscribers reset on restart unless you attach a disk.
