import React from "react";

/** CloudLotse call-to-action. Square, uppercase, heavy. */
export function Button({
  variant = "primary",
  href,
  children,
  arrow = false,
  disabled = false,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 16,
    minHeight: 46, padding: "0 17px",
    fontFamily: "var(--font-sans)", fontSize: "var(--fs-ui)", fontWeight: 800,
    lineHeight: 1, textTransform: "uppercase", letterSpacing: ".02em",
    textDecoration: "none", whiteSpace: "nowrap", border: 0, borderRadius: 0,
    cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1,
    transition: "background-color 180ms ease, transform 180ms ease, color 180ms ease",
  };
  const variants = {
    primary: {
      color: "var(--ink)",
      background: hover && !disabled ? "var(--signal-hover)" : "var(--signal)",
      transform: hover && !disabled ? "translateY(-2px)" : "none",
    },
    outline: {
      minHeight: 40, padding: "0 14px", fontSize: "var(--fs-meta)",
      color: "var(--white)", background: "transparent",
      border: "1px solid rgb(255 255 255 / 72%)",
      transform: hover && !disabled ? "translateY(-2px)" : "none",
    },
    ghost: {
      color: "var(--ink)", background: "transparent",
      border: "1px solid var(--ink)",
      transform: hover && !disabled ? "translateY(-2px)" : "none",
    },
  };
  const s = { ...base, ...(variants[variant] || variants.primary), ...style };
  const inner = (
    <>
      {children}
      {arrow && <i style={{ fontStyle: "normal", fontSize: 18 }} aria-hidden="true">→</i>}
    </>
  );
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: s,
    ...rest,
  };
  if (href && !disabled) return <a href={href} onClick={onClick} {...handlers}>{inner}</a>;
  return <button type={type} disabled={disabled} onClick={onClick} {...handlers}>{inner}</button>;
}
