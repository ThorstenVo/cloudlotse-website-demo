function Site() {
  const { TopBar, Hero, Intro, Chapters, Trust, Final, Footer } = window;
  const { normalizeLocale, TRANSLATIONS } = window.EazyCloudI18n;
  const locale = normalizeLocale(document.documentElement.lang);
  if (!locale) throw new Error(`Unsupported document locale: ${document.documentElement.lang}`);
  const copy = TRANSLATIONS[locale];
  const [active, setActive] = React.useState("tasks");
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
        <TopBar locale={locale} copy={copy} />
        <Hero copy={copy} />
      </div>
      <Intro copy={copy} />
      <Chapters copy={copy} active={active} setActive={setActive} />
      <Trust copy={copy} />
      <Final copy={copy} />
      <Footer locale={locale} copy={copy} />
    </main>
  );
}

function mount() {
  if (!window.Footer || !window.Chapters || !window.Hero || !window.TopBar) return setTimeout(mount, 40);
  const el = document.getElementById("root");
  // Prerendered markup present → hydrate; empty container → client render.
  if (el.firstElementChild) ReactDOM.hydrateRoot(el, <Site />);
  else ReactDOM.createRoot(el).render(<Site />);
}

mount();
