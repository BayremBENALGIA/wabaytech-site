/* ════════════════════════════════════════════════════════════════════
   WABAYTECH — « Orbital » · app.js
   Aucune dépendance obligatoire : Lenis (défilement fluide, auto-hébergé)
   est optionnel. Si quoi que ce soit échoue, le contenu reste lisible :
   les états masqués ne s'appliquent que sous la classe .motion, et un
   garde-fou la retire en cas d'erreur.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var d = document, html = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var MOTION = html.classList.contains('motion');
  var FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  /* Garde-fou : une erreur imprévue ne doit jamais laisser la page masquée. */
  window.addEventListener('error', function () {
    html.classList.remove('booting'); html.classList.add('ready');
    $$('[data-reveal]').forEach(function (el) { el.classList.add('in'); });
  });

  /* ── i18n : le FR est le DOM (source de vérité), l'EN un dictionnaire ── */
  var EN = {
    'nav.produits': 'Products', 'nav.approche': 'Approach', 'nav.cta': 'Start a project',
    'boot.l2': 'link Tunis ⇄ Paris', 'boot.l3': 'products in orbit · PROXECO · VECTOR', 'boot.l4': 'all systems nominal', 'boot.skip': 'click to skip',
    'hero.pill': 'Independent studio · Tunis & Paris · Available for new projects',
    'hero.h1a': 'Software that', 'hero.h1b': 'holds up in', 'hero.h1c': 'production.',
    'hero.sub': 'Independent studio. We code, we ship, we operate our own products. We know what it costs to keep an app at 99.9% — and we bring that discipline to yours. Mobile, web, ERP, custom AI.',
    'hero.cta1': 'See our products', 'hero.cta2': 'Start a project',
    'hud.k1': 'In production', 'hud.u1': 'proprietary products',
    'hud.k2': 'Post-delivery', 'hud.u2': 'days of follow-up included',
    'hud.k3': 'Clear quote', 'hud.u3': 'hours, no more',
    'hud.k4': 'Company', 'hud.u4': 'D-U-N-S verified',
    'mq.ia': 'Custom AI', 'mq.sec': 'Security', 'mq.pct': '99.9%',
    'studio.eyebrow': 'The house and its products',
    'studio.title': 'One studio, <em>two products.</em>',
    'studio.lede': 'WABAYTECH designs, builds and operates its own software in production. The same discipline, the same team and the same rigor when we work for our clients.',
    't.studio.kicker': 'The studio',
    't.studio.p': 'Software & AI studio based in Tunis. We turn an idea into a product in production — from first mockup to launch, with 90 days of follow-up included.',
    't.studio.lnk': 'Discover our services',
    't.px.kicker': 'Product · Marketplace',
    't.px.p': 'Your neighborhood artisans, delivered express. Baker, greengrocer, cheesemonger, wine merchant, caterer — order placed, groceries at your door in 30 minutes.',
    't.px.lnk': 'Visit proxeco.com',
    't.vt.kicker': 'Product · AI',
    't.vt.p': 'An intelligent assistant that turns an instruction into tested, deployed software. You keep the strategy — it handles execution, from code to releases.',
    't.vt.lnk': 'Request access',
    'prod.eyebrow': 'Our products',
    'prod.title': 'What we\'ve put <em>in production.</em>',
    'prod.lede': 'Two proprietary products, launched and operated daily. The best proof of what we do: shipping software that holds up in production — not just a demo.',
    'px.tag': 'Marketplace · express delivery',
    'px.h3': 'The French marketplace that connects your neighborhood artisans <em>to your door.</em>',
    'px.desc': 'Three fully integrated spaces: buyer, seller, courier — an experience designed for each role.',
    'px.f1': '<strong>For buyers</strong> — order from your favorite artisans, ~30 min delivery, real-time tracking.',
    'px.f2': '<strong>For merchants</strong> — catalog, orders, statistics, direct payouts. 15% commission, paid out within 7 days.',
    'px.f3': '<strong>For couriers</strong> — on-the-fly missions, your choice of vehicle, paid within 24 hours.',
    'px.f4': '<strong>100% free for buyers</strong> — no subscription, no hidden fees, pay per order.',
    'px.cta1': 'Visit the site', 'px.cta2': 'Become a seller', 'px.cta3': 'Become a courier',
    'mk.today': 'Today', 'mk.rev': 'Today\'s revenue', 'mk.neworder': 'New order', 'mk.orderline': '3 items · €12.40',
    'mk.refuse': 'Decline', 'mk.accept': 'Accept', 'mk.prep': 'Being prepared', 'mk.ready': 'Ready · handed to courier',
    'mk.near': 'Near you', 'mk.p1': 'Traditional baguette', 'mk.p2': '18-month Comté', 'mk.p3': 'Heirloom tomatoes',
    'mk.order': 'Order · €12.40', 'mk.sent': 'Order sent ✓',
    'mk.wait': 'Waiting for a mission', 'mk.online': 'Online · Bastille area', 'mk.mission': 'New mission',
    'mk.going': 'Delivery in progress', 'mk.eta': 'Arriving in 8 min', 'mk.done': 'Delivered ✓', 'mk.paid': 'paid within 24 h',
    'mk.f1': 'The buyer orders', 'mk.f2': 'The merchant prepares', 'mk.f3': 'The courier delivers',
    'vt.tag': 'AI assistant · a WABAYTECH product',
    'vt.h3': 'The assistant that thinks, designs <em>and executes.</em>',
    'vt.desc': 'VECTOR turns an instruction into tested, deployed software: you keep the strategy, it carries the technical load.',
    'vt.f1': '<strong>Project memory</strong> — keeps context from session to session, always knows where you left off.',
    'vt.f2': '<strong>Works in parallel</strong> — analyzes several dimensions at once: quality, performance, security, accessibility.',
    'vt.f3': '<strong>From diagnosis to deployment</strong> — audit, refactor, tests, release: the full chain, no manual steps.',
    'vt.f4': '<strong>Product vision</strong> — doesn\'t just write code, it argues for strategic choices.',
    'vt.cta': 'Request access',
    'tm.plan': 'plan', 'tm.planv': 'reading the code · 4 files targeted · project memory loaded',
    'tm.tests': 'tests', 'tm.secu': 'security', 'tm.fix': 'fix', 'tm.ok': 'live · 0 regression · you stay in control',
    'svc.title': 'What we build <em>for you.</em>',
    'svc.lede': 'Everything it takes to turn an idea into software in production. From the first line of code to 24/7 monitoring.',
    'bv.n1': 'Payment confirmed', 'bv.n2': 'Your order is on its way', 'bv.kpi': 'Orders · 7 d',
    'svc1.h3': 'iOS & Android mobile apps',
    'svc1.p': 'Native iOS and Android apps. Secure payments, push notifications, biometric login. App Store and Google Play submission handled. From idea to your first release in 4 to 8 weeks.',
    'svc2.p': 'A fast site, tuned for performance and SEO, perfectly responsive. Every change previewed before going live — you approve in one click.',
    'svc3.h3': 'Custom AI',
    'svc3.p': 'Intelligent assistants, augmented search over your data, process automation. Built to plug into the tools your teams already use.',
    'svc4.p': 'A custom operational dashboard. Role management, action traceability, accounting exports, real-time indicators. Built for your teams\' daily work.',
    'svc5.p': 'Automated releases, 24/7 monitoring, security audits, GDPR compliance, encrypted backups, secret rotation. The operational discipline that prevents incidents.',
    'svc6.h3': 'Consulting & Audit',
    'svc6.p': 'A diagnosis of your existing software: quality, architecture, performance, security. An actionable report and a costed remediation plan, delivered within 5 days.',
    'app.eyebrow': 'Approach',
    'app.title': 'The way we <em>work.</em>',
    'app.lede': 'Three principles behind every decision — from the first prototype to the version in production.',
    'val1.text': 'Constant technology watch. We adopt the best practices and frameworks as soon as they are stable — not a year after everyone else. You get a product built with today\'s best.',
    'val2.name': 'Quality',
    'val2.text': 'Rigorously typed code, automated tests, operational monitoring from day one. Performance, accessibility and security checked at every release — never postponed to the end of the project.',
    'val3.name': 'Commitment',
    'val3.text': 'No vendor that vanishes after delivery. We operate our own products — we know what it means to keep an app in production.',
    'proc.title': 'From idea to software <em>in production.</em>',
    'proc.lede': 'No waterfall, no 3-month “discovery”. Short cycles, deliverables every week, client demo every 14 days. You stay in control.',
    'st1.wk': 'Week 1', 'st1.h3': 'Scoping',
    'st1.p': 'We study your need, validate the use cases and define the first product\'s scope together. Deliverable: a costed roadmap, step by step.',
    'st2.wk': 'Weeks 2–3',
    'st2.p': 'Data model, delivery pipeline, visual identity, product branding. We lay the foundations before the first feature — that\'s what lets us accelerate later.',
    'st3.wk': 'Weeks 4–10', 'st3.h3': 'Build',
    'st3.p': 'Two-week sprints, client demo every cycle. Every change visible on a preview URL. Your feedback integrated in under 24 hours.',
    'st4.wk': 'Week 10+', 'st4.h3': 'Launch',
    'st4.p': 'App Store and Google Play publication, monitoring setup, operational dashboards, team training. 90 days of technical follow-up included.',
    'fdr.eyebrow': 'A word from the founder',
    'fdr.q': 'I didn\'t create WABAYTECH to stack up client projects. I created it because I wanted to build products that run — and to learn, by operating them, what few agencies truly know: <span class="hl">what it costs to keep an app in production.</span> Today I apply that discipline to every project we take on.',
    'fdr.rl': 'Founder — WABAYTECH SARL — Tunis',
    'eco.eyebrow': 'Partners & ecosystem',
    'eco.title': 'The ecosystem <em>we work in.</em>',
    'eco.lede': 'We build on industry standards and work with the recognized players in payments, mobile and artificial intelligence.',
    'eco.native': 'Native iOS & Android', 'eco.web': 'Modern web', 'eco.cloud': 'EU cloud · GDPR', 'rail.cloud': 'EU Cloud · GDPR',
    'ct.eyebrow': 'Work together',
    'ct.title': 'An idea. An MVP. <em>Shall we talk?</em>',
    'ct.lede': 'Free 30-min audit. Clear quote within 48h. Kickoff in 2 weeks.',
    'ct.phone': 'Phone',
    'ct.brief.p': 'Send us your idea in two lines — project, timeline, rough budget. We reply within 24 business hours with a first opinion and next steps.',
    'ct.brief.cta': 'Start a project',
    'ct.b1': 'Free 30-min audit', 'ct.b2': 'Quote within 48h', 'ct.b3': 'Kickoff in 2 wks',
    'ft.tag': 'Software & AI studio based in Tunis. We design, build and operate proprietary products — and support clients who want to do the same.',
    'ft.brands': 'Brands', 'ft.s1': 'Mobile apps', 'ft.s4': 'VECTOR — AI',
    'ft.law': 'Law 72 — fully export-oriented resident SARL'
  };
  var ENMETA = {
    title: 'WABAYTECH — Software & AI Studio from Tunis & Paris',
    desc: 'WABAYTECH — Software & AI studio from Tunis & Paris. Software that holds up in production: mobile, web, ERP, custom AI. We design, ship and operate our own products (PROXECO, VECTOR).'
  };
  var FR = {}, mdEl = $('meta[name="description"]');
  var FRMETA = { title: d.title, desc: mdEl ? mdEl.getAttribute('content') : '' };
  var i18nEls = $$('[data-i18n]');
  i18nEls.forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in FR)) FR[k] = el.innerHTML; });
  var LANG = 'fr';
  function applyLang(lang) {
    LANG = lang === 'en' ? 'en' : 'fr';
    i18nEls.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var h = (LANG === 'en' && EN[k] != null) ? EN[k] : FR[k];
      if (h != null && el.innerHTML !== h) el.innerHTML = h;
    });
    html.lang = LANG;
    d.title = LANG === 'en' ? ENMETA.title : FRMETA.title;
    if (mdEl) mdEl.setAttribute('content', LANG === 'en' ? ENMETA.desc : FRMETA.desc);
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === LANG ? 'true' : 'false'); });
    splitWords();   // les blocs mot-à-mot viennent d'être réécrits
    if (window.__wbTermReset) window.__wbTermReset();
    dirty = true;
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-lang');
      try { localStorage.setItem('wb.lang', l); } catch (e) {}
      applyLang(l);
    });
  });

  /* ── Découpe mot à mot (manifeste, citation) — conserve les balises ── */
  function splitNode(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var parts = n.textContent.split(/(\s+)/), frag = d.createDocumentFragment();
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(' ')); return; }
          var s = d.createElement('span'); s.className = 'w'; s.textContent = p; frag.appendChild(s);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1 && !n.classList.contains('w')) { splitNode(n); }
    });
  }
  function splitWords() {
    $$('[data-words]').forEach(function (el) {
      if (!el.querySelector('.w')) splitNode(el);
      el.__w = $$('.w', el); el.__n = -1;
    });
  }

  /* ── Défilement fluide (Lenis) — bureau à pointeur fin uniquement ── */
  var lenis = null;
  try {
    if (MOTION && FINE && window.Lenis) { lenis = new window.Lenis({ lerp: 0.105, smoothWheel: true, wheelMultiplier: 1 }); }
  } catch (e) { lenis = null; }
  function go(id) {
    var el = d.getElementById(id); if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: id === 'top' ? 0 : -78, duration: 1.3 });
    else el.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto', block: 'start' });
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-go]'); if (!a) return;
    e.preventDefault(); closeMenu(); go(a.getAttribute('data-go'));
    try { history.replaceState(null, '', '#' + a.getAttribute('data-go')); } catch (_) {}
  });

  /* ── Menu mobile ── */
  var burger = $('#burger');
  function closeMenu() { if (!html.classList.contains('menu-open')) return; html.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); if (lenis) lenis.start(); d.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', function () {
    var o = html.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', o ? 'true' : 'false');
    d.body.style.overflow = o ? 'hidden' : '';
    if (lenis) { o ? lenis.stop() : lenis.start(); }
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ── Suivi du défilement : une seule boucle, des trackers déclaratifs ── */
  var trackers = [], dirty = true, lastY = -1;
  // p = 0 quand le haut de l'élément atteint start×vh ; 1 quand son bas atteint end×vh
  function track(el, fn, start, end) { if (el) trackers.push({ el: el, fn: fn, s: start, e: end, last: -2 }); }
  var nav = $('#nav'), bar = $('#progress');
  function tick() {
    var y = window.pageYOffset;
    if (y === lastY && !dirty) return;
    lastY = y; dirty = false;
    var vh = window.innerHeight;
    for (var i = 0; i < trackers.length; i++) {
      var t = trackers[i], r = t.el.getBoundingClientRect();
      var p = clamp((t.s * vh - r.top) / (r.height + (t.s - t.e) * vh), 0, 1);
      if (p !== t.last) { t.last = p; t.fn(p, r, vh); }
    }
    if (nav) nav.classList.toggle('scrolled', y > 30);
    if (bar) bar.style.transform = 'scaleX(' + clamp(y / Math.max(1, d.documentElement.scrollHeight - vh), 0, 1) + ')';
  }
  window.addEventListener('resize', function () { dirty = true; });

  /* ── Révélations à l'entrée dans l'écran (IntersectionObserver + CSS) ── */
  var revealEls = $$('[data-reveal]');
  if (!MOTION || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var shown = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left); });
      shown.forEach(function (e, i) {
        e.target.style.setProperty('--d', Math.min(i * 0.09, 0.45) + 's');
        e.target.classList.add('in'); io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ── Scrollspy ── */
  var links = {}; $$('.nav-links a').forEach(function (a) { links[a.getAttribute('data-go')] = a; });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ── Hero : parallaxe de sortie, horloges, aurore WebGL ── */
  var hero = $('.hero');
  if (MOTION) track(hero, function (p) { hero.style.setProperty('--hp', p.toFixed(3)); }, 0, 0);

  var clocks = $$('[data-clock]').map(function (el) {
    var f = null;
    try { f = new Intl.DateTimeFormat('fr-FR', { timeZone: el.getAttribute('data-clock'), hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); } catch (e) {}
    return { el: el, f: f };
  });
  function clockTick() { var n = new Date(); clocks.forEach(function (c) { if (c.f) c.el.textContent = c.f.format(n); }); }
  clockTick(); setInterval(clockTick, 1000);

  (function aurora() {
    var cv = $('#aurora'); if (!cv) return;
    var gl = null;
    try { gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }); } catch (e) {}
    if (!gl) return;   // le dégradé CSS du hero reste en place
    var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var FS = [
      'precision highp float;uniform vec2 uR;uniform float uT;uniform vec2 uM;',
      'float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
      'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
      'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.02+vec2(17.3,9.1);a*=.5;}return v;}',
      'void main(){vec2 uv=gl_FragCoord.xy/uR;vec2 p=(gl_FragCoord.xy-.5*uR)/uR.y;p+=(uM-.5)*.09;float t=uT*.045;',
      'vec2 q=vec2(fbm(p*1.25+vec2(0.,t)),fbm(p*1.25+vec2(5.2,-t*1.2)));',
      'vec2 r=vec2(fbm(p*1.55+3.*q+vec2(1.7,9.2)+.6*t),fbm(p*1.55+3.*q+vec2(8.3,2.8)-.5*t));',
      'float f=fbm(p*1.4+3.2*r);',
      'vec3 cy=vec3(.098,.89,1.),mg=vec3(1.,.169,.816),vi=vec3(.643,.357,1.),dp=vec3(.016,.024,.047);',
      'vec3 c=dp;c=mix(c,vi*.6,smoothstep(.25,.85,f)*.6);c=mix(c,cy*.85,smoothstep(.45,.95,r.x)*.4);c=mix(c,mg*.8,smoothstep(.5,1.,q.y*r.y*2.3)*.45);',
      'float rb=abs(sin((p.y*3.+f*2.6+t*2.2)*3.14159));c+=cy*pow(1.-rb,16.)*.22*smoothstep(-.3,.6,p.x);',
      'float m=smoothstep(-.95,.7,p.x)*.92+.08;m*=smoothstep(-.8,.15,p.y)*.6+.4;c*=m;',
      'c*=1.-.9*dot(uv-.5,uv-.5);',
      // étoiles : phase tirée d'un 2e hachage, sinon elles clignotent toutes ensemble
      'vec2 g=floor(gl_FragCoord.xy);float s=h(g);float ph=h(g+13.7);float tw=sin(uT*1.1+ph*6.2832);c+=vec3(.8,.95,1.)*step(.9986,s)*(.25+.75*tw*tw)*.55*smoothstep(-.75,.2,p.x);',
      'gl_FragColor=vec4(c,1.);}'
    ].join('\n');
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS); if (!vs || !fs) return;
    var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var uR = gl.getUniformLocation(pr, 'uR'), uT = gl.getUniformLocation(pr, 'uT'), uM = gl.getUniformLocation(pr, 'uM');
    var mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, vis = true, t0 = performance.now();
    var LIVE = MOTION && FINE;   // mobile / mouvement réduit : une seule image, coût nul ensuite
    function size() {
      var s = Math.min(window.devicePixelRatio || 1, 1.5) * (LIVE ? 0.6 : 0.5);
      var w = Math.max(2, Math.round(cv.clientWidth * s)), h2 = Math.max(2, Math.round(cv.clientHeight * s));
      if (cv.width !== w || cv.height !== h2) { cv.width = w; cv.height = h2; gl.viewport(0, 0, w, h2); }
    }
    function draw(now) {
      mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
      gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, (now - t0) / 1000 + 20); gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    size(); draw(performance.now()); cv.classList.add('on');
    window.addEventListener('resize', function () { size(); if (!LIVE) draw(performance.now()); });
    if (!LIVE) return;
    window.addEventListener('pointermove', function (e) { tx = e.clientX / window.innerWidth; ty = 1 - e.clientY / window.innerHeight; }, { passive: true });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(cv);
    window.__wbAurora = function (now) { if (vis && !d.hidden) draw(now); };
  })();

  /* ── Mot à mot au défilement ── */
  splitWords();
  $$('[data-words]').forEach(function (el) {
    if (!MOTION) return;
    track(el, function (p) {
      var w = el.__w || [], n = Math.round(clamp(p * 1.12, 0, 1) * w.length);
      if (n === el.__n) return; el.__n = n;
      for (var i = 0; i < w.length; i++) w[i].classList.toggle('on', i < n);
    }, 0.86, 0.5);
  });

  /* ── Bandeau : dérive liée au défilement ── */
  var mqRow = $('.mq-row');
  if (MOTION && mqRow) track($('.marquee'), function (p) { mqRow.style.transform = 'translate3d(' + (-p * 160) + 'px,0,0)'; }, 1, 0);

  /* ── Produits : empilement (la 1re carte recule quand la 2e la recouvre) ── */
  var stPx = $('.stage-px .stage-in'), stVt = $('.stage-vt');
  var stickyMQ = matchMedia('(min-width:1100px) and (min-height:800px)');
  if (MOTION && stPx && stVt) track(stVt, function (p, r, vh) {
    var k = stickyMQ.matches ? 1 - clamp((r.top - 92) / (vh - 92), 0, 1) : 0;
    stPx.style.setProperty('--k', k.toFixed(3));
  }, 1, 0);

  /* ── Démo PROXECO : une commande traverse les trois apps ── */
  (function devices() {
    var box = $('#devices'); if (!box) return;
    var route = $('.route', box), rider = $('.rider', box);
    var L = 0; try { L = route.getTotalLength(); } catch (e) {}
    function place(f) { if (!L) return; var pt = route.getPointAtLength(L * f); rider.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')'); }
    place(0);
    if (!MOTION) { box.className = 'devices is1 is2 is3 is4 is5 is6'; place(1); return; }
    var DUR = [1300, 1300, 1500, 1500, 1500, 3000, 2800];   // durée de chaque étape 0..6
    var step = 0, timer = null, raf = 0, running = false;
    function ride() {
      var t0 = performance.now();
      (function f(now) {
        var k = clamp((now - t0) / 2600, 0, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        place(e); if (k < 1 && running) raf = requestAnimationFrame(f);
      })(t0);
    }
    function set(n) {
      step = n;
      for (var i = 1; i <= 6; i++) box.classList.toggle('is' + i, i <= n);
      if (n === 0) place(0);
      if (n === 5) ride();
    }
    function loop() { if (!running) return; timer = setTimeout(function () { set(step >= 6 ? 0 : step + 1); loop(); }, DUR[step]); }
    function start() { if (running) return; running = true; loop(); }
    function stop() { running = false; clearTimeout(timer); cancelAnimationFrame(raf); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }, { threshold: 0.3 }).observe(box);
    else start();
    d.addEventListener('visibilitychange', function () { if (d.hidden) stop(); });
    // Inclinaison douce au survol
    if (FINE) {
      var host = box.parentNode;
      host.addEventListener('pointermove', function (e) {
        var r = host.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        box.style.transform = 'rotateY(' + (x * 9).toFixed(2) + 'deg) rotateX(' + (-y * 7).toFixed(2) + 'deg)';
      });
      host.addEventListener('pointerleave', function () { box.style.transform = ''; });
    }
  })();

  /* ── Console VECTOR : frappe + enchaînement des étapes ── */
  (function term() {
    var box = $('#term'); if (!box) return;
    var typed = $('#typed'), lines = $$('.tl[data-at]', box), foot = $$('.term-foot span', box);
    function text() { return typed.getAttribute('data-' + LANG) || typed.getAttribute('data-fr'); }
    function footOn(i) { foot.forEach(function (f, k) { f.classList.toggle('on', k === i); }); }
    if (!MOTION) { typed.textContent = text(); window.__wbTermReset = function () { typed.textContent = text(); }; return; }
    var timers = [], running = false;
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clear() { timers.forEach(clearTimeout); timers = []; }
    function reset() { lines.forEach(function (l) { l.classList.remove('on'); }); typed.textContent = ''; footOn(-1); }
    function play() {
      if (!running) return;
      reset();
      var s = text(), i = 0;
      (function type() {
        if (!running) return;
        typed.textContent = s.slice(0, ++i);
        if (i < s.length) later(type, 20 + Math.random() * 26);
        else {
          later(function () { lines[0].classList.add('on'); footOn(0); }, 450);
          later(function () { lines[1].classList.add('on'); footOn(1); }, 1250);
          later(function () { footOn(2); }, 2300);
          later(function () { lines[2].classList.add('on'); }, 3100);
          later(function () { lines[3].classList.add('on'); footOn(3); }, 3900);
          later(function () { lines[4].classList.add('on'); }, 4700);
          later(play, 9200);
        }
      })();
    }
    function start() { if (running) return; running = true; play(); }
    function stop() { running = false; clear(); }
    window.__wbTermReset = function () { if (running) { clear(); play(); } };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }, { threshold: 0.35 }).observe(box);
    else start();
  })();

  /* ── Process : la trajectoire se trace, l'engin avance, les étapes s'allument ── */
  (function launch() {
    var box = $('#launch'); if (!box) return;
    var svg = $('.traj', box), bg = $('.traj-bg', box), fg = $('#trajfg'), craft = $('#craft'), steps = $$('.step', box);
    var L = 0, marks = [], wide = matchMedia('(min-width:980px)');
    function build() {
      if (!wide.matches) { steps.forEach(function (s) { s.classList.remove('lit'); }); return; }
      var W = box.clientWidth, H = 220;
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      var dd = 'M0 200 C ' + (W * .22) + ' 200, ' + (W * .32) + ' 152, ' + (W * .5) + ' 122 S ' + (W * .8) + ' 42, ' + W + ' 24';
      bg.setAttribute('d', dd); fg.setAttribute('d', dd);
      L = fg.getTotalLength();
      fg.style.strokeDasharray = L;
      marks = steps.map(function (s) {
        var x = s.offsetLeft + s.offsetWidth / 2, lo = 0, hi = L, pt;
        for (var i = 0; i < 22; i++) { var mid = (lo + hi) / 2; pt = fg.getPointAtLength(mid); if (pt.x < x) lo = mid; else hi = mid; }
        pt = fg.getPointAtLength(lo);
        s.style.setProperty('--drop', Math.max(12, 236 - pt.y) + 'px');
        return lo / L;
      });
      draw(lastP);
    }
    var lastP = MOTION ? 0 : 1;
    function draw(p) {
      lastP = p; if (!L || !wide.matches) return;
      fg.style.strokeDashoffset = L * (1 - p);
      var pt = fg.getPointAtLength(L * p);
      craft.style.transform = 'translate3d(' + pt.x + 'px,' + pt.y + 'px,0)';
      craft.style.opacity = p > 0.004 && p < 0.999 ? 1 : 0;
      steps.forEach(function (s, i) { s.classList.toggle('lit', p >= marks[i] - 0.004); });
    }
    build();
    window.addEventListener('resize', build);
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(build);
    if (MOTION) track(box, function (p) { draw(clamp(p * 1.08, 0, 1)); }, 0.8, 0.42);
    else draw(1);
  })();

  /* ── Halo qui suit le pointeur sur les cartes ── */
  if (FINE) $$('[data-spot]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ── Boutons magnétiques ── */
  if (MOTION && FINE) $$('[data-magnetic]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + 'px');
      el.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1) + 'px');
    });
    el.addEventListener('pointerleave', function () { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); });
  });

  /* ── Anneau de curseur (le curseur natif reste visible) ── */
  var cur = $('.cursor'), ring = $('.cursor-ring'), dot = $('.cursor-dot'), cx = 0, cy = 0, rx = 0, ry = 0, curOn = false;
  if (MOTION && FINE && cur) {
    window.addEventListener('pointermove', function (e) {
      cx = e.clientX; cy = e.clientY;
      if (!curOn) { curOn = true; rx = cx; ry = cy; cur.classList.add('on'); }
      dot.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
    }, { passive: true });
    d.addEventListener('pointerover', function (e) { cur.classList.toggle('hot', !!(e.target.closest && e.target.closest('a,button,[data-spot]'))); });
    d.addEventListener('pointerleave', function () { cur.classList.remove('on'); curOn = false; });
  }

  /* ── Boucle unique ── */
  function frame(now) {
    if (lenis) lenis.raf(now);
    tick();
    if (curOn) { rx += (cx - rx) * 0.18; ry += (cy - ry) * 0.18; ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)'; }
    if (window.__wbAurora) window.__wbAurora(now);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  window.addEventListener('load', function () { dirty = true; });

  /* ── Langue mémorisée ── */
  var saved = 'fr'; try { saved = localStorage.getItem('wb.lang') || 'fr'; } catch (e) {}
  if (saved === 'en') applyLang('en');

  /* ── Séquence de démarrage → entrée du hero ── */
  (function boot() {
    function ready() { html.classList.add('ready'); dirty = true; }
    if (!html.classList.contains('booting')) { requestAnimationFrame(function () { requestAnimationFrame(ready); }); return; }
    var pct = $('#bootpct'), done = false, t0 = performance.now(), D = 1500;
    if (lenis) lenis.stop();
    function end() {
      if (done) return; done = true;
      try { sessionStorage.setItem('wbBoot', '1'); } catch (e) {}
      if (pct) pct.textContent = '100';
      html.classList.add('boot-out'); ready();
      setTimeout(function () { html.classList.remove('booting', 'boot-out'); if (lenis) lenis.start(); }, 760);
    }
    (function count(now) {
      if (done) return;
      var k = clamp((now - t0) / D, 0, 1), v = Math.round((1 - Math.pow(1 - k, 2.2)) * 100);
      if (pct) pct.textContent = ('00' + v).slice(-3);
      if (k < 1) requestAnimationFrame(count); else setTimeout(end, 160);
    })(t0);
    $('#boot').addEventListener('click', end);
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') end(); });
    setTimeout(end, 3200);   // filet de sécurité si l'onglet était en arrière-plan
  })();

  /* ── Signature sonore (WebAudio, aucun fichier) : 1 fois par session, au
        premier geste — les navigateurs interdisent le son avant interaction ── */
  (function sound() {
    var KEY = 'wb.introSound';
    try { if (sessionStorage.getItem(KEY)) return; } catch (e) { return; }
    function play() {
      try {
        var Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return;
        var ctx = new Ctx(), master = ctx.createGain(); master.gain.value = 0.1; master.connect(ctx.destination);
        var t0 = ctx.currentTime + 0.03;
        var sw = ctx.createOscillator(); sw.type = 'sawtooth';
        sw.frequency.setValueAtTime(70, t0); sw.frequency.exponentialRampToValueAtTime(210, t0 + 0.55);
        var lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
        lp.frequency.setValueAtTime(300, t0); lp.frequency.exponentialRampToValueAtTime(2400, t0 + 0.55);
        var gs = ctx.createGain(); gs.gain.setValueAtTime(0, t0);
        gs.gain.linearRampToValueAtTime(0.8, t0 + 0.08); gs.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.7);
        sw.connect(lp); lp.connect(gs); gs.connect(master); sw.start(t0); sw.stop(t0 + 0.75);
        [[1244.5, 0.5], [1661.2, 0.68]].forEach(function (b) {
          var tb = t0 + b[1], o = ctx.createOscillator(), g = ctx.createGain();
          o.type = 'sine'; o.frequency.value = b[0];
          g.gain.setValueAtTime(0, tb); g.gain.linearRampToValueAtTime(0.5, tb + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, tb + 0.34);
          o.connect(g); g.connect(master); o.start(tb); o.stop(tb + 0.4);
        });
        setTimeout(function () { try { ctx.close(); } catch (e) {} }, 1800);
      } catch (e) {}
    }
    function onGesture() {
      removeEventListener('pointerdown', onGesture); removeEventListener('keydown', onGesture);
      try { if (sessionStorage.getItem(KEY)) return; sessionStorage.setItem(KEY, '1'); } catch (e) {}
      play();
    }
    addEventListener('pointerdown', onGesture, { once: true, passive: true });
    addEventListener('keydown', onGesture, { once: true });
  })();
})();
