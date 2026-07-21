/* eazy.cloud website — topbar chrome. */
(() => {
const { LanguageToggle, Button } = window.CloudLotseDesignSystem_b0c356;

const shellStyle = { width: "min(1400px, calc(100% - clamp(36px, 8vw, 72px)))", margin: "0 auto" };

const NAV = ["Possibilities", "Approach", "Contact"];

function TopBar({ lang, setLang }) {
  const [open, setOpen] = React.useState(false);
  const linkStyle = { color: "rgb(255 255 255 / 72%)", fontSize: 11, fontWeight: 700, textDecoration: "none" };

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="cl-topbar" style={{ position: "absolute", zIndex: 30, inset: "0 0 auto", height: 76, color: "#fff", borderBottom: "1px solid rgb(255 255 255 / 24%)" }}>
      <div style={{ ...shellStyle, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
        <a href="#" aria-label="eazy.cloud home" style={{ display: "inline-flex", alignItems: "center", flex: "0 0 auto" }} onClick={close}>
          <img src="../../assets/eazycloud_logo_white.svg" alt="eazy.cloud" style={{ width: 148, height: "auto", maxWidth: "42vw" }} />
        </a>

        <nav className="cl-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28, marginLeft: "auto" }} aria-label="Main">
          {NAV.map((l) => (
            <a key={l} href={"#" + l.toLowerCase()} style={linkStyle}>{l}</a>
          ))}
        </nav>
        <span className="cl-desktop-actions" style={{ display: "inline-flex", alignItems: "center", gap: 28 }}>
          <LanguageToggle active={lang} onChange={setLang} />
          <Button variant="outline" href="mailto:voigt@eazy.cloud?subject=eazy.cloud%20workflow%20review">Review a workflow</Button>
        </span>

        {/* Mobile: hamburger toggle (hidden on desktop via mobile.css) */}
        <button
          type="button"
          className="cl-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{ display: "none", flex: "0 0 auto", width: 44, height: 44, padding: 10, background: "transparent", border: "1px solid rgb(255 255 255 / 35%)", cursor: "pointer" }}
        >
          <span aria-hidden="true" className={"cl-burger-box" + (open ? " is-open" : "")}>
            <i /><i /><i />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div className={"cl-mobile-menu" + (open ? " is-open" : "")} style={{ display: "none" }}>
        <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column" }}>
          {NAV.map((l) => (
            <a key={l} href={"#" + l.toLowerCase()} onClick={close}
               style={{ color: "#fff", fontSize: 22, fontWeight: 800, textTransform: "uppercase", textDecoration: "none", padding: "18px 0", borderBottom: "1px solid rgb(255 255 255 / 14%)" }}>{l}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
          <LanguageToggle active={lang} onChange={(v) => { setLang(v); }} />
          <Button variant="primary" arrow href="mailto:voigt@eazy.cloud?subject=eazy.cloud%20workflow%20review">Review a workflow</Button>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { TopBar, shellStyle });
})();
