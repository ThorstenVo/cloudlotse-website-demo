(() => {
const { LANGUAGE_PREFERENCE_KEY, alternateLocale, localizedPath } = window.EazyCloudI18n;

function saveLocale(locale) {
  try { window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, locale); } catch (_) {}
}

function LocaleSwitch({ locale, compact = false }) {
  const other = alternateLocale(locale);
  const baseStyle = { padding: compact ? "7px 9px" : "9px 8px", minWidth: compact ? undefined : 34, fontSize: 9, fontWeight: 800, lineHeight: 1, textAlign: "center", textDecoration: "none" };
  const activeStyle = { ...baseStyle, color: "var(--ink)", background: "var(--signal)" };
  const linkStyle = { ...baseStyle, color: compact ? "#aeb6af" : "var(--white)", background: "transparent" };
  const switchLanguage = (event) => {
    event.preventDefault();
    saveLocale(other);
    window.location.assign(localizedPath(other, window.location.hash));
  };
  return (
    <span style={{ display: "inline-flex", border: "1px solid rgb(255 255 255 / 35%)" }} aria-label={window.EazyCloudI18n.TRANSLATIONS[locale].a11y.language}>
      {locale === "de"
        ? <><span aria-current="page" style={activeStyle}>DE</span><a href="/en/" onClick={switchLanguage} style={linkStyle}>EN</a></>
        : <><a href="/de/" onClick={switchLanguage} style={linkStyle}>DE</a><span aria-current="page" style={activeStyle}>EN</span></>}
    </span>
  );
}

Object.assign(window, { LocaleSwitch });
})();
