/* =====================================================================
   TRESOR-ENGINE · Grundsystem für „Der Tresor der Zeit“
   Version 1.6 (Antworten werden gemischt, Schloss-Animation; Raum 1: Textkarten, Lückensatz mit Dreierprüfung, Einspruch, Markieren im Text, Nachfragen, Netz verbinden, Papier-Aufgabe, Notfall auf Papier, optionale Sprachaufnahmen) · für alle Räume gleich. Inhalte stehen in den Raumdateien.
   ===================================================================== */
(function () {
  'use strict';

  var ENGINE_VERSION = 1;
  var ENGINE_BUILD = 'Engine 1.6 · 02.10.2026 · Raum 1 V2.1';   /* im Menü sichtbar: zeigt, welche Fassung der Browser wirklich geladen hat */
  var STORE_KEY = 'tresor.v1';

  /* ---------------------------------------------------------------
     REGISTER: Reihenfolge NIE ändern, nur hinten anhängen!
     Daraus wird der Notfall-Spielstand-Code gebildet.
     --------------------------------------------------------------- */
  var REGISTRY = [
    'm2.3', 'r2-schrank', 'r2-reihenfolge', 'r2-merkmale', 'r2-code', 'r2-logbuch', 'r2-bonus',
    /* Raum 1 (ab Engine 1.2) */
    'm1.1', 'm1.2', 'm1.3',
    'r1-1-typen', 'r1-1-frage', 'r1-1-these', 'r1-1-fragetext', 'r1-1-quelle',
    'r1-2-modell', 'r1-2-kette', 'r1-2-vorhersage', 'r1-2-versuch',
    'r1-3-einspruch', 'r1-3-kette', 'r1-3-belege', 'r1-3-schloss', 'r1-3-modellkritik', 'r1-3-population',
    /* ab Engine 1.4 */
    'r1-3-zahl'
  ];

  /* ---------------- Hilfsfunktionen ---------------- */
  function sha256(str) {
    var bytes = new TextEncoder().encode(str);
    var K = [], H = [], n = 2, c = 0;
    function frac(x) { return ((x - Math.floor(x)) * 0x100000000) | 0; }
    while (c < 64) {
      var prime = true;
      for (var d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
      if (prime) { if (c < 8) H[c] = frac(Math.pow(n, 1 / 2)); K[c] = frac(Math.pow(n, 1 / 3)); c++; }
      n++;
    }
    var l = bytes.length, bitLen = l * 8;
    var padded = ((l + 9 + 63) >> 6) << 6;
    var m = new Uint8Array(padded); m.set(bytes); m[l] = 0x80;
    var dv = new DataView(m.buffer);
    dv.setUint32(padded - 8, Math.floor(bitLen / 0x100000000));
    dv.setUint32(padded - 4, bitLen >>> 0);
    var w = new Int32Array(64);
    for (var i = 0; i < padded; i += 64) {
      for (var t = 0; t < 16; t++) w[t] = dv.getInt32(i + t * 4);
      for (t = 16; t < 64; t++) {
        var x = w[t - 15], y = w[t - 2];
        var s0 = ((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3);
        var s1 = ((y >>> 17) | (y << 15)) ^ ((y >>> 19) | (y << 13)) ^ (y >>> 10);
        w[t] = (w[t - 16] + s0 + w[t - 7] + s1) | 0;
      }
      var a = H[0], b = H[1], cc = H[2], dd = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (t = 0; t < 64; t++) {
        var S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[t] + w[t]) | 0;
        var S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        var mj = (a & b) ^ (a & cc) ^ (b & cc);
        var t2 = (S0 + mj) | 0;
        h = g; g = f; f = e; e = (dd + t1) | 0; dd = cc; cc = b; b = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + cc) | 0; H[3] = (H[3] + dd) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    return H.map(function (v) { return ('00000000' + (v >>> 0).toString(16)).slice(-8); }).join('');
  }

  // Eingaben vereinheitlichen: Groß/klein egal, Ü = UE usw., nur Buchstaben und Ziffern
  function norm(s) {
    return String(s).toUpperCase()
      .replace(/Ä/g, 'AE').replace(/Ö/g, 'OE').replace(/Ü/g, 'UE').replace(/ẞ/g, 'SS')
      .replace(/[^A-Z0-9]/g, '');
  }
  function check(id, answer, hashes) {
    var hv = sha256('tresor|' + id + '|' + norm(answer));
    return [].concat(hashes).indexOf(hv) !== -1;
  }
  function b64(s) {
    try { return new TextDecoder().decode(Uint8Array.from(atob(s), function (ch) { return ch.charCodeAt(0); })); }
    catch (e) { return ''; }
  }
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k]);
    }
    [].concat(kids || []).forEach(function (c) { if (c != null) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function paras(text) {
    return String(text).split('\n\n').map(function (p) {
      var node = el('p');
      p.split('\n').forEach(function (line, i) { if (i) node.appendChild(el('br')); node.appendChild(document.createTextNode(line)); });
      return node;
    });
  }
  var AUDIO_EXT = [['mp3', 'audio/mpeg'], ['m4a', 'audio/mp4'], ['wav', 'audio/wav'], ['ogg', 'audio/ogg']];
  function audioPlayer(src, label) {
    if (!src) return null;
    var base = String(src).replace(/\.[a-z0-9]+$/i, '');          // Endung egal: mp3, m4a, wav und ogg werden der Reihe nach versucht
    var name = base.split('/').pop();
    var a = el('audio', { controls: 'controls', preload: 'metadata', 'aria-label': label || 'Aufnahme anhören' });
    var last = null;
    AUDIO_EXT.forEach(function (x) { last = el('source', { src: base + '.' + x[0], type: x[1] }); a.appendChild(last); });
    var msg = el('div', { class: 'audio-msg' });
    var box = el('div', { class: 'audio-box' }, [el('span', { class: 'audio-label', text: 'Aufnahme anhören (am besten mit Kopfhörern)' }), a, msg]);
    function diagnose() {
      if (!window.fetch) { box.style.display = 'none'; return; }
      var found = null, left = AUDIO_EXT.length;
      AUDIO_EXT.forEach(function (x) {
        var u = base + '.' + x[0];
        fetch(u, { method: 'HEAD', cache: 'no-store' }).then(function (r) { if (r.ok && !found) found = u; }).catch(function () {}).then(function () {
          if (--left) return;
          if (!found) { box.style.display = 'none'; return; }          // keine Datei vorhanden: nur der Text bleibt
          a.style.display = 'none'; msg.style.display = 'block'; msg.textContent = 'Die Aufnahme ist hochgeladen, lässt sich in diesem Browser aber nicht abspielen. ';
          msg.appendChild(el('a', { href: found, target: '_blank', rel: 'noopener', text: 'Datei direkt öffnen' }));
          logEvent('audio-fehler ' + name);
        });
      });
    }
    last.addEventListener('error', diagnose);                           // alle Formate gescheitert
    a.addEventListener('play', function () {
      [].forEach.call(document.querySelectorAll('audio'), function (o) { if (o !== a) { try { o.pause(); } catch (e) {} } });
      if (S && !S.seen['audio-' + name]) { S.seen['audio-' + name] = true; logEvent('audio ' + name); }
    });
    return box;
  }
  function refBlock(p) {
    var r = p.ref; if (!r) return null;
    var kids = [];
    if (r.text) kids.push(el('div', { class: 'ref-item' }, paras(r.text)));
    (r.docs || []).forEach(function (id) {
      var dc = ROOM.docs[id]; if (!dc) return;
      kids.push(el('div', { class: 'ref-item' }, [el('strong', { text: dc.title })].concat(docBody(dc))));
    });
    (r.answers || []).forEach(function (k) {
      var a = S.answers[k]; if (!a) return;
      kids.push(el('div', { class: 'ref-item' }, [el('strong', { text: 'Eure Antwort: ' + a.title }), el('div', { class: 'ref-own' }, paras(a.text))]));
    });
    if (!kids.length) return null;
    return el('details', { class: 'ref', open: p.type === 'freetext' ? 'open' : null }, [el('summary', { text: r.title || 'Zum Nachschlagen' })].concat(kids));
  }
  function tableEl(t) {
    var head = el('tr', {}, t.head.map(function (h) { return el('th', { text: h }); }));
    var rows = t.rows.map(function (r) { return el('tr', {}, r.map(function (c) { return el('td', { text: c }); })); });
    return el('div', { class: 'tbl-wrap' }, [el('table', { class: 'data' }, [el('thead', {}, [head]), el('tbody', {}, rows)])]);
  }
  function docBody(dc) {
    return [audioPlayer(dc.audio, 'Aufnahme: ' + dc.title), el('div', { class: 'doc-text' }, paras(dc.text)), dc.table ? tableEl(dc.table) : null];
  }
  function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }

  /* ---------------- Spielzustand ---------------- */
  var S = null;
  function blank(team) {
    return { v: ENGINE_VERSION, team: team, created: new Date().toISOString(),
      unlocked: [], solved: {}, hints: {}, answers: {}, items: [], docs: [], evidence: [],
      merksaetze: [], decisions: {}, vars: {}, seen: {}, log: [] };
  }
  function load() {
    /* Test-Hilfe: Adresse mit ?neu=1 öffnen löscht den Spielstand dieses Geräts und startet neu. */
    try { if (/[?&]neu=1(&|$)/.test(location.search)) { localStorage.removeItem(STORE_KEY); sessionStorage.removeItem('tresor.confirmed'); history.replaceState(null, '', location.pathname); } } catch (e) {}
    try { var raw = localStorage.getItem(STORE_KEY); S = raw ? JSON.parse(raw) : null; } catch (e) { S = null; }
    return S;
  }
  function persist() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {} }
  function logEvent(what) { S.log.push({ t: new Date().toISOString(), e: what }); persist(); }
  function isSolved(id) { return !!(S && S.solved[id]); }
  function isUnlocked(id) { return !!(S && S.unlocked.indexOf(id) !== -1); }
  function addUnique(list, item, key) {
    var exists = list.some(function (x) { return key ? x[key] === item[key] : x === item; });
    if (!exists) list.push(item);
    return !exists;
  }

  /* ---------------- Spielstand-Datei ---------------- */
  function saveFile() {
    var body = JSON.stringify(S);
    var file = { format: 'tresor-spielstand', engine: ENGINE_VERSION, saved: new Date().toISOString(),
      state: S, check: sha256('tresor-save|' + body) };
    var names = S.team.map(function (n) { return n.replace(/[^A-Za-zÄÖÜäöüß0-9]/g, ''); }).join('-') || 'team';
    var blob = new Blob([JSON.stringify(file, null, 1)], { type: 'application/json' });
    var a = el('a', { href: URL.createObjectURL(blob), download: 'tresor_' + names + '_' + today() + '.json' });
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
    logEvent('gesichert');
  }
  function readFile(file, done) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var f = JSON.parse(r.result);
        if (f.format !== 'tresor-spielstand') throw new Error('Das ist keine Tresor-Spielstand-Datei.');
        if (sha256('tresor-save|' + JSON.stringify(f.state)) !== f.check) throw new Error('Die Datei ist beschädigt oder wurde verändert.');
        S = f.state; persist(); done(null);
      } catch (e) { done(e.message || 'Die Datei konnte nicht gelesen werden.'); }
    };
    r.onerror = function () { done('Die Datei konnte nicht gelesen werden.'); };
    r.readAsText(file);
  }
  function pickFile(done) {
    var inp = el('input', { type: 'file', accept: '.json,application/json,text/plain', style: 'display:none' });
    inp.addEventListener('change', function () { if (inp.files[0]) readFile(inp.files[0], done); inp.remove(); });
    document.body.appendChild(inp); inp.click();
  }

  /* ---------------- Notfall-Code ---------------- */
  var B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  function makeCode() {
    var bits = REGISTRY.map(function (id) { return isSolved(id) || isUnlocked(id) ? 1 : 0; });
    while (bits.length % 5) bits.push(0);
    var s = '';
    for (var i = 0; i < bits.length; i += 5) s += B32[bits.slice(i, i + 5).reduce(function (a, b) { return a * 2 + b; }, 0)];
    var sum = 0; for (i = 0; i < s.length; i++) sum = (sum * 31 + B32.indexOf(s[i]) + 7) % 1024;
    s += B32[sum >> 5] + B32[sum & 31];
    return 'T' + ENGINE_VERSION + '-' + s.match(/.{1,4}/g).join('-');
  }
  function readCode(code) {
    var c = String(code).toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
    if (c[0] !== 'T') return null;
    c = c.slice(2);
    var body = c.slice(0, -2), chk = c.slice(-2), sum = 0;
    for (var i = 0; i < body.length; i++) { var v = B32.indexOf(body[i]); if (v < 0) return null; sum = (sum * 31 + v + 7) % 1024; }
    if (B32[sum >> 5] + B32[sum & 31] !== chk) return null;
    var bits = [];
    for (i = 0; i < body.length; i++) { var val = B32.indexOf(body[i]); for (var k = 4; k >= 0; k--) bits.push((val >> k) & 1); }
    return REGISTRY.filter(function (id, idx) { return bits[idx]; });
  }

  /* ---------------- Oberfläche: Dialoge, Meldungen ---------------- */
  var BASE = '';
  var FIGURES = {
    kemal: { name: 'Kemal Aydın', role: 'Präparator', img: 'figuren/kemal.jpg' },
    wendt: { name: 'Dr. Johanna Wendt', role: 'Kuratorin', img: 'figuren/wendt.jpg' },
    hallmann: { name: 'Viktor Hallmann', role: 'Händler', img: 'figuren/hallmann.jpg' }
  };
  var dialogStack = [];
  function openDialog(opts) {
    try { var tt = document.getElementById('toast'); if (tt) tt.classList.remove('show'); } catch (e) {}
    var closeBtn = el('button', { class: 'dlg-close', 'aria-label': 'Schließen', text: '×' });
    var card = el('div', { class: 'dlg-card ' + (opts.cls || ''), role: 'dialog', 'aria-modal': 'true' },
      [opts.closable === false ? null : closeBtn, opts.title ? el('h2', { text: opts.title }) : null].concat(opts.body || []));
    var wrap = el('div', { class: 'dlg' }, [card]);
    function close() { [].forEach.call(wrap.querySelectorAll('audio'), function (a) { try { a.pause(); } catch (e) {} }); wrap.remove(); dialogStack = dialogStack.filter(function (d) { return d !== api; }); if (opts.onClose) opts.onClose(); }
    closeBtn.addEventListener('click', close);
    if (opts.closable !== false) wrap.addEventListener('click', function (ev) { if (ev.target === wrap) close(); });
    document.body.appendChild(wrap);
    var api = { close: close, card: card, wrap: wrap, closable: opts.closable !== false };
    dialogStack.push(api);
    setTimeout(function () { var f = card.querySelector('input,textarea,button:not(.dlg-close)'); if (f && opts.focus !== false) f.focus({ preventScroll: true }); }, 50);
    return api;
  }
  function closeAll() { dialogStack.slice().forEach(function (d) { d.close(); }); }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dialogStack.length) { var top = dialogStack[dialogStack.length - 1]; if (top.closable) top.close(); } });

  var toastTimer;
  function toast(text, ms) {
    var t = document.getElementById('toast') || document.body.appendChild(el('div', { id: 'toast', class: 'toast', role: 'status' }));
    t.textContent = text; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, ms || 3800);
  }
  function figureBlock(from, text, audio) {
    var f = FIGURES[from] || { name: from, role: '', img: null };
    return el('div', { class: 'msg' }, [
      f.img ? el('img', { class: 'msg-face', src: BASE + f.img, alt: '' }) : null,
      el('div', { class: 'msg-body' }, [el('div', { class: 'msg-from' }, [el('strong', { text: f.name }), f.role ? ' · ' + f.role : '']), el('div', { class: 'msg-text' }, paras(text)), audioPlayer(audio, 'Aufnahme von ' + f.name)])
    ]);
  }
  function message(from, text, then, record, audio) {
    if (record !== false) addUnique(S.docs, { id: 'msg-' + sha256(from + text).slice(0, 10), kind: 'message', from: from, text: text, audio: audio }, 'id');
    persist();
    var d = openDialog({ cls: 'dlg-message', body: [figureBlock(from, text, audio), el('div', { class: 'row end' }, [el('button', { class: 'btn', text: 'Weiter', onclick: function () { d.close(); } })])],
      onClose: then });
    return d;
  }

  /* ---------------- Forscherakte ---------------- */
  var ROOM = null;
  function openAkte(tab) {
    tab = tab || 'fall';
    var tabs = [['fall', 'Fall'], ['funde', 'Fundstücke'], ['docs', 'Dokumente'], ['archiv', 'Archiv'], ['beweise', 'Beweisakte']];
    var content = el('div', { class: 'akte-content' });
    var bar = el('div', { class: 'tabs', role: 'tablist' }, tabs.map(function (t) {
      return el('button', { class: 'tab' + (t[0] === tab ? ' on' : ''), role: 'tab', text: t[1], onclick: function () { d.close(); openAkte(t[0]); } });
    }));
    function empty(t) { return el('p', { class: 'muted', text: t }); }
    if (tab === 'fall') {
      content.appendChild(el('p', { class: 'muted', text: 'Team: ' + S.team.join(', ') }));
      (ROOM && ROOM.caseText ? paras(ROOM.caseText(api)) : paras('Dr. Johanna Wendt ist verschwunden. Folgt ihren Spuren durch das Museum.')).forEach(function (p) { content.appendChild(p); });
      content.appendChild(el('p', { class: 'muted small', text: 'Notfall-Code (ins Logbuch schreiben): ' + makeCode() }));
    } else if (tab === 'funde') {
      if (!S.items.length) content.appendChild(empty('Noch keine Fundstücke.'));
      S.items.forEach(function (it) { content.appendChild(el('div', { class: 'akte-item' }, [el('strong', { text: it.label }), it.text ? el('p', { text: it.text }) : null])); });
    } else if (tab === 'docs') {
      if (!S.docs.length) content.appendChild(empty('Noch keine Dokumente.'));
      S.docs.slice().reverse().forEach(function (dc) {
        if (dc.kind === 'message') content.appendChild(figureBlock(dc.from, dc.text, dc.audio));
        else content.appendChild(el('div', { class: 'akte-item' }, [el('strong', { text: dc.title }), audioPlayer(dc.audio, 'Aufnahme: ' + dc.title), el('div', {}, paras(dc.text)), dc.table ? tableEl(dc.table) : null]));
      });
    } else if (tab === 'archiv') {
      content.appendChild(el('h3', { text: 'Merksätze' }));
      if (!S.merksaetze.length) content.appendChild(empty('Noch keine Merksätze.'));
      S.merksaetze.forEach(function (m) { content.appendChild(el('p', { class: 'merksatz', text: m })); });
      content.appendChild(el('h3', { text: 'Meine Antworten' }));
      var keys = Object.keys(S.answers);
      if (!keys.length) content.appendChild(empty('Noch keine Einträge.'));
      keys.forEach(function (k) { var a = S.answers[k]; content.appendChild(el('div', { class: 'akte-item' }, [el('strong', { text: a.title }), el('div', {}, paras(a.text))])); });
    } else if (tab === 'beweise') {
      if (!S.evidence.length) content.appendChild(empty('Noch keine Beweisstücke für den Tresor.'));
      S.evidence.forEach(function (ev) { content.appendChild(el('div', { class: 'akte-item evidence' }, [el('strong', { text: ev.title }), el('p', { text: ev.text })])); });
    }
    var d = openDialog({ cls: 'dlg-akte', title: 'Forscherakte', body: [bar, content], focus: false });
  }

  /* ---------------- Menü ---------------- */
  function openMenu(extra) {
    var nxt = nextLocked();
    var codeBtn = nxt ? el('button', { class: 'btn', text: (unlockMode() === 'auto' ? String(nxt.title).split(' · ')[0] + ' starten' : 'Code für ' + String(nxt.title).split(' · ')[0] + ' eingeben'), onclick: function () { d.close(); lockScreen(nxt, true); } }) : null;
    var d = openDialog({ title: 'Menü', body: [
      el('p', { class: 'muted', text: 'Team: ' + S.team.join(', ') }),
      el('div', { class: 'stack' }, [
        el('button', { class: 'btn', text: 'Spielstand sichern', onclick: function () { saveFile(); toast('Die Datei liegt jetzt im Download-Ordner. Ladet sie in WebWeaver hoch.', 6000); } }),
        codeBtn,
        extra || null,
        el('button', { class: 'btn ghost', text: 'Beenden und iPad freigeben', onclick: function () { d.close(); endGame(); } })
      ]),
      el('p', { class: 'muted small', text: 'Notfall-Code: ' + makeCode() }),
      el('p', { class: 'muted small', text: 'Fassung: ' + ENGINE_BUILD })
    ] });
  }
  function endGame() {
    var d = openDialog({ title: 'Wirklich beenden?', body: [
      el('p', { text: 'Habt ihr euren Spielstand gesichert und in WebWeaver hochgeladen? Beim Beenden wird alles von diesem iPad gelöscht.' }),
      el('div', { class: 'row end' }, [
        el('button', { class: 'btn ghost', text: 'Zurück', onclick: function () { d.close(); } }),
        el('button', { class: 'btn', text: 'Ja, beenden', onclick: function () { try { localStorage.removeItem(STORE_KEY); sessionStorage.removeItem('tresor.confirmed'); } catch (e) {} location.href = BASE + 'index.html'; } })
      ])
    ] });
  }

  /* ---------------- Mischen: Reihenfolge der Antworten darf die Lösung nicht verraten ---------------- */
  function hashStr(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  /* Pro Spielstand ein fester Startwert, damit die Reihenfolge beim erneuten Öffnen gleich bleibt. avoidIdentity: nie die Ausgangsreihenfolge. */
  function seededShuffle(list, key, avoidIdentity) {
    var seed = 1;
    if (S && S.vars) { S.vars.seed = S.vars.seed || Math.floor(Math.random() * 2147483647); seed = S.vars.seed; }
    var rnd = mulberry32(hashStr(String(seed) + '|' + key)), a = list.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    if (avoidIdentity && a.length > 1 && a.every(function (x, k) { return x === list[k]; })) a.push(a.shift());
    return a;
  }

  /* ---------------- Rätsel-Bausteine ---------------- */
  function hintArea(p, onRescue) {
    var box = el('div', { class: 'hints' });
    var used = S.hints[p.id] || 0;
    function render() {
      box.innerHTML = '';
      for (var i = 0; i < used && i < p.hints.length; i++) box.appendChild(figureBlock('kemal', p.hints[i]));
      if (used < p.hints.length) {
        box.appendChild(el('button', { class: 'btn ghost small', text: 'Kemal um Hilfe bitten (Tipp ' + (used + 1) + ' von ' + p.hints.length + ')', onclick: function () {
          used++; S.hints[p.id] = used; logEvent('tipp ' + p.id + ' ' + used); render();
        } }));
      } else if (p.rescue) {
        box.appendChild(el('button', { class: 'btn ghost small', text: 'Notfallöffnung', onclick: function () { onRescue(); } }));
      }
    }
    render();
    return box;
  }
  function rescueDialog(p, parent) {
    var cb = el('input', { type: 'checkbox', id: 'rescue-ok' });
    var fb = el('div', { class: 'feedback', role: 'status' });
    var d = openDialog({ title: 'Notfallöffnung', body: [
      figureBlock('kemal', 'Na gut, ich zeige es euch. Aber ihr müsst es danach selbst erklären können:\n\n' + b64(p.rescue)),
      el('p', { class: 'paper-task' }, [el('strong', { text: 'Logbuch-Auftrag (auf Papier): ' }), p.rescueTask || 'Erklärt die Lösung in eigenen Worten.']),
      el('label', { class: 'check' }, [cb, ' Wir haben den Eintrag ins Logbuch geschrieben.']), fb,
      el('div', { class: 'row end' }, [el('button', { class: 'btn', text: 'Weiter', onclick: function () {
        if (!cb.checked) { fb.className = 'feedback no'; fb.textContent = 'Schreibt zuerst den Eintrag ins Logbuch und setzt dann den Haken.'; return; }
        logEvent('notfall ' + p.id); d.close(); parent.close(); solve(p, { rescue: true });
      } })])
    ] });
  }
  function watchFb(fb) {
    if (!window.MutationObserver) return fb;
    new MutationObserver(function () { if (fb.textContent) { try { fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {} } })
      .observe(fb, { childList: true, characterData: true, subtree: true });
    return fb;
  }
  function wrong(fb, text) { fb.className = 'feedback no'; fb.textContent = text || 'Nichts passiert. Prüft eure Antwort noch einmal.'; }

  function optGroup(items, mode, onChange, max) {
    var chosen = mode === 'one' ? null : [];
    var wrap = el('div', { class: 'opts' }), btns = {};
    function paint() {
      items.forEach(function (it) {
        var on = mode === 'one' ? chosen === it.id : chosen.indexOf(it.id) !== -1;
        btns[it.id].classList.toggle('on', on); btns[it.id].setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    items.forEach(function (it) {
      var b = el('button', { class: 'opt', type: 'button', 'aria-pressed': 'false', onclick: function () {
        if (mode === 'one') chosen = it.id;
        else {
          var i = chosen.indexOf(it.id);
          if (i !== -1) chosen.splice(i, 1); else { if (max && chosen.length >= max) chosen.shift(); chosen.push(it.id); }
        }
        paint(); if (onChange) onChange();
      } }, [it.tag ? el('span', { class: 'opt-tag', text: it.tag }) : null, el('span', { class: 'opt-text', text: it.label })]);
      btns[it.id] = b; wrap.appendChild(b);
    });
    return { el: wrap, get: function () { return mode === 'one' ? chosen : chosen.slice(); } };
  }
  function matchKonter(rules, st, evs, a, b) {
    var evKey = evs.slice().sort().join('+');
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.st && [].concat(r.st).indexOf(st) === -1) continue;
      if (r.notSt && [].concat(r.notSt).indexOf(st) !== -1) continue;
      if (r.ev && r.ev !== evKey) continue;
      if (r.evHas && evs.indexOf(r.evHas) === -1) continue;
      if (r.evOnly && evs.some(function (e) { return [].concat(r.evOnly).indexOf(e) === -1; })) continue;
      if (r.a && [].concat(r.a).indexOf(a) === -1) continue;
      if (r.b && [].concat(r.b).indexOf(b) === -1) continue;
      return r;
    }
    return null;
  }

  function openPuzzle(p) {
    if (isSolved(p.id)) return;
    logEvent('öffnet ' + p.id);
    var fb = watchFb(el('div', { class: 'feedback', role: 'status' }));
    var body = [el('div', { class: 'prompt' }, paras(p.prompt))];
    var refEl = refBlock(p); if (refEl) body.push(refEl);
    var d;
    function attempt(ans, msg) {
      if (check(p.id, ans, p.hash)) { d.close(); solve(p, {}); }
      else { logEvent('fehlversuch ' + p.id); wrong(fb, msg || p.wrongText); }
    }
    if (p.type === 'code') {
      var inp = el('input', { type: 'text', class: 'code-in', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', 'aria-label': 'Lösung eingeben', placeholder: p.placeholder || '', inputmode: p.inputmode });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') attempt(inp.value); });
      body.push(el('div', { class: 'row' }, [inp, el('button', { class: 'btn', text: p.button || 'Öffnen', onclick: function () { attempt(inp.value); } })]));
    }
    if (p.type === 'numlock') {
      var digits = []; for (var i = 0; i < p.digits; i++) digits.push(0);
      var wheels = el('div', { class: 'wheels' });
      digits.forEach(function (v, idx) {
        var val = el('div', { class: 'wheel-val', text: '0' });
        function set(dv) { digits[idx] = (digits[idx] + dv + 10) % 10; val.textContent = digits[idx]; }
        wheels.appendChild(el('div', { class: 'wheel' }, [
          el('button', { class: 'wheel-btn', 'aria-label': 'Ziffer ' + (idx + 1) + ' höher', text: '▲', onclick: function () { set(1); } }), val,
          el('button', { class: 'wheel-btn', 'aria-label': 'Ziffer ' + (idx + 1) + ' niedriger', text: '▼', onclick: function () { set(-1); } })]));
      });
      body.push(wheels, el('div', { class: 'row center' }, [el('button', { class: 'btn', text: p.button || 'Öffnen', onclick: function () { attempt(digits.join('')); } })]));
    }
    if (p.type === 'order') {
      var seq = [];
      var grid = el('div', { class: 'cards' });
      /* Nie in Lösungsreihenfolge zeigen: Jede gemischte Anordnung wird gegen den Hash geprüft (die Lösung bleibt verschlüsselt). */
      var shown = (function () {
        for (var n = 0; n < 60; n++) {
          var cand = seededShuffle(p.items, p.id + '#' + n, true);
          if (!check(p.id, cand.map(function (x) { return x.id; }).join('-'), p.hash)) return cand;
        }
        return seededShuffle(p.items, p.id, true);
      })();
      shown.forEach(function (it) {
        var num = el('span', { class: 'num' });
        var b = el('button', { class: 'card-item', onclick: function () {
          if (seq.indexOf(it.id) !== -1) return;
          seq.push(it.id); b.classList.add('picked'); num.textContent = seq.length;
          if (seq.length === p.items.length) { attempt(seq.join('-')); if (dialogStack.indexOf(d) !== -1) setTimeout(reset, 1400); }
        } }, [it.svg ? el('div', { class: 'card-art', html: it.svg }) : null, el('strong', { text: it.label }), it.tag ? el('em', { text: it.tag }) : null, num]);
        grid.appendChild(b);
      });
      function reset() { seq = []; [].forEach.call(grid.children, function (b) { b.classList.remove('picked'); b.querySelector('.num').textContent = ''; }); }
      body.push(grid, el('div', { class: 'row' }, [el('button', { class: 'btn ghost small', text: 'Neu anfangen', onclick: function () { reset(); fb.textContent = ''; } })]));
    }
    if (p.type === 'select') {
      var chosen = {};
      var stage = el('div', { class: 'select-stage' }, [el('img', { src: p.image, alt: p.imageAlt || '' })]);
      p.marks.forEach(function (m) {
        var mk = el('button', { class: 'mark', style: 'left:' + m.x + '%;top:' + m.y + '%', 'aria-pressed': 'false', 'aria-label': m.label, onclick: function () {
          chosen[m.id] = !chosen[m.id]; mk.setAttribute('aria-pressed', chosen[m.id]); mk.classList.toggle('on', chosen[m.id]);
        } }, [el('span', { class: 'mark-label', text: m.label })]);
        stage.appendChild(mk);
      });
      body.push(stage, el('div', { class: 'row end' }, [el('button', { class: 'btn', text: p.button || 'Auswahl prüfen', onclick: function () {
        var ids = Object.keys(chosen).filter(function (k) { return chosen[k]; }).sort();
        if (!ids.length) { wrong(fb, 'Wählt zuerst mindestens eine Stelle aus.'); return; }
        attempt(ids.join('-'));
      } })]));
    }
    if (p.type === 'assign') {
      var placed = {}, active = null;
      var pool = el('div', { class: 'pool' });
      var targets = el('div', { class: 'targets' });
      var cardEls = {};
      (p.keepOrder ? p.cards : seededShuffle(p.cards, p.id)).forEach(function (cd) {
        var b = el('button', { class: 'chip', text: cd.label, onclick: function () {
          if (placed[cd.id]) { delete placed[cd.id]; pool.appendChild(b); b.classList.remove('active'); return; }
          if (active) cardEls[active].classList.remove('active');
          active = active === cd.id ? null : cd.id; if (active) b.classList.add('active');
        } });
        cardEls[cd.id] = b; pool.appendChild(b);
      });
      p.targets.forEach(function (tg) {
        var zone = el('div', { class: 'zone-cards' });
        function drop(ev) {
          if (!active || (ev && ev.target.classList.contains('chip'))) return;
          placed[active] = tg.id; cardEls[active].classList.remove('active'); zone.appendChild(cardEls[active]); active = null;
        }
        targets.appendChild(el('div', { class: 'zone', role: 'button', tabindex: '0', 'aria-label': 'Spalte ' + tg.label, onclick: drop,
          onkeydown: function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); drop(); } } }, [el('strong', { text: tg.label }), zone]));
      });
      body.push(el('p', { class: 'muted small', text: 'Tippt zuerst ein Kärtchen an und dann die passende Spalte.' }), pool, targets,
        el('div', { class: 'row end' }, [el('button', { class: 'btn', text: 'Zuordnung prüfen', onclick: function () {
          if (Object.keys(placed).length < p.cards.length) { wrong(fb, 'Ordnet zuerst alle Kärtchen zu.'); return; }
          attempt(Object.keys(placed).sort().map(function (k) { return k + '=' + placed[k]; }).join(';'));
        } })]));
    }
    if (p.type === 'pick') {
      var pg = optGroup(p.keepOrder ? p.cards : seededShuffle(p.cards, p.id), 'many', function () { fb.textContent = ''; }, p.count || p.max);
      body.push(pg.el, el('div', { class: 'row end' }, [el('button', { class: 'btn', text: p.button || 'Auswahl prüfen', onclick: function () {
        var ids = pg.get().sort();
        if (!ids.length) { wrong(fb, 'Wählt zuerst mindestens eine Karte.'); return; }
        if (p.count && ids.length !== p.count) { wrong(fb, 'Wählt genau ' + p.count + ' Karten.'); return; }
        attempt(ids.join('-'));
      } })]));
    }
    if (p.type === 'cloze') {
      var picks = {};
      var line = el('div', { class: 'cloze' });
      var order = [];
      p.parts.forEach(function (part) {
        if (typeof part === 'string') { line.appendChild(document.createTextNode(part)); return; }
        if (part.strong) { line.appendChild(el('strong', { text: part.strong })); return; }
        order.push(part.gap);
        var sl = el('select', { class: 'gap', 'aria-label': part.label || ('Lücke ' + order.length) });
        sl.appendChild(el('option', { value: '', text: '… auswählen …' }));
        seededShuffle(p.gaps[part.gap], p.id + part.gap).forEach(function (o) { sl.appendChild(el('option', { value: o.id, text: o.label })); });
        sl.addEventListener('change', function () { picks[part.gap] = sl.value; fb.textContent = ''; });
        line.appendChild(sl);
      });
      body.push(line, el('div', { class: 'row end' }, [el('button', { class: 'btn', text: p.button || 'Satz prüfen', onclick: function () {
        if (order.some(function (g) { return !picks[g]; })) { wrong(fb, 'Füllt zuerst alle Lücken aus.'); return; }
        var ans = order.map(function (g) { return g + '=' + picks[g]; }).join(';');
        if (check(p.id, ans, p.hash)) { d.close(); solve(p, {}); return; }
        logEvent('fehlversuch ' + p.id);
        S.vars.fails = S.vars.fails || {}; S.vars.fails[p.id] = (S.vars.fails[p.id] || 0) + 1; persist();
        var trap = (p.traps || []).filter(function (t) { return picks[t.g] === t.v; })[0];
        fb.className = 'feedback no'; fb.innerHTML = '';
        /* Dreierprüfung: Beim ersten Fehlversuch nur „mindestens ein Feld“, genaue Reaktionen erst ab dem zweiten. */
        if (p.triple && S.vars.fails[p.id] < 2) fb.textContent = p.tripleText || 'Mindestens ein Feld stimmt nicht. Prüft den Satz noch einmal, Feld für Feld.';
        else if (trap) fb.appendChild(figureBlock(trap.from || 'kemal', trap.text)); else fb.textContent = p.wrongText || 'Das Schloss bleibt zu. Prüft den Satz noch einmal.';
      } })]));
    }
    if (p.type === 'einspruch') {
      var konterBox = el('div', { class: 'konter', 'aria-live': 'polite' });
      var sum = el('p', { class: 'einspruch-sum', 'aria-live': 'polite' });
      var gSt, gEv, gA, gB;
      function upd() {
        fb.textContent = '';
        if (!gSt || !gEv || !gA || !gB) return;
        var st = gSt.get(), ev = gEv.get(), a = gA.get(), b = gB.get();
        sum.textContent = 'Euer Einspruch: Aussage ' + (st || 'fehlt noch') + ' · Belege ' + (ev.length ? ev.slice().sort().join(' + ') : 'fehlen noch') +
          ' · Begründung 1 ' + (a ? 'gewählt' : 'fehlt noch') + ' · Begründung 2 ' + (b ? 'gewählt' : 'fehlt noch');
      }
      gSt = optGroup(p.statements, 'one', upd);
      gEv = optGroup(p.evidence.map(function (e) { return { id: e.id, label: e.title }; }), 'many', upd, 2);
      gA = optGroup(seededShuffle(p.slotA.options, p.id + 'A'), 'one', upd);
      gB = optGroup(seededShuffle(p.slotB.options, p.id + 'B'), 'one', upd);
      upd();
      var mappe = el('div', { class: 'mappe' }, p.evidence.map(function (e) {
        return el('details', { class: 'evi' }, [el('summary', { text: e.title })].concat(docBody(e)));
      }));
      gSt.el.classList.add('grid2'); gEv.el.classList.add('grid2'); gA.el.classList.add('grid2'); gB.el.classList.add('grid2');
      body.push(el('h3', { text: '1 · Welche Aussage greift ihr an?' }), gSt.el,
        el('h3', { text: '2 · Belegmappe lesen und höchstens zwei Belege vorlegen' }), mappe, gEv.el,
        el('h3', { text: '3 · ' + p.slotA.label }), gA.el,
        el('h3', { text: '4 · ' + p.slotB.label }), gB.el, sum, konterBox,
        el('div', { class: 'row end' }, [el('button', { class: 'btn', text: 'Einspruch!', onclick: function () {
          var st = gSt.get(), evs = gEv.get(), a = gA.get(), b = gB.get();
          if (!st || !evs.length || !a || !b) { wrong(fb, 'Wählt eine Aussage, mindestens einen Beleg und beide Begründungen.'); return; }
          var key = st + '|' + evs.slice().sort().join('+') + '|' + a + '|' + b;
          S.vars.einsprueche = S.vars.einsprueche || [];
          var rec = { t: new Date().toISOString(), id: p.id, st: st, ev: evs.slice().sort(), a: a, b: b };
          if (check(p.id, key, p.hash)) { rec.res = 'ok'; S.vars.einsprueche.push(rec); persist(); d.close(); solve(p, {}); return; }
          var k = matchKonter(p.konter || [], st, evs, a, b);
          rec.res = k ? (k.id || 'regel') : 'default'; S.vars.einsprueche.push(rec); logEvent('fehlversuch ' + p.id);
          konterBox.innerHTML = '';
          var kk = k || { from: 'kemal', text: p.defaultWrong || 'Das steht so noch nicht in den Belegen.' };
          konterBox.appendChild(figureBlock(kk.from, kk.text));
          fb.className = 'feedback no'; fb.textContent = kk.status || 'Der Einspruch reicht noch nicht.';
          persist();
          try { konterBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {}
        } })]));
    }

    /* ---------- Markieren im Text (ab 1.4) ---------- */
    if (p.type === 'markup') {
      var marks = {}, pen = p.passes[0].id, penBtns = {}, passLabel = {};
      p.passes.forEach(function (ps) { passLabel[ps.id] = ps.tag || ps.label; });
      var penRow = el('div', { class: 'pens', role: 'radiogroup', 'aria-label': 'Welche Markierung setzt ihr?' });
      p.passes.forEach(function (ps) {
        var pb = el('button', { class: 'pen' + (ps.id === pen ? ' on' : ''), type: 'button', role: 'radio', 'aria-checked': ps.id === pen ? 'true' : 'false', onclick: function () {
          pen = ps.id;
          p.passes.forEach(function (q) { penBtns[q.id].classList.toggle('on', q.id === pen); penBtns[q.id].setAttribute('aria-checked', q.id === pen ? 'true' : 'false'); });
        } });
        pb.appendChild(el('strong', { text: ps.label })); if (ps.hint) pb.appendChild(el('small', { text: ps.hint }));
        penBtns[ps.id] = pb; penRow.appendChild(pb);
      });
      var flow = el('div', { class: 'markup-text' });
      p.segments.forEach(function (sg) {
        var tagEl = el('span', { class: 'seg-tag', 'aria-hidden': 'true' });
        var seg = el('button', { class: 'seg', type: 'button', 'aria-pressed': 'false', onclick: function () {
          if (marks[sg.id] === pen) delete marks[sg.id]; else marks[sg.id] = pen;
          paintSeg(); fb.textContent = '';
        } }, [el('span', { class: 'seg-nr', text: sg.nr }), ' ', el('span', { class: 'seg-text', text: sg.text }), tagEl]);
        function paintSeg() {
          var m = marks[sg.id];
          seg.className = 'seg' + (m ? ' m-' + m : ''); seg.setAttribute('aria-pressed', m ? 'true' : 'false');
          tagEl.textContent = m ? ' [' + passLabel[m] + ']' : '';
          seg.setAttribute('aria-label', sg.nr + ': ' + sg.text + (m ? ' (markiert als ' + passLabel[m] + ')' : ' (nicht markiert)'));
        }
        paintSeg();
        flow.appendChild(seg); flow.appendChild(document.createTextNode(' '));
      });
      body.push(penRow, flow, p.note ? el('p', { class: 'muted small markup-note', text: p.note }) : null, el('div', { class: 'row end' }, [el('button', { class: 'btn', text: p.button || 'Markierungen prüfen', onclick: function () {
        var ids = Object.keys(marks);
        if (!ids.length) { wrong(fb, 'Markiert zuerst mindestens eine Stelle.'); return; }
        function ansFor(ps) { return ps.id + '=' + ids.filter(function (k) { return marks[k] === ps.id; }).sort().join('-'); }
        var full = p.passes.map(ansFor).join(';'), msg = null;
        /* Rückmeldung je Durchgang (nicht je Satz): sagt, welcher Durchgang noch nicht stimmt, ohne einzelne Sätze zu verraten */
        if (p.passHash && !check(p.id, full, p.hash)) {
          msg = 'Nichts passiert. ' + p.passes.map(function (ps) { return ps.tag + ': ' + (check(p.id + '-' + ps.id, ansFor(ps), p.passHash[ps.id]) ? 'stimmt' : 'stimmt noch nicht'); }).join(' · ') + '.';
        }
        attempt(full, msg);
      } })]));
    }
    /* ---------- Nachfragen (ab 1.4) ---------- */
    if (p.type === 'nachfragen') {
      var nsel = {};
      var annBox = el('div', { class: 'annahmen' }, [el('strong', { text: p.optionsTitle || 'Annahmen' })].concat(p.options.map(function (o) { return el('p', { text: o.full || o.label }); })));
      var nrows = el('div', { class: 'nf-rows' });
      p.rows.forEach(function (r) {
        var replyBox = el('div', { class: 'nf-reply', 'aria-live': 'polite' });
        var asked = false;
        var askBtn = el('button', { class: 'btn ghost small', type: 'button', text: p.askLabel || 'Nachfragen: „Was muss dafür gelten?“', onclick: function () {
          if (asked) return; asked = true; askBtn.disabled = true; logEvent('nachfragen ' + p.id + ' ' + r.id);
          replyBox.appendChild(figureBlock(p.from || 'hallmann', r.reply));
        } });
        var sl = el('select', { class: 'gap', 'aria-label': 'Annahme für ' + r.say.split(' ')[0] });
        sl.appendChild(el('option', { value: '', text: '… Annahme wählen …' }));
        p.options.forEach(function (o) { sl.appendChild(el('option', { value: o.id, text: o.label })); });
        sl.addEventListener('change', function () { nsel[r.id] = sl.value; fb.textContent = ''; });
        nrows.appendChild(el('div', { class: 'nf-row' }, [el('p', { class: 'nf-say', text: r.say }), el('div', { class: 'nf-line' }, [askBtn, el('label', { class: 'nf-label' }, [(p.selectLabel || 'Setzt voraus: '), sl])]), replyBox]));
      });
      body.push(annBox, nrows, el('div', { class: 'row end' }, [el('button', { class: 'btn', text: p.button || 'Annahmen prüfen', onclick: function () {
        if (p.rows.some(function (r) { return !nsel[r.id]; })) { wrong(fb, 'Wählt zuerst für jede Deutung eine Annahme.'); return; }
        attempt(p.rows.map(function (r) { return r.id + '=' + nsel[r.id]; }).sort().join(';'));
      } })]));
    }
    /* ---------- Netz verbinden (ab 1.4) ---------- */
    if (p.type === 'net') {
      var edges = [], from = null, nodeEls = {}, SVGNS = 'http://www.w3.org/2000/svg';
      var nstage = el('div', { class: 'net-stage' });
      var svg = document.createElementNS(SVGNS, 'svg'); svg.setAttribute('class', 'net-lines'); svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = '<defs><marker id="net-arr-' + p.id + '" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,5 L0,10 z" fill="#E6C27A"/></marker></defs>';
      nstage.appendChild(svg);
      var nstatus = el('p', { class: 'muted small net-status', 'aria-live': 'polite', text: 'Tippt eine Karte an, von der ein Pfeil ausgeht, und dann die Karte, auf die er zeigt.' });
      var elist = el('div', { class: 'net-edges' });
      var tagOf = {}; p.items.forEach(function (it) { tagOf[it.id] = it.tag || it.id; });
      function paintNodes() { p.items.forEach(function (it) { nodeEls[it.id].classList.toggle('from', from === it.id); }); }
      function redraw() {
        [].slice.call(svg.querySelectorAll('line')).forEach(function (l) { l.remove(); });
        var sr = nstage.getBoundingClientRect();
        function box(id) { var r = nodeEls[id].getBoundingClientRect(); return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2, hw: r.width / 2 + 5, hh: r.height / 2 + 5 }; }
        edges.forEach(function (k) {
          var ab = k.split('>'), a = box(ab[0]), b = box(ab[1]), dx = b.x - a.x, dy = b.y - a.y;
          if (!dx && !dy) return;
          var tA = Math.min(a.hw / (Math.abs(dx) || 1e-9), a.hh / (Math.abs(dy) || 1e-9));
          var tB = Math.min(b.hw / (Math.abs(dx) || 1e-9), b.hh / (Math.abs(dy) || 1e-9));
          var ln = document.createElementNS(SVGNS, 'line');
          ln.setAttribute('x1', a.x + dx * tA); ln.setAttribute('y1', a.y + dy * tA);
          ln.setAttribute('x2', b.x - dx * tB); ln.setAttribute('y2', b.y - dy * tB);
          ln.setAttribute('stroke', '#E6C27A'); ln.setAttribute('stroke-width', '3'); ln.setAttribute('marker-end', 'url(#net-arr-' + p.id + ')');
          svg.appendChild(ln);
        });
      }
      function renderEdges() {
        elist.innerHTML = '';
        if (!edges.length) { elist.appendChild(el('p', { class: 'muted small', text: 'Noch keine Pfeile gesetzt.' })); return; }
        edges.forEach(function (k) {
          var ab = k.split('>');
          elist.appendChild(el('button', { class: 'btn ghost small edge', type: 'button', 'aria-label': 'Pfeil ' + tagOf[ab[0]] + ' nach ' + tagOf[ab[1]] + ' entfernen', text: tagOf[ab[0]] + ' → ' + tagOf[ab[1]] + '  ✕', onclick: function () {
            edges.splice(edges.indexOf(k), 1); redraw(); renderEdges(); fb.textContent = '';
          } }));
        });
        elist.appendChild(el('button', { class: 'btn ghost small', type: 'button', text: 'Alle Pfeile löschen', onclick: function () { edges = []; from = null; paintNodes(); redraw(); renderEdges(); fb.textContent = ''; } }));
      }
      p.items.forEach(function (it) {
        var pos = (p.layout && p.layout[it.id]) || [50, 50];
        var nb = el('button', { class: 'net-node', type: 'button', style: 'left:' + pos[0] + '%;top:' + pos[1] + '%', onclick: function () {
          if (!from) { from = it.id; paintNodes(); nstatus.textContent = 'Der Pfeil beginnt bei ' + tagOf[it.id] + '. Tippt jetzt die Karte, auf die er zeigt.'; return; }
          if (from === it.id) { from = null; paintNodes(); nstatus.textContent = 'Abgebrochen. Tippt eine Karte an, von der ein Pfeil ausgeht.'; return; }
          var key = from + '>' + it.id;
          if (edges.indexOf(key) === -1) edges.push(key);
          nstatus.textContent = 'Pfeil gesetzt: ' + tagOf[from] + ' → ' + tagOf[it.id] + '.';
          from = null; paintNodes(); redraw(); renderEdges(); fb.textContent = '';
        } }, [el('strong', { text: it.tag || '' }), el('span', { text: it.label })]);
        nodeEls[it.id] = nb; nstage.appendChild(nb);
      });
      body.push(nstage, nstatus, elist, el('div', { class: 'row end' }, [el('button', { class: 'btn', text: p.button || 'Verbindungen prüfen', onclick: function () {
        if (edges.length < (p.minEdges || 3)) { wrong(fb, 'Setzt zuerst Pfeile zwischen den Karten.'); return; }
        var sorted = edges.slice().sort(), msg = null;
        if (!check(p.id, sorted.join(';'), p.hash)) {
          var rv = function (k) { var ab = k.split('>'); return ab[1] + '>' + ab[0]; };
          var okSet = function (l) { return check(p.id, l.slice().sort().join(';'), p.hash); };
          if (okSet(edges.map(rv))) msg = 'Alle Pfeile zeigen in die falsche Richtung.';
          else {
            for (var q = 0; q < edges.length && !msg; q++) { var c = edges.slice(); c[q] = rv(c[q]); if (okSet(c)) msg = 'Ein Pfeil zeigt in die falsche Richtung.'; }
            if (!msg && p.edgeCount && edges.length < p.edgeCount) msg = 'Es fehlt noch mindestens eine Verbindung.';
            else if (!msg && p.edgeCount && edges.length > p.edgeCount) msg = 'Mindestens ein Pfeil ist zu viel.';
          }
          if (msg) msg = 'Nichts passiert. ' + msg;
        }
        attempt(sorted.join(';'), msg);
      } })]));
      renderEdges();
      setTimeout(redraw, 60); setTimeout(redraw, 400);
      if (window.ResizeObserver) { try { new ResizeObserver(function () { redraw(); }).observe(nstage); } catch (e) {} }
    }
    /* ---------- Aufgabe auf Papier mit Selbstabgleich (ab 1.4) ---------- */
    if (p.type === 'paper') {
      var cb1 = el('input', { type: 'checkbox', id: 'paper-ok1' }), cb2 = el('input', { type: 'checkbox', id: 'paper-ok2' });
      var step2 = el('div', { class: 'paper-step2' }); step2.hidden = true;
      var sample = el('ol', { class: 'sample-chain' }, p.sample.map(function (t) { return el('li', { text: t }); }));
      step2.appendChild(figureBlock('kemal', p.sampleText || 'So sieht die Kette aus. Vergleicht sie mit eurer.'));
      step2.appendChild(sample);
      step2.appendChild(el('p', { class: 'muted', text: p.checkText || 'Fehlt bei euch ein Glied, oder steht eines an der falschen Stelle? Korrigiert in einer anderen Farbe.' }));
      step2.appendChild(el('label', { class: 'check' }, [cb2, ' Wir haben verglichen und unsere Kette korrigiert.']));
      step2.appendChild(el('div', { class: 'row end' }, [el('button', { class: 'btn', text: 'Fertig', onclick: function () {
        if (!cb2.checked) { wrong(fb, 'Vergleicht zuerst eure Kette mit Kemals Kette und setzt dann den Haken.'); return; }
        logEvent('papier ' + p.id); d.close(); solve(p, {});
      } })]));
      var go1 = el('div', { class: 'paper-step1' }, [
        el('p', { class: 'paper-task' }, [el('strong', { text: 'Auf Papier (Logbuch): ' }), p.paperTask]),
        el('label', { class: 'check' }, [cb1, ' ' + (p.doneText || 'Wir haben die Kette gezeichnet.')]),
        el('div', { class: 'row end' }, [el('button', { class: 'btn', text: 'Mit Kemals Kette vergleichen', onclick: function () {
          if (!cb1.checked) { wrong(fb, 'Zeichnet zuerst eure Kette ins Logbuch und setzt dann den Haken.'); return; }
          fb.textContent = ''; step2.hidden = false; go1.hidden = true;
          try { step2.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {}
        } })])
      ]);
      body.push(go1, step2);
    }
    if (p.type === 'freetext') {
      var ta = el('textarea', { rows: 5, placeholder: p.placeholder || 'Schreibt hier …' });
      if (S.answers[p.id]) ta.value = S.answers[p.id].text;
      else if (S.vars.draft && S.vars.draft[p.id]) ta.value = S.vars.draft[p.id];
      ta.addEventListener('input', function () { S.vars.draft = S.vars.draft || {}; S.vars.draft[p.id] = ta.value; persist(); });
      body.push(ta, el('div', { class: 'row end' }, [el('button', { class: 'btn', text: p.button || 'Ins Logbuch eintragen', onclick: function () {
        if (ta.value.trim().length < (p.minLength || 40)) { wrong(fb, 'Das ist noch etwas knapp. Schreibt ganze Sätze.'); return; }
        S.answers[p.id] = { title: p.title, text: ta.value.trim() }; d.close(); solve(p, {});
      } })]));
    }
    body.push(fb);
    body.push(el('div', { class: 'row' }, [el('button', { class: 'btn ghost small', type: 'button', text: 'Forscherakte öffnen (nachschlagen)', onclick: function () { openAkte(); } })]));
    if (p.hints && p.hints.length) body.push(hintArea(p, function () { rescueDialog(p, d); }));
    d = openDialog({ cls: 'dlg-puzzle' + (refEl && p.type === 'freetext' ? ' has-ref' : ''), title: p.title, body: body, focus: p.type === 'code' || p.type === 'freetext' });
  }

  /* ---------------- Schloss-Animation (onSolve: { fx: 'lock', fxTitle, fxText }) ---------------- */
  function playLockFx(o, done) {
    var reduce = false;
    try { reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) {}
    var title = o.title || 'Schloss geöffnet', closed = false, timer = null;
    var wrap = el('div', { class: 'fx-lock' + (reduce ? ' still' : ''), role: 'dialog', 'aria-modal': 'true', 'aria-label': title });
    wrap.innerHTML =
      '<div class="fx-glow"></div><div class="fx-ring"></div><div class="fx-ring r2"></div>' +
      '<div class="fx-stage"><svg class="fx-svg" viewBox="0 0 240 280" aria-hidden="true">' +
      '<defs><linearGradient id="fxbrass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3D894"/><stop offset=".5" stop-color="#C99A45"/><stop offset="1" stop-color="#7E5A1F"/></linearGradient></defs>' +
      '<g class="fx-shackle"><path d="M82 126 V84 a38 38 0 0 1 76 0 V126" fill="none" stroke="url(#fxbrass)" stroke-width="17" stroke-linecap="round"/></g>' +
      '<rect class="fx-body" x="50" y="120" width="140" height="122" rx="22" fill="url(#fxbrass)" stroke="#4E3610" stroke-width="4"/>' +
      '<circle cx="120" cy="170" r="15" fill="#2B1F0A"/><rect x="113.5" y="176" width="13" height="34" rx="5" fill="#2B1F0A"/></svg>' +
      '<div class="fx-sparks"></div></div>';
    var lampBox = el('div', { class: 'fx-lamps' });
    (o.lamps || ['Aussage', 'Beleg', 'Reichweite']).forEach(function (t, i) {
      lampBox.appendChild(el('div', { class: 'fx-lamp l' + (i + 1) }, [el('i'), el('span', { text: t })]));
    });
    wrap.appendChild(lampBox);
    wrap.appendChild(el('h2', { class: 'fx-title', text: title }));
    wrap.appendChild(el('p', { class: 'fx-text', text: o.text || '' }));
    var sparks = wrap.querySelector('.fx-sparks');
    for (var i = 0; i < 24; i++) {
      var ang = (i / 24) * Math.PI * 2 + Math.random() * .25, dist = 90 + Math.random() * 110;
      sparks.appendChild(el('i', { class: 'spark', style: '--dx:' + Math.round(Math.cos(ang) * dist) + 'px;--dy:' + Math.round(Math.sin(ang) * dist) + 'px;--dl:' + (Math.random() * .25).toFixed(2) + 's' }));
    }
    var next = el('button', { class: 'btn fx-next', type: 'button', text: o.button || 'Weiter', onclick: close });
    var skip = el('button', { class: 'fx-skip', type: 'button', text: 'Überspringen', onclick: function () { wrap.classList.add('still', 'done'); clearTimeout(timer); next.focus(); } });
    wrap.appendChild(skip); wrap.appendChild(next);
    function close() {
      if (closed) return; closed = true; clearTimeout(timer);
      wrap.classList.add('out'); setTimeout(function () { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); done(); }, 300);
    }
    document.body.appendChild(wrap);
    timer = setTimeout(function () { wrap.classList.add('done'); next.focus(); }, reduce ? 50 : 4600);
  }

  function solve(p, how) {
    S.solved[p.id] = { t: new Date().toISOString(), hints: S.hints[p.id] || 0, rescue: !!how.rescue };
    applyEffects(p.onSolve || {});
    logEvent('gelöst ' + p.id + (how.rescue ? ' (Notfall)' : ''));
    refreshRoom();
    var eff = p.onSolve || {};
    function next() {
      if (eff.then && ROOM.puzzles[eff.then]) openPuzzle(ROOM.puzzles[eff.then]);
      else if (ROOM) checkMission();
    }
    function proceed() {
      if (eff.message) message(eff.message.from, eff.message.text, function () { if (eff.message2) message(eff.message2.from, eff.message2.text, next, true, eff.message2.audio); else next(); }, true, eff.message.audio);
      else if (eff.text) { var dd = openDialog({ cls: 'dlg-world', body: paras(eff.text).concat([el('div', { class: 'row end' }, [el('button', { class: 'btn', text: 'Weiter', onclick: function () { dd.close(); } })])]), onClose: next }); }
      else next();
    }
    if (eff.fx === 'lock') playLockFx({ title: eff.fxTitle, text: eff.fxText, lamps: eff.fxLamps }, proceed); else proceed();
  }
  function applyEffects(eff, silent) {
    (eff.items || []).forEach(function (it) { if (addUnique(S.items, it, 'id') && !silent) toast('Neues Fundstück: ' + it.label); });
    (eff.docs || []).forEach(function (id) { var dc = ROOM.docs[id]; if (dc) addUnique(S.docs, { id: id, kind: 'doc', title: dc.title, text: dc.text, table: dc.table, audio: dc.audio }, 'id'); });
    if (eff.evidence) addUnique(S.evidence, eff.evidence, 'id');
    if (eff.merksatz) addUnique(S.merksaetze, eff.merksatz);
    persist();
  }

  /* ---------------- Raum ---------------- */
  var api;
  function cond(c) {
    if (!c) return true;
    var ok = true;
    [].concat(c.solved || []).forEach(function (id) { if (!isSolved(id)) ok = false; });
    [].concat(c.notSolved || []).forEach(function (id) { if (isSolved(id)) ok = false; });
    [].concat(c.missionDone || []).forEach(function (id) { if (!isSolved(id)) ok = false; });
    [].concat(c.unlocked || []).forEach(function (id) { if (!isUnlocked(id)) ok = false; });
    return ok;
  }
  function runAction(a) {
    if (!a) return;
    if (a.type === 'doc') {
      var dc = ROOM.docs[a.doc];
      addUnique(S.docs, { id: a.doc, kind: 'doc', title: dc.title, text: dc.text, table: dc.table, audio: dc.audio }, 'id'); persist();
      openDialog({ cls: 'dlg-doc ' + (dc.style || 'paper'), title: dc.title, body: [dc.image ? zoomImg(dc.image, dc.title) : null].concat(docBody(dc)) });
    } else if (a.type === 'docs') {
      var blocks = [];
      a.docs.forEach(function (id) {
        var dd = ROOM.docs[id]; addUnique(S.docs, { id: id, kind: 'doc', title: dd.title, text: dd.text, table: dd.table, audio: dd.audio }, 'id');
        blocks.push(el('h3', { text: dd.title })); docBody(dd).forEach(function (n) { if (n) blocks.push(n); });
      });
      persist(); openDialog({ cls: 'dlg-doc paper', title: a.title, body: blocks });
    } else if (a.type === 'puzzle') openPuzzle(ROOM.puzzles[a.puzzle]);
    else if (a.type === 'text') openDialog({ cls: 'dlg-world', body: paras(a.text) });
    else if (a.type === 'message') message(a.from, a.text);
    else if (a.type === 'image') openDialog({ cls: 'dlg-image', title: a.title, body: [zoomImg(a.image, a.title), a.text ? el('div', {}, paras(a.text)) : null] });
  }
  function zoomImg(src, alt) {
    var scale = 1;
    var img = el('img', { src: src, alt: alt || '' });
    var box = el('div', { class: 'zoom-box' }, [img]);
    function set(s) { scale = Math.max(1, Math.min(3, s)); img.style.width = (scale * 100) + '%'; }
    return el('div', { class: 'zoom' }, [box, el('div', { class: 'row center' }, [
      el('button', { class: 'btn ghost small', 'aria-label': 'Verkleinern', text: '−', onclick: function () { set(scale - 0.5); } }),
      el('button', { class: 'btn ghost small', 'aria-label': 'Vergrößern', text: '+', onclick: function () { set(scale + 0.5); } })])]);
  }
  function currentMission() {
    return ROOM.missions.filter(function (m) { return isUnlocked(m.id); }).pop() || null;
  }
  function checkMission() {
    var cur = -1; ROOM.missions.forEach(function (m, i) { if (isUnlocked(m.id)) cur = i; });
    ROOM.missions.forEach(function (m, i) {
      if (isUnlocked(m.id) && !S.seen['done-' + m.id] && m.requires.every(isSolved)) {
        S.seen['done-' + m.id] = true; S.solved[m.id] = { t: new Date().toISOString() }; persist();
        if (i < cur) return;
        var nx = ROOM.missions[i + 1];
        var dlg = openDialog({ cls: 'dlg-done', title: m.doneTitle || 'Mission abgeschlossen', body: paras(m.doneText || '').concat([
          nx ? el('p', { class: 'muted', text: (unlockMode() === 'auto' ? 'Für die nächste Mission beantwortet ihr zuerst das Do Now im Logbuch. Dann tippt unten auf „Nächste Mission“.' : 'Die nächste Mission schaltet eure Lehrkraft mit einem Code frei. Habt ihr den Code schon, tippt unten auf „Nächste Mission“.') }) : null,
          el('p', { class: 'muted', text: 'Notfall-Code für euer Logbuch: ' + makeCode() }),
          el('div', { class: 'row end' }, [nx ? el('button', { class: 'btn ghost', text: 'Nächste Mission', onclick: function () { dlg.close(); lockScreen(nx, true); } }) : null, el('button', { class: 'btn ghost', text: 'Forscherakte', onclick: function () { dlg.close(); openAkte('beweise'); } }),
            el('button', { class: 'btn', text: 'Spielstand sichern', onclick: function () { saveFile(); toast('Gesichert. Ladet die Datei in WebWeaver hoch.', 6000); } })])]) });
      }
    });
  }
  function nextLocked() {
    if (!ROOM || !ROOM.missions || !S) return null;
    for (var i = 0; i < ROOM.missions.length; i++) {
      var m = ROOM.missions[i];
      if (!isUnlocked(m.id)) {
        var prev = ROOM.missions[i - 1];
        return (i === 0 || (prev && (S.seen['done-' + prev.id] || isSolved(prev.id)))) ? m : null;
      }
    }
    return null;
  }
  function unlockMode() {
    var o = null; try { o = sessionStorage.getItem('tresor.modus'); } catch (e) {}
    return o || (ROOM && ROOM.unlockMode) || 'code';
  }
  function startScreen(m, closable) {
    var cb = el('input', { type: 'checkbox', id: 'start-ok' });
    var fb = el('div', { class: 'feedback', role: 'status' });
    function go() {
      if (!cb.checked) { wrong(fb, 'Beantwortet zuerst das Do Now im Logbuch und setzt dann den Haken.'); return; }
      S.unlocked.push(m.id); logEvent('freigeschaltet ' + m.id + ' (ohne Code)'); d.close(); refreshRoom(); intro(m);
    }
    var d = openDialog({ cls: 'dlg-lock', closable: closable ? undefined : false, title: ROOM.title, body: [
      el('p', { text: 'Bereit für „' + m.title + '“?' }),
      el('p', { class: 'paper-task' }, [el('strong', { text: 'Zuerst auf Papier: ' }), 'Beantwortet das Do Now dieser Stunde im Feld „Vorher“ eures Logbuchs.']),
      el('label', { class: 'check' }, [cb, ' Wir haben das Do Now im Logbuch beantwortet.']), fb,
      el('div', { class: 'row' }, [el('button', { class: 'btn', text: 'Mission starten', onclick: go }),
        closable ? el('button', { class: 'btn ghost small', text: 'Abbrechen', onclick: function () { d.close(); } }) : null,
        el('a', { class: 'btn ghost small', href: BASE + 'index.html', text: 'Zurück zum Museumsplan' })])
    ] });
  }
  function lockScreen(m, closable) {
    if (unlockMode() === 'auto') { startScreen(m, closable); return; }
    var inp = el('input', { type: 'text', class: 'code-in', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', 'aria-label': 'Freischalt-Code' });
    var fb = el('div', { class: 'feedback', role: 'status' });
    function go() {
      if (check(m.id, inp.value, m.unlock)) { S.unlocked.push(m.id); logEvent('freigeschaltet ' + m.id); d.close(); refreshRoom(); intro(m); }
      else wrong(fb, 'Die Tür bleibt verschlossen. Den Code bekommt ihr im Unterricht.');
    }
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    var d = openDialog({ cls: 'dlg-lock', closable: closable ? undefined : false, title: ROOM.title, body: [
      el('p', { text: 'Die Tür ist verschlossen. Gebt den Code für „' + m.title + '“ ein.' }),
      el('div', { class: 'row' }, [inp, el('button', { class: 'btn', text: 'Aufschließen', onclick: go })]), fb,
      el('div', { class: 'row' }, [closable ? el('button', { class: 'btn ghost small', text: 'Abbrechen', onclick: function () { d.close(); } }) : null, el('a', { class: 'btn ghost small', href: BASE + 'index.html', text: 'Zurück zum Museumsplan' })])
    ] });
  }
  function intro(m) {
    if (S.seen['intro-' + m.id] || !m.intro || (m.requires || []).some(isSolved)) return;
    S.seen['intro-' + m.id] = true; persist();
    message(m.intro.from, m.intro.text, function () { if (m.intro.next) { message(m.intro.next.from, m.intro.next.text, hint, true, m.intro.next.audio); } else hint(); }, true, m.intro.audio);
    function hint() { toast(ROOM.flashlight ? 'Bewegt den Finger über den Bildschirm, um mit der Taschenlampe zu suchen.' : 'Tippt auf Dinge im Raum, um sie zu untersuchen.', 5000); }
  }

  var sceneEl, darkEl, hotEls = [], invEl;
  function refreshRoom() {
    if (!ROOM || !invEl) return;
    invEl.innerHTML = '';
    invEl.appendChild(el('span', { class: 'inv-label', text: 'Fundstücke' }));
    if (!S.items.length) invEl.appendChild(el('span', { class: 'inv-empty', text: 'noch keine' }));
    S.items.forEach(function (it) { invEl.appendChild(el('button', { class: 'inv-item', text: it.label, onclick: function () { openAkte('funde'); } })); });
  }
  function buildRoom() {
    document.title = ROOM.title + ' · Der Tresor der Zeit';
    var stage = el('div', { class: 'stage' + (ROOM.flashlight ? ' dark-mode' : '') });
    sceneEl = el('div', { class: 'scene' }, [el('img', { class: 'scene-bg', src: ROOM.image, alt: ROOM.imageAlt || '' })]);
    ROOM.hotspots.forEach(function (h) {
      var b = el('button', { class: 'hot', 'aria-label': h.label, style: 'left:' + h.rect[0] + '%;top:' + h.rect[1] + '%;width:' + h.rect[2] + '%;height:' + h.rect[3] + '%', onclick: function () {
        var st = (h.states || [{ action: h.action }]).filter(function (s) { return cond(s.if); })[0];
        if (st) runAction(st.action);
      } });
      hotEls.push(b); sceneEl.appendChild(b);
    });
    darkEl = el('div', { class: 'dark' });
    sceneEl.appendChild(darkEl);
    stage.appendChild(sceneEl);
    function move(e) {
      var r = sceneEl.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      darkEl.style.setProperty('--x', x + 'px'); darkEl.style.setProperty('--y', y + 'px');
      hotEls.forEach(function (h) {
        var b = h.getBoundingClientRect();
        var inside = e.clientX > b.left - 30 && e.clientX < b.right + 30 && e.clientY > b.top - 30 && e.clientY < b.bottom + 30;
        h.classList.toggle('near', inside);
      });
    }
    sceneEl.addEventListener('pointermove', move);
    sceneEl.addEventListener('pointerdown', move);

    var lightBtn = el('button', { class: 'hud-btn', 'aria-pressed': 'false', text: ROOM.flashlight ? 'Licht an' : 'Licht aus', onclick: function () {
      var on = stage.classList.toggle('lights-on'); lightBtn.textContent = on ? 'Taschenlampe' : 'Licht an'; lightBtn.setAttribute('aria-pressed', on);
    } });
    var hud = el('div', { class: 'hud' }, [
      el('div', { class: 'hud-title' }, [el('strong', { text: ROOM.title }), el('span', { text: (ROOM.subtitle || '') }), el('span', { class: 'team-bar', text: ' · Team: ' + S.team.join(', ') })]),
      el('div', { class: 'hud-btns' }, [
        ROOM.flashlight ? lightBtn : null,
        el('button', { class: 'hud-btn', text: 'Absuchen', onclick: function () {
          hotEls.forEach(function (h) { h.classList.add('reveal'); }); setTimeout(function () { hotEls.forEach(function (h) { h.classList.remove('reveal'); }); }, 2600);
        } }),
        el('button', { class: 'hud-btn', text: 'Akte', onclick: function () { openAkte(); } }),
        el('button', { class: 'hud-btn', text: 'Menü', onclick: function () { openMenu(el('a', { class: 'btn ghost', href: BASE + 'index.html', text: 'Zum Museumsplan' })); } })
      ])
    ]);
    invEl = el('div', { class: 'inv', 'aria-label': 'Fundstücke' });
    stage.appendChild(hud); stage.appendChild(invEl);
    stage.appendChild(el('div', { class: 'rotate', text: 'Haltet das iPad bitte quer.' }));
    document.body.appendChild(stage);
    function fit() {
      var ratio = ROOM.size[0] / ROOM.size[1], vw = stage.clientWidth, vh = stage.clientHeight;
      var w = Math.min(vw, vh * ratio);
      sceneEl.style.width = w + 'px'; sceneEl.style.height = (w / ratio) + 'px';
    }
    fit(); window.addEventListener('resize', fit); window.addEventListener('orientationchange', function () { setTimeout(fit, 300); });
    refreshRoom();
  }

  function removePreviewHint() { var ph = document.getElementById('preview-hint'); if (ph) ph.remove(); }

  /* ---------------- Öffentliche Schnittstelle ---------------- */
  api = {
    isSolved: isSolved, isUnlocked: isUnlocked, state: function () { return S; },
    room: function (def) {
      ROOM = def; BASE = def.base || '../';
      document.addEventListener('DOMContentLoaded', function () {
        removePreviewHint();
        if (!load() || !sessionStorage.getItem('tresor.confirmed')) { location.href = BASE + 'index.html'; return; }
        // Wirkungen gelöster Rätsel erneut anwenden (z. B. nach Notfall-Code), ohne Meldungen
        Object.keys(ROOM.puzzles).forEach(function (k) { if (isSolved(k)) applyEffects(ROOM.puzzles[k].onSolve || {}, true); });
        buildRoom();
        var m = ROOM.missions.filter(function (mm) { return !isUnlocked(mm.id); })[0];
        var cur = currentMission();
        if (!cur && m) lockScreen(m);
        else if (cur) {
          var wasDone = !!S.seen['done-' + cur.id];
          checkMission();
          if (wasDone && m) lockScreen(m); else if (!wasDone) intro(cur);
        }
      });
    },
    start: function (def) {
      BASE = def.base || '';
      document.addEventListener('DOMContentLoaded', function () { removePreviewHint(); buildStart(def); });
    }
  };

  /* ---------------- Startseite ---------------- */
  function buildStart(def) {
    var root = document.getElementById('start');
    function render() {
      root.innerHTML = '';
      var st = load();
      root.appendChild(el('div', { class: 'start-head' }, [el('h1', { text: 'Der Tresor der Zeit' }), el('p', { class: 'sub', text: 'Ein Fall für das Junior-Forschungsteam des Museums' })]));
      if (!st) {
        var inputs = [0, 1, 2].map(function (i) { return el('input', { type: 'text', autocomplete: 'off', placeholder: i < 2 ? 'Vorname ' + (i + 1) : 'Vorname 3 (optional)', 'aria-label': 'Vorname ' + (i + 1) }); });
        var fb = el('div', { class: 'feedback', role: 'status' });
        var fb2 = el('div', { class: 'feedback', role: 'status' });
        var codeIn = el('input', { type: 'text', autocomplete: 'off', autocapitalize: 'characters', placeholder: 'Notfall-Code, z. B. T1-…', 'aria-label': 'Notfall-Code' });
        root.appendChild(el('div', { class: 'start-panels' }, [
          el('section', { class: 'panel' }, [el('h2', { text: 'Neues Team' }), el('p', { class: 'muted', text: 'Nur Vornamen, keine weiteren Angaben.' })].concat(inputs).concat([
            el('button', { class: 'btn', text: 'Fall übernehmen', onclick: function () {
              var team = inputs.map(function (i) { return i.value.trim(); }).filter(Boolean);
              if (!team.length) { wrong(fb, 'Tragt mindestens einen Vornamen ein.'); return; }
              S = blank(team); persist(); sessionStorage.setItem('tresor.confirmed', '1'); render();
            } }), fb])),
          el('section', { class: 'panel' }, [el('h2', { text: 'Weiterspielen' }), el('p', { class: 'muted', text: 'Ladet eure Spielstand-Datei aus WebWeaver.' }),
            el('button', { class: 'btn', text: 'Spielstand laden', onclick: function () { pickFile(function (err) { if (err) wrong(fb2, err); else { sessionStorage.setItem('tresor.confirmed', '1'); render(); } }); } }),
            el('h3', { text: 'Datei verloren?' }), codeIn,
            el('button', { class: 'btn ghost', text: 'Mit Notfall-Code weiterspielen', onclick: function () {
              var ids = readCode(codeIn.value);
              var team = inputs.map(function (i) { return i.value.trim(); }).filter(Boolean);
              if (!ids) { wrong(fb2, 'Dieser Code ist nicht gültig. Prüft jedes Zeichen.'); return; }
              S = blank(team.length ? team : ['Team']);
              ids.forEach(function (id) { if (/^m/.test(id)) S.unlocked.push(id); else S.solved[id] = { t: 'code' }; });
              S.seen.restoredFromCode = true; persist(); sessionStorage.setItem('tresor.confirmed', '1'); render();
            } }), fb2])
        ]));
        return;
      }
      S = st;
      if (!sessionStorage.getItem('tresor.confirmed')) {
        var age = Math.round((Date.now() - new Date(S.log.length ? S.log[S.log.length - 1].t : S.created).getTime()) / 3600000);
        root.appendChild(el('section', { class: 'panel warn' }, [
          el('h2', { text: 'Seid ihr Team ' + S.team.join(', ') + '?' }),
          el('p', { text: 'Auf diesem iPad liegt noch ein Spielstand' + (age >= 1 ? ' von vor etwa ' + age + ' Stunde' + (age === 1 ? '' : 'n') : '') + '. Vielleicht hat ein anderes Team vergessen, das Spiel zu beenden.' }),
          el('div', { class: 'row' }, [
            el('button', { class: 'btn', text: 'Ja, das sind wir', onclick: function () { sessionStorage.setItem('tresor.confirmed', '1'); render(); } }),
            el('button', { class: 'btn ghost', text: 'Nein, wir sind ein anderes Team', onclick: function () {
              var dd = openDialog({ title: 'Fremden Spielstand entfernen', body: [
                el('p', { text: 'Sichert den Spielstand des anderen Teams zuerst, damit er nicht verloren geht. Gebt die Datei danach eurer Lehrkraft.' }),
                el('div', { class: 'row end' }, [
                  el('button', { class: 'btn ghost', text: 'Spielstand des anderen Teams sichern', onclick: function () { saveFile(); } }),
                  el('button', { class: 'btn', text: 'Entfernen und neu starten', onclick: function () { try { localStorage.removeItem(STORE_KEY); } catch (e) {} dd.close(); render(); } })])] });
            } })])]));
        return;
      }
      root.appendChild(el('p', { class: 'team', text: 'Team: ' + S.team.join(', ') }));
      var plan = el('div', { class: 'plan' });
      def.rooms.forEach(function (r) {
        var open = !!r.href;
        plan.appendChild(el(open ? 'a' : 'div', { class: 'plan-room' + (open ? '' : ' closed'), href: open ? r.href : null, style: '--c:' + r.color },
          [el('strong', { text: r.title }), el('span', { text: open ? r.place : 'noch verschlossen' })]));
      });
      root.appendChild(plan);
      root.appendChild(el('div', { class: 'row center' }, [el('button', { class: 'btn ghost', text: 'Menü', onclick: function () { openMenu(); } })]));
    }
    render();
  }

  window.TRESOR = api;
  window.TRESOR._test = { sha256: sha256, norm: norm, shuffle: seededShuffle, makeCode: makeCode, readCode: readCode };
})();
