/* eazy.cloud website — hero + intro sections. */
(() => {
const { Kicker, Label, Button } = window.CloudLotseDesignSystem_b0c356;

function DocStream() {
  const defs = [
    { img: "../../assets/tender.png",     sx: 40,  sy: -40, sr: -16, tx: 150, ty: 0,   accent: false },
    { img: null,                          sx: 320, sy: 300, sr: 12,  tx: 150, ty: 80,  accent: false },
    { img: "../../assets/datasheet.png",  sx: 60,  sy: 320, sr: 9,   tx: 150, ty: 160, accent: false },
    { img: "../../assets/visit-note.png", sx: 340, sy: -30, sr: -10, tx: 150, ty: 240, accent: true },
  ];
  return (
    <div aria-hidden="true" style={{ position: "absolute", zIndex: 0, right: "5%", top: "50%", transform: "translateY(-50%)", width: 380, height: 500 }}>
      <style>{"@keyframes cl-docmove{0%{transform:translate(var(--sx),var(--sy)) rotate(var(--sr));opacity:0}12%{opacity:1}32%{transform:translate(var(--tx),var(--ty)) rotate(0deg);opacity:1}72%{transform:translate(var(--tx),var(--ty)) rotate(0deg);opacity:1}86%{opacity:0}100%{transform:translate(var(--sx),var(--sy)) rotate(var(--sr));opacity:0}}"}</style>
      {defs.map((d, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, top: 0, width: 178, height: 240,
          background: d.img ? "#fff" : "linear-gradient(180deg,#fff,#eef0ec)",
          boxShadow: "0 20px 50px rgb(0 0 0 / 45%)",
          borderTop: d.accent ? "4px solid var(--signal)" : "none",
          zIndex: i, animation: "cl-docmove 8s ease-in-out infinite", animationDelay: `${-i * 0.4}s`,
          "--sx": `${d.sx}px`, "--sy": `${d.sy}px`, "--sr": `${d.sr}deg`, "--tx": `${d.tx}px`, "--ty": `${d.ty}px`,
        }}>
          {d.img
            ? <img src={d.img} alt="" style={{ display: "block", width: "100%" }} />
            : <div style={{ position: "absolute", left: 16, right: 16, top: 20, height: 8, background: "#d6dbd7", boxShadow: "0 20px 0 #d6dbd7, 0 40px 0 #e4e8e3, 0 60px 0 #e4e8e3" }} />}
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const shell = window.shellStyle;
  return (
    <section style={{ position: "relative", height: "calc(100vh - 58px)", minHeight: 700, maxHeight: 940, overflow: "hidden", isolation: "isolate", color: "#fff", background: "#050605" }}>
      <span aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(120% 100% at 78% 42%, #0e130f 0%, #070807 55%, #050605 100%)" }} />
      <DocStream />
      <span aria-hidden="true" style={{ position: "absolute", zIndex: 1, inset: 0, background: "linear-gradient(90deg, rgb(5 6 5 / 96%) 0%, rgb(5 6 5 / 74%) 42%, rgb(5 6 5 / 10%) 78%)" }} />
      <span aria-hidden="true" style={{ position: "absolute", zIndex: 1, inset: 0, background: "linear-gradient(0deg, rgb(5 6 5 / 42%), transparent 42%)" }} />
      <div style={{ ...shell, position: "relative", height: "100%", zIndex: 2 }}>
        <div style={{ position: "absolute", zIndex: 4, top: "50%", left: 0, width: "min(760px, 56vw)", transform: "translateY(-45%)" }}>
          <div style={{ marginBottom: 26 }}><Kicker>Intelligence for everyday work</Kicker></div>
          <h1 style={{ margin: 0, color: "#fff", fontSize: "clamp(58px, 7.5vw, 112px)", fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase" }}>
            <span style={{ display: "block" }}>Intelligent</span>
            <span style={{ display: "block" }}>workflows.</span>
            <span style={{ display: "block" }}>Clear paths.</span>
          </h1>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginTop: 34, paddingTop: 20, borderTop: "1px solid rgb(255 255 255 / 35%)" }}>
            <p style={{ flex: "1 1 auto", maxWidth: 560, margin: 0, color: "rgb(255 255 255 / 80%)", fontSize: 16, lineHeight: 1.5 }}>Scattered information becomes an ordered flow — eazy.cloud brings order to the daily data chaos.</p>
            <Button variant="primary" arrow href="mailto:support@eazy.cloud?subject=eazy.cloud%20workflow%20review">Review a workflow</Button>
          </div>
        </div>
        <div style={{ position: "absolute", zIndex: 4, right: 0, bottom: 28, maxWidth: 320, color: "rgb(255 255 255 / 62%)", fontSize: 9, fontWeight: 750, lineHeight: 1.45, textAlign: "right", textTransform: "uppercase" }}>
          <b style={{ display: "block", marginBottom: 7, color: "#fff", fontSize: 11 }}>From clutter to clarity</b>Links, PDFs, photos and notes find their place.
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const shell = window.shellStyle;
  const rows = [
    { n: "01", head: <>Recognise <em style={{ color: "var(--signal)", fontStyle: "normal" }}>information</em></>, desc: "Requirements, sources and context are captured automatically — nothing has to be searched twice." },
    { n: "02", head: "Connect knowledge", desc: "Links, PDFs, photos and notes are linked to the right project and made usable." },
    { n: "03", head: "Prepare work", desc: "A review-ready foundation is assembled. Your team decides — it no longer searches." },
  ];
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % rows.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="possibilities" style={{ display: "grid", alignItems: "center", padding: "100px 0", background: "var(--paper)" }}>
      <div style={{ ...shell, display: "grid", gridTemplateColumns: "minmax(220px, .42fr) minmax(0, 1.58fr)", gap: 60, alignItems: "start" }}>
        <div>
          <Label>What becomes possible</Label>
          <h2 style={{ margin: "14px 0 0", color: "var(--ink)", fontSize: "clamp(40px, 4vw, 62px)", fontWeight: 800, lineHeight: 0.9, textTransform: "uppercase" }}>From chaos to <em style={{ color: "var(--signal)", fontStyle: "normal" }}>clarity.</em></h2>
        </div>
        <div style={{ borderTop: "1px solid var(--ink)" }}>
          {rows.map((r, i) => (
            <div key={r.n} style={{ position: "relative", display: "grid", gridTemplateColumns: "92px 1fr minmax(0, 320px)", gap: 30, alignItems: "center", padding: "34px 0 34px 22px", borderBottom: "1px solid var(--line)" }}>
              <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "var(--signal)", transform: active === i ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: "transform .4s ease" }} />
              <span style={{ fontSize: 44, fontWeight: 800, color: "var(--signal)", lineHeight: 1 }}>{r.n}</span>
              <div style={{ fontSize: "clamp(30px, 3vw, 40px)", fontWeight: 800, textTransform: "uppercase", lineHeight: 0.95, color: "var(--ink)" }}>{r.head}</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#555e58" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Intro });
})();
