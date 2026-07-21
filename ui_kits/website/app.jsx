function Site() {
  const { TopBar, Hero, Intro, Chapters, Trust, Final, Footer, useTweaks, TweaksPanel, TweakSection, TweakSlider } = window;
  const [lang, setLang] = React.useState("EN");
  const [active, setActive] = React.useState("tasks");
  const [t, setTweak] = useTweaks({ flareStrength: 0.85, flareSeconds: 8 });
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--cl-flare-peak", String(t.flareStrength));
    r.setProperty("--cl-flare-dur", t.flareSeconds + "s");
  }, [t.flareStrength, t.flareSeconds]);
  React.useEffect(() => {
    const stages = [...document.querySelectorAll("[data-chapter]")];
    if (!("IntersectionObserver" in window) || !stages.length) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setActive(e.target.id);
      }
    }, { rootMargin: "-34% 0px -52% 0px", threshold: 0 });
    stages.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return (
    <main style={{ minHeight: "100vh", overflow: "hidden", background: "var(--paper)" }}>
      <div style={{ position: "relative" }}>
        <TopBar lang={lang} setLang={setLang} />
        <Hero />
      </div>
      <Intro />
      <Chapters active={active} setActive={setActive} />
      <Trust />
      <Final />
      <Footer />
      <TweaksPanel>
        <TweakSection label="Background route flare" />
        <TweakSlider label="Strength" value={t.flareStrength} min={0.3} max={1} step={0.01} onChange={(v) => setTweak("flareStrength", v)} />
        <TweakSlider label="Cycle (slower →)" value={t.flareSeconds} min={4} max={16} step={0.5} unit="s" onChange={(v) => setTweak("flareSeconds", v)} />
      </TweaksPanel>
    </main>
  );
}

function mount() {
  if (!window.Footer || !window.Chapters || !window.Hero || !window.TopBar || !window.useTweaks) return setTimeout(mount, 40);
  ReactDOM.createRoot(document.getElementById("root")).render(<Site />);
}

mount();
