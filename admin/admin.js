/* Tahan Group /admin: the owner edits the site's content here.
   Saves go to Supabase (table site_content, row 'main'); the site reads them through assets/js/content.js.
   Only differences from the defaults (assets/js/defaults.js + index.html) are stored.
   Test mode: when content.js has no Supabase details and the page runs on this computer,
   everything is kept in this browser's storage instead, so the dashboard can be tried safely. */
(() => {
  'use strict';
  const D = window.TAHAN_DEFAULTS;
  const SB = window.TAHAN_SB || {};
  const configured = !!(SB.url && SB.key);
  const local = /^(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)$/.test(location.hostname);
  const demo = !configured && local;

  /* ---------------- small helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const clone = o => JSON.parse(JSON.stringify(o));
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const isUrl = s => /^(https?:\/\/|data:image\/)/i.test(String(s || ''));
  const slug = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  const move = (arr, i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; };
  const fmt = d => { try { return new Date(d).toLocaleString('ar-LB', { dateStyle: 'medium', timeStyle: 'short', numberingSystem: 'latn' }); } catch (e) { return String(d); } };
  const bg = (node, url) => { node.style.backgroundImage = url ? `url("${String(url).replace(/"/g, '%22')}")` : ''; };

  // el('div', { class, text, value, onclick, ... }, ...children)
  function el(tag, props, ...kids) {
    const n = document.createElement(tag);
    Object.entries(props || {}).forEach(([k, v]) => {
      if (v == null || v === false) return;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'value') n.value = v;
      else if (k === 'checked' || k === 'selected' || k === 'disabled') n[k] = !!v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    });
    kids.flat().forEach(c => { if (c != null && c !== false) n.append(c.nodeType ? c : String(c)); });
    return n;
  }
  const field = (label, input, hint) => el('label', { class: 'fld' }, el('span', { text: label }), input, hint ? el('small', { class: 'hint', text: hint }) : null);
  const btn = (text, onclick, cls = '') => el('button', { type: 'button', class: 'btn btn--sm ' + cls, text, onclick });

  const toastEl = $('[data-toast]');
  let toastT;
  function toast(msg, err) {
    toastEl.textContent = msg;
    toastEl.classList.toggle('is-error', !!err);
    toastEl.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => { toastEl.hidden = true; }, err ? 7000 : 3500);
  }

  /* ---------------- storage: Supabase, or this browser in test mode ---------------- */
  function supabaseApi() {
    const sb = window.supabase.createClient(SB.url, SB.key, { auth: { persistSession: true, storageKey: 'tahan-admin-auth' } });
    return {
      async session() { const { data } = await sb.auth.getSession(); return data.session ? data.session.user.email : null; },
      async login(email, password) {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.user.email;
      },
      async logout() { await sb.auth.signOut(); },
      async isAdmin() { const { data, error } = await sb.rpc('is_site_admin'); if (error) throw error; return data === true; },
      async load() {
        const { data, error } = await sb.from('site_content').select('data, updated_at, updated_by').eq('id', 'main').maybeSingle();
        if (error) throw error;
        return data || { data: {} };
      },
      async save(content) {
        const { data, error } = await sb.from('site_content').update({ data: content }).eq('id', 'main').select('updated_at, updated_by');
        if (error) throw error;
        if (data && data.length) return data[0];
        const r = await sb.from('site_content').insert({ id: 'main', data: content }).select('updated_at, updated_by');
        if (r.error) throw r.error;
        return r.data[0];
      },
      async history() {
        const { data, error } = await sb.from('site_content_history').select('id, saved_at, saved_by, data').order('saved_at', { ascending: false }).limit(40);
        if (error) throw error;
        return data || [];
      },
      async upload(blob, name) {
        const path = `uploads/${new Date().toISOString().slice(0, 10)}/${Date.now().toString(36)}-${name}`;
        const { error } = await sb.storage.from('site').upload(path, blob, { contentType: blob.type, cacheControl: '31536000', upsert: false });
        if (error) throw error;
        return sb.storage.from('site').getPublicUrl(path).data.publicUrl;
      },
    };
  }
  function demoApi() {
    const K = 'tahan-demo-content', H = 'tahan-demo-history';
    const get = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
    return {
      async session() { return sessionStorage.getItem('tahan-demo-user'); },
      async login(email) { sessionStorage.setItem('tahan-demo-user', email || 'test'); return email; },
      async logout() { sessionStorage.removeItem('tahan-demo-user'); },
      async isAdmin() { return true; },
      async load() { return { data: get(K) || {} }; },
      async save(content) {
        const at = new Date().toISOString();
        localStorage.setItem(K, JSON.stringify(content));
        const h = get(H) || [];
        h.unshift({ id: Date.now(), saved_at: at, saved_by: 'test', data: content });
        try { localStorage.setItem(H, JSON.stringify(h.slice(0, 10))); } catch (e) {}
        return { updated_at: at, updated_by: 'test' };
      },
      async history() { return get(H) || []; },
      async upload(blob) {
        return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });
      },
    };
  }
  const api = demo ? demoApi() : configured && window.supabase ? supabaseApi() : null;

  /* ---------------- photos: shrink in the browser, then upload ---------------- */
  async function prepImage(file, max) {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('type');
    const bmp = await createImageBitmap(file);
    const s = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * s), h = Math.round(bmp.height * s);
    const c = el('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bmp, 0, 0, w, h);
    let blob = await new Promise(r => c.toBlob(r, 'image/webp', 0.85));
    if (!blob || blob.type !== 'image/webp') blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.86));
    return { blob, w, h };
  }
  function pickImage(max = 1600) {
    return new Promise(resolve => {
      const inp = el('input', { type: 'file', accept: 'image/jpeg,image/png,image/webp' });
      inp.addEventListener('change', async () => {
        const f = inp.files[0];
        if (!f) return resolve(null);
        setStatus('عم ترتفع الصورة…');
        try {
          const { blob, w, h } = await prepImage(f, max);
          const name = (slug(f.name.replace(/\.[^.]+$/, '')) || 'photo') + (blob.type === 'image/webp' ? '.webp' : '.jpg');
          resolve({ url: await api.upload(blob, name), w, h });
        } catch (e) {
          toast('ما قدرنا نرفع الصورة. استعمل صورة JPG أو PNG أو WebP أصغر من 5 ميغا.', true);
          resolve(null);
        } finally { setStatus(); }
      });
      inp.click();
    });
  }

  /* ---------------- the site's default content ---------------- */
  const GROUP_NAMES = {
    top: 'أعلى الصفحة والواجهة', 'mobile-menu': 'قائمة الموبايل', divisions: 'شركاتنا',
    petroleum: 'توصيل المحروقات وفورم الطلب', station: 'المحطات', lubricant: 'الزيوت',
    'private-label': 'التعبئة للغير', plast: 'عبوات البلاستيك', about: 'من نحن',
    contact: 'التواصل وطلب عرض سعر', 'ssf-pop': 'أسفل الصفحة', other: 'نصوص عامة (القائمة، السلة، الأزرار)',
  };
  const groupOf = n => { const s = n.closest('#station, #mobile-menu, section[id], #top, #ssf-pop'); return s ? s.id : 'other'; };
  let page; // { texts:[{key,en,group}], towns:[{en,ar}], images:[{src,alt,w,h}] }
  async function readPage() {
    const html = await (await fetch('../index.html', { cache: 'no-store' })).text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const texts = [], seen = new Set();
    doc.querySelectorAll('[data-i18n]').forEach(n => {
      const key = n.dataset.i18n;
      if (seen.has(key)) return;
      seen.add(key);
      texts.push({ key, en: n.innerHTML.trim(), group: groupOf(n) });
    });
    const towns = [...doc.querySelectorAll('select[name="town"] option')]
      .filter(o => o.value && !o.value.startsWith('Other'))
      .map(o => ({ en: o.textContent.trim(), ar: o.dataset.ar || '' }));
    const images = [], seenImg = new Set();
    doc.querySelectorAll('img[src^="assets/img/"]').forEach(im => {
      if (im.hasAttribute('data-station-img')) return;
      const src = im.getAttribute('src').split('?')[0];
      if (seenImg.has(src)) return;
      seenImg.add(src);
      images.push({ src, alt: im.dataset.altAr || im.getAttribute('alt') || src.split('/').pop() });
    });
    return { texts, towns, images };
  }

  /* ---------------- state ---------------- */
  // S = the full working copy (defaults + saved edits); clean(S) = only what differs from the defaults
  let S, savedJSON = '{}', savedObj = {}, lastSaved = '', saving = false, tab = 'texts';
  const nz = v => (typeof v === 'string' && v.trim() ? v : null);
  const arrOr = (v, d) => clone(Array.isArray(v) && v.length ? v : d);
  function build(o) {
    o = o && typeof o === 'object' ? o : {};
    const text = {};
    page.texts.forEach(t => {
      const v = (o.text || {})[t.key] || {};
      text[t.key] = { en: nz(v.en) || t.en, ar: nz(v.ar) || D.AR[t.key] || '' };
    });
    return {
      config: Object.assign(clone(D.CONFIG), o.config || {}),
      text,
      plast: arrOr(o.plast, D.PLAST),
      oils: arrOr(o.oils, D.OILS),
      stations: arrOr(o.stations, D.STATIONS),
      towns: arrOr(o.towns, page.towns),
      images: Object.assign({}, o.images || {}),
    };
  }
  function clean(s) {
    const out = {};
    const cfg = {};
    Object.keys(s.config).forEach(k => { const v = String(s.config[k] ?? '').trim(); if (v !== String(D.CONFIG[k] ?? '')) cfg[k] = v; });
    if (Object.keys(cfg).length) out.config = cfg;
    const text = {};
    page.texts.forEach(t => {
      const v = s.text[t.key], e = {};
      if (v.en.trim() && v.en.trim() !== t.en) e.en = v.en.trim();
      if (v.ar.trim() && v.ar.trim() !== (D.AR[t.key] || '').trim()) e.ar = v.ar.trim();
      if (e.en || e.ar) text[t.key] = e;
    });
    if (Object.keys(text).length) out.text = text;
    if (!same(s.plast, D.PLAST)) out.plast = s.plast;
    if (!same(s.oils, D.OILS)) out.oils = s.oils;
    if (!same(s.stations, D.STATIONS)) out.stations = s.stations;
    if (!same(s.towns, page.towns)) out.towns = s.towns;
    const imgs = {};
    Object.entries(s.images).forEach(([k, v]) => { if (v) imgs[k] = v; });
    if (Object.keys(imgs).length) out.images = imgs;
    return out;
  }
  const isDirty = () => JSON.stringify(clean(S)) !== savedJSON;

  /* ---------------- top bar ---------------- */
  const statusEl = $('[data-status]');
  const saveBtn = $('[data-save]');
  function setStatus(msg) {
    const dirty = S && isDirty();
    saveBtn.disabled = !dirty || saving;
    statusEl.textContent = msg || (dirty ? 'في تعديلات ما انحفظت بعد' : lastSaved);
    statusEl.classList.toggle('is-dirty', !!dirty && !msg);
    markTabs();
  }
  const changed = () => setStatus();
  async function save() {
    if (saving || !isDirty()) return;
    saving = true;
    setStatus('عم يحفظ…');
    try {
      const c = clean(S);
      const r = await api.save(c);
      savedObj = c;
      savedJSON = JSON.stringify(c);
      lastSaved = 'آخر حفظ: ' + fmt(r.updated_at || Date.now());
      toast(demo ? 'انحفظ (وضع التجربة، على هالكمبيوتر بس).' : 'انحفظ. التعديلات صارت على الموقع.');
    } catch (e) {
      toast('ما انحفظ: ' + (e && e.message ? e.message : 'تأكّد من الإنترنت وجرّب مرة تانية.'), true);
    } finally {
      saving = false;
      setStatus();
    }
  }
  saveBtn.addEventListener('click', save);
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && S) { e.preventDefault(); save(); } });
  window.addEventListener('beforeunload', e => { if (S && isDirty()) { e.preventDefault(); e.returnValue = ''; } });
  $('[data-logout]').addEventListener('click', async () => {
    if (isDirty() && !confirm('في تعديلات ما انحفظت. بدّك تطلع بلا حفظ؟')) return;
    await api.logout();
    S = null;
    location.reload();
  });

  /* ---------------- tabs ---------------- */
  const TABS = [
    ['texts', 'النصوص', ['text']],
    ['contact', 'التواصل والبلدات', ['config', 'towns']],
    ['plast', 'عبوات البلاستيك', ['plast']],
    ['oils', 'الزيوت', ['oils']],
    ['stations', 'المحطات', ['stations']],
    ['images', 'الصور', ['images']],
    ['history', 'السجل', []],
  ];
  const tabsEl = $('[data-tabs]');
  const panel = $('[data-panel]');
  function renderTabs() {
    tabsEl.replaceChildren(...TABS.map(([id, name]) => el('button', {
      type: 'button', role: 'tab', 'aria-selected': String(id === tab), 'data-tab': id,
      onclick: () => openTab(id),
    }, name)));
    markTabs();
  }
  function markTabs() {
    if (!S) return;
    const now = clean(S);
    TABS.forEach(([id, , keys]) => {
      const b = tabsEl.querySelector(`[data-tab="${id}"]`);
      if (!b) return;
      const dirty = keys.some(k => !same(now[k], savedObj[k]));
      const dot = b.querySelector('.dot');
      if (dirty && !dot) b.append(el('i', { class: 'dot', 'aria-label': 'فيه تعديل ما انحفظ' }));
      if (!dirty && dot) dot.remove();
    });
  }
  function openTab(id) {
    if (!TABS.some(t => t[0] === id)) id = 'texts';
    tab = id;
    tabsEl.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
    const sel = tabsEl.querySelector(`[data-tab="${id}"]`);
    if (sel) sel.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    history.replaceState(null, '', '#' + id);
    render();
  }
  function render() {
    const views = { texts: viewTexts, contact: viewContact, plast: viewPlast, oils: viewOils, stations: viewStations, images: viewImages, history: viewHistory };
    panel.replaceChildren(views[tab]());
    markTabs();
  }
  const head = (title, text, ...extra) => el('div', { class: 'panel__head' }, el('div', {}, el('h2', { text: title }), text ? el('p', { text }) : null), ...extra);
  const frag = (...kids) => { const f = document.createDocumentFragment(); kids.flat().forEach(k => k && f.append(k)); return f; };

  /* ---------------- Texts ---------------- */
  function viewTexts() {
    const search = el('input', { type: 'search', class: 'search', placeholder: 'دوّر على نص…', 'aria-label': 'دوّر على نص' });
    const groups = [];
    const order = [];
    page.texts.forEach(t => { if (!order.includes(t.group)) order.push(t.group); });
    const blocks = order.map(g => {
      const items = page.texts.filter(t => t.group === g);
      const count = el('span', { class: 'badge badge--off' });
      const body = el('div', { class: 'group__body' });
      const rows = items.map(t => {
        const v = S.text[t.key];
        const defAr = D.AR[t.key] || '';
        const mk = (lang, def) => {
          const ta = el('textarea', { dir: lang === 'en' ? 'ltr' : 'rtl', rows: Math.min(6, Math.max(2, Math.ceil((v[lang] || '').length / 70))), value: v[lang] });
          const sync = () => ta.classList.toggle('changed', ta.value.trim() !== '' && ta.value.trim() !== def.trim());
          ta.addEventListener('input', () => { v[lang] = ta.value; sync(); updCount(); changed(); });
          sync();
          return ta;
        };
        const en = mk('en', t.en), ar = mk('ar', defAr);
        const reset = btn('رجّع الأصل', () => {
          v.en = t.en; v.ar = defAr; en.value = t.en; ar.value = defAr;
          en.classList.remove('changed'); ar.classList.remove('changed'); updCount(); changed();
        }, 'btn--link');
        const row = el('div', { class: 'trow' },
          el('code', { class: 'trow__key', text: t.key }),
          field('بالإنكليزي', en), field('بالعربي', ar), reset);
        row._hay = (t.key + ' ' + t.en + ' ' + defAr).toLowerCase();
        row._live = () => (v.en + ' ' + v.ar).toLowerCase();
        return row;
      });
      body.append(...rows);
      const det = el('details', { class: 'group' }, el('summary', {}, el('span', { text: GROUP_NAMES[g] || g }), count), body);
      function updCount() {
        const n = items.filter(t => { const v = S.text[t.key]; return (v.en.trim() && v.en.trim() !== t.en) || (v.ar.trim() && v.ar.trim() !== (D.AR[t.key] || '').trim()); }).length;
        count.textContent = n ? `${n} معدّل` : `${items.length} نص`;
        count.className = n ? 'badge' : 'badge badge--off';
      }
      updCount();
      groups.push({ det, rows });
      return det;
    });
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      groups.forEach(({ det, rows }) => {
        let hits = 0;
        rows.forEach(r => { const ok = !q || r._hay.includes(q) || r._live().includes(q); r.hidden = !ok; if (ok) hits++; });
        det.hidden = !!q && !hits;
        det.open = !!q && hits > 0;
      });
    });
    return frag(
      head('النصوص', 'كل نص بالموقع بالإنكليزي وبالعربي. الخانة الصفرا يعني معدّلة عن الأصل. إذا فضّيت خانة، بيرجع النص الأصلي.', search),
      el('p', { class: 'hint', text: 'بعض النصوص فيها رموز متل <br> (سطر جديد) أو <b> (خط عريض). خلّيهن متل ما هنّي.' }),
      blocks);
  }

  /* ---------------- Contact + towns ---------------- */
  function viewContact() {
    const c = S.config;
    // one field: label, input, example, and a red note when the value looks wrong
    const inp = (k, label, attrs, hint, problem) => {
      const i = el('input', Object.assign({ value: c[k] || '', dir: 'ltr' }, attrs));
      const err = el('small', { class: 'hint', style: 'color:var(--red)' });
      const check = () => { const v = i.value.trim(); err.textContent = problem && v ? (problem(v) || '') : ''; };
      i.addEventListener('input', () => { c[k] = i.value; check(); changed(); });
      check();
      return el('label', { class: 'fld' }, el('span', { text: label }), i, el('small', { class: 'hint', text: hint }), err);
    };
    const contact = el('section', { class: 'card' },
      el('div', { class: 'card__head' }, el('h3', { text: 'أرقام التواصل' })),
      el('div', { class: 'grid2' },
        inp('phone', 'رقم الاتصال (للأزرار)', { type: 'tel' }, 'متل: +96176999978',
          v => /^\+\d{8,15}$/.test(v) ? null : 'اكتبه بالأرقام مع +961 بالأول وبلا فراغات.'),
        inp('phoneDisplay', 'الرقم متل ما بيبيّن بالموقع', {}, 'متل: +961 76 999 978'),
        inp('whatsapp', 'رقم الواتساب (الطلبات بتوصل عليه)', { type: 'tel' }, 'متل: 96176999978',
          v => /^\d{8,15}$/.test(v) ? null : 'أرقام بس، مع 961 بالأول، بلا + وبلا فراغات.'),
        inp('email', 'البريد الإلكتروني', { type: 'email' }, 'متل: info@tahangroups.com',
          v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'الإيميل مش مكتوب صح.')));
    const towns = S.towns;
    const townRows = towns.map((t, i) => el('div', { class: 'grid3', style: 'align-items:end' },
      field('بالإنكليزي', el('input', { value: t.en, dir: 'ltr', oninput: e => { t.en = e.target.value; changed(); } })),
      field('بالعربي', el('input', { value: t.ar, oninput: e => { t.ar = e.target.value; changed(); } })),
      el('div', { class: 'card__tools' },
        btn('↑', () => { move(towns, i, -1); changed(); render(); }),
        btn('↓', () => { move(towns, i, 1); changed(); render(); }),
        btn('حذف', () => { if (towns.length < 2) return toast('لازم تضل بلدة وحدة على الأقل.', true); towns.splice(i, 1); changed(); render(); }, 'btn--danger'))));
    const townsCard = el('section', { class: 'card' },
      el('div', { class: 'card__head' }, el('h3', { text: 'البلدات بفورم طلب المحروقات' }),
        btn('+ إضافة بلدة', () => { towns.push({ en: '', ar: '' }); changed(); render(); })),
      el('p', { class: 'hint', text: 'خيارَي «بلدة أخرى في البقاع» و«محافظة أخرى في لبنان» بيضلّو بآخر القائمة.' }),
      townRows);
    return frag(head('التواصل والبلدات', 'الأرقام هون بتتغيّر بكل أزرار الاتصال والواتساب بالموقع.'), contact, townsCard);
  }

  /* ---------------- Plastic containers ---------------- */
  const plastThumb = p => isUrl(p.file) ? p.file : p.file ? `../assets/img/${p.file}-sm.jpg` : '';
  function viewPlast() {
    const L = S.plast;
    const cards = L.map((p, i) => {
      const th = el('div', { class: 'thumb' });
      bg(th, plastThumb(p));
      const kind = el('select', { onchange: e => { p.kind = e.target.value; changed(); } },
        D.KINDS.map(k => el('option', { value: k.id, selected: p.kind === k.id, text: k.ar })));
      const unit = el('select', { onchange: e => { p.unit = e.target.value; changed(); } },
        Object.entries(D.UNIT).map(([k, u]) => el('option', { value: k, selected: (p.unit || 'l') === k, text: u.ar })));
      const colors = el('div', { class: 'colors' }, Object.entries(D.COLOURS).map(([k, c]) => el('label', {},
        el('input', { type: 'checkbox', checked: p.colors.includes(k), onchange: e => {
          if (e.target.checked) p.colors = Object.keys(D.COLOURS).filter(x => x === k || p.colors.includes(x));
          else if (p.colors.length > 1) p.colors = p.colors.filter(x => x !== k);
          else { e.target.checked = true; return toast('لازم يضل لون واحد على الأقل.', true); }
          changed();
        } }),
        el('i', { style: `--c:${c.c}` }), c.ar)));
      return el('section', { class: 'card' },
        el('div', { class: 'card__head' },
          el('h3', { text: [p.ar || p.en || 'عبوة جديدة', p.cap ? `${p.cap} ${(D.UNIT[p.unit] || D.UNIT.l).ar}` : ''].filter(Boolean).join(' ') }),
          p.hidden ? el('span', { class: 'badge badge--off', text: 'مخفية' }) : null,
          el('div', { class: 'card__tools' },
            btn('↑', () => { move(L, i, -1); changed(); render(); }),
            btn('↓', () => { move(L, i, 1); changed(); render(); }),
            btn('حذف', () => { if (L.length < 2) return toast('لازم تضل عبوة وحدة على الأقل.', true); if (confirm('أكيد بدّك تحذف هالعبوة؟')) { L.splice(i, 1); changed(); render(); } }, 'btn--danger'))),
        el('div', { class: 'row' }, th,
          el('div', { class: 'card__tools' },
            btn(p.file ? 'تغيير الصورة' : 'رفع صورة', async () => { const r = await pickImage(1400); if (!r) return; p.file = r.url; p.w = r.w; p.h = r.h; changed(); render(); }),
            el('p', { class: 'hint', text: 'أفضل شي صورة عرضية (تقريباً 1.9 مرة العرض على الطول).' }))),
        el('div', { class: 'grid4' },
          field('الاسم بالإنكليزي', el('input', { value: p.en || '', dir: 'ltr', oninput: e => { p.en = e.target.value; changed(); } })),
          field('الاسم بالعربي', el('input', { value: p.ar || '', oninput: e => { p.ar = e.target.value; changed(); } })),
          field('المجموعة', kind),
          el('div', { class: 'grid2' },
            field('السعة', el('input', { value: p.cap || '', dir: 'ltr', placeholder: 'متل 5', oninput: e => { p.cap = e.target.value.trim() || null; changed(); } })),
            field('الوحدة', unit))),
        el('div', {}, el('span', { class: 'hint', text: 'الألوان المتوفرة:' }), colors),
        el('label', { class: 'row' }, el('input', { type: 'checkbox', checked: !!p.hidden, onchange: e => { if (e.target.checked) p.hidden = true; else delete p.hidden; changed(); render(); } }), 'إخفاء هالعبوة عن الموقع'));
    });
    return frag(
      head('عبوات البلاستيك', 'العبوات اللي بتطلع بقسم Tahan Plastic مع السلة.',
        btn('+ إضافة عبوة', () => { L.push({ id: 'item-' + Date.now().toString(36), kind: D.KINDS[0].id, file: '', w: 1200, h: 632, cap: null, unit: 'l', en: '', ar: '', colors: ['white'], hidden: true }); changed(); render(); toast('انضافت عبوة مخفية. عبّي المعلومات وارفع صورة، وبعدين شيل «إخفاء».'); }, 'btn--primary')),
      cards);
  }

  /* ---------------- Oil brands ---------------- */
  const oilThumb = x => isUrl(x.img) ? x.img : x.img ? `../assets/img/oils/${x.img}.jpg` : '';
  function viewOils() {
    const L = S.oils;
    const cards = L.map((o, i) => {
      const grades = o.grades.map(x => {
        const th = el('div', { class: 'thumb thumb--sq' + (x.img ? '' : ' thumb--empty') }, x.img ? null : 'ما في صورة');
        bg(th, oilThumb(x));
        const g = D.OIL_GRADES[x.g] || { label: x.g, ar: '' };
        return el('div', { class: 'row', style: 'align-items:flex-start; padding-top:12px; border-top:1px solid var(--line)' },
          th,
          el('div', { style: 'flex:1; min-width:220px; display:flex; flex-direction:column; gap:8px' },
            el('b', { text: `${g.label} · ${g.ar}` }),
            el('div', { class: 'grid2' },
              field('اسم المنتج (بيبيّن تحت الصورة)', el('input', { value: x.name || '', dir: 'ltr', oninput: e => { x.name = e.target.value; changed(); } })),
              field('العيار المكتوب (إذا غير ' + g.label + ')', el('input', { value: x.label || '', dir: 'ltr', placeholder: g.label, oninput: e => { const v = e.target.value.trim(); if (v) x.label = v; else delete x.label; changed(); } }))),
            el('div', { class: 'card__tools' },
              btn(x.img ? 'تغيير الصورة' : 'رفع صورة', async () => { const r = await pickImage(900); if (!r) return; x.img = r.url; delete x.confirm; changed(); render(); }),
              x.img ? btn('شيل الصورة', () => { delete x.img; changed(); render(); }, 'btn--danger') : null)));
      });
      return el('section', { class: 'card' },
        el('div', { class: 'card__head' }, el('h3', { text: o.brand || 'ماركة جديدة' }),
          el('div', { class: 'card__tools' },
            btn('↑', () => { move(L, i, -1); changed(); render(); }),
            btn('↓', () => { move(L, i, 1); changed(); render(); }),
            btn('حذف الماركة', () => { if (L.length < 2) return toast('لازم تضل ماركة وحدة على الأقل.', true); if (confirm('أكيد بدّك تحذف ' + (o.brand || 'هالماركة') + '؟')) { L.splice(i, 1); changed(); render(); } }, 'btn--danger'))),
        el('div', { class: 'grid4' },
          field('اسم الماركة', el('input', { value: o.brand || '', dir: 'ltr', oninput: e => { o.brand = e.target.value; changed(); } })),
          field('الاسم بالعربي', el('input', { value: o.ar || '', oninput: e => { o.ar = e.target.value; changed(); } })),
          field('بلد المنشأ بالإنكليزي', el('input', { value: o.from ? o.from.en : '', dir: 'ltr', placeholder: 'Germany', oninput: e => { o.from = Object.assign(o.from || { en: '', ar: '' }, { en: e.target.value }); if (!o.from.en && !o.from.ar) o.from = null; changed(); } })),
          field('بلد المنشأ بالعربي', el('input', { value: o.from ? o.from.ar : '', placeholder: 'ألمانيا', oninput: e => { o.from = Object.assign(o.from || { en: '', ar: '' }, { ar: e.target.value }); if (!o.from.en && !o.from.ar) o.from = null; changed(); } }))),
        grades);
    });
    return frag(
      head('الزيوت', 'كل ماركة إلها 4 عيارات. المنتج بلا صورة بيطلع ككرت مكتوب عليه الماركة والعيار.',
        btn('+ إضافة ماركة', () => {
          L.push({ id: 'brand-' + Date.now().toString(36), brand: '', ar: '', from: null, grades: Object.keys(D.OIL_GRADES).map(g => ({ g, name: '' })) });
          changed(); render();
        }, 'btn--primary')),
      cards);
  }

  /* ---------------- Stations ---------------- */
  const stThumb = st => isUrl(st.photo) ? st.photo : st.photo ? `../assets/img/${st.photo}.jpg` : '';
  function parseCoords(s) {
    s = String(s || '').trim();
    const m = s.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/) || s.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/) ||
      s.match(/(?:[?&](?:q|query|ll))=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/) || s.match(/^(-?\d+(?:\.\d+)?)\s*[,،\s]\s*(-?\d+(?:\.\d+)?)$/);
    if (!m) return null;
    const lat = +m[1], lng = +m[2];
    return lat > 33 && lat < 34.8 && lng > 35 && lng < 36.8 ? { lat, lng } : 'out';
  }
  function viewStations() {
    const L = S.stations;
    const cards = L.map((st, i) => {
      const th = el('div', { class: 'thumb' });
      bg(th, stThumb(st));
      const coordsErr = el('small', { class: 'hint' });
      const mapLink = el('a', { class: 'btn btn--sm', target: '_blank', rel: 'noopener', href: `https://www.google.com/maps/search/?api=1&query=${st.lat},${st.lng}`, text: 'شوف الدبوس على Google Maps' });
      const coords = el('input', { value: `${st.lat}, ${st.lng}`, dir: 'ltr', placeholder: '33.8647, 35.9997' });
      coords.addEventListener('change', () => {
        const v = coords.value.trim();
        const r = parseCoords(v);
        if (r && r !== 'out') {
          st.lat = r.lat; st.lng = r.lng; coords.value = `${r.lat}, ${r.lng}`;
          mapLink.href = `https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`;
          coordsErr.textContent = ''; changed();
        } else {
          coordsErr.style.color = 'var(--red)';
          coordsErr.textContent = /goo\.gl|maps\.app/.test(v)
            ? 'الرابط القصير ما فيه أرقام. افتحو بـ Google Maps، كبّس كبسة طويلة على المحطة، وانسخ الأرقام اللي بتطلع (متل 33.86, 35.99).'
            : r === 'out' ? 'هالأرقام برّا لبنان. تأكّد إنك ناسخ خط العرض أول (33.…) وبعدين خط الطول (35.… أو 36.…).' : 'اكتب الأرقام هيك: 33.8647, 35.9997';
        }
      });
      const region = el('select', { onchange: e => { if (e.target.value === 'bekaa') delete st.region; else st.region = e.target.value; changed(); } },
        Object.entries(D.REGION).map(([k, r]) => el('option', { value: k, selected: (st.region || 'bekaa') === k, text: r.ar })));
      return el('section', { class: 'card' },
        el('div', { class: 'card__head' }, el('h3', { text: st.ar || st.en || 'محطة جديدة' }),
          el('div', { class: 'card__tools' },
            btn('↑', () => { move(L, i, -1); changed(); render(); }),
            btn('↓', () => { move(L, i, 1); changed(); render(); }),
            btn('حذف', () => { if (L.length < 2) return toast('لازم تضل محطة وحدة على الأقل.', true); if (confirm('أكيد بدّك تحذف محطة ' + (st.ar || st.en) + '؟')) { L.splice(i, 1); changed(); render(); } }, 'btn--danger'))),
        el('div', { class: 'row' }, th, btn('تغيير الصورة', async () => { const r = await pickImage(1400); if (!r) return; st.photo = r.url; delete st.pos; changed(); render(); })),
        el('div', { class: 'grid3' },
          field('الاسم بالإنكليزي', el('input', { value: st.en || '', dir: 'ltr', oninput: e => { st.en = e.target.value; changed(); } })),
          field('الاسم بالعربي', el('input', { value: st.ar || '', oninput: e => { st.ar = e.target.value; changed(); } })),
          field('المنطقة', region)),
        el('div', { class: 'grid2', style: 'align-items:end' },
          field('الموقع (خط العرض، خط الطول)', coords, 'فيك تلصق الأرقام أو رابط Google Maps فيه أرقام.'),
          el('div', {}, mapLink)),
        coordsErr);
    });
    return frag(
      head('المحطات', 'المحطات على الخريطة وبقائمة «فروعنا». الترتيب هون هوّي ترتيبها بالموقع.',
        btn('+ إضافة محطة', () => {
          let id = 'station-' + Date.now().toString(36);
          L.push({ id, en: '', ar: '', lat: 33.85, lng: 35.9, photo: 'station-nabi-chit' });
          changed(); render(); toast('انضافت محطة بآخر القائمة. عبّي الاسم والموقع.');
        }, 'btn--primary')),
      cards);
  }

  /* ---------------- Page photos ---------------- */
  function viewImages() {
    const cards = page.images.map(im => {
      const now = S.images[im.src];
      const th = el('div', { class: 'thumb' });
      bg(th, now || '../' + im.src);
      return el('div', { class: 'imgcard' }, th,
        el('div', { class: 'imgcard__body' },
          el('p', { text: im.alt }),
          now ? el('span', { class: 'badge', text: 'مستبدلة' }) : null,
          el('div', { class: 'card__tools' },
            btn('استبدال', async () => { const r = await pickImage(1800); if (!r) return; S.images[im.src] = r.url; changed(); render(); }),
            now ? btn('رجّع الأصلية', () => { delete S.images[im.src]; changed(); render(); }, 'btn--danger') : null)));
    });
    return frag(head('الصور', 'صور الموقع الثابتة. صور العبوات والزيوت والمحطات بتتغيّر من أقسامها.'), el('div', { class: 'imgs' }, cards));
  }

  /* ---------------- History ---------------- */
  function viewHistory() {
    const box = el('div', { class: 'hist' }, el('p', { class: 'empty', text: 'عم يحمّل السجل…' }));
    api.history().then(rows => {
      if (!rows.length) return box.replaceChildren(el('p', { class: 'empty', text: 'ما في نسخ محفوظة بعد.' }));
      box.replaceChildren(...rows.map((r, i) => el('div', { class: 'hist__row' },
        el('b', { text: fmt(r.saved_at) }),
        el('span', { text: (r.saved_by || '') + (i === 0 ? ' · النسخة الحالية على الموقع' : '') }),
        i === 0 ? null : btn('رجوع لهالنسخة', () => {
          if (isDirty() && !confirm('في تعديلات ما انحفظت رح تروح. كمّل؟')) return;
          S = build(r.data);
          toast('رجعت النسخة القديمة لهون. كبّس «حفظ ونشر» لتطلع عالموقع.');
          setStatus(); openTab('texts');
        }))));
    }).catch(() => box.replaceChildren(el('p', { class: 'empty', text: 'ما قدرنا نحمّل السجل.' })));
    return frag(head('السجل', 'كل مرة بتحفظ، بتنحفظ نسخة. فيك ترجع لأي نسخة قديمة.',
      btn('رجّع كل شي للأصل', () => {
        if (!confirm('هيك بيرجع الموقع كلّو متل ما كان بالأول (بلا ولا تعديل). بعدين لازم تكبس «حفظ ونشر». أكيد؟')) return;
        S = build({}); setStatus(); render(); toast('رجع كل شي للأصل هون. كبّس «حفظ ونشر» لتطلع عالموقع.');
      }, 'btn--danger')), box);
  }

  /* ---------------- login + start ---------------- */
  const views = { login: $('[data-view="login"]'), setup: $('[data-view="setup"]'), app: $('[data-view="app"]') };
  const show = v => Object.entries(views).forEach(([k, n]) => { n.hidden = k !== v; });
  const loginForm = $('[data-login]');
  const loginMsg = $('[data-login-msg]');

  async function enter() {
    let ok = false;
    try { ok = await api.isAdmin(); } catch (e) { ok = false; }
    if (!ok) {
      await api.logout();
      show('login');
      loginMsg.textContent = 'هالحساب ما عندو صلاحية يعدّل الموقع.';
      return;
    }
    page = await readPage();
    const row = await api.load();
    S = build(row.data);
    savedObj = clean(S);
    savedJSON = JSON.stringify(savedObj);
    lastSaved = row.updated_at ? 'آخر حفظ: ' + fmt(row.updated_at) + (row.updated_by ? ` (${row.updated_by})` : '') : 'ما في تعديلات محفوظة بعد';
    show('app');
    $('[data-demo]').hidden = !demo;
    renderTabs();
    openTab(location.hash.slice(1) || 'texts');
    setStatus();
  }

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = loginForm.email.value.trim(), password = loginForm.password.value;
    if (!email || !password) { loginMsg.textContent = 'اكتب الإيميل وكلمة السر.'; return; }
    const b = loginForm.querySelector('button');
    b.disabled = true; loginMsg.textContent = '';
    try {
      await api.login(email, password);
      loginForm.password.value = '';
      await enter();
    } catch (err) {
      const m = String(err && err.message || '');
      loginMsg.textContent = /not confirmed/i.test(m) ? 'الحساب مش مفعّل بعد. فعّله من Supabase (Auto Confirm).' : /invalid/i.test(m) ? 'الإيميل أو كلمة السر غلط.' : /rate|too many/i.test(m) ? 'محاولات كتير. استنّى شوي وجرّب.' : 'ما قدرنا نسجّل الدخول. تأكّد من الإنترنت.';
    } finally { b.disabled = false; }
  });

  (async () => {
    if (!api) return show('setup');
    if (demo) loginForm.querySelector('.muted').textContent = 'وضع التجربة على هالكمبيوتر: أي إيميل وكلمة سر بيمشو.';
    let email = null;
    try { email = await api.session(); } catch (e) {}
    if (email) {
      try { await enter(); } catch (e) { show('login'); loginMsg.textContent = 'صار خطأ بالتحميل. جرّب مرة تانية.'; }
    } else show('login');
  })();
})();
