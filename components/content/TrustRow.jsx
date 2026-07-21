import React from "react";

/** Numbered assurance row: orange index + bold claim + supporting line, on a hairline. */
export function TrustRow({ n, title, children, style }) {
  return (
    <div
      style={{
        display: "grid", gridTemplateColumns: "48px 1fr", gap: 18,
        padding: "25px 0", borderBottom: "1px solid var(--line)",
        fontFamily: "var(--font-sans)", ...style,
      }}
    >
      <b style={{ color: "var(--signal)", fontSize: 13 }}>{n}</b>
      <div>
        <strong style={{ display: "block", marginBottom: 8, fontSize: 18, lineHeight: 1.2, color: "var(--ink)" }}>{title}</strong>
        <p style={{ maxWidth: 670, margin: 0, color: "#59625c", fontSize: 14, lineHeight: 1.52 }}>{children}</p>
      </div>
    </div>
  );
}
