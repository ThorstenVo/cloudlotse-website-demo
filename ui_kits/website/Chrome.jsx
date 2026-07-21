/* eazy.cloud website — topbar chrome. */
(() => {
const { LanguageToggle, Button } = window.CloudLotseDesignSystem_b0c356;

const shellStyle = { width: "min(1400px, calc(100% - 72px))", margin: "0 auto" };

function TopBar({ lang, setLang }) {
  const linkStyle = { color: "rgb(255 255 255 / 72%)", fontSize: 11, fontWeight: 700, textDecoration: "none" };
  return (
    <header style={{ position: "absolute", zIndex: 30, inset: "0 0 auto", height: 76, color: "#fff", borderBottom: "1px solid rgb(255 255 255 / 24%)" }}>
      <div style={{ ...shellStyle, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
        <a href="#" aria-label="eazy.cloud home" style={{ display: "inline-flex", alignItems: "center", flex: "0 0 auto" }}>
          <img src="../../assets/eazycloud_logo_white.svg" alt="eazy.cloud" style={{ width: 148, height: "auto" }} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 28, marginLeft: "auto" }} aria-label="Main">
          {["Possibilities", "Approach", "Contact"].map((l) => (
            <a key={l} href={"#" + l.toLowerCase()} style={linkStyle}>{l}</a>
          ))}
        </nav>
        <LanguageToggle active={lang} onChange={setLang} />
        <Button variant="outline" href="mailto:support@eazy.cloud?subject=eazy.cloud%20workflow%20review">Review a workflow</Button>
      </div>
    </header>
  );
}

Object.assign(window, { TopBar, shellStyle });
})();
