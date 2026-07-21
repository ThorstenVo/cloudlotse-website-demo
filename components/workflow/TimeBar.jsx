import React from "react";

/** Before/after time comparison bar. `after` bars fill green, others orange. */
export function TimeBar({ label, percent, value, after = false, style }) {
  return (
    <div
      style={{
        display: "grid", gridTemplateColumns: "62px 1fr 46px", gap: 10,
        alignItems: "center", margin: "11px 0", color: "#333a36",
        fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 750, ...style,
      }}
    >
      <span>{label}</span>
      <div style={{ height: 13, overflow: "hidden", background: "#d6dbd7" }}>
        <i
          style={{
            display: "block", height: "100%",
            width: `${percent}%`,
            background: after ? "var(--success)" : "var(--signal)",
          }}
        />
      </div>
      <b style={{ textAlign: "right" }}>{value}</b>
    </div>
  );
}
