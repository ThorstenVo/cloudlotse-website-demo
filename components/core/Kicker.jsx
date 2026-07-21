import React from "react";

/** Orange eyebrow with a leading rule — the CloudLotse section kicker. */
export function Kicker({ children, onDark = false, style }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 12,
        color: "var(--signal)", fontFamily: "var(--font-sans)", fontSize: 10,
        fontWeight: 800, lineHeight: 1, textTransform: "uppercase",
        letterSpacing: ".02em", ...style,
      }}
    >
      <span style={{ width: 34, height: 3, background: "currentcolor", flex: "0 0 auto" }} aria-hidden="true" />
      {children}
    </div>
  );
}
