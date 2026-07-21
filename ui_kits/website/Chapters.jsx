/* CloudLotse website — chapter nav + 4 stage sections + their detail blocks. */
(() => {
const { ChapterNav, Label, ProofStep, TimeBar, SystemFlow } = window.CloudLotseDesignSystem_b0c356;

const CH = [
  { id: "tasks", no: "01", title: "Take over tasks" },
  { id: "knowledge", no: "02", title: "Make knowledge available" },
  { id: "workflows", no: "03", title: "Connect workflows" },
];

function Stage({ id, no, small, title, copy, src, imageOpacity = 1 }) {
  return (
    <section id={id} data-chapter={no} style={{ display: "grid", gridTemplateColumns: "minmax(0, .82fr) minmax(0, 1.18fr)", minHeight: 620, color: "#fff", background: "var(--ink)" }}>
      <div style={{ background: "var(--ink)", padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <span style={{ fontSize: "clamp(80px, 9vw, 140px)", fontWeight: 800, color: "var(--signal)", lineHeight: 0.8 }}>{no}</span>
        <small style={{ marginTop: 16, color: "var(--signal)", fontSize: 10, fontWeight: 800, lineHeight: 1, textTransform: "uppercase" }}>{small}</small>
        <h2 style={{ margin: "14px 0 0", color: "#fff", fontSize: "clamp(44px, 4.6vw, 72px)", fontWeight: 800, lineHeight: 0.9, textTransform: "uppercase" }}>{title}</h2>
        <p style={{ maxWidth: 440, margin: "22px 0 0", color: "rgb(255 255 255 / 74%)", fontSize: 15, lineHeight: 1.55 }}>{copy}</p>
      </div>
      <div style={{ position: "relative", overflow: "hidden", background: "#070807" }}>
        <img src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: imageOpacity, filter: "saturate(.82) contrast(1.03)" }} />
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgb(16 20 17 / 55%), transparent 42%)" }} />
      </div>
    </section>
  );
}

function DetailHead({ label, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, .42fr) minmax(0, 1.58fr)", gap: 60, marginBottom: 52 }}>
      <Label>{label}</Label>
      <h3 style={{ maxWidth: 980, margin: 0, color: "var(--ink)", fontSize: "clamp(38px, 5.2vw, 72px)", fontWeight: 800, lineHeight: 0.98 }}>{children}</h3>
    </div>
  );
}

const em = { color: "var(--signal)", fontStyle: "normal" };

