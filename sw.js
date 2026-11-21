// Lofi PLAYBOOK service worker — shows real push notifications on the phone
self.addEventListener('push', function(event){
  var data = {};
  try{ data = event.data.json(); }catch(e){}
  var title = data.title || 'Lofi PLAYBOOK — new upload!';
  var options = {
    body: data.body || 'A new video / short / post is live. Tap to watch.',
    icon: 'https://aryancodes-dev.github.io/Lofi-PLAYBOOK/assets/logo.webp',
    badge: 'https://aryancodes-dev.github.io/Lofi-PLAYBOOK/assets/logo.webp',
    data: { url: data.url || 'https://aryancodes-dev.github.io/Lofi-PLAYBOOK/' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
