// Lofi PLAYBOOK — push + live-updates backend (Node 18+, express, web-push)
// Env: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, ADMIN_SECRET (required), YT_CHANNEL_ID (recommended),
//      ALLOWED_ORIGIN (default https://aryancodes-dev.github.io), DATA_DIR (default ./data)
const express = require('express');
const webpush = require('web-push');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ORIGIN = process.env.ALLOWED_ORIGIN || 'https://aryancodes-dev.github.io';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const SUBS_FILE = path.join(DATA_DIR, 'subscriptions.json');
const FEED_FILE = path.join(DATA_DIR, 'updates.json');
const SEEN_FILE = path.join(DATA_DIR, 'seen-videos.json');
const ADMIN_SECRET = process.env.ADMIN_SECRET;
if (!ADMIN_SECRET || !process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.error('Missing ADMIN_SECRET / VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY environment variables.');
  process.exit(1);
}
fs.mkdirSync(DATA_DIR, { recursive: true });
webpush.setVapidDetails('mailto:lofiplaybook007@gmail.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {                       // CORS — without this the browser blocks /subscribe
  res.set('Access-Control-Allow-Origin', ORIGIN);
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.set('Vary', 'Origin');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
// tiny in-memory rate limit: 30 requests / minute / IP
const hits = new Map();
app.use((req, res, next) => {
  const ip = req.ip, now = Date.now(), e = hits.get(ip) || { n: 0, t: now };
  if (now - e.t > 60000) { e.n = 0; e.t = now; }
  e.n++; hits.set(ip, e);
  if (e.n > 30) return res.status(429).json({ ok: false, error: 'slow down' });
  next();
});
setInterval(() => { const now = Date.now(); for (const [k, v] of hits) if (now - v.t > 60000) hits.delete(k); }, 60000).unref();

const read = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return d; } };
const write = (f, v) => { const tmp = f + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(v)); fs.renameSync(tmp, f); };
const safeEq = (a, b) => { a = Buffer.from(String(a || '')); b = Buffer.from(String(b || '')); return a.length === b.length && crypto.timingSafeEqual(a, b); };

app.get('/', (req, res) => res.send('Lofi PLAYBOOK push server is running.'));
app.get('/vapid-public-key', (req, res) => res.json({ key: process.env.VAPID_PUBLIC_KEY }));
app.get('/updates', (req, res) => { res.set('Cache-Control', 'public, max-age=60'); res.json({ updates: read(FEED_FILE, []) }); });

app.post('/subscribe', (req, res) => {
  const sub = req.body;
  if (!sub || typeof sub.endpoint !== 'string' || !sub.endpoint.startsWith('https://') || !sub.keys) return res.status(400).json({ ok: false, error: 'bad subscription' });
  const subs = read(SUBS_FILE, []);
  if (!subs.find(s => s.endpoint === sub.endpoint)) { subs.push({ endpoint: sub.endpoint, keys: sub.keys }); write(SUBS_FILE, subs); }
  res.json({ ok: true, total: subs.length });
});

async function pushAll(payloadObj) {
  const payload = JSON.stringify(payloadObj);
  let subs = read(SUBS_FILE, []), sent = 0, failed = 0, dead = new Set();
  for (let i = 0; i < subs.length; i += 50) {       // batches of 50 in parallel — scales to many subscribers
    await Promise.all(subs.slice(i, i + 50).map(async sub => {
      try { await webpush.sendNotification(sub, payload); sent++; }
      catch (e) { failed++; if (e.statusCode === 404 || e.statusCode === 410) dead.add(sub.endpoint); }
    }));
  }
  if (dead.size) write(SUBS_FILE, read(SUBS_FILE, []).filter(s => !dead.has(s.endpoint)));
  return { sent, failed, total: subs.length };
}
function addUpdate(u) {
  const feed = read(FEED_FILE, []).filter(x => x.id !== u.id);
  feed.unshift(u); write(FEED_FILE, feed.slice(0, 50));
}

// Manual push (notify-admin.html): also adds it to the in-site bell
app.post('/notify', async (req, res) => {
  if (!safeEq(req.body.secret, ADMIN_SECRET)) return res.status(401).json({ ok: false, error: 'wrong secret' });
  const title = String(req.body.title || 'Lofi PLAYBOOK — new upload!').slice(0, 120);
  const body = String(req.body.body || 'A new video / short / post is live. Tap to watch.').slice(0, 300);
  const url = String(req.body.url || 'https://aryancodes-dev.github.io/Lofi-PLAYBOOK/');
  if (!/^https?:\/\//.test(url)) return res.status(400).json({ ok: false, error: 'bad url' });
  addUpdate({ id: 'manual-' + Date.now(), date: new Date().toISOString().slice(0, 10), type: 'affiliate', title, text: body, link: url });
  res.json({ ok: true, ...(await pushAll({ title, body, url })) });
});

// ---- Automatic YouTube upload detection (official public RSS feed — real data, no API key) ----
let channelId = process.env.YT_CHANNEL_ID || null;
async function resolveChannelId() {
  if (channelId) return channelId;
  const html = await (await fetch('https://www.youtube.com/@LofiPLAYBOOK', { headers: { 'Accept-Language': 'en' } })).text();
  const m = html.match(/"channelId":"(UC[\w-]{22})"/) || html.match(/channel_id=(UC[\w-]{22})/);
  if (m) channelId = m[1];
  return channelId;
}
async function checkYouTube() {
  try {
    const id = await resolveChannelId();
    if (!id) return console.log('YouTube: channel id not found — set YT_CHANNEL_ID');
    const xml = await (await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + id)).text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m => ({
      id: (m[1].match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1],
      title: ((m[1].match(/<title>(.*?)<\/title>/) || [])[1] || '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
      date: ((m[1].match(/<published>(.*?)<\/published>/) || [])[1] || '').slice(0, 10)
    })).filter(e => e.id);
    const first = !fs.existsSync(SEEN_FILE);
    const seen = new Set(read(SEEN_FILE, []));
    const fresh = entries.filter(e => !seen.has(e.id));
    entries.forEach(e => seen.add(e.id)); write(SEEN_FILE, [...seen]);
    for (const e of fresh.reverse()) {
      const link = 'https://www.youtube.com/watch?v=' + e.id;
      addUpdate({ id: 'yt-' + e.id, date: e.date, type: 'video', title: e.title, text: 'New on YouTube @LofiPLAYBOOK — auto-synced.', link });
      if (!first) await pushAll({ title: 'New on YouTube 🎵', body: e.title, url: link });  // first run only fills the feed
    }
  } catch (e) { console.log('YouTube check failed:', e.message); }
}
checkYouTube(); setInterval(checkYouTube, 10 * 60 * 1000).unref();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Push server on port ' + PORT));
