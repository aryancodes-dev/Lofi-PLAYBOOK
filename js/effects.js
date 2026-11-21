(function(){
  "use strict";
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CHANNEL_ID='UCf4sWY2L9RjKkJ_u-i_bAMQ';

  /* ---------- HERO UMBRELLA RAIN : rain falling on the umbrella photo ---------- */
  (function(){
    var cv=document.getElementById('heroRain'); if(!cv||reduced) return;
    var cx=cv.getContext('2d'), W=0, H=0, drops=[], splashes=[], running=true, inView=true;
    var lastW=0; function size(){ var r=cv.parentElement.getBoundingClientRect(); var nw=Math.floor(r.width); if(nw===lastW && drops.length) return; lastW=nw; W=cv.width=nw; H=cv.height=Math.floor(r.height);
      drops=[]; var n=Math.min(W<640?90:150, Math.floor(W/8));
      for(var i=0;i<n;i++) drops.push({x:Math.random()*W,y:Math.random()*H,l:12+Math.random()*20,s:11+Math.random()*12,o:.18+Math.random()*.4,w:Math.random()<.25?1.6:1});
    }
    size(); window.addEventListener('resize', size);
    if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ inView=es[0].isIntersecting; },{threshold:0}).observe(cv); }
    document.addEventListener('visibilitychange', function(){ running=!document.hidden; });
    var fc=0;
    (function draw(){
      requestAnimationFrame(draw);
      if(!running||!inView) return;
      if((fc++&1)===1) return;
      cx.clearRect(0,0,W,H); cx.lineCap='round';
      var i,d;
      for(i=0;i<drops.length;i++){ d=drops[i];
        cx.strokeStyle='rgba(190,214,255,'+d.o+')'; cx.lineWidth=d.w;
        cx.beginPath(); cx.moveTo(d.x,d.y); cx.lineTo(d.x-2.5,d.y+d.l); cx.stroke();
        d.y+=d.s; d.x-=0.8;
        if(d.y>H-6){ if(Math.random()<.35) splashes.push({x:d.x,y:H-4,r:1,a:.7}); d.y=-24; d.x=Math.random()*(W+40); }
      }
      for(i=splashes.length-1;i>=0;i--){ var s=splashes[i]; s.r+=0.9; s.a-=0.045;
        if(s.a<=0){ splashes.splice(i,1); continue; }
        cx.strokeStyle='rgba(190,220,255,'+s.a+')'; cx.lineWidth=1.2;
        cx.beginPath(); cx.ellipse(s.x,s.y,s.r*1.7,s.r*0.55,0,0,Math.PI*2); cx.stroke(); }
    })();
  })();

  /* ---------- SUBSCRIBE SHEET : YouTube's official button, in-page ---------- */
  var sheet=document.getElementById('subSheet'), ytLoaded=false;
  function openSheet(){
    sheet.classList.add('open'); document.body.style.overflow='hidden';
    if(!ytLoaded){ ytLoaded=true;
      var sc=document.createElement('script'); sc.src='https://apis.google.com/js/platform.js'; sc.async=true;
      sc.onerror=function(){ showFallback(); };
      document.head.appendChild(sc);
      setTimeout(function(){ if(!sheet.querySelector('.g-ytsubscribe iframe')) showFallback(); }, 4500);
    }
    refreshCounts();
  }
  function showFallback(){ var f=document.getElementById('ytFallback'); if(f) f.style.display='block'; }
  function closeSheet(){ sheet.classList.remove('open'); document.body.style.overflow=''; setTimeout(refreshCounts, 1200); }
  document.querySelectorAll('.js-subscribe').forEach(function(b){ b.addEventListener('click', openSheet); });
  document.getElementById('subClose').addEventListener('click', closeSheet);
  sheet.addEventListener('click', function(e){ if(e.target===sheet) closeSheet(); });

  /* ---------- ABOUT PAGE & GITHUB PROJECTS SUBPAGE ---------- */
  var about=document.getElementById('aboutPage');
  var proj=document.getElementById('projectsPage');
  function openAbout(e){ if(e) e.preventDefault(); about.classList.add('open'); document.body.style.overflow='hidden'; about.scrollTop=0; }
  function closeAbout(){ about.classList.remove('open'); if(!proj.classList.contains('open')) document.body.style.overflow=''; }
  function openProjects(e){ if(e) e.preventDefault(); proj.classList.add('open'); document.body.style.overflow='hidden'; proj.scrollTop=0; }
  function closeProjects(){ proj.classList.remove('open'); if(!about.classList.contains('open')) document.body.style.overflow=''; }
  function closeAllModals(){ proj.classList.remove('open'); about.classList.remove('open'); document.body.style.overflow=''; }
  document.querySelectorAll('.js-about').forEach(function(b){ b.addEventListener('click', openAbout); });
  document.getElementById('aboutClose').addEventListener('click', closeAbout);
  document.querySelectorAll('.js-open-projects').forEach(function(b){ b.addEventListener('click', openProjects); });
  document.getElementById('projectsBack').addEventListener('click', closeProjects);
  document.getElementById('projectsClose').addEventListener('click', closeAllModals);
  document.querySelectorAll('.js-close-all-top').forEach(function(b){ b.addEventListener('click', function(){ closeAllModals(); window.scrollTo({top:0,behavior:'smooth'}); }); });
  if(location.hash==='#about') openAbout();
  if(location.hash==='#projects'){ openAbout(); openProjects(); }
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ closeSheet(); closeProjects(); closeAbout(); } });

  /* ---------- LIVE COUNTS : real numbers from YouTube via SocialCounts ---------- */
  var cur={subs:131, views:2801, videos:6};
  function fmt(n){ return n.toLocaleString('en-IN'); }
  function tween(el, from, to){
    if(!el) return;
    if(from===to){ el.textContent=fmt(to); return; }
    var start=null;
    function step(ts){ if(!start) start=ts; var p=Math.min(1,(ts-start)/900); el.textContent=fmt(Math.round(from+(to-from)*p)); if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  }
  function setCounts(subs, views, videos){
    tween(document.getElementById('statSubs'), cur.subs, subs);
    tween(document.getElementById('hubSubs'), cur.subs, subs);
    tween(document.getElementById('sheetSubs'), cur.subs, subs);
    tween(document.getElementById('statViews'), cur.views, views);
    tween(document.getElementById('hubViews'), cur.views, views);
    tween(document.getElementById('sheetViews'), cur.views, views);
    var sv=document.getElementById('statVideos'); if(sv) sv.textContent=videos;
    cur={subs:subs, views:views, videos:videos};
  }
  function refreshCounts(){
    fetch('https://api.socialcounts.org/youtube-live-subscriber-count/'+CHANNEL_ID)
      .then(function(r){ return r.json(); })
      .then(function(d){
        var c=(d.counters&&(d.counters.api||d.counters.estimation))||null;
        if(c && c.subscriberCount) setCounts(c.subscriberCount, c.viewCount||cur.views, c.videoCount||cur.videos);
      })
      .catch(function(){ /* keep last real numbers on screen */ });
  }
  refreshCounts(); setInterval(refreshCounts, 60000);

  /* ---------- AUTO-SYNC UPLOADS : new YouTube videos appear automatically ---------- */
  var KNOWN={'6ghXpBX9ieg':1,'yIwM1rfoP2o':1,'06TpiUrgD3w':1,'duvMui9Z7G8':1,'NEqa-RUb5V8':1};
  function decode(s){ var t=document.createElement('textarea'); t.innerHTML=s||''; return t.value; }
  function syncUploads(){
    var feed='https://www.youtube.com/feeds/videos.xml?channel_id='+CHANNEL_ID;
    fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(feed))
      .then(function(r){ return r.json(); })
      .then(function(d){
        if(!d || d.status!=='ok' || !d.items) return;
        var fresh=d.items.filter(function(it){ var id=(it.guid||'').replace('yt:video:',''); return id && !KNOWN[id]; });
        if(!fresh.length) return;
        var grid=document.getElementById('syncGrid'), sec=document.getElementById('fresh');
        fresh.forEach(function(it){
          var id=(it.guid||'').replace('yt:video:','');
          var url='https://www.youtube.com/watch?v='+id;
          var date=''; try{ date=new Date(it.pubDate.replace(' ','T')+'Z').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); }catch(e){}
          var card=document.createElement('article'); card.className='track';
          card.innerHTML='<div class="art"><img alt=""/><a class="play-fab" target="_blank" rel="noopener" aria-label="Watch on YouTube">▶</a></div>'+
            '<div class="body"><span class="sync-badge" style="align-self:flex-start">New on YouTube</span><h3><a target="_blank" rel="noopener"></a></h3>'+
            '<div class="meta"><span>Uploaded '+date+'</span><span>·</span><span>Auto-synced from YouTube</span></div>'+
            '<div class="tags"><span class="tag">Watch on YouTube</span></div></div>';
          var img=card.querySelector('img'); img.src='https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'; img.alt=decode(it.title)+' — Lofi PLAYBOOK on YouTube';
          card.querySelectorAll('a').forEach(function(a){ a.href=url; });
          card.querySelector('h3 a').textContent=decode(it.title);
          grid.appendChild(card);
        });
        sec.style.display='';
      })
      .catch(function(){ /* library stays as published */ });
  }
  syncUploads(); setInterval(syncUploads, 300000);
})();
