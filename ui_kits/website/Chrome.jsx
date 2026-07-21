/* CloudLotse website — topbar chrome. Composes Brand, LanguageToggle, Button. */
(() => {
const { Brand, LanguageToggle, Button } = window.CloudLotseDesignSystem_b0c356;

const shellStyle = { width: "min(1400px, calc(100% - 72px))", margin: "0 auto" };

function TopBar({ lang, setLang }) {
  const linkStyle = { color: "rgb(255 255 255 / 72%)", fontSize: 11, fontWeight: 700, textDecoration: "none" };
  return (
    <header style={{ position: "absolute", zIndex: 30, inset: "0 0 auto", height: 76, color: "#fff", borderBottom: "1px solid rgb(255 255 255 / 24%)" }}>
      <div style={{ ...shellStyle, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
        <Brand href="#" onDark markSrc="../../assets/cloudlotse-symbol.png" />
        <nav style={{ display: "flex", alignItems: "center", gap: 28, marginLeft: "auto" }} aria-label="Main">
          {["Possibilities", "Approach", "Contact"].map((l) => (
            <a key={l} href={"#" + l.toLowerCase()} style={linkStyle}>{l}</a>
          ))}
        </nav>
        <LanguageToggle active={lang} onChange={setLang} />
        <Button variant="outline" href="mailto:thorsten.voigt@cloudlotse.de?subject=CloudLotse%20workflow%20review">Review a workflow</Button>
      </div>
    </header>
  );
}

Object.assign(window, { TopBar, shellStyle });
})();
