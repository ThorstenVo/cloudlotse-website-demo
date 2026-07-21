import React from "react";

/** Horizontal node→node process diagram with CSS arrowheads between cells. */
export function SystemFlow({ nodes = [], style }) {
  const node = {
    minHeight: 145, display: "grid", placeItems: "center", padding: 24,
    textAlign: "center", background: "var(--paper)", border: "1px solid var(--line)",
    fontFamily: "var(--font-sans)",
  };
  const cols = nodes.map(() => "1fr").join(" 74px ");
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, alignItems: "center", minHeight: 250, ...style }}>
      {nodes.map((nd, i) => (
        <React.Fragment key={i}>
          <div style={node}>
            <div>
              <small style={{ display: "block", marginBottom: 10, color: "#727b75", fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>{nd.tag}</small>
              <strong style={{ fontSize: 15, lineHeight: 1.25 }}>{nd.title}</strong>
            </div>
          </div>
          {i < nodes.length - 1 && (
            <i
              aria-hidden="true"
              style={{ position: "relative", height: 1, background: "var(--signal)", alignSelf: "center" }}
            >
              <span style={{ position: "absolute", top: -4, right: 0, width: 8, height: 8, borderTop: "1px solid var(--signal)", borderRight: "1px solid var(--signal)", transform: "rotate(45deg)", display: "block" }} />
            </i>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
