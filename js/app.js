(function(){
  "use strict";
  /* ---------- LIVING SKY : TWINKLING STARS + SHOOTING STARS + RAIN ---------- */
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas=document.getElementById('rain'), ctx=canvas.getContext('2d'), drops=[], W, H;
  var sky=document.getElementById('sky'), sctx=sky.getContext('2d'), stars=[], meteors=[], nextMeteor=220;
  var lastW=0;
  function size(){ var nw=window.innerWidth; if(nw===lastW && drops.length) return; lastW=nw; W=canvas.width=nw; H=canvas.height=window.innerHeight; sky.width=W; sky.height=H;
    drops=[]; var n=Math.min(W<640?80:150, Math.floor(W/9));
    for(var i=0;i<n;i++) drops.push({x:Math.random()*W, y:Math.random()*H, l:10+Math.random()*22, s:9+Math.random()*13, o:.14+Math.random()*.38});
    stars=[]; var sn=Math.min(W<640?100:170, Math.floor(W*H/11000));
    for(var j=0;j<sn;j++) stars.push({x:Math.random()*W, y:Math.random()*H*.82, r:.6+Math.random()*1.7, p:Math.random()*Math.PI*2, sp:.008+Math.random()*.025, hue:Math.random()<.18?'255,217,168':(Math.random()<.3?'174,238,255':'255,255,255')});
  }
  size(); window.addEventListener('resize', size);
  function drawSky(){
    sctx.clearRect(0,0,W,H);
    for(var i=0;i<stars.length;i++){ var st=stars[i]; st.p+=st.sp; var a=.28+Math.abs(Math.sin(st.p))*.72;
      sctx.beginPath(); sctx.arc(st.x,st.y,st.r,0,Math.PI*2); sctx.fillStyle='rgba('+st.hue+','+a+')'; sctx.fill(); }
    if(!meteors.length && --nextMeteor<=0){ meteors.push({x:W*.35+Math.random()*W*.6, y:Math.random()*H*.28, vx:-(6+Math.random()*4), vy:3.5+Math.random()*2, life:1}); nextMeteor=260+Math.random()*320; }
    for(var k=meteors.length-1;k>=0;k--){ var m=meteors[k]; m.x+=m.vx; m.y+=m.vy; m.life-=.012;
      var grad=sctx.createLinearGradient(m.x,m.y,m.x-m.vx*9,m.y-m.vy*9); grad.addColorStop(0,'rgba(255,255,255,'+(.9*m.life)+')'); grad.addColorStop(1,'rgba(255,255,255,0)');
      sctx.strokeStyle=grad; sctx.lineWidth=2; sctx.lineCap='round'; sctx.beginPath(); sctx.moveTo(m.x,m.y); sctx.lineTo(m.x-m.vx*9,m.y-m.vy*9); sctx.stroke();
      if(m.life<=0||m.x<-80||m.y>H) meteors.splice(k,1); }
  }
  var lastFrame=0;
  function rain(now){ if(!reduced) requestAnimationFrame(rain); if(document.hidden) return; if(now&&now-lastFrame<33) return; if(now) lastFrame=now; drawSky(); ctx.clearRect(0,0,W,H); ctx.lineWidth=1; ctx.lineCap='round';
    for(var i=0;i<drops.length;i++){ var d=drops[i];
      ctx.strokeStyle='rgba(174,194,255,'+d.o+')'; ctx.beginPath(); ctx.moveTo(d.x,d.y); ctx.lineTo(d.x-2,d.y+d.l); ctx.stroke();
      d.y+=d.s; d.x-=0.7; if(d.y>H){ d.y=-20; d.x=Math.random()*W; } }
  }
  rain();
  /* ---------- FLOATING NOTES, HEARTS & SPARKS ---------- */
  (function(){
    if(reduced) return;
    var layer=document.getElementById('floatLayer'); if(!layer) return;
    var glyphs=[['♪','note'],['♫','note'],['♩','note'],['♡','heart'],['♥','heart'],['✦','spark'],['✧','spark'],['♪','note'],['♡','heart']];
    for(var i=0;i<16;i++){ var s=document.createElement('span'); var g=glyphs[i%glyphs.length];
      s.className='float-el '+g[1]; s.textContent=g[0];
      s.style.left=(2+Math.random()*94)+'%'; s.style.fontSize=(15+Math.random()*22)+'px';
      s.style.setProperty('--sway',(-50+Math.random()*100)+'px');
      s.style.animationDuration=(13+Math.random()*15)+'s'; s.style.animationDelay=(-Math.random()*22)+'s';
      layer.appendChild(s); }
  })();
  /* ---------- GENTLE PARALLAX ON SCROLL ---------- */
  (function(){
    if(true) return; /* v6: scroll parallax removed — fixed layers stay fixed, nothing drifts */
    var moon=document.querySelector('.moon'), aurora=document.querySelector('.aurora'), ticking=false;
    function update(){ var y=window.scrollY||0; if(moon) moon.style.translate='0 '+(y*.06)+'px'; if(aurora) aurora.style.translate='0 '+(y*-.04)+'px'; ticking=false; }
    window.addEventListener('scroll', function(){ if(!ticking){ ticking=true; requestAnimationFrame(update); } }, {passive:true});
  })();

  /* ---------- COUNTDOWN : 21 Nov 2026, 7:00 PM IST = 13:30 UTC ---------- */
  var target=new Date('2026-11-21T13:30:00Z').getTime();
  var el={d:document.getElementById('cd-d'),h:document.getElementById('cd-h'),m:document.getElementById('cd-m'),s:document.getElementById('cd-s'),note:document.getElementById('cd-note')};
  function pad(n){return (n<10?'0':'')+n;}
  function tick(){
    var diff=target-Date.now();
    if(diff<=0){ el.d.textContent='0'; el.h.textContent='00'; el.m.textContent='00'; el.s.textContent='00';
      el.note.textContent='🔴 The premiere is LIVE now — go watch it on YouTube!'; return; }
    var d=Math.floor(diff/86400000), h=Math.floor(diff/3600000)%24, m=Math.floor(diff/60000)%60, s=Math.floor(diff/1000)%60;
    el.d.textContent=d; el.h.textContent=pad(h); el.m.textContent=pad(m); el.s.textContent=pad(s);
    el.note.textContent = d===0 && h<3 ? 'Almost time. Keep this page open. 🌧' : '';
  }
  tick(); setInterval(tick,1000);

  /* ---------- PLAYER ---------- */
  var audio=document.getElementById('audio'), playBtn=document.getElementById('playBtn'),
      seek=document.getElementById('seek'), vol=document.getElementById('vol'),
      tCur=document.getElementById('tCur'), tDur=document.getElementById('tDur'),
      trackTu=document.getElementById('track-tu');
  function fmt(t){ if(!isFinite(t)) return '0:00'; t=Math.max(0,Math.floor(t)); return Math.floor(t/60)+':'+pad(t%60); }
  function setUI(playing){ playBtn.textContent=playing?'⏸':'▶'; document.body.classList.toggle('is-playing',playing); trackTu.classList.toggle('playing',playing);
    document.querySelectorAll('.js-play-tu,.hero .btn-play').forEach(function(b){ if(b.id!=='previewBtn') b.innerHTML=playing?'⏸ &nbsp;Pause “Tu Online Hai”':'▶ &nbsp;Play “Tu Online Hai”'; });
    document.querySelectorAll('.js-play-tu').forEach(function(b){ if(b.classList.contains('play-fab')) b.textContent=playing?'⏸':'▶'; if(b.classList.contains('btn')) b.innerHTML=playing?'⏸ Pause':'▶ Listen now'; });
    var pv=document.getElementById('previewBtn'); if(pv) pv.textContent=playing?'⏸ Pause preview':'▶ Preview the song here';
  }
  function toggle(){ if(audio.paused){ audio.play(); } else { audio.pause(); } }
  playBtn.addEventListener('click', toggle);
  document.getElementById('heroPlay').addEventListener('click', toggle);
  document.getElementById('previewBtn').addEventListener('click', toggle);
  document.querySelectorAll('.js-play-tu').forEach(function(b){ b.addEventListener('click', toggle); });
  audio.addEventListener('play', function(){ setUI(true); });
  audio.addEventListener('pause', function(){ setUI(false); });
  audio.addEventListener('ended', function(){ setUI(false); seek.value=0; });
  audio.addEventListener('loadedmetadata', function(){ var r=Math.round(audio.duration); tDur.textContent=Math.floor(r/60)+':'+pad(r%60); });
  audio.addEventListener('timeupdate', function(){ if(audio.duration){ seek.value=(audio.currentTime/audio.duration)*100; } tCur.textContent=fmt(audio.currentTime); });
  seek.addEventListener('input', function(){ if(audio.duration){ audio.currentTime=(seek.value/100)*audio.duration; } });
  vol.addEventListener('input', function(){ audio.volume=parseFloat(vol.value); });
  audio.volume=0.9;

  /* ---------- FILTERS ---------- */
  var chips=document.querySelectorAll('.chip'), tracks=document.querySelectorAll('.track'), noT=document.getElementById('noTracks');
  function applyFilter(f){
    chips.forEach(function(c){ c.setAttribute('aria-pressed', c.dataset.filter===f?'true':'false'); });
    var shown=0;
    tracks.forEach(function(t){ var ok = f==='all' || (t.dataset.moods||'').split(' ').indexOf(f)>-1; t.style.display=ok?'':'none'; if(ok) shown++; });
    noT.style.display=shown?'none':'block';
  }
  chips.forEach(function(c){ c.addEventListener('click', function(){ applyFilter(c.dataset.filter); }); });
  document.querySelectorAll('[data-mood-link]').forEach(function(a){ a.addEventListener('click', function(){ applyFilter(a.dataset.moodLink); }); });

  /* ---------- COPY + TOAST ---------- */
  var toast=document.getElementById('toast'), toastT;
  function showToast(msg){ toast.textContent=msg; toast.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){ toast.classList.remove('show'); },2400); }
  function copyText(text,msg){
    function done(){ showToast(msg); }
    if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(done).catch(function(){ fallback(); }); } else fallback();
    function fallback(){ var ta=document.createElement('textarea'); ta.value=text; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ showToast('Copy failed — long-press to copy'); } document.body.removeChild(ta); }
  }
  document.getElementById('copyHash').addEventListener('click', function(){
    copyText('#TuOnlineHai #HindiSadSong #HeartTouchingSong #BrokenHeart #SadLoveSong #EmotionalSong #OneSidedLove #BreakupSong #HindiSongs #LoveFailure #SadStatus #NewHindiSong #Alone #MissYou #Heartbreak #SadSong #LateNightVibes #OnlineButNotMine #HeartbreakSong #ViralSong #NewSong2026 #209AM #LoveSong #Reels #Trending #SadReels','Hashtags copied ✓ Share them everywhere');
  });
  document.getElementById('copyTime').addEventListener('click', function(){ copyText('2:09 AM','“2:09 AM” copied ✓ Paste it in the premiere chat'); });

  /* ---------- REVEAL ---------- */
  if('IntersectionObserver' in window && !reduced){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{threshold:.08, rootMargin:'0px 0px 12% 0px'});
    document.querySelectorAll('.reveal').forEach(function(elm){ io.observe(elm); });
    setTimeout(function(){ document.querySelectorAll('.reveal').forEach(function(elm){ elm.classList.add('in'); }); },3200);
  } else { document.querySelectorAll('.reveal').forEach(function(elm){ elm.classList.add('in'); }); }

  /* ---------- INSANE v3 : CURSOR GLOW + TRAIL + TILT + BURST + LIGHTNING + PROGRESS ---------- */
  (function(){
    if(reduced) return;
    var glow=document.getElementById('cursorGlow'), gx=innerWidth/2, gy=innerHeight/3, tx=gx, ty=gy, lastTrail=0;
    var coarse=window.matchMedia('(hover: none), (pointer: coarse)').matches;
    window.addEventListener('pointermove', function(e){ tx=e.clientX; ty=e.clientY;
      var now=Date.now(); if(!coarse && now-lastTrail>70){ lastTrail=now; var s=document.createElement('span'); s.className='sparkle-trail'; s.style.left=(e.clientX-4)+'px'; s.style.top=(e.clientY-4)+'px'; document.body.appendChild(s); setTimeout(function(){ s.remove(); },720); }
    }, {passive:true});
    (function loopGlow(){ if(coarse || !glow || getComputedStyle(glow).display==='none') return; gx+=(tx-gx)*.08; gy+=(ty-gy)*.08; glow.style.left=gx+'px'; glow.style.top=gy+'px'; requestAnimationFrame(loopGlow); })();
    var bar=document.getElementById('progressBar');
    window.addEventListener('scroll', function(){ var h=document.documentElement; var p=h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100; if(bar) bar.style.width=p+'%'; }, {passive:true});
    /* 3D tilt on cards */
    if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      document.querySelectorAll('.track,.mood').forEach(function(card){
        card.addEventListener('pointermove', function(e){ var r=card.getBoundingClientRect(); var px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5; card.style.transform='perspective(900px) rotateY('+(px*7)+'deg) rotateX('+(-py*7)+'deg) translateY(-6px) scale(1.015)'; });
        card.addEventListener('pointerleave', function(){ card.style.transform=''; });
      });
    }
    /* heart burst on any play press */
    var burstLayer=document.getElementById('burstLayer');
    function burst(x,y){ if(!burstLayer) return; var chars=['💔','♡','♪','✦','🌧','💗'];
      for(var i=0;i<14;i++){ var p=document.createElement('span'); p.className='burst-p'; p.textContent=chars[i%chars.length];
        var ang=(Math.PI*2*i)/14, dist=70+Math.random()*90;
        p.style.left=x+'px'; p.style.top=y+'px'; p.style.setProperty('--bx',Math.cos(ang)*dist+'px'); p.style.setProperty('--by',(Math.sin(ang)*dist-40)+'px'); p.style.setProperty('--br',(Math.random()*160-80)+'deg');
        burstLayer.appendChild(p); (function(el){ setTimeout(function(){ el.remove(); },1050); })(p); } }
    document.querySelectorAll('#playBtn,#heroPlay,#previewBtn,.js-play-tu').forEach(function(b){ b.addEventListener('click', function(e){ var r=b.getBoundingClientRect(); burst(r.left+r.width/2, r.top+r.height/2); }); });
    /* soft lightning flash for rainy mood */
    var flash=document.getElementById('lightning');
    function strike(){ if(!flash) return; flash.style.transition='none'; flash.style.opacity='.07'; setTimeout(function(){ flash.style.transition='opacity .7s'; flash.style.opacity='0'; },90); setTimeout(strike, 11000+Math.random()*14000); }
    setTimeout(strike, 7000);
    /* extra floaters for denser sky */
    var layer=document.getElementById('floatLayer');
    if(layer){ var glyphs=[['♪','note'],['♡','heart'],['✦','spark'],['♫','note'],['♥','heart']];
      for(var j=0;j<0;j++){ var s2=document.createElement('span'); var g=glyphs[j%glyphs.length]; s2.className='float-el '+g[1]; s2.textContent=g[0]; s2.style.left=(3+Math.random()*92)+'%'; s2.style.fontSize=(14+Math.random()*20)+'px'; s2.style.setProperty('--sway',(-60+Math.random()*120)+'px'); s2.style.animationDuration=(12+Math.random()*14)+'s'; s2.style.animationDelay=(-Math.random()*20)+'s'; layer.appendChild(s2); } }
  })();

  /* ---------- INFINITE LEVEL : PARTICLES + BOKEH + FIREFLIES + RIPPLE + MAGNETIC ---------- */
  (function(){
    if(reduced) return;
    /* connected particle constellation canvas */
    var pc=null; /* constellation canvas retired — stability first */
    if(pc){ var pctx=pc.getContext('2d'), PW, PH, pts=[];
      function psize(){ PW=pc.width=innerWidth; PH=pc.height=innerHeight; pts=[]; var n=Math.min(90, Math.floor(PW/14));
        for(var i=0;i<n;i++) pts.push({x:Math.random()*PW,y:Math.random()*PH,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:1+Math.random()*2.2,c:Math.random()<.33?'255,179,92':(Math.random()<.5?'255,107,157':'94,231,255')}); }
      psize(); window.addEventListener('resize', psize);
      (function drawPts(){ pctx.clearRect(0,0,PW,PH);
        for(var i=0;i<pts.length;i++){ var p=pts[i]; p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>PW) p.vx*=-1; if(p.y<0||p.y>PH) p.vy*=-1;
          pctx.beginPath(); pctx.arc(p.x,p.y,p.r,0,Math.PI*2); pctx.fillStyle='rgba('+p.c+',.85)'; pctx.shadowBlur=12; pctx.shadowColor='rgba('+p.c+',.9)'; pctx.fill(); pctx.shadowBlur=0;
          for(var j=i+1;j<pts.length;j++){ var q=pts[j], dx=p.x-q.x, dy=p.y-q.y, d=dx*dx+dy*dy; if(d<11000){ pctx.strokeStyle='rgba(180,170,255,'+(0.14*(1-d/11000))+')'; pctx.lineWidth=1; pctx.beginPath(); pctx.moveTo(p.x,p.y); pctx.lineTo(q.x,q.y); pctx.stroke(); } } }
        requestAnimationFrame(drawPts); })();
    }
    /* bokeh orbs + fireflies */
    var bokeh=document.getElementById('bokehLayer');
    if(bokeh && getComputedStyle(bokeh).display!=='none'){ var colors=['rgba(255,179,92,.55)','rgba(255,107,157,.5)','rgba(157,123,255,.5)','rgba(94,231,255,.45)','rgba(46,224,111,.35)'];
      for(var b=0;b<22;b++){ var o=document.createElement('span'); o.className='bokeh'; var sz=18+Math.random()*72; o.style.width=sz+'px'; o.style.height=sz+'px'; o.style.left=(Math.random()*96)+'%'; o.style.bottom=(-10-Math.random()*20)+'%'; o.style.background='radial-gradient(circle,'+colors[b%colors.length]+',transparent 70%)'; o.style.animationDuration=(16+Math.random()*20)+'s'; o.style.animationDelay=(-Math.random()*24)+'s'; bokeh.appendChild(o); }
      for(var f=0;f<14;f++){ var ff=document.createElement('span'); ff.className='firefly'; ff.style.left=(Math.random()*96)+'%'; ff.style.top=(8+Math.random()*72)+'%'; ff.style.setProperty('--fx',(-70+Math.random()*140)+'px'); ff.style.setProperty('--fy',(-70+Math.random()*110)+'px'); ff.style.animationDuration=(3.5+Math.random()*4)+'s'; ff.style.animationDelay=(-Math.random()*4)+'s'; bokeh.appendChild(ff); }
    }
    /* mega floaters — infinite density */
    var fl=document.getElementById('floatLayer');
    if(fl){ var gg=[['♪','note'],['♫','note'],['♡','heart'],['♥','heart'],['✦','spark'],['✧','spark'],['♩','note'],['💗','heart']];
      for(var k=0;k<0;k++){ var e=document.createElement('span'); var it=gg[k%gg.length]; e.className='float-el '+it[1]; e.textContent=it[0]; e.style.left=(Math.random()*97)+'%'; e.style.fontSize=(13+Math.random()*28)+'px'; e.style.setProperty('--sway',(-90+Math.random()*180)+'px'); e.style.animationDuration=(10+Math.random()*13)+'s'; e.style.animationDelay=(-Math.random()*18)+'s'; fl.appendChild(e); } }
    /* click ripple everywhere + bigger burst */
    window.addEventListener('pointerdown', function(e){ var r=document.createElement('span'); r.className='ripple'; r.style.left=e.clientX+'px'; r.style.top=e.clientY+'px'; document.body.appendChild(r); setTimeout(function(){ r.remove(); },780); }, {passive:true});
    /* stronger tilt */
    if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      document.querySelectorAll('.count-card,.share-card,.phone').forEach(function(card){
        card.addEventListener('pointermove', function(e){ var rect=card.getBoundingClientRect(); var px=(e.clientX-rect.left)/rect.width-.5, py=(e.clientY-rect.top)/rect.height-.5; card.style.transform='perspective(1000px) rotateY('+(px*5)+'deg) rotateX('+(-py*5)+'deg)'; });
        card.addEventListener('pointerleave', function(){ card.style.transform=''; });
      });
      /* magnetic primary buttons */
      document.querySelectorAll('.btn-play,.p-play').forEach(function(btn){
        btn.addEventListener('pointermove', function(e){ var rect=btn.getBoundingClientRect(); var mx=e.clientX-rect.left-rect.width/2, my=e.clientY-rect.top-rect.height/2; btn.style.translate=(mx*.12)+'px '+(my*.18)+'px'; });
        btn.addEventListener('pointerleave', function(){ btn.style.translate='0 0'; });
      });
    }
    /* parallax depth for nebula / rays / moon on mouse */
    var neb=document.querySelector('.nebula'), rays=document.querySelector('.god-rays');
    window.addEventListener('pointermove', function(e){ var nx=(e.clientX/innerWidth-.5), ny=(e.clientY/innerHeight-.5); if(neb) neb.style.translate=(nx*-18)+'px '+(ny*-12)+'px'; if(rays) rays.style.translate=(nx*22)+'px 0'; }, {passive:true});
  })();
})();
