function Site() {
  const { TopBar, Hero, Intro, Chapters, Trust, Final, Footer } = window;
  const [lang, setLang] = React.useState("EN");
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
        <TopBar lang={lang} setLang={setLang} />
        <Hero />
      </div>
      <Intro />
      <Chapters active={active} setActive={setActive} />
      <Trust />
      <Final />
      <Footer />
    </main>
  );
}

function mount() {
  if (!window.Footer || !window.Chapters || !window.Hero || !window.TopBar) return setTimeout(mount, 40);
  ReactDOM.createRoot(document.getElementById("root")).render(<Site />);
}

mount();
