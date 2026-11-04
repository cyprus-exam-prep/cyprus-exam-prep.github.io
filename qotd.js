/*! CyprusExamPrep question-of-the-day widget. No cookies, no storage, no tracking. https://cyprus-exam-prep.github.io/embed.html */
(function () {
  var SITE = 'https://cyprus-exam-prep.github.io/';
  var DATA = SITE + 'qotd.json';
  var T = {
    en: { h: 'Cyprus exam: question of the day', ok: 'Correct!', no: 'Not quite. Correct answer:', src: 'Source', more: 'Practise free: 15-question Cyprus citizenship exam test', ind: 'Independent project, not affiliated with the Ministry.', err: 'Today\'s question could not load.', next: 'New question tomorrow' },
    ru: { h: 'Экзамен на Кипре: вопрос дня', ok: 'Верно!', no: 'Неверно. Правильный ответ:', src: 'Источник', more: 'Бесплатный тест из 15 вопросов к экзамену на гражданство Кипра', ind: 'Независимый проект, не связан с Министерством.', err: 'Не удалось загрузить вопрос дня.', next: 'Новый вопрос завтра' }
  };
  var CSS =
    ':host{all:initial;display:block;width:100%}' +
    '.w{--bg:#fff;--fg:#1f1e1b;--mu:#6b675e;--ln:#e3ded2;--ac:#1d5f8a;--ok:#2f7a3d;--bad:#b23a2e;--okb:#e9f4ea;--badb:#fbecea;' +
    'box-sizing:border-box;width:100%;max-width:100%;background:var(--bg);color:var(--fg);border:1px solid var(--ln);border-radius:10px;padding:16px;' +
    'font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:left;overflow-wrap:anywhere}' +
    '.w.dark{--bg:#211f1c;--fg:#ece8df;--mu:#a39e93;--ln:#38342e;--ac:#7cb7e0;--ok:#7ccf8a;--bad:#f08a7e;--okb:#1f2e21;--badb:#3a2220}' +
    '*{box-sizing:border-box}' +
    '.k{margin:0 0 8px;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--mu)}' +
    '.q{margin:0 0 4px;font-weight:600;font-size:16px}.t{margin:0 0 12px;font-size:13px;color:var(--mu)}' +
    '.o{display:grid;gap:8px;margin:0;padding:0}' +
    'button{display:block;width:100%;text-align:left;font:inherit;color:inherit;background:transparent;border:1px solid var(--ln);border-radius:8px;padding:9px 12px;cursor:pointer;margin:0}' +
    'button:hover:not(:disabled){border-color:var(--ac)}button:disabled{cursor:default}' +
    'button:focus-visible{outline:2px solid var(--ac);outline-offset:2px}' +
    '.r{border-color:var(--ok);background:var(--okb)}.x{border-color:var(--bad);background:var(--badb)}' +
    '.y{margin:12px 0 0;font-size:14px}.y b{color:var(--ok)}.y b.n{color:var(--bad)}' +
    '.s{font-size:12px;color:var(--mu)}a{color:var(--ac)}' +
    '.f{margin:14px 0 0;padding:10px 0 0;border-top:1px solid var(--ln);font-size:13px}.f small{display:block;color:var(--mu);font-size:11px;margin-top:4px}';

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  function nicosiaDay() {
    try {
      var p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Nicosia', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
      return Date.UTC(+p.slice(0, 4), +p.slice(5, 7) - 1, +p.slice(8, 10));
    } catch (e) { var d = new Date(); return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()); }
  }

  function pick(data) {
    var ep = (data.epoch || '2026-11-01').split('-');
    var days = Math.floor((nicosiaDay() - Date.UTC(+ep[0], +ep[1] - 1, +ep[2])) / 864e5);
    var n = data.questions.length;
    return data.questions[((days % n) + n) % n];
  }

  function render(host, data) {
    var lang = (host.getAttribute('data-lang') || 'en').toLowerCase() === 'ru' ? 'ru' : 'en';
    var partner = (host.getAttribute('data-partner') || 'direct').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40) || 'direct';
    var theme = (host.getAttribute('data-theme') || 'light').toLowerCase();
    var L = T[lang];
    var sh = !!host.attachShadow, root = host.shadowRoot || (sh ? host.attachShadow({ mode: 'open' }) : host);
    root.innerHTML = '';
    if (sh) { var st = el('style'); st.textContent = CSS; root.appendChild(st); }
    var w = el('div', 'w');
    if (theme === 'dark' || (theme === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches)) w.className += ' dark';
    w.setAttribute('lang', 'el');
    root.appendChild(w);
    var link = SITE + '?utm_source=embed&p=' + encodeURIComponent(partner);
    var foot = el('div', 'f');
    var a = el('a', null, L.more + ' →'); a.href = link; a.target = '_blank'; a.rel = 'noopener';
    foot.appendChild(a); foot.appendChild(el('small', null, 'CyprusExamPrep · ' + L.ind));
    foot.setAttribute('lang', lang);
    if (!data) { var e = el('p', 't', L.err); e.setAttribute('lang', lang); w.appendChild(e); w.appendChild(foot); return; }
    var q = pick(data);
    var k = el('p', 'k', L.h); k.setAttribute('lang', lang); w.appendChild(k);
    w.appendChild(el('p', 'q', q.gr));
    var tr = el('p', 't', q[lang]); tr.setAttribute('lang', lang); w.appendChild(tr);
    var box = el('div', 'o'); box.setAttribute('role', 'group'); w.appendChild(box);
    var btns = q.o.map(function (txt, i) {
      var b = el('button', null, 'αβγδ'.charAt(i) + ') ' + txt); b.type = 'button';
      b.onclick = function () { answer(i); };
      box.appendChild(b); return b;
    });
    var out = el('div', 'y'); out.setAttribute('lang', lang); out.setAttribute('aria-live', 'polite'); w.appendChild(out);
    w.appendChild(foot);
    function answer(i) {
      btns.forEach(function (b, j) { b.disabled = true; if (j === q.a) b.className = 'r'; else if (j === i) b.className = 'x'; });
      out.innerHTML = '';
      var ok = i === q.a, p = el('p');
      p.style.margin = '0';
      var b = el('b', ok ? '' : 'n', ok ? L.ok : L.no); p.appendChild(b);
      if (!ok) p.appendChild(document.createTextNode(' ' + q.o[q.a] + '.'));
      p.appendChild(document.createTextNode(' ' + (lang === 'ru' ? q.why_ru : q.why)));
      out.appendChild(p);
      var s = el('p', 's'); s.style.margin = '6px 0 0';
      s.appendChild(document.createTextNode(L.src + ': '));
      var sa = el('a', null, q.src); sa.href = /^https?:\/\//.test(q.url) ? q.url : SITE; sa.target = '_blank'; sa.rel = 'noopener nofollow';
      s.appendChild(sa); s.appendChild(document.createTextNode(' · ' + L.next));
      out.appendChild(s);
    }
  }

  var cache = {};
  function load(url) {
    if (!cache[url]) cache[url] = fetch(url, { credentials: 'omit', cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (d) { if (!d || !d.questions || !d.questions.length) throw 0; return d; });
    return cache[url];
  }

  function init() {
    var hosts = document.querySelectorAll('#cep-qotd,[data-cep-qotd]');
    Array.prototype.forEach.call(hosts, function (h) {
      if (h.getAttribute('data-cep-done')) return;
      h.setAttribute('data-cep-done', '1');
      load(h.getAttribute('data-src') || DATA).then(function (d) { render(h, d); }, function () { render(h, null); });
    });
  }
  window.CEPqotd = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
