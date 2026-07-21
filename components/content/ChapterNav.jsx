import React from "react";

/** Sticky service/chapter tab bar. The active tab flips to orange. */
export function ChapterNav({ chapters = [], active, onSelect, style }) {
  return (
    <nav
      aria-label="Chapters"
      style={{
        color: "var(--white)", background: "rgb(10 12 10 / 97%)",
        borderTop: "1px solid var(--line-dark)", borderBottom: "1px solid var(--line-dark)",
        fontFamily: "var(--font-sans)", ...style,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${chapters.length}, minmax(0,1fr))` }}>
        {chapters.map((c, i) => {
          const on = (active ?? chapters[0]?.id) === c.id;
          return (
            <a
              key={c.id}
              href={c.href || "#"}
              onClick={(e) => { if (onSelect) { e.preventDefault(); onSelect(c.id); } }}
              style={{
                minHeight: 74, padding: "15px 18px", textDecoration: "none",
                color: on ? "var(--ink)" : "#8f9892",
                background: on ? "var(--signal)" : "transparent",
                borderRight: i < chapters.length - 1 ? "1px solid var(--line-dark)" : "none",
                transition: "color 180ms ease, background-color 180ms ease",
              }}
            >
              <small style={{ display: "block", marginBottom: 8, fontSize: 8, fontWeight: 800, lineHeight: 1, color: on ? "#6b2a18" : "#68716b" }}>{c.no}</small>
              <strong style={{ display: "block", fontSize: 11, lineHeight: 1.25 }}>{c.title}</strong>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
