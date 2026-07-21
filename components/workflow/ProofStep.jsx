import React from "react";

/** A numbered workflow step: orange dot + label + status tag, on a hairline row. */
export function ProofStep({ n, label, status, style }) {
  return (
    <div
      style={{
        display: "grid", gridTemplateColumns: "31px 1fr auto", gap: 12,
        alignItems: "center", minHeight: 52,
        borderBottom: "1px solid var(--line)", fontFamily: "var(--font-sans)", ...style,
      }}
    >
      <i
        style={{
          width: 22, height: 22, display: "grid", placeItems: "center",
          color: "var(--white)", background: "var(--signal)", borderRadius: "50%",
          fontSize: 10, fontWeight: 800, fontStyle: "normal",
        }}
      >
        {n}
      </i>
      <span style={{ color: "#39413c", fontSize: 11, fontWeight: 700, lineHeight: 1.25 }}>{label}</span>
      {status && <b style={{ color: "#6c756f", fontSize: 9, fontWeight: 800 }}>{status}</b>}
    </div>
  );
}
