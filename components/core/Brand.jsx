import React from "react";

/**
 * CloudLotse lockup — the navigator double-chevron mark (three green tones) beside
 * the two-tone wordmark. The mark is a thin rounded-square frame holding a forward
 * double chevron; the wordmark splits Cloud (dark green) / Lotse (medium green).
 */
export function Brand({
  size = 27,
  onDark = false,
  wordmark = "CloudLotse",
  showWordmark = true,
  href,
  style,
}) {
  const c = onDark
    ? { frame: "#3fbf7a", cv1: "#b6ed6f", cv2: "#5fd08f", word: "#ffffff" }
    : { frame: "#1e7350", cv1: "#8fd14f", cv2: "#35a06a", word: "#101411" };

  const mark = (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block", flex: "0 0 auto" }} aria-hidden={showWordmark ? "true" : undefined} role={showWordmark ? undefined : "img"} aria-label={showWordmark ? undefined : "CloudLotse"}>
      <rect x="13" y="13" width="74" height="74" rx="24" fill="none" stroke={c.frame} strokeWidth="5" />
      <path d="M33 36 L48 50 L33 64" fill="none" stroke={c.cv1} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M49 36 L64 50 L49 64" fill="none" stroke={c.cv2} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Wordmark: single colour (ink on light, white on dark).
  let word = null;
  if (showWordmark && wordmark) {
    word = <span style={{ color: c.word, fontSize: size * 0.78, fontWeight: 800, lineHeight: 1, letterSpacing: "-.01em" }}>{wordmark}</span>;
  }

  const wrap = {
    display: "inline-flex", alignItems: "center", gap: 10,
    fontFamily: "var(--font-sans)", textDecoration: "none", ...style,
  };
  const content = <>{mark}{word}</>;
  if (href) return <a href={href} style={wrap} aria-label={`${wordmark} home`}>{content}</a>;
  return <span style={wrap}>{content}</span>;
}
