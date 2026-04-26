// Main app
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "green",
  "theme": "dark",
  "density": "comfortable",
  "headline": "L'innovation qui propulse votre avenir."
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  green:   { val: 'oklch(0.82 0.18 152)', label: 'Vert IA' },
  cyan:    { val: 'oklch(0.80 0.15 220)', label: 'Cyan' },
  amber:   { val: 'oklch(0.80 0.16 75)',  label: 'Ambre' },
  violet:  { val: 'oklch(0.72 0.20 290)', label: 'Violet' },
  coral:   { val: 'oklch(0.74 0.18 30)',  label: 'Corail' },
};

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
  }, [tweaks.theme]);

  // Apply accent
  useEffect(() => {
    const a = ACCENT_MAP[tweaks.accent] || ACCENT_MAP.green;
    document.documentElement.style.setProperty('--accent', a.val);
  }, [tweaks.accent]);

  // Apply density
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--pad',
      tweaks.density === 'compact' ? 'clamp(16px, 3vw, 36px)' : 'clamp(20px, 4vw, 56px)'
    );
  }, [tweaks.density]);

  useReveal();

  return (
    <>
      <Nav />
      <main>
        <Hero headline={tweaks.headline} />
        <Marquee />
        <Services />
        <About />
        <Proxeco />
        <Stats />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Apparence">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'dark', label: 'Sombre' },
              { value: 'light', label: 'Clair' },
            ]}
          />
          <TweakSelect
            label="Couleur d'accent"
            value={tweaks.accent}
            onChange={(v) => setTweak('accent', v)}
            options={Object.entries(ACCENT_MAP).map(([k, o]) => ({ value: k, label: o.label }))}
          />
          <TweakRadio
            label="Densité"
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'comfortable', label: 'Confort' },
              { value: 'compact', label: 'Dense' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Contenu">
          <TweakText
            label="Titre du hero"
            value={tweaks.headline}
            onChange={(v) => setTweak('headline', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
