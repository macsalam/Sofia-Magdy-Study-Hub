/* Study Hub sync: mirrors this page's localStorage to the shared Cloudflare D1 store.
   Usage: <script src="/assets/sync.js" data-app="app.js"></script>
   1. Sends any saves that were made while offline.
   2. Loads the shared progress into localStorage.
   3. Starts the page's app script.
   4. Sends every later localStorage change to the server (debounced). */
(function () {
  var me = document.currentScript;
  var APP = me && me.getAttribute('data-app');
  var PENDING = 'hub-pending';
  var API = '/api/state';
  var ls;
  try { ls = window.localStorage; } catch (e) { ls = null; }
  var rawSet = Storage.prototype.setItem, rawRemove = Storage.prototype.removeItem;
  var pending = {};
  try { pending = JSON.parse((ls && ls.getItem(PENDING)) || '{}') || {}; } catch (e) { pending = {}; }
  var timer = null, inFlight = false;

  var badge = document.createElement('div');
  badge.id = 'hubSync';
  badge.setAttribute('role', 'status');
  badge.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:9999;font:12px/1.3 system-ui,sans-serif;padding:6px 10px;border-radius:99px;background:rgba(20,16,40,.85);color:#E9E4FF;border:1px solid rgba(195,166,255,.35);pointer-events:none;transition:opacity .4s;opacity:0';
  function say(t, stay) {
    badge.textContent = t; badge.style.opacity = '1';
    clearTimeout(say.t); if (!stay) say.t = setTimeout(function () { badge.style.opacity = '0'; }, 1800);
  }
  document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(badge); });
  if (document.body) document.body.appendChild(badge);

  function keep() { if (ls) try { rawSet.call(ls, PENDING, JSON.stringify(pending)); } catch (e) {} }
  function tracked(k) { return k !== PENDING; }

  function flush(useBeacon) {
    if (inFlight || !Object.keys(pending).length) return Promise.resolve(true);
    var batch = pending; pending = {}; keep(); inFlight = true;
    return fetch(API, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(batch), keepalive: !!useBeacon, credentials: 'same-origin' })
      .then(function (r) {
        inFlight = false;
        if (!r.ok) throw new Error('HTTP ' + r.status);
        say('Saved to Study Hub');
        if (Object.keys(pending).length) schedule();
        return true;
      })
      .catch(function () {
        inFlight = false;
        for (var k in batch) if (!(k in pending)) pending[k] = batch[k];
        keep();
        say('Offline: saved on this device, will sync later', true);
        clearTimeout(timer); timer = setTimeout(flush, 15000);
        return false;
      });
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(flush, 800); }

  Storage.prototype.setItem = function (k, v) {
    rawSet.call(this, k, v);
    if (this === ls && tracked(k)) { pending[k] = String(v); keep(); schedule(); }
  };
  Storage.prototype.removeItem = function (k) {
    rawRemove.call(this, k);
    if (this === ls && tracked(k)) { pending[k] = null; keep(); schedule(); }
  };
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(true); });
  window.addEventListener('online', function () { flush(); });

  function start() {
    if (!APP) return;
    var s = document.createElement('script'); s.src = APP; document.body.appendChild(s);
  }

  function load() {
    return fetch(API, { credentials: 'same-origin', cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        var vals = (data && data.values) || {};
        if (ls) for (var k in vals) if (tracked(k) && !(k in pending)) try { rawSet.call(ls, k, vals[k]); } catch (e) {}
      });
  }

  // Send offline saves first so they are not overwritten, then load, then start the app.
  var ready = (Object.keys(pending).length ? flush() : Promise.resolve(true))
    .then(load)
    .catch(function () { say('Could not reach the Study Hub server: using this device’s copy', true); });
  ready.then(function () {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  });
  window.HubSync = { flush: flush, ready: ready };
})();
