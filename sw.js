// Lofi PLAYBOOK service worker — real push notifications
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function(event){
  var data = {};
  try{ data = event.data ? event.data.json() : {}; }catch(e){}
  var base = self.registration.scope;
  var options = {
    body: data.body || 'A new video / short / post is live. Tap to watch.',
    icon: base + 'assets/logo.webp',
    badge: base + 'assets/logo.webp',
    data: { url: data.url || base }
  };
  event.waitUntil(self.registration.showNotification(data.title || 'Lofi PLAYBOOK — new upload!', options));
});
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || self.registration.scope;
  event.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
    for (var i=0;i<list.length;i++){ if (list[i].url === url && 'focus' in list[i]) return list[i].focus(); }
    return self.clients.openWindow(url);
  }));
});
