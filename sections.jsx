// WABAYTECH — Sections

const useReveal = () => {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

/* ---------------- NAV ---------------- */
const Nav = ({ onContact }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="nav-logo" onClick={go('top')}>
        <WBLogo size={34} />
        <span className="nav-logo-text">Wabaytech</span>
      </a>
      <div className="nav-links">
        <a href="#services" onClick={go('services')}>Services</a>
        <a href="#apropos" onClick={go('apropos')}>À propos</a>
        <a href="#proxeco" onClick={go('proxeco')}>PROXECO</a>
        <a href="#contact" onClick={go('contact')}>Contact</a>
      </div>
      <button className="nav-cta" onClick={go('contact')}>
        Démarrer un projet <IconArrow />
      </button>
    </nav>
  );
};

/* ---------------- HERO ---------------- */
const Hero = ({ headline }) => {
  // Try to italicize last 2 words
  const words = (headline || "L'innovation qui propulse votre avenir.").trim().split(' ');
  const tail = words.slice(-2).join(' ').replace(/\.$/, '');
  const head = words.slice(0, -2).join(' ');
  return (
  <section id="top" className="hero">
    <div className="hero-grid" aria-hidden></div>
    <div className="hero-glow" aria-hidden></div>
    <div className="hero-inner">
      <div className="hero-pill reveal">
        <span className="hero-pill-dot">★</span>
        <span>Tunis · Conseil & développement IA-first</span>
      </div>
      <h1 className="hero-h1 reveal">
        {head}<br/>
        <em>{tail}</em>.
      </h1>
      <p className="hero-sub reveal">
        Chez Wabaytech, nous repoussons les frontières du numérique. Conseil,
        développement logiciel et intelligence artificielle au service de votre
        transformation — des solutions sur mesure, livrées avec exigence.
      </p>
      <div className="hero-actions reveal">
        <a href="#services" className="btn btn-primary"
           onClick={(e) => { e.preventDefault(); document.getElementById('services').scrollIntoView({behavior:'smooth', block:'start'}); }}>
          Découvrir nos services <IconArrow className="btn-arrow" />
        </a>
        <a href="#contact" className="btn btn-ghost"
           onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({behavior:'smooth', block:'start'}); }}>
          Parler à un expert
        </a>
      </div>

      <div className="hero-footer">
        <div className="hero-footer-item reveal">
          <div className="label">Localisation</div>
          <div className="value">Tunis <span className="small">— TN</span></div>
        </div>
        <div className="hero-footer-item reveal">
          <div className="label">Spécialités</div>
          <div className="value">IA · ERP · Web</div>
        </div>
        <div className="hero-footer-item reveal">
          <div className="label">Approche</div>
          <div className="value">Sur mesure</div>
        </div>
        <div className="hero-footer-item reveal">
          <div className="label">Disponibilité</div>
          <div className="value" style={{display:'flex', alignItems:'center', gap:10}}>
            <span style={{width:8,height:8,borderRadius:99,background:'var(--accent)',boxShadow:'0 0 12px var(--accent)'}}></span>
            Ouvert
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

/* ---------------- MARQUEE ---------------- */
const Marquee = () => {
  const items = ['Innovation', 'Intelligence Artificielle', 'ERP', 'Web', 'Mobile', 'Conseil', 'Sur mesure', 'Performance'];
  const repeated = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {repeated.map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
      </div>
    </div>
  );
};

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { n: '01', icon: IconMobile, t: "Applications Mobiles", d: "iOS et Android sur mesure — performance, sécurité, expérience utilisateur intuitive. De l'idée à la mise en ligne." },
  { n: '02', icon: IconWeb, t: "Sites Internet", d: "Sites modernes, performants, optimisés pour le SEO et l'expérience utilisateur. Design, fonctionnalités avancées, sécurité." },
  { n: '03', icon: IconCode, t: "Solutions sur Mesure", d: "Logiciels personnalisés conçus autour de vos processus. Productivité, efficacité, sécurité opérationnelle." },
  { n: '04', icon: IconErp, t: "ERP", d: "Systèmes ERP intégrés pour centraliser ressources et processus. Meilleure prise de décision, gestion fluide." },
  { n: '05', icon: IconAI, t: "Intelligence Artificielle", d: "Machine learning, vision par ordinateur, analyse prédictive. Exploitez tout le potentiel de vos données." },
  { n: '06', icon: IconConsult, t: "Conseil Informatique", d: "Stratégie, audit et optimisation de vos infrastructures. Performance, sécurité, évolutivité." },
];

const ServiceCard = ({ s }) => {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const Icon = s.icon;
  return (
    <div className="service-card reveal" ref={ref} onMouseMove={onMove}>
      <div className="service-num">{s.n} / 06</div>
      <div className="service-icon"><Icon /></div>
      <h3 className="service-title">{s.t}</h3>
      <p className="service-body">{s.d}</p>
      <div className="service-arrow">En savoir plus <IconArrow /></div>
    </div>
  );
};

