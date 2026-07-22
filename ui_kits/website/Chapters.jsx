/* eazy.cloud website — chapter nav + 4 stage sections + their detail blocks. */
(() => {
const { Label, ProofStep, TimeBar, SystemFlow } = window.CloudLotseDesignSystem_b0c356;

function ChapterNav({ chapters = [], active, onSelect, ariaLabel, style }) {
  return (
    <nav
      aria-label={ariaLabel}
      style={{
        color: "var(--white)", background: "rgb(10 12 10 / 97%)",
        borderTop: "1px solid var(--line-dark)", borderBottom: "1px solid var(--line-dark)",
        fontFamily: "var(--font-sans)", ...style,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${chapters.length}, minmax(0,1fr))` }}>
        {chapters.map((chapter, index) => {
          const selected = (active ?? chapters[0]?.id) === chapter.id;
          return (
            <a
              key={chapter.id}
              href={chapter.href || "#"}
              onClick={(event) => { if (onSelect) { event.preventDefault(); onSelect(chapter.id); } }}
              style={{
                minHeight: 74, padding: "15px 18px", textDecoration: "none",
                color: selected ? "var(--ink)" : "#8f9892",
                background: selected ? "var(--signal)" : "transparent",
                borderRight: index < chapters.length - 1 ? "1px solid var(--line-dark)" : "none",
                transition: "color 180ms ease, background-color 180ms ease",
              }}
            >
              <small style={{ display: "block", marginBottom: 8, fontSize: 8, fontWeight: 800, lineHeight: 1, color: selected ? "#6b2a18" : "#68716b" }}>{chapter.no}</small>
              <strong style={{ display: "block", fontSize: 11, lineHeight: 1.25 }}>{chapter.title}</strong>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function Stage({ id, no, small, title, copy, src, alt = "", imageOpacity = 1, seamlessEdge = false, edgeTone = "ink" }) {
  const edgeGradient = edgeTone === "cool"
    ? "linear-gradient(90deg, var(--ink) 0%, rgb(22 31 38 / 96%) 8%, rgb(42 62 74 / 68%) 22%, rgb(84 112 124 / 28%) 38%, transparent 54%)"
    : "linear-gradient(90deg, var(--ink) 0%, rgb(16 20 17 / 96%) 7%, rgb(16 20 17 / 72%) 20%, rgb(16 20 17 / 28%) 36%, transparent 52%)";
  return (
    <section id={id} data-chapter={no} className="cl-stage" style={{ display: "grid", gridTemplateColumns: "minmax(0, .82fr) minmax(0, 1.18fr)", minHeight: 620, color: "#fff", background: "var(--ink)" }}>
      <div className="cl-stage-text" style={{ background: "var(--ink)", padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <span style={{ fontSize: "clamp(80px, 9vw, 140px)", fontWeight: 800, color: "var(--signal)", lineHeight: 0.8 }}>{no}</span>
        <small style={{ marginTop: 16, color: "var(--signal)", fontSize: 10, fontWeight: 800, lineHeight: 1, textTransform: "uppercase" }}>{small}</small>
        <h2 style={{ margin: "14px 0 0", color: "#fff", fontSize: "clamp(44px, 4.6vw, 72px)", fontWeight: 800, lineHeight: 0.9, textTransform: "uppercase" }}>{title}</h2>
        <p style={{ maxWidth: 440, margin: "22px 0 0", color: "rgb(255 255 255 / 74%)", fontSize: 15, lineHeight: 1.55 }}>{copy}</p>
      </div>
      <div className="cl-stage-media" style={{ position: "relative", overflow: "hidden", background: "var(--ink)" }}>
        <img src={src} alt={alt} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: imageOpacity, filter: "saturate(.82) contrast(1.03)" }} />
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: seamlessEdge
          ? edgeGradient
          : "linear-gradient(90deg, rgb(16 20 17 / 55%), transparent 42%)" }} />
      </div>
    </section>
  );
}

function DetailHead({ label, children }) {
  return (
    <div className="cl-detailhead" style={{ display: "grid", gridTemplateColumns: "minmax(180px, .42fr) minmax(0, 1.58fr)", gap: 60, marginBottom: 52 }}>
      <Label>{label}</Label>
      <h3 style={{ maxWidth: 980, margin: 0, color: "var(--ink)", fontSize: "clamp(38px, 5.2vw, 72px)", fontWeight: 800, lineHeight: 0.98 }}>{children}</h3>
    </div>
  );
}

const em = { color: "var(--signal)", fontStyle: "normal" };

/* 01 — Take over tasks: case grid with proof steps + time bars */
function CaseDetail({ copy }) {
  const shell = window.shellStyle;
  const processRef = React.useRef(null);
  const [processActive, setProcessActive] = React.useState(false);

  React.useEffect(() => {
    const processLine = processRef.current;
    if (!processLine) return undefined;
    if (window.__EAZYCLOUD_PRERENDER__) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setProcessActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setProcessActive(entry.isIntersecting);
    }, { threshold: 0.35 });

    observer.observe(processLine);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: "104px 0 118px", background: "var(--paper)" }}>
      <div style={shell}>
        <DetailHead label={copy.label}>{copy.heading.before}{copy.heading.emphasis && <em style={em}>{copy.heading.emphasis}</em>}{copy.heading.after}</DetailHead>
        <div className="cl-case-grid" style={{ display: "grid", gridTemplateColumns: "1fr 88px 1fr", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}>
          <div style={{ padding: "40px 36px" }}>
            <span style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--muted)" }}>{copy.beforeLabel}</span>
            <div style={{ fontSize: "clamp(64px, 9vw, 128px)", fontWeight: 800, lineHeight: 0.82, color: "#b8c0ba", marginTop: 10 }}>130<span style={{ fontSize: 20 }}> min</span></div>
            <div style={{ height: 12, background: "#e0e4df", marginTop: 22, overflow: "hidden" }}><i style={{ display: "block", height: "100%", width: "100%", background: "#b8c0ba" }} /></div>
            <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.5, color: "#59625c", maxWidth: 300 }}>{copy.beforeCopy}</p>
          </div>
          <div className="cl-case-mid" style={{ display: "grid", placeItems: "center", borderLeft: "1px solid var(--line)", borderRight: "1px solid var(--line)", background: "#fff" }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: "var(--signal)", textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: ".1em" }}>{copy.bridge}</span>
          </div>
          <div style={{ padding: "40px 36px", background: "#fff" }}>
            <span style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--muted)" }}>{copy.afterLabel}</span>
            <div style={{ fontSize: "clamp(64px, 9vw, 128px)", fontWeight: 800, lineHeight: 0.82, color: "var(--signal)", marginTop: 10 }}>25<span style={{ fontSize: 20 }}> min</span></div>
            <div style={{ height: 12, background: "#e0e4df", marginTop: 22, overflow: "hidden" }}><i style={{ display: "block", height: "100%", width: "19%", background: "var(--success)" }} /></div>
            <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.5, color: "#59625c", maxWidth: 300 }}>{copy.afterCopy}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 34 }}>
          <b style={{ fontSize: 44, fontWeight: 800, color: "var(--signal)" }}>−81%</b>
          <span style={{ fontSize: 13, color: "#555e58", fontWeight: 700 }}>{copy.saving}</span>
        </div>
        <ol ref={processRef} className={"cl-process-line" + (processActive ? " is-active" : "")} aria-label={copy.processLabel}>
          {copy.steps.map((step, index) => (
            <li key={step.title} className="cl-process-step">
              <span className="cl-process-marker">{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 02 — Make knowledge available: floating documents + answer card */
function KnowledgeDetail({ copy }) {
  const shell = window.shellStyle;
  const doc = { position: "absolute", width: "27%", maxWidth: 225, boxShadow: "0 18px 46px rgb(12 16 13 / 16%)" };
  return (
    <section style={{ padding: "104px 0 118px", background: "#070807", color: "#fff" }}>
      <div style={shell}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", color: "rgb(255 255 255 / 72%)", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
          <b style={{ color: "var(--signal)", fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>{copy.questionLabel}</b>
          <span>{copy.question}</span>
        </div>
        <h3 style={{ maxWidth: 760, margin: "14px 0 0", fontSize: "clamp(34px, 3.6vw, 52px)", fontWeight: 800, lineHeight: 1 }}>{copy.heading.before}{copy.heading.emphasis && <em style={em}>{copy.heading.emphasis}</em>}{copy.heading.after}</h3>
        <div className="cl-know-stage" style={{ position: "relative", height: 560, marginTop: 34, border: "1px solid #26302a" }}>
          {[
            { src: "../../assets/datasheet.png", n: 1, s: { top: 44, left: "5%", transform: "rotate(-8deg)" } },
            { src: "../../assets/tender.png", n: 2, s: { top: 230, left: "16%", transform: "rotate(5deg)" } },
            { src: "../../assets/visit-note.png", n: 3, s: { top: 74, left: "31%", transform: "rotate(9deg)" } },
          ].map((d) => (
            <div key={d.n} className="cl-know-doc" style={{ position: "absolute", width: 158, boxShadow: "0 18px 46px rgb(0 0 0 / 55%)", ...d.s }}>
              <span style={{ position: "absolute", top: -12, left: -12, width: 28, height: 28, background: "var(--signal)", color: "var(--ink)", borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 12, zIndex: 2 }}>{d.n}</span>
              <img src={d.src} alt="" loading="lazy" decoding="async" style={{ width: "100%", display: "block" }} />
            </div>
          ))}
          <div className="cl-know-answer" style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: "46%", background: "var(--ink)", borderTop: "4px solid var(--signal)", padding: 32 }}>
            <span style={{ color: "var(--signal)", fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>{copy.answerLabel}</span>
            <p style={{ fontSize: 21, lineHeight: 1.42, margin: "14px 0 0", fontWeight: 600 }}>{copy.answer}</p>
            <span style={{ display: "block", marginTop: 16, color: "#aab2ad", fontSize: 9, fontWeight: 650 }}>{copy.sources}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 03 — Connect workflows: system flow diagram */
function SystemsDetail({ copy }) {
  const shell = window.shellStyle;
  return (
    <section id="approach" style={{ padding: "104px 0 118px", background: "#070807", color: "#fff" }}>
      <div style={shell}>
        <div style={{ marginBottom: 44 }}>
          <span style={{ color: "var(--signal)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>{copy.label}</span>
          <h3 style={{ maxWidth: 820, margin: "14px 0 0", fontSize: "clamp(34px, 3.8vw, 58px)", fontWeight: 800, lineHeight: 0.98 }}>{copy.heading.before}{copy.heading.emphasis && <em style={em}>{copy.heading.emphasis}</em>}{copy.heading.after}</h3>
        </div>
        <div className="cl-flow" style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr 40px 1fr 40px 1fr", alignItems: "stretch" }}>
          {copy.steps.map((step, i) => (
            <React.Fragment key={step.no}>
              {i > 0 && <div className="cl-flow-arrow" style={{ display: "grid", placeItems: "center", color: "var(--signal)", fontSize: 20, fontWeight: 800 }}>→</div>}
              <div style={{ border: "1px solid #26302a", background: "#0c100b", padding: "22px 20px", display: "flex", flexDirection: "column" }}>
                <span style={{ color: "var(--signal)", fontSize: 9, fontWeight: 800, textTransform: "uppercase", marginBottom: 10 }}>{step.no}</span>
                <h4 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.1, margin: "0 0 16px" }}>{step.title}</h4>
                <div style={{ marginTop: "auto", borderTop: "1px solid #26302a", paddingTop: 12 }}>
                  {step.points.map((p) => (
                    <span key={p} style={{ display: "flex", gap: 8, fontSize: 10, color: "#aeb6af", padding: "4px 0", fontWeight: 600 }}>
                      <i style={{ width: 6, height: 6, background: "var(--signal)", marginTop: 5, flex: "0 0 auto" }} />{p}
                    </span>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "baseline", marginTop: 34, paddingTop: 24, borderTop: "1px solid #26302a" }}>
          <b style={{ color: "var(--signal)", fontSize: 8, fontWeight: 800, textTransform: "uppercase", flex: "0 0 auto" }}>{copy.outcomeLabel}</b>
          <strong style={{ fontSize: 22, lineHeight: 1.3, fontWeight: 700, color: "#fff", maxWidth: 820 }}>{copy.outcome}</strong>
        </div>
      </div>
    </section>
  );
}

/* Chapter 04 (project panel) removed — merged into 03. */

function Chapters({ copy, active, setActive }) {
  return (
    <>
      <div className="cl-chapter-nav" style={{ position: "sticky", zIndex: 25, top: "var(--topbar-height)" }}>
        <ChapterNav chapters={copy.chapters} active={active} ariaLabel={copy.a11y.chapters} onSelect={(id) => { setActive(id); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" }); }} />
      </div>
      <Stage {...copy.chapters[0]} src="../../assets/tasks-digital-workflow.jpg" imageOpacity={0.6} seamlessEdge />
      <CaseDetail copy={copy.caseStudy} />
      <Stage {...copy.chapters[1]} src="../../assets/knowledge-digital-brain.jpg" imageOpacity={0.85} seamlessEdge />
      <KnowledgeDetail copy={copy.knowledge} />
      <Stage {...copy.chapters[2]} src="../../assets/workflows-growth-dashboard.jpg" imageOpacity={1} seamlessEdge edgeTone="cool" />
      <SystemsDetail copy={copy.systems} />
    </>
  );
}

Object.assign(window, { Chapters });
})();
