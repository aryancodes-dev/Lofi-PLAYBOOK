// Lofi PLAYBOOK — real push notification backend (Node + web-push)
// Deploy free on Render. See README-PUSH.txt.
const express = require('express');
const webpush = require('web-push');
const fs = require('fs');
const app = express();
app.use(express.json());
const SUBS_FILE = './subscriptions.json';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-secret';
webpush.setVapidDetails(
  'mailto:lofiplaybook007@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);
function loadSubs(){ try{ return JSON.parse(fs.readFileSync(SUBS_FILE,'utf8')); }catch(e){ return []; } }
function saveSubs(s){ fs.writeFileSync(SUBS_FILE, JSON.stringify(s,null,2)); }
// 1) A visitor's phone subscribes (called from the website)
app.post('/subscribe', (req,res)=>{
  const sub = req.body;
  if(!sub || !sub.endpoint) return res.status(400).json({ok:false,error:'no subscription'});
  const subs = loadSubs();
  if(!subs.find(s=>s.endpoint===sub.endpoint)){ subs.push(sub); saveSubs(subs); }
  res.json({ok:true, total: subs.length});
});
// 2) You send a push to ALL subscribers (new video / short / affiliate deal)
app.post('/notify', async (req,res)=>{
  if(req.body.secret !== ADMIN_SECRET) return res.status(401).json({ok:false,error:'wrong secret'});
  const subs = loadSubs();
  const payload = JSON.stringify({
    title: req.body.title || 'Lofi PLAYBOOK — new upload!',
    body: req.body.body || 'A new video / short / post is live. Tap to watch.',
    url: req.body.url || 'https://aryancodes-dev.github.io/Lofi-PLAYBOOK/'
  });
  let sent=0, failed=0;
  for(const sub of [...subs]){
    try{ await webpush.sendNotification(sub, payload); sent++; }
    catch(e){ failed++; // remove dead subscriptions
      const rest = loadSubs().filter(s=>s.endpoint!==sub.endpoint); saveSubs(rest); }
  }
  res.json({ok:true, sent, failed, total: subs.length});
});
app.get('/', (req,res)=>res.send('Lofi PLAYBOOK push server is running.'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('Push server on port '+PORT));
