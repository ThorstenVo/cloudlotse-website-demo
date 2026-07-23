/* eazy.cloud website — gallery, trust, final CTA, footer. */
(() => {
const { Label, GalleryCase, TrustRow, Button } = window.CloudLotseDesignSystem_b0c356;

function Trust({ copy }) {
  const shell = window.shellStyle;
  return (
    <section style={{ padding: "110px 0", background: "#fff", color: "var(--ink)" }}>
      <div style={shell}>
        <span style={{ color: "var(--signal)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>{copy.trust.label}</span>
        <h2 style={{ maxWidth: 940, margin: "14px 0 20px", fontSize: "clamp(38px, 4.4vw, 64px)", fontWeight: 800, lineHeight: 0.96, textTransform: "uppercase" }}>{copy.trust.heading.before}{copy.trust.heading.emphasis && <em style={{ color: "var(--signal)", fontStyle: "normal" }}>{copy.trust.heading.emphasis}</em>}{copy.trust.heading.after}</h2>
        <p className="cl-lead-copy" style={{ maxWidth: 640, color: "#4d5650", fontSize: 16, lineHeight: 1.6, margin: "0 0 44px" }}>{copy.trust.copy}</p>
        <div className="cl-trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}>
          {copy.trust.cards.map((card, i) => (
            <div key={card.title} style={{ padding: "30px 28px", borderLeft: i ? "1px solid var(--line)" : "none" }}>
              <span style={{ display: "inline-block", fontSize: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--signal)", border: "1px solid var(--signal)", padding: "5px 8px", marginBottom: 18 }}>{card.loc}</span>
              <h4 style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", lineHeight: 1, margin: "0 0 14px" }}>{card.title}</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {card.points.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 9, fontSize: 13, lineHeight: 1.5, color: "#4d5650", padding: "7px 0" }}>
                    <span style={{ width: 6, height: 6, background: "var(--signal)", marginTop: 6, flex: "0 0 auto" }} />{t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "baseline", marginTop: 26 }}>
          <b style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase", color: "var(--signal)" }}>{copy.trust.foundationLabel}</b>
          <span style={{ fontSize: 14, color: "#555e58", fontWeight: 700 }}>{copy.trust.foundation}</span>
        </div>
      </div>
    </section>
  );
}

function Final({ copy }) {
  const shell = window.shellStyle;
  return (
    <section id="contact" style={{ position: "relative", minHeight: 780, overflow: "hidden", isolation: "isolate", display: "grid", alignItems: "center", color: "#fff", background: "#050605" }}>
      <style>{"@keyframes cl-flare{0%,8%{opacity:0}45%{opacity:var(--cl-flare-peak,.85)}62%{opacity:calc(var(--cl-flare-peak,.85)*.92)}92%,100%{opacity:0}}"}</style>
      <img src="../../assets/clear-route.jpg" alt="" loading="lazy" decoding="async" style={{ position: "absolute", zIndex: 1, inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.36) saturate(.75) contrast(1.05)" }} />
      <img src="../../assets/clear-route.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" style={{ position: "absolute", zIndex: 1, inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "screen", filter: "brightness(1.75) saturate(1.55) contrast(1.15)", opacity: 0, WebkitMask: "radial-gradient(62% 82% at 62% 56%, #000 22%, rgba(0,0,0,.4) 58%, transparent 82%)", mask: "radial-gradient(62% 82% at 62% 56%, #000 22%, rgba(0,0,0,.4) 58%, transparent 82%)", animation: "cl-flare var(--cl-flare-dur, 8s) ease-in-out infinite" }} />
      <span aria-hidden="true" style={{ position: "absolute", zIndex: 2, inset: 0, background: "linear-gradient(90deg, rgb(3 4 3 / 96%), rgb(3 4 3 / 70%) 55%, rgb(3 4 3 / 10%))" }} />
      <div style={{ ...shell, position: "relative", zIndex: 5 }}>
        <span style={{ display: "block", marginBottom: 24, color: "var(--signal)", fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>{copy.final.label}</span>
        <h2 className="cl-final-h2" style={{ maxWidth: 1020, margin: 0, fontSize: "clamp(54px, 7.5vw, 106px)", fontWeight: 800, lineHeight: 0.89, textTransform: "uppercase" }}>{copy.final.heading.before}{copy.final.heading.emphasis && <em style={{ color: "var(--signal)", fontStyle: "normal" }}>{copy.final.heading.emphasis}</em>}{copy.final.heading.after}</h2>
        <p className="cl-lead-copy" style={{ maxWidth: 570, margin: "26px 0 30px", color: "rgb(255 255 255 / 74%)", fontSize: 16, lineHeight: 1.55 }}>{copy.final.copy}</p>
        <Button variant="primary" arrow href={`mailto:voigt@eazy.cloud?subject=${encodeURIComponent(copy.cta.subject)}`}>{copy.cta.label}</Button>
      </div>
    </section>
  );
}

function Footer({ locale, copy }) {
  const shell = window.shellStyle;
  const nav = ["possibilities", "approach", "contact"].map((id) => ({ id, label: copy.nav[id] }));
  const mailto = `mailto:voigt@eazy.cloud?subject=${encodeURIComponent(copy.cta.subject)}`;
  const mark = <img src="../../assets/eazycloud-logo-dark.svg" alt="eazy.cloud" style={{ width: 152, height: "auto" }} />;
  const col = { display: "block", fontSize: 13, fontWeight: 650, padding: "6px 0", color: "#aeb6af", textDecoration: "none" };
  const head = { color: "#fff", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 };
  return (
    <footer style={{ padding: "70px 0 30px", color: "#89918c", background: "#050605", borderTop: "1px solid #303531" }}>
      <div style={shell}>
        <div className="cl-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, paddingBottom: 44, borderBottom: "1px solid #26302a" }}>
          <div>
            {mark}
            <p style={{ margin: "20px 0 0", color: "#aeb6af", fontSize: 14, lineHeight: 1.55, maxWidth: 300 }}>{copy.footer.claim}</p>
          </div>
          <div>
            <div style={head}>{copy.footer.navigation}</div>
            {nav.map((item) => <a key={item.id} href={"#" + item.id} style={col}>{item.label}</a>)}
          </div>
          <div>
            <div style={head}>{copy.footer.contact}</div>
            <a href="mailto:voigt@eazy.cloud" style={col}>voigt@eazy.cloud</a>
            <a href={mailto} style={col}>{copy.cta.label}</a>
          </div>
          <div>
            <div style={head}>{copy.footer.legal}</div>
            <a href="/legal/" style={col}>{copy.footer.legalNotice}</a>
            <a href="/privacy/" style={col}>{copy.footer.privacy}</a>
            <span style={col}>{copy.footer.processing}</span>
            <button type="button" data-privacy-settings="" style={{ ...col, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }}>{copy.footer.privacySettings}</button>
          </div>
        </div>
        <div className="cl-footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 30, paddingTop: 26, fontSize: 10, fontWeight: 650 }}>
          <span>{copy.footer.copyright}</span>
          <LocaleSwitch locale={locale} compact />
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Trust, Final, Footer });
})();
