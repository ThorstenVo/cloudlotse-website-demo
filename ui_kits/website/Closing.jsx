/* eazy.cloud website — gallery, trust, final CTA, footer. */
(() => {
const { Label, GalleryCase, TrustRow, Button } = window.CloudLotseDesignSystem_b0c356;

function Trust() {
  const shell = window.shellStyle;
  return (
    <section style={{ padding: "110px 0", background: "#fff", color: "var(--ink)" }}>
      <div style={shell}>
        <span style={{ color: "var(--signal)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>Trust &amp; control</span>
        <h2 style={{ maxWidth: 940, margin: "14px 0 20px", fontSize: "clamp(38px, 4.4vw, 64px)", fontWeight: 800, lineHeight: 0.96, textTransform: "uppercase" }}>Your customer data stays <em style={{ color: "var(--signal)", fontStyle: "normal" }}>where it belongs.</em></h2>
        <p style={{ maxWidth: 640, color: "#4d5650", fontSize: 16, lineHeight: 1.6, margin: "0 0 44px" }}>The operating model fits the task — not the other way around. Choose how and where each workflow runs, based on the data, risk and level of control you need.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}>
          {[
            { loc: "EU · managed", h: "Private cloud", li: ["Runs in a dedicated EU environment", "Data isolated per customer", "No shared multi-tenant models"] },
            { loc: "On-prem · your infra", h: "Self-hosted", li: ["Runs inside your own infrastructure", "Nothing leaves your network", "Open-source foundation you can audit"] },
            { loc: "Opt-in · per workflow", h: "Connected services", li: ["Use external models where it's the right call", "A conscious, transparent decision each time", "Visible — never a blanket upload"] },
          ].map((c, i) => (
            <div key={c.h} style={{ padding: "30px 28px", borderLeft: i ? "1px solid var(--line)" : "none" }}>
              <span style={{ display: "inline-block", fontSize: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--signal)", border: "1px solid var(--signal)", padding: "5px 8px", marginBottom: 18 }}>{c.loc}</span>
              <h4 style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", lineHeight: 1, margin: "0 0 14px" }}>{c.h}</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {c.li.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 9, fontSize: 13, lineHeight: 1.5, color: "#4d5650", padding: "7px 0" }}>
                    <span style={{ width: 6, height: 6, background: "var(--signal)", marginTop: 6, flex: "0 0 auto" }} />{t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "baseline", marginTop: 26 }}>
          <b style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", color: "var(--signal)" }}>Foundation</b>
          <span style={{ fontSize: 14, color: "#555e58", fontWeight: 700 }}>Open source &amp; auditable · EU-based · no customer data used for training.</span>
        </div>
      </div>
    </section>
  );
}

function Final() {
  const shell = window.shellStyle;
  return (
    <section id="contact" style={{ position: "relative", minHeight: 780, overflow: "hidden", isolation: "isolate", display: "grid", alignItems: "center", color: "#fff", background: "#050605" }}>
      <style>{"@keyframes cl-flare{0%,8%{opacity:0}45%{opacity:var(--cl-flare-peak,.85)}62%{opacity:calc(var(--cl-flare-peak,.85)*.92)}92%,100%{opacity:0}}"}</style>
      <img src="../../assets/clear-route.jpg" alt="" style={{ position: "absolute", zIndex: 1, inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.36) saturate(.75) contrast(1.05)" }} />
      <img src="../../assets/clear-route.jpg" alt="" aria-hidden="true" style={{ position: "absolute", zIndex: 1, inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "screen", filter: "brightness(1.75) saturate(1.55) contrast(1.15)", opacity: 0, WebkitMask: "radial-gradient(62% 82% at 62% 56%, #000 22%, rgba(0,0,0,.4) 58%, transparent 82%)", mask: "radial-gradient(62% 82% at 62% 56%, #000 22%, rgba(0,0,0,.4) 58%, transparent 82%)", animation: "cl-flare var(--cl-flare-dur, 8s) ease-in-out infinite" }} />
      <span aria-hidden="true" style={{ position: "absolute", zIndex: 2, inset: 0, background: "linear-gradient(90deg, rgb(3 4 3 / 96%), rgb(3 4 3 / 70%) 55%, rgb(3 4 3 / 10%))" }} />
      <div style={{ ...shell, position: "relative", zIndex: 5 }}>
        <span style={{ display: "block", marginBottom: 24, color: "var(--signal)", fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>A useful first step</span>
        <h2 style={{ maxWidth: 1020, margin: 0, fontSize: "clamp(54px, 7.5vw, 106px)", fontWeight: 800, lineHeight: 0.89, textTransform: "uppercase" }}>Which workflow costs your team <em style={{ color: "var(--signal)", fontStyle: "normal" }}>unnecessary time</em> every day?</h2>
        <p style={{ maxWidth: 570, margin: "26px 0 30px", color: "rgb(255 255 255 / 74%)", fontSize: 16, lineHeight: 1.55 }}>We look at the specific bottleneck, review the data and systems involved and show what a working workflow could look like.</p>
        <Button variant="primary" arrow href="mailto:support@eazy.cloud?subject=eazy.cloud%20workflow%20review">Review a workflow</Button>
      </div>
    </section>
  );
}

function Footer() {
  const shell = window.shellStyle;
  const mark = <img src="../../assets/eazycloud_logo_white.svg" alt="eazy.cloud" style={{ width: 152, height: "auto" }} />;
  const col = { display: "block", fontSize: 13, fontWeight: 650, padding: "6px 0", color: "#aeb6af", textDecoration: "none" };
  const head = { color: "#fff", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 };
  return (
    <footer style={{ padding: "70px 0 30px", color: "#89918c", background: "#050605", borderTop: "1px solid #303531" }}>
      <div style={shell}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, paddingBottom: 44, borderBottom: "1px solid #26302a" }}>
          <div>
            {mark}
            <p style={{ margin: "20px 0 0", color: "#aeb6af", fontSize: 14, lineHeight: 1.55, maxWidth: 300 }}>Intelligent workflows that bring order to the daily data chaos.</p>
          </div>
          <div>
            <div style={head}>Navigation</div>
            {["Possibilities", "Approach", "Contact"].map((l) => <a key={l} href={"#" + l.toLowerCase()} style={col}>{l}</a>)}
          </div>
          <div>
            <div style={head}>Contact</div>
            <a href="mailto:support@eazy.cloud" style={col}>support@eazy.cloud</a>
            <a href="mailto:support@eazy.cloud?subject=eazy.cloud%20workflow%20review" style={col}>Review a workflow</a>
          </div>
          <div>
            <div style={head}>Legal</div>
            <a href="../../legal/" style={col}>Legal notice</a>
            <a href="../../privacy/" style={col}>Privacy</a>
            <span style={col}>EU data processing — in preparation</span>
            <button type="button" data-privacy-settings="" style={{ ...col, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }}>Privacy settings</button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 30, paddingTop: 26, fontSize: 10, fontWeight: 650 }}>
          <span>© 2026 eazy.cloud · Intelligent workflows for business</span>
          <span style={{ display: "inline-flex", border: "1px solid #3a443d" }}>
            <span style={{ padding: "7px 9px", fontSize: 9, fontWeight: 800, background: "var(--signal)", color: "var(--ink)" }}>EN</span>
            <a href="#" style={{ padding: "7px 9px", fontSize: 9, fontWeight: 800, color: "#aeb6af", textDecoration: "none" }}>DE</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Trust, Final, Footer });
})();