/* 01 — Take over tasks: case grid with proof steps + time bars */
function CaseDetail() {
  const shell = window.shellStyle;
  return (
    <section style={{ padding: "104px 0 118px", background: "var(--paper)" }}>
      <div style={shell}>
        <DetailHead label="Example / Nordwerk">From 130 minutes of manual work to a <em style={em}>25-minute review.</em></DetailHead>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 1fr", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}>
          <div style={{ padding: "40px 36px" }}>
            <span style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--muted)" }}>Before · by hand</span>
            <div style={{ fontSize: "clamp(64px, 9vw, 128px)", fontWeight: 800, lineHeight: 0.82, color: "#b8c0ba", marginTop: 10 }}>130<span style={{ fontSize: 20 }}> min</span></div>
            <div style={{ height: 12, background: "#e0e4df", marginTop: 22, overflow: "hidden" }}><i style={{ display: "block", height: "100%", width: "100%", background: "#b8c0ba" }} /></div>
            <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.5, color: "#59625c", maxWidth: 300 }}>Search sources, transfer figures and assemble the proposal foundation manually.</p>
          </div>
          <div style={{ display: "grid", placeItems: "center", borderLeft: "1px solid var(--line)", borderRight: "1px solid var(--line)", background: "#fff" }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: "var(--signal)", textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: ".1em" }}>With flow</span>
          </div>
          <div style={{ padding: "40px 36px", background: "#fff" }}>
            <span style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--muted)" }}>With CloudLotse</span>
            <div style={{ fontSize: "clamp(64px, 9vw, 128px)", fontWeight: 800, lineHeight: 0.82, color: "var(--signal)", marginTop: 10 }}>25<span style={{ fontSize: 20 }}> min</span></div>
            <div style={{ height: 12, background: "#e0e4df", marginTop: 22, overflow: "hidden" }}><i style={{ display: "block", height: "100%", width: "19%", background: "var(--success)" }} /></div>
            <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.5, color: "#59625c", maxWidth: 300 }}>The workflow prepares the foundation. Your team reviews and decides.</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 34 }}>
          <b style={{ fontSize: 44, fontWeight: 800, color: "var(--signal)" }}>−81%</b>
          <span style={{ fontSize: 13, color: "#555e58", fontWeight: 700 }}>less time on search &amp; transfer per enquiry</span>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
          {[["01", "Recognise"], ["02", "Connect"], ["03", "Prepare"]].map(([n, t]) => (
            <div key={n} style={{ flex: 1, padding: "12px 14px", background: "#fff", border: "1px solid var(--line)", fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>
              <small style={{ display: "block", color: "var(--signal)", fontSize: 8, marginBottom: 5 }}>{n}</small>{t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 02 — Make knowledge available: floating documents + answer card */
function KnowledgeDetail() {
  const shell = window.shellStyle;
  const doc = { position: "absolute", width: "27%", maxWidth: 225, boxShadow: "0 18px 46px rgb(12 16 13 / 16%)" };
  return (
    <section style={{ padding: "104px 0 118px", background: "#070807", color: "#fff" }}>
      <div style={shell}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", color: "rgb(255 255 255 / 72%)", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
          <b style={{ color: "var(--signal)", fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>Question</b>
          <span>Which requirements must we consider when upgrading the control system?</span>
        </div>
        <h3 style={{ maxWidth: 760, margin: "14px 0 0", fontSize: "clamp(34px, 3.6vw, 52px)", fontWeight: 800, lineHeight: 1 }}>An <em style={em}>evidence-based answer</em> — built only from the project's own sources.</h3>
        <div style={{ position: "relative", height: 560, marginTop: 34, border: "1px solid #26302a" }}>
          {[
            { src: "../../assets/datasheet.png", n: 1, s: { top: 44, left: "5%", transform: "rotate(-8deg)" } },
            { src: "../../assets/tender.png", n: 2, s: { top: 230, left: "16%", transform: "rotate(5deg)" } },
            { src: "../../assets/visit-note.png", n: 3, s: { top: 74, left: "31%", transform: "rotate(9deg)" } },
          ].map((d) => (
            <div key={d.n} style={{ position: "absolute", width: 158, boxShadow: "0 18px 46px rgb(0 0 0 / 55%)", ...d.s }}>
              <span style={{ position: "absolute", top: -12, left: -12, width: 28, height: 28, background: "var(--signal)", color: "var(--ink)", borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 12, zIndex: 2 }}>{d.n}</span>
              <img src={d.src} alt="" style={{ width: "100%", display: "block" }} />
            </div>
          ))}
          <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: "46%", background: "var(--ink)", borderTop: "4px solid var(--signal)", padding: 32 }}>
            <span style={{ color: "var(--signal)", fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>Answer from the Nordwerk project list</span>
            <p style={{ fontSize: 21, lineHeight: 1.42, margin: "14px 0 0", fontWeight: 600 }}>The existing control system supports PROFINET and 24 V DC. The limited cabinet space must be checked before installation.</p>
            <span style={{ display: "block", marginTop: 16, color: "#aab2ad", fontSize: 9, fontWeight: 650 }}>Sources: Data sheet X4 ¹ · Site note Jan ² · Tender 24-118 ³</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 03 — Connect workflows: system flow diagram */
function SystemsDetail() {
  const shell = window.shellStyle;
  return (
    <section id="approach" style={{ padding: "104px 0 118px", background: "#070807", color: "#fff" }}>
      <div style={shell}>
        <div style={{ marginBottom: 44 }}>
          <span style={{ color: "var(--signal)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>Example / Customer service</span>
          <h3 style={{ maxWidth: 820, margin: "14px 0 0", fontSize: "clamp(34px, 3.8vw, 58px)", fontWeight: 800, lineHeight: 0.98 }}>Every handoff carries <em style={em}>everything the next step needs.</em></h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr 40px 1fr 40px 1fr", alignItems: "stretch" }}>
          {[
            { no: "01 / Input", h: "Customer enquiry", pl: ["Request details", "Attachments"] },
            { no: "02 / Context", h: "Customer & project knowledge", pl: ["Linked project", "History"] },
            { no: "03 / Processing", h: "Business system", pl: ["Status", "Documents"] },
            { no: "04 / Next", h: "Next task", pl: ["Owner", "Everything attached"] },
          ].map((s, i) => (
            <React.Fragment key={s.no}>
              {i > 0 && <div style={{ display: "grid", placeItems: "center", color: "var(--signal)", fontSize: 20, fontWeight: 800 }}>→</div>}
              <div style={{ border: "1px solid #26302a", background: "#0c100b", padding: "22px 20px", display: "flex", flexDirection: "column" }}>
                <span style={{ color: "var(--signal)", fontSize: 9, fontWeight: 800, textTransform: "uppercase", marginBottom: 10 }}>{s.no}</span>
                <h4 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.1, margin: "0 0 16px" }}>{s.h}</h4>
                <div style={{ marginTop: "auto", borderTop: "1px solid #26302a", paddingTop: 12 }}>
                  {s.pl.map((p) => (
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
          <b style={{ color: "var(--signal)", fontSize: 8, fontWeight: 800, textTransform: "uppercase", flex: "0 0 auto" }}>Outcome</b>
          <strong style={{ fontSize: 22, lineHeight: 1.3, fontWeight: 700, color: "#fff", maxWidth: 820 }}>The handoff contains everything the next step needs. Your team controls the process, not the data transfer.</strong>
        </div>
      </div>
    </section>
  );
}

/* Chapter 04 (project panel) removed — merged into 03. */

function Chapters({ active, setActive }) {
  return (
    <>
      <div style={{ position: "sticky", zIndex: 25, top: 0 }}>
        <ChapterNav chapters={CH} active={active} onSelect={(id) => { setActive(id); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" }); }} />
      </div>
      <Stage id="tasks" no="01" small="Hand over recurring preparation" title="Take over tasks" copy="The workflow recognises, organises and prepares. Your team reviews, decides and moves the work forward." src="../../assets/tasks-digital-workflow.jpg" imageOpacity={0.5} />
      <CaseDetail />
      <Stage id="knowledge" no="02" small="Answers from the right context" title="Make knowledge available" copy="Links, PDFs, photos and notes become useful exactly where the team needs a reliable answer." src="../../assets/knowledge-digital-brain.jpg" />
      <KnowledgeDetail />
      <Stage id="workflows" no="03" small="Handoffs without duplicate work" title="Connect workflows" copy="Information moves completely between the systems involved — and stays with the right customer or project, available to the whole team." src="../../assets/clear-route.jpg" />
      <SystemsDetail />
    </>
  );
}

Object.assign(window, { Chapters });
})();
