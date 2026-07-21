import React from "react";

/** Tiny uppercase eyebrow label (muted on light, or override colour). */
export function Label({ children, color = "var(--muted)", style }) {
  return (
    <span
      style={{
        color, fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 800,
        lineHeight: 1, textTransform: "uppercase", letterSpacing: ".02em", ...style,
      }}
    >
      {children}
    </span>
  );
}