const Services = () => (
  <section id="services" className="section">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow reveal">Nos services</div>
          <h2 className="section-title reveal">Six expertises, <em>une exigence.</em></h2>
        </div>
        <p className="section-lede reveal">
          Du premier audit à la mise en production, nous couvrons toute la
          chaîne de valeur du logiciel sur mesure.
        </p>
      </div>
    </div>
    <div className="container">
      <div className="services-grid">
        {SERVICES.map(s => <ServiceCard key={s.n} s={s} />)}
      </div>
    </div>
  </section>
);

/* ---------------- ABOUT / VALUES ---------------- */
const VALUES = [
  { n: '01', name: 'Innovation', t: "L'innovation est au cœur de notre ADN. Nous investissons en R&D pour anticiper les tendances et concevoir des solutions de pointe — chaque défi devient une opportunité." },
  { n: '02', name: 'Qualité', t: "L'excellence est notre standard. Solutions fiables, performantes, livrées avec une attention minutieuse aux détails, à la sécurité et à la satisfaction client." },
  { n: '03', name: 'Engagement', t: "Une relation de confiance, durable. Service client basé sur l'écoute, la réactivité et des solutions adaptées. Chaque projet est une vraie collaboration." },
];

const About = () => (
  <section id="apropos" className="section">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow reveal">À propos</div>
          <h2 className="section-title reveal">Nous ne suivons pas l'évolution technologique. <em>Nous la créons.</em></h2>
        </div>
      </div>
      <div className="about">
        <div className="about-copy reveal">
          <p>
            Chez Wabaytech, nous repoussons les frontières du numérique en offrant
            des solutions avant-gardistes qui transforment <strong>les défis en
            opportunités</strong>. Spécialisés dans le conseil et le développement
            informatique, nous intégrons l'intelligence artificielle au cœur de nos
            créations.
          </p>
          <p>
            Nos équipes passionnées conçoivent des solutions adaptées aux besoins
            spécifiques de chaque entreprise, garantissant une transformation
            numérique <strong>fluide et efficace</strong>.
          </p>
          <p>
            L'excellence comme moteur — animés par une quête continue d'innovation,
            de qualité irréprochable, et d'un engagement sans faille envers nos
            partenaires.
          </p>
        </div>
        <div className="values-stack">
          {VALUES.map(v => (
            <div className="value-row reveal" key={v.n}>
              <div className="value-num">{v.n}</div>
              <div>
                <h3 className="value-name">{v.name}</h3>
                <p className="value-text">{v.t}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- PROXECO ---------------- */
const ProxecoVisual = () => (
  <div className="px-visual-inner" style={{position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px'}}>
    <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{position:'absolute', inset:0}}>
      <defs>
        <pattern id="px-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(232,138,74,0.10)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#px-grid)" />
      {/* concentric soft rings */}
      <g fill="none" strokeWidth="1">
        <circle cx="200" cy="200" r="80"  stroke="rgba(74,122,63,0.35)" />
        <circle cx="200" cy="200" r="130" stroke="rgba(74,122,63,0.22)" strokeDasharray="4 6"/>
        <circle cx="200" cy="200" r="180" stroke="rgba(232,138,74,0.20)" strokeDasharray="2 8"/>
      </g>
      {/* network nodes — producers / consumers */}
      <g>
        {[
          [200, 50,  'p'], [350, 200, 'c'], [200, 350, 'p'], [50, 200, 'c'],
          [305, 95,  'c'], [305, 305, 'p'], [95, 305, 'c'], [95, 95, 'p'],
        ].map(([x, y, kind], i) => {
          const color = kind === 'p' ? '#4a7a3f' : '#e88a4a';
          return (
            <g key={i}>
              <line x1="200" y1="200" x2={x} y2={y} stroke={color} strokeOpacity="0.18" strokeWidth="1" />
              <circle cx={x} cy={y} r="6" fill={color} />
              <circle cx={x} cy={y} r="12" fill={color} opacity="0.22">
                <animate attributeName="r" values="12;22;12" dur={`${2.4 + (i%3) * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur={`${2.4 + (i%3) * 0.5}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </g>
    </svg>
    {/* Centered PROXECO logo */}
    <div style={{position:'relative', zIndex:2, padding:'32px 40px', background:'rgba(255,255,255,0.96)', borderRadius:'18px', boxShadow:'0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(232,138,74,0.18)'}}>
      <ProxecoLogo height={64} />
    </div>
  </div>
);

const Proxeco = () => (
  <section id="proxeco" className="section">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow reveal">Notre 1ᵉʳ projet</div>
          <h2 className="section-title reveal">PROXECO — la marketplace qui <em>change la donne.</em></h2>
        </div>
      </div>
      <div className="proxeco reveal">
        <div className="proxeco-grid">
          <div className="proxeco-copy">
            <div>
              <div className="proxeco-tag">Live · marketplace</div>
              <div className="proxeco-logo-block">
                <ProxecoLogo height={52} />
              </div>
              <h3 className="proxeco-headline">Producteurs et consommateurs, <em>connectés directement.</em></h3>
              <p className="proxeco-desc">
                PROXECO révolutionne l'accès aux produits locaux et artisanaux.
                Qualité, transparence et traçabilité — sans intermédiaires. Des
                prix équitables pour soutenir les artisans et agriculteurs.
              </p>
              <div className="proxeco-tags">
                <span>Produits locaux</span>
                <span>Artisanat</span>
                <span>Traçabilité</span>
                <span>Prix équitables</span>
              </div>
            </div>
            <a href="#" className="btn btn-primary proxeco-cta">
              Découvrir PROXECO <IconArrow className="btn-arrow" />
            </a>
          </div>
          <div className="proxeco-visual">
            <ProxecoVisual />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- STATS ---------------- */
const Stats = () => (
  <section className="section" style={{padding:'0'}}>
    <div className="stats">
      <div className="stat reveal"><div className="stat-num">50<em>+</em></div><div className="stat-label">Projets livrés</div></div>
      <div className="stat reveal"><div className="stat-num">12</div><div className="stat-label">Industries servies</div></div>
      <div className="stat reveal"><div className="stat-num">98<em>%</em></div><div className="stat-label">Satisfaction client</div></div>
      <div className="stat reveal"><div className="stat-num">24<em>/7</em></div><div className="stat-label">Support continu</div></div>
    </div>
  </section>
);

/* ---------------- CONTACT ---------------- */
const Contact = () => {
  const [form, setForm] = React.useState({ name:'', company:'', email:'', message:'' });
  const [sent, setSent] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:'', company:'', email:'', message:'' }); }, 2400);
  };
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow reveal">Contact</div>
            <h2 className="section-title reveal">Parlons de <em>votre projet.</em></h2>
          </div>
          <p className="section-lede reveal">
            Une idée, un défi, un besoin ? Notre équipe répond sous 24 h
            ouvrées avec des pistes concrètes.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <a className="contact-item" href="mailto:contact@wabaytech.com">
              <div className="contact-icon"><IconMail /></div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">contact@wabaytech.com</div>
              </div>
            </a>
            <a className="contact-item" href="tel:+21653887723">
              <div className="contact-icon"><IconPhone /></div>
              <div>
                <div className="contact-label">Téléphone</div>
                <div className="contact-value">+216 53 887 723</div>
              </div>
            </a>
            <div className="contact-item">
              <div className="contact-icon"><IconPin /></div>
              <div>
                <div className="contact-label">Adresse</div>
                <div className="contact-value">24 Imm. Titanium, Jardins du Lac 2 — 1053 Tunis</div>
              </div>
            </div>
          </div>

          <form className="form reveal" onSubmit={submit}>
            <div className="form-row">
              <div className="field">
                <label>Quel est ton nom ?</label>
                <input value={form.name} onChange={upd('name')} placeholder="Prénom Nom" required />
              </div>
              <div className="field">
                <label>Entreprise</label>
                <input value={form.company} onChange={upd('company')} placeholder="Nom de votre entreprise" />
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={upd('email')} placeholder="vous@entreprise.com" required />
            </div>
            <div className="field">
              <label>Votre message</label>
              <textarea rows="5" value={form.message} onChange={upd('message')} placeholder="Parlez-nous de votre projet…" required />
            </div>
            <button type="submit" className={sent ? 'sent' : ''}>
              {sent ? '✓ Message envoyé' : <>Soumettre <IconArrow /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ---------------- FOOTER ---------------- */
const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-top">
        <div>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <WBLogo size={38} />
            <span style={{fontFamily:"'Instrument Serif', serif", fontSize:24, letterSpacing:'0.04em'}}>Wabaytech</span>
          </div>
          <p className="footer-brand-tag">L'innovation qui propulse votre avenir. Conseil, développement et IA — depuis Tunis.</p>
        </div>
        <div className="footer-col">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#apropos">À propos</a></li>
            <li><a href="#proxeco">PROXECO</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Mobile</a></li>
            <li><a href="#services">Web</a></li>
            <li><a href="#services">ERP</a></li>
            <li><a href="#services">IA</a></li>
            <li><a href="#services">Conseil</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:contact@wabaytech.com">contact@wabaytech.com</a></li>
            <li><a href="tel:+21653887723">+216 53 887 723</a></li>
            <li>Jardins du Lac 2, Tunis</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© WABAYTECH 2026 — Tous droits réservés.</span>
        <span>Powered by WABAYTECH ✦</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Nav, Hero, Marquee, Services, About, Proxeco, Stats, Contact, Footer, useReveal });
