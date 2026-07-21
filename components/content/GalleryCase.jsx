import React from "react";

/** Full-bleed image tile with a dark bottom scrim and caption. */
export function GalleryCase({ src, alt = "", eyebrow, title, minHeight = 440, style }) {
  return (
    <article
      style={{
        position: "relative", overflow: "hidden", minHeight,
        color: "var(--white)", fontFamily: "var(--font-sans)", ...style,
      }}
    >
      <img src={src} alt={alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.7) brightness(.66)" }} />
      <span style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgb(6 9 7 / 88%), transparent 64%)" }} aria-hidden="true" />
      <div style={{ position: "absolute", zIndex: 2, right: 21, bottom: 23, left: 21 }}>
        {eyebrow && <small style={{ display: "block", marginBottom: 11, color: "var(--signal)", fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>{eyebrow}</small>}
        <strong style={{ display: "block", fontSize: 21, lineHeight: 1.08 }}>{title}</strong>
      </div>
    </article>
  );
}
