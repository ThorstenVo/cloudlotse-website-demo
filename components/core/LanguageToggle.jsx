import React from "react";

/** Bilingual language switch (the active language is filled orange). */
export function LanguageToggle({ languages = ["DE", "EN"], active = "EN", onChange, style }) {
  const wrap = {
    display: "inline-flex", border: "1px solid rgb(255 255 255 / 45%)", ...style,
  };
  const cell = {
    minWidth: 34, padding: "9px 8px", fontFamily: "var(--font-sans)",
    fontSize: 9, fontWeight: 800, lineHeight: 1, textAlign: "center",
    textDecoration: "none", cursor: "pointer",
  };
  return (
    <div style={wrap} aria-label="Language">
      {languages.map((lng) => {
        const on = lng === active;
        return (
          <a
            key={lng}
            href="#"
            aria-current={on ? "page" : undefined}
            onClick={(e) => { e.preventDefault(); onChange && onChange(lng); }}
            style={{
              ...cell,
              color: on ? "var(--ink)" : "var(--white)",
              background: on ? "var(--signal)" : "transparent",
            }}
          >
            {lng}
          </a>
        );
      })}
    </div>
  );
}
