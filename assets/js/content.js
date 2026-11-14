/* Tahan Group: loads the owner's edits (made in /admin) from Supabase.
   Runs in <head>, before the page shows. main.js waits for window.TAHAN_CONTENT
   and lays the edits over the defaults in defaults.js.

   SETUP: paste the Supabase project URL and its publishable (anon) key below.
   Both are public by design: what visitors may read or write is decided by the
   database rules in supabase/setup.sql, not by keeping this key secret.
   Never put the service_role / secret key here. */
(() => {
  window.TAHAN_SB = {
    url: 'https://vvqeyxdxdlgnvrhcqihb.supabase.co',
    key: 'sb_publishable_ueQPEisQAnfJxGKAcw6NJA_0zjh9Wsf',
  };

  const sb = window.TAHAN_SB;
  const root = document.documentElement;
  const CACHE = 'tahan-content';
  const local = /^(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)$/.test(location.hostname);
  const readCache = () => { try { return JSON.parse(localStorage.getItem(CACHE)); } catch (e) { return null; } };

  // Not connected yet: only a local test copy saved by /admin's test mode (this computer only)
  if (!sb.url || !sb.key) {
    let demo = null;
    if (local) { try { demo = JSON.parse(localStorage.getItem('tahan-demo-content')); } catch (e) {} }
    window.TAHAN_CONTENT = Promise.resolve(demo);
    return;
  }

  // Hide the page for a moment so old wording doesn't flash before the edits arrive (never longer than 1.5 s)
  root.classList.add('cms-wait');
  setTimeout(() => root.classList.remove('cms-wait'), 1500);

  const ctrl = 'AbortController' in window ? new AbortController() : null;
  const timer = setTimeout(() => ctrl && ctrl.abort(), 3000);
  window.TAHAN_CONTENT = fetch(`${sb.url}/rest/v1/site_content?id=eq.main&select=data`, {
    headers: { apikey: sb.key },
    signal: ctrl ? ctrl.signal : undefined,
  })
    .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(rows => {
      const data = (rows && rows[0] && rows[0].data) || {};
      try { localStorage.setItem(CACHE, JSON.stringify(data)); } catch (e) {}
      return data;
    })
    .catch(() => readCache()) // offline or slow: last version this visitor saw, else the defaults
    .finally(() => clearTimeout(timer));
})();
