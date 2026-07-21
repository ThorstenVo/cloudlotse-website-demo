/* @ds-bundle: {"format":4,"namespace":"CloudLotseDesignSystem_b0c356","components":[{"name":"ChapterNav","sourcePath":"components/content/ChapterNav.jsx"},{"name":"GalleryCase","sourcePath":"components/content/GalleryCase.jsx"},{"name":"TrustRow","sourcePath":"components/content/TrustRow.jsx"},{"name":"Brand","sourcePath":"components/core/Brand.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Kicker","sourcePath":"components/core/Kicker.jsx"},{"name":"Label","sourcePath":"components/core/Label.jsx"},{"name":"LanguageToggle","sourcePath":"components/core/LanguageToggle.jsx"},{"name":"ProofStep","sourcePath":"components/workflow/ProofStep.jsx"},{"name":"SystemFlow","sourcePath":"components/workflow/SystemFlow.jsx"},{"name":"TimeBar","sourcePath":"components/workflow/TimeBar.jsx"}],"sourceHashes":{"components/content/ChapterNav.jsx":"faf3260814cf","components/content/GalleryCase.jsx":"f368855226ac","components/content/TrustRow.jsx":"3343cb37a3cf","components/core/Brand.jsx":"00cb5182ce7f","components/core/Button.jsx":"c819344d04d0","components/core/Kicker.jsx":"95c206c0cfc1","components/core/Label.jsx":"c8395cfb374d","components/core/LanguageToggle.jsx":"0adf4097bce7","components/workflow/ProofStep.jsx":"09d35981000a","components/workflow/SystemFlow.jsx":"2dcb3734772a","components/workflow/TimeBar.jsx":"a06a66e46bce","ui_kits/website/Chapters.jsx":"ad38e6aa3398","ui_kits/website/Chrome.jsx":"9026763aee47","ui_kits/website/Closing.jsx":"0b3b978cd62f","ui_kits/website/Hero.jsx":"2d91c5ad7e21","ui_kits/website/tweaks-panel.jsx":"d259e3a86f73"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CloudLotseDesignSystem_b0c356 = window.CloudLotseDesignSystem_b0c356 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/ChapterNav.jsx
try { (() => {
/** Sticky service/chapter tab bar. The active tab flips to orange. */
function ChapterNav({
  chapters = [],
  active,
  onSelect,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Chapters",
    style: {
      color: "var(--white)",
      background: "rgb(10 12 10 / 97%)",
      borderTop: "1px solid var(--line-dark)",
      borderBottom: "1px solid var(--line-dark)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${chapters.length}, minmax(0,1fr))`
    }
  }, chapters.map((c, i) => {
    const on = (active ?? chapters[0]?.id) === c.id;
    return /*#__PURE__*/React.createElement("a", {
      key: c.id,
      href: c.href || "#",
      onClick: e => {
        if (onSelect) {
          e.preventDefault();
          onSelect(c.id);
        }
      },
      style: {
        minHeight: 74,
        padding: "15px 18px",
        textDecoration: "none",
        color: on ? "var(--ink)" : "#8f9892",
        background: on ? "var(--signal)" : "transparent",
        borderRight: i < chapters.length - 1 ? "1px solid var(--line-dark)" : "none",
        transition: "color 180ms ease, background-color 180ms ease"
      }
    }, /*#__PURE__*/React.createElement("small", {
      style: {
        display: "block",
        marginBottom: 8,
        fontSize: 8,
        fontWeight: 800,
        lineHeight: 1,
        color: on ? "#6b2a18" : "#68716b"
      }
    }, c.no), /*#__PURE__*/React.createElement("strong", {
      style: {
        display: "block",
        fontSize: 11,
        lineHeight: 1.25
      }
    }, c.title));
  })));
}
Object.assign(__ds_scope, { ChapterNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ChapterNav.jsx", error: String((e && e.message) || e) }); }

// components/content/GalleryCase.jsx
try { (() => {
/** Full-bleed image tile with a dark bottom scrim and caption. */
function GalleryCase({
  src,
  alt = "",
  eyebrow,
  title,
  minHeight = 440,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      position: "relative",
      overflow: "hidden",
      minHeight,
      color: "var(--white)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "saturate(.7) brightness(.66)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(0deg, rgb(6 9 7 / 88%), transparent 64%)"
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      zIndex: 2,
      right: 21,
      bottom: 23,
      left: 21
    }
  }, eyebrow && /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      marginBottom: 11,
      color: "var(--signal)",
      fontSize: 8,
      fontWeight: 800,
      textTransform: "uppercase"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 21,
      lineHeight: 1.08
    }
  }, title)));
}
Object.assign(__ds_scope, { GalleryCase });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/GalleryCase.jsx", error: String((e && e.message) || e) }); }

// components/content/TrustRow.jsx
try { (() => {
/** Numbered assurance row: orange index + bold claim + supporting line, on a hairline. */
function TrustRow({
  n,
  title,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "48px 1fr",
      gap: 18,
      padding: "25px 0",
      borderBottom: "1px solid var(--line)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--signal)",
      fontSize: 13
    }
  }, n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      marginBottom: 8,
      fontSize: 18,
      lineHeight: 1.2,
      color: "var(--ink)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 670,
      margin: 0,
      color: "#59625c",
      fontSize: 14,
      lineHeight: 1.52
    }
  }, children)));
}
Object.assign(__ds_scope, { TrustRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TrustRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Brand.jsx
try { (() => {
/**
 * CloudLotse lockup — the navigator double-chevron mark (three green tones) beside
 * the two-tone wordmark. The mark is a thin rounded-square frame holding a forward
 * double chevron; the wordmark splits Cloud (dark green) / Lotse (medium green).
 */
function Brand({
  size = 27,
  onDark = false,
  wordmark = "CloudLotse",
  showWordmark = true,
  href,
  style
}) {
  const c = onDark ? {
    frame: "#3fbf7a",
    cv1: "#b6ed6f",
    cv2: "#5fd08f",
    word: "#ffffff"
  } : {
    frame: "#1e7350",
    cv1: "#8fd14f",
    cv2: "#35a06a",
    word: "#101411"
  };
  const mark = /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    style: {
      display: "block",
      flex: "0 0 auto"
    },
    "aria-hidden": showWordmark ? "true" : undefined,
    role: showWordmark ? undefined : "img",
    "aria-label": showWordmark ? undefined : "CloudLotse"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "13",
    width: "74",
    height: "74",
    rx: "24",
    fill: "none",
    stroke: c.frame,
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M33 36 L48 50 L33 64",
    fill: "none",
    stroke: c.cv1,
    strokeWidth: "6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M49 36 L64 50 L49 64",
    fill: "none",
    stroke: c.cv2,
    strokeWidth: "6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));

  // Wordmark: single colour (ink on light, white on dark).
  let word = null;
  if (showWordmark && wordmark) {
    word = /*#__PURE__*/React.createElement("span", {
      style: {
        color: c.word,
        fontSize: size * 0.78,
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: "-.01em"
      }
    }, wordmark);
  }
  const wrap = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    textDecoration: "none",
    ...style
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, mark, word);
  if (href) return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: wrap,
    "aria-label": `${wordmark} home`
  }, content);
  return /*#__PURE__*/React.createElement("span", {
    style: wrap
  }, content);
}
Object.assign(__ds_scope, { Brand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Brand.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** CloudLotse call-to-action. Square, uppercase, heavy. */
function Button({
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
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    minHeight: 46,
    padding: "0 17px",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--fs-ui)",
    fontWeight: 800,
    lineHeight: 1,
    textTransform: "uppercase",
    letterSpacing: ".02em",
    textDecoration: "none",
    whiteSpace: "nowrap",
    border: 0,
    borderRadius: 0,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "background-color 180ms ease, transform 180ms ease, color 180ms ease"
  };
  const variants = {
    primary: {
      color: "var(--ink)",
      background: hover && !disabled ? "var(--signal-hover)" : "var(--signal)",
      transform: hover && !disabled ? "translateY(-2px)" : "none"
    },
    outline: {
      minHeight: 40,
      padding: "0 14px",
      fontSize: "var(--fs-meta)",
      color: "var(--white)",
      background: "transparent",
      border: "1px solid rgb(255 255 255 / 72%)",
      transform: hover && !disabled ? "translateY(-2px)" : "none"
    },
    ghost: {
      color: "var(--ink)",
      background: "transparent",
      border: "1px solid var(--ink)",
      transform: hover && !disabled ? "translateY(-2px)" : "none"
    }
  };
  const s = {
    ...base,
    ...(variants[variant] || variants.primary),
    ...style
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, children, arrow && /*#__PURE__*/React.createElement("i", {
    style: {
      fontStyle: "normal",
      fontSize: 18
    },
    "aria-hidden": "true"
  }, "\u2192"));
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: s,
    ...rest
  };
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick
  }, handlers), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick
  }, handlers), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Kicker.jsx
try { (() => {
/** Orange eyebrow with a leading rule — the CloudLotse section kicker. */
function Kicker({
  children,
  onDark = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: "var(--signal)",
      fontFamily: "var(--font-sans)",
      fontSize: 10,
      fontWeight: 800,
      lineHeight: 1,
      textTransform: "uppercase",
      letterSpacing: ".02em",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 3,
      background: "currentcolor",
      flex: "0 0 auto"
    },
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/core/Label.jsx
try { (() => {
/** Tiny uppercase eyebrow label (muted on light, or override colour). */
function Label({
  children,
  color = "var(--muted)",
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color,
      fontFamily: "var(--font-sans)",
      fontSize: 10,
      fontWeight: 800,
      lineHeight: 1,
      textTransform: "uppercase",
      letterSpacing: ".02em",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Label.jsx", error: String((e && e.message) || e) }); }

// components/core/LanguageToggle.jsx
try { (() => {
/** Bilingual language switch (the active language is filled orange). */
function LanguageToggle({
  languages = ["DE", "EN"],
  active = "EN",
  onChange,
  style
}) {
  const wrap = {
    display: "inline-flex",
    border: "1px solid rgb(255 255 255 / 45%)",
    ...style
  };
  const cell = {
    minWidth: 34,
    padding: "9px 8px",
    fontFamily: "var(--font-sans)",
    fontSize: 9,
    fontWeight: 800,
    lineHeight: 1,
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrap,
    "aria-label": "Language"
  }, languages.map(lng => {
    const on = lng === active;
    return /*#__PURE__*/React.createElement("a", {
      key: lng,
      href: "#",
      "aria-current": on ? "page" : undefined,
      onClick: e => {
        e.preventDefault();
        onChange && onChange(lng);
      },
      style: {
        ...cell,
        color: on ? "var(--ink)" : "var(--white)",
        background: on ? "var(--signal)" : "transparent"
      }
    }, lng);
  }));
}
Object.assign(__ds_scope, { LanguageToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LanguageToggle.jsx", error: String((e && e.message) || e) }); }

// components/workflow/ProofStep.jsx
try { (() => {
/** A numbered workflow step: orange dot + label + status tag, on a hairline row. */
function ProofStep({
  n,
  label,
  status,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "31px 1fr auto",
      gap: 12,
      alignItems: "center",
      minHeight: 52,
      borderBottom: "1px solid var(--line)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 22,
      height: 22,
      display: "grid",
      placeItems: "center",
      color: "var(--white)",
      background: "var(--signal)",
      borderRadius: "50%",
      fontSize: 10,
      fontWeight: 800,
      fontStyle: "normal"
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#39413c",
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1.25
    }
  }, label), status && /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#6c756f",
      fontSize: 9,
      fontWeight: 800
    }
  }, status));
}
Object.assign(__ds_scope, { ProofStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/workflow/ProofStep.jsx", error: String((e && e.message) || e) }); }

// components/workflow/SystemFlow.jsx
try { (() => {
/** Horizontal node→node process diagram with CSS arrowheads between cells. */
function SystemFlow({
  nodes = [],
  style
}) {
  const node = {
    minHeight: 145,
    display: "grid",
    placeItems: "center",
    padding: 24,
    textAlign: "center",
    background: "var(--paper)",
    border: "1px solid var(--line)",
    fontFamily: "var(--font-sans)"
  };
  const cols = nodes.map(() => "1fr").join(" 74px ");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: cols,
      alignItems: "center",
      minHeight: 250,
      ...style
    }
  }, nodes.map((nd, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: node
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      marginBottom: 10,
      color: "#727b75",
      fontSize: 8,
      fontWeight: 800,
      textTransform: "uppercase"
    }
  }, nd.tag), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 15,
      lineHeight: 1.25
    }
  }, nd.title))), i < nodes.length - 1 && /*#__PURE__*/React.createElement("i", {
    "aria-hidden": "true",
    style: {
      position: "relative",
      height: 1,
      background: "var(--signal)",
      alignSelf: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -4,
      right: 0,
      width: 8,
      height: 8,
      borderTop: "1px solid var(--signal)",
      borderRight: "1px solid var(--signal)",
      transform: "rotate(45deg)",
      display: "block"
    }
  })))));
}
Object.assign(__ds_scope, { SystemFlow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/workflow/SystemFlow.jsx", error: String((e && e.message) || e) }); }

// components/workflow/TimeBar.jsx
try { (() => {
/** Before/after time comparison bar. `after` bars fill green, others orange. */
function TimeBar({
  label,
  percent,
  value,
  after = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "62px 1fr 46px",
      gap: 10,
      alignItems: "center",
      margin: "11px 0",
      color: "#333a36",
      fontFamily: "var(--font-sans)",
      fontSize: 9,
      fontWeight: 750,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 13,
      overflow: "hidden",
      background: "#d6dbd7"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: "100%",
      width: `${percent}%`,
      background: after ? "var(--success)" : "var(--signal)"
    }
  })), /*#__PURE__*/React.createElement("b", {
    style: {
      textAlign: "right"
    }
  }, value));
}
Object.assign(__ds_scope, { TimeBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/workflow/TimeBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chapters.jsx
try { (() => {
/* CloudLotse website — chapter nav + 4 stage sections + their detail blocks. */
(() => {
  const {
    ChapterNav,
    Label,
    ProofStep,
    TimeBar,
    SystemFlow
  } = window.CloudLotseDesignSystem_b0c356;
  const CH = [{
    id: "tasks",
    no: "01",
    title: "Take over tasks"
  }, {
    id: "knowledge",
    no: "02",
    title: "Make knowledge available"
  }, {
    id: "workflows",
    no: "03",
    title: "Connect workflows"
  }];
  function Stage({
    id,
    no,
    small,
    title,
    copy,
    src
  }) {
    return /*#__PURE__*/React.createElement("section", {
      id: id,
      "data-chapter": no,
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(0, .82fr) minmax(0, 1.18fr)",
        minHeight: 620,
        color: "#fff",
        background: "var(--ink)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--ink)",
        padding: "56px 52px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "clamp(80px, 9vw, 140px)",
        fontWeight: 800,
        color: "var(--signal)",
        lineHeight: 0.8
      }
    }, no), /*#__PURE__*/React.createElement("small", {
      style: {
        marginTop: 16,
        color: "var(--signal)",
        fontSize: 10,
        fontWeight: 800,
        lineHeight: 1,
        textTransform: "uppercase"
      }
    }, small), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "14px 0 0",
        color: "#fff",
        fontSize: "clamp(44px, 4.6vw, 72px)",
        fontWeight: 800,
        lineHeight: 0.9,
        textTransform: "uppercase"
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 440,
        margin: "22px 0 0",
        color: "rgb(255 255 255 / 74%)",
        fontSize: 15,
        lineHeight: 1.55
      }
    }, copy)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        overflow: "hidden",
        background: "#070807"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: "",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "saturate(.82) contrast(1.03)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgb(16 20 17 / 55%), transparent 42%)"
      }
    })));
  }
  function DetailHead({
    label,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(180px, .42fr) minmax(0, 1.58fr)",
        gap: 60,
        marginBottom: 52
      }
    }, /*#__PURE__*/React.createElement(Label, null, label), /*#__PURE__*/React.createElement("h3", {
      style: {
        maxWidth: 980,
        margin: 0,
        color: "var(--ink)",
        fontSize: "clamp(38px, 5.2vw, 72px)",
        fontWeight: 800,
        lineHeight: 0.98
      }
    }, children));
  }
  const em = {
    color: "var(--signal)",
    fontStyle: "normal"
  };

  /* 01 — Take over tasks: case grid with proof steps + time bars */
  function CaseDetail() {
    const shell = window.shellStyle;
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "104px 0 118px",
        background: "var(--paper)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: shell
    }, /*#__PURE__*/React.createElement(DetailHead, {
      label: "Example / Nordwerk"
    }, "From 130 minutes of manual work to a ", /*#__PURE__*/React.createElement("em", {
      style: em
    }, "25-minute review.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 88px 1fr",
        borderTop: "1px solid var(--ink)",
        borderBottom: "1px solid var(--ink)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "40px 36px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: ".06em",
        color: "var(--muted)"
      }
    }, "Before \xB7 by hand"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "clamp(64px, 9vw, 128px)",
        fontWeight: 800,
        lineHeight: 0.82,
        color: "#b8c0ba",
        marginTop: 10
      }
    }, "130", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20
      }
    }, " min")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 12,
        background: "#e0e4df",
        marginTop: 22,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        display: "block",
        height: "100%",
        width: "100%",
        background: "#b8c0ba"
      }
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "14px 0 0",
        fontSize: 13,
        lineHeight: 1.5,
        color: "#59625c",
        maxWidth: 300
      }
    }, "Search sources, transfer figures and assemble the proposal foundation manually.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        borderLeft: "1px solid var(--line)",
        borderRight: "1px solid var(--line)",
        background: "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 800,
        color: "var(--signal)",
        textTransform: "uppercase",
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
        letterSpacing: ".1em"
      }
    }, "With flow")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "40px 36px",
        background: "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: ".06em",
        color: "var(--muted)"
      }
    }, "With CloudLotse"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "clamp(64px, 9vw, 128px)",
        fontWeight: 800,
        lineHeight: 0.82,
        color: "var(--signal)",
        marginTop: 10
      }
    }, "25", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20
      }
    }, " min")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 12,
        background: "#e0e4df",
        marginTop: 22,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        display: "block",
        height: "100%",
        width: "19%",
        background: "var(--success)"
      }
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "14px 0 0",
        fontSize: 13,
        lineHeight: 1.5,
        color: "#59625c",
        maxWidth: 300
      }
    }, "The workflow prepares the foundation. Your team reviews and decides."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        marginTop: 34
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontSize: 44,
        fontWeight: 800,
        color: "var(--signal)"
      }
    }, "\u221281%"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#555e58",
        fontWeight: 700
      }
    }, "less time on search & transfer per enquiry")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginTop: 26
      }
    }, [["01", "Recognise"], ["02", "Connect"], ["03", "Prepare"]].map(([n, t]) => /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        flex: 1,
        padding: "12px 14px",
        background: "#fff",
        border: "1px solid var(--line)",
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase"
      }
    }, /*#__PURE__*/React.createElement("small", {
      style: {
        display: "block",
        color: "var(--signal)",
        fontSize: 8,
        marginBottom: 5
      }
    }, n), t)))));
  }

  /* 02 — Make knowledge available: floating documents + answer card */
  function KnowledgeDetail() {
    const shell = window.shellStyle;
    const doc = {
      position: "absolute",
      width: "27%",
      maxWidth: 225,
      boxShadow: "0 18px 46px rgb(12 16 13 / 16%)"
    };
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "104px 0 118px",
        background: "#070807",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: shell
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        alignItems: "center",
        color: "rgb(255 255 255 / 72%)",
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--signal)",
        fontSize: 8,
        fontWeight: 800,
        textTransform: "uppercase"
      }
    }, "Question"), /*#__PURE__*/React.createElement("span", null, "Which requirements must we consider when upgrading the control system?")), /*#__PURE__*/React.createElement("h3", {
      style: {
        maxWidth: 760,
        margin: "14px 0 0",
        fontSize: "clamp(34px, 3.6vw, 52px)",
        fontWeight: 800,
        lineHeight: 1
      }
    }, "An ", /*#__PURE__*/React.createElement("em", {
      style: em
    }, "evidence-based answer"), " \u2014 built only from the project's own sources."), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 560,
        marginTop: 34,
        border: "1px solid #26302a"
      }
    }, [{
      src: "../../assets/datasheet.png",
      n: 1,
      s: {
        top: 44,
        left: "5%",
        transform: "rotate(-8deg)"
      }
    }, {
      src: "../../assets/tender.png",
      n: 2,
      s: {
        top: 230,
        left: "16%",
        transform: "rotate(5deg)"
      }
    }, {
      src: "../../assets/visit-note.png",
      n: 3,
      s: {
        top: 74,
        left: "31%",
        transform: "rotate(9deg)"
      }
    }].map(d => /*#__PURE__*/React.createElement("div", {
      key: d.n,
      style: {
        position: "absolute",
        width: 158,
        boxShadow: "0 18px 46px rgb(0 0 0 / 55%)",
        ...d.s
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: -12,
        left: -12,
        width: 28,
        height: 28,
        background: "var(--signal)",
        color: "var(--ink)",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        fontWeight: 800,
        fontSize: 12,
        zIndex: 2
      }
    }, d.n), /*#__PURE__*/React.createElement("img", {
      src: d.src,
      alt: "",
      style: {
        width: "100%",
        display: "block"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "46%",
        background: "var(--ink)",
        borderTop: "4px solid var(--signal)",
        padding: 32
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--signal)",
        fontSize: 8,
        fontWeight: 800,
        textTransform: "uppercase"
      }
    }, "Answer from the Nordwerk project list"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 21,
        lineHeight: 1.42,
        margin: "14px 0 0",
        fontWeight: 600
      }
    }, "The existing control system supports PROFINET and 24 V DC. The limited cabinet space must be checked before installation."), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        marginTop: 16,
        color: "#aab2ad",
        fontSize: 9,
        fontWeight: 650
      }
    }, "Sources: Data sheet X4 \xB9 \xB7 Site note Jan \xB2 \xB7 Tender 24-118 \xB3")))));
  }

  /* 03 — Connect workflows: system flow diagram */
  function SystemsDetail() {
    const shell = window.shellStyle;
    return /*#__PURE__*/React.createElement("section", {
      id: "approach",
      style: {
        padding: "104px 0 118px",
        background: "#070807",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: shell
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 44
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--signal)",
        fontSize: 10,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: ".04em"
      }
    }, "Example / Customer service"), /*#__PURE__*/React.createElement("h3", {
      style: {
        maxWidth: 820,
        margin: "14px 0 0",
        fontSize: "clamp(34px, 3.8vw, 58px)",
        fontWeight: 800,
        lineHeight: 0.98
      }
    }, "Every handoff carries ", /*#__PURE__*/React.createElement("em", {
      style: em
    }, "everything the next step needs."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 40px 1fr 40px 1fr 40px 1fr",
        alignItems: "stretch"
      }
    }, [{
      no: "01 / Input",
      h: "Customer enquiry",
      pl: ["Request details", "Attachments"]
    }, {
      no: "02 / Context",
      h: "Customer & project knowledge",
      pl: ["Linked project", "History"]
    }, {
      no: "03 / Processing",
      h: "Business system",
      pl: ["Status", "Documents"]
    }, {
      no: "04 / Next",
      h: "Next task",
      pl: ["Owner", "Everything attached"]
    }].map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: s.no
    }, i > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        color: "var(--signal)",
        fontSize: 20,
        fontWeight: 800
      }
    }, "\u2192"), /*#__PURE__*/React.createElement("div", {
      style: {
        border: "1px solid #26302a",
        background: "#0c100b",
        padding: "22px 20px",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--signal)",
        fontSize: 9,
        fontWeight: 800,
        textTransform: "uppercase",
        marginBottom: 10
      }
    }, s.no), /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: 16,
        fontWeight: 800,
        lineHeight: 1.1,
        margin: "0 0 16px"
      }
    }, s.h), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "auto",
        borderTop: "1px solid #26302a",
        paddingTop: 12
      }
    }, s.pl.map(p => /*#__PURE__*/React.createElement("span", {
      key: p,
      style: {
        display: "flex",
        gap: 8,
        fontSize: 10,
        color: "#aeb6af",
        padding: "4px 0",
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: 6,
        height: 6,
        background: "var(--signal)",
        marginTop: 5,
        flex: "0 0 auto"
      }
    }), p))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        alignItems: "baseline",
        marginTop: 34,
        paddingTop: 24,
        borderTop: "1px solid #26302a"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--signal)",
        fontSize: 8,
        fontWeight: 800,
        textTransform: "uppercase",
        flex: "0 0 auto"
      }
    }, "Outcome"), /*#__PURE__*/React.createElement("strong", {
      style: {
        fontSize: 22,
        lineHeight: 1.3,
        fontWeight: 700,
        color: "#fff",
        maxWidth: 820
      }
    }, "The handoff contains everything the next step needs. Your team controls the process, not the data transfer."))));
  }

  /* Chapter 04 (project panel) removed — merged into 03. */

  function Chapters({
    active,
    setActive
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "sticky",
        zIndex: 25,
        top: 0
      }
    }, /*#__PURE__*/React.createElement(ChapterNav, {
      chapters: CH,
      active: active,
      onSelect: id => {
        setActive(id);
        const el = document.getElementById(id);
        if (el) window.scrollTo({
          top: el.offsetTop,
          behavior: "smooth"
        });
      }
    })), /*#__PURE__*/React.createElement(Stage, {
      id: "tasks",
      no: "01",
      small: "Hand over recurring preparation",
      title: "Take over tasks",
      copy: "The workflow recognises, organises and prepares. Your team reviews, decides and moves the work forward.",
      src: "../../assets/factory.jpg"
    }), /*#__PURE__*/React.createElement(CaseDetail, null), /*#__PURE__*/React.createElement(Stage, {
      id: "knowledge",
      no: "02",
      small: "Answers from the right context",
      title: "Make knowledge available",
      copy: "Links, PDFs, photos and notes become useful exactly where the team needs a reliable answer.",
      src: "../../assets/control.webp"
    }), /*#__PURE__*/React.createElement(KnowledgeDetail, null), /*#__PURE__*/React.createElement(Stage, {
      id: "workflows",
      no: "03",
      small: "Handoffs without duplicate work",
      title: "Connect workflows",
      copy: "Information moves completely between the systems involved \u2014 and stays with the right customer or project, available to the whole team.",
      src: "../../assets/clear-route.jpg"
    }), /*#__PURE__*/React.createElement(SystemsDetail, null));
  }
  Object.assign(window, {
    Chapters
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chapters.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
/* CloudLotse website — topbar chrome. Composes Brand, LanguageToggle, Button. */
(() => {
  const {
    Brand,
    LanguageToggle,
    Button
  } = window.CloudLotseDesignSystem_b0c356;
  const shellStyle = {
    width: "min(1400px, calc(100% - 72px))",
    margin: "0 auto"
  };
  function TopBar({
    lang,
    setLang
  }) {
    const linkStyle = {
      color: "rgb(255 255 255 / 72%)",
      fontSize: 11,
      fontWeight: 700,
      textDecoration: "none"
    };
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "absolute",
        zIndex: 30,
        inset: "0 0 auto",
        height: 76,
        color: "#fff",
        borderBottom: "1px solid rgb(255 255 255 / 24%)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...shellStyle,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 28
      }
    }, /*#__PURE__*/React.createElement(Brand, {
      href: "#",
      onDark: true,
      markSrc: "../../assets/cloudlotse-symbol.png"
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 28,
        marginLeft: "auto"
      },
      "aria-label": "Main"
    }, ["Possibilities", "Approach", "Contact"].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#" + l.toLowerCase(),
      style: linkStyle
    }, l))), /*#__PURE__*/React.createElement(LanguageToggle, {
      active: lang,
      onChange: setLang
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      href: "mailto:thorsten.voigt@cloudlotse.de?subject=CloudLotse%20workflow%20review"
    }, "Review a workflow")));
  }
  Object.assign(window, {
    TopBar,
    shellStyle
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Closing.jsx
try { (() => {
/* CloudLotse website — gallery, trust, final CTA, footer. */
(() => {
  const {
    Label,
    GalleryCase,
    TrustRow,
    Button
  } = window.CloudLotseDesignSystem_b0c356;
  function Trust() {
    const shell = window.shellStyle;
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "110px 0",
        background: "#fff",
        color: "var(--ink)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: shell
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--signal)",
        fontSize: 10,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: ".04em"
      }
    }, "Trust & control"), /*#__PURE__*/React.createElement("h2", {
      style: {
        maxWidth: 940,
        margin: "14px 0 20px",
        fontSize: "clamp(38px, 4.4vw, 64px)",
        fontWeight: 800,
        lineHeight: 0.96,
        textTransform: "uppercase"
      }
    }, "Your customer data stays ", /*#__PURE__*/React.createElement("em", {
      style: {
        color: "var(--signal)",
        fontStyle: "normal"
      }
    }, "where it belongs.")), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 640,
        color: "#4d5650",
        fontSize: 16,
        lineHeight: 1.6,
        margin: "0 0 44px"
      }
    }, "The operating model fits the task \u2014 not the other way around. Choose how and where each workflow runs, based on the data, risk and level of control you need."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: "1px solid var(--ink)",
        borderBottom: "1px solid var(--ink)"
      }
    }, [{
      loc: "EU · managed",
      h: "Private cloud",
      li: ["Runs in a dedicated EU environment", "Data isolated per customer", "No shared multi-tenant models"]
    }, {
      loc: "On-prem · your infra",
      h: "Self-hosted",
      li: ["Runs inside your own infrastructure", "Nothing leaves your network", "Open-source foundation you can audit"]
    }, {
      loc: "Opt-in · per workflow",
      h: "Connected services",
      li: ["Use external models where it's the right call", "A conscious, transparent decision each time", "Visible — never a blanket upload"]
    }].map((c, i) => /*#__PURE__*/React.createElement("div", {
      key: c.h,
      style: {
        padding: "30px 28px",
        borderLeft: i ? "1px solid var(--line)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        fontSize: 8,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: ".05em",
        color: "var(--signal)",
        border: "1px solid var(--signal)",
        padding: "5px 8px",
        marginBottom: 18
      }
    }, c.loc), /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        textTransform: "uppercase",
        lineHeight: 1,
        margin: "0 0 14px"
      }
    }, c.h), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        margin: 0,
        padding: 0
      }
    }, c.li.map(t => /*#__PURE__*/React.createElement("li", {
      key: t,
      style: {
        display: "flex",
        gap: 9,
        fontSize: 13,
        lineHeight: 1.5,
        color: "#4d5650",
        padding: "7px 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        background: "var(--signal)",
        marginTop: 6,
        flex: "0 0 auto"
      }
    }), t)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14,
        alignItems: "baseline",
        marginTop: 26
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontSize: 8,
        fontWeight: 800,
        textTransform: "uppercase",
        color: "var(--signal)"
      }
    }, "Foundation"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "#555e58",
        fontWeight: 700
      }
    }, "Open source & auditable \xB7 EU-based \xB7 no customer data used for training."))));
  }
  function Final() {
    const shell = window.shellStyle;
    return /*#__PURE__*/React.createElement("section", {
      id: "contact",
      style: {
        position: "relative",
        minHeight: 780,
        overflow: "hidden",
        isolation: "isolate",
        display: "grid",
        alignItems: "center",
        color: "#fff",
        background: "#050605"
      }
    }, /*#__PURE__*/React.createElement("style", null, "@keyframes cl-flare{0%,8%{opacity:0}45%{opacity:var(--cl-flare-peak,.85)}62%{opacity:calc(var(--cl-flare-peak,.85)*.92)}92%,100%{opacity:0}}"), /*#__PURE__*/React.createElement("img", {
      src: "../../assets/clear-route.jpg",
      alt: "",
      style: {
        position: "absolute",
        zIndex: 1,
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "brightness(.36) saturate(.75) contrast(1.05)"
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: "../../assets/clear-route.jpg",
      alt: "",
      "aria-hidden": "true",
      style: {
        position: "absolute",
        zIndex: 1,
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        mixBlendMode: "screen",
        filter: "brightness(1.75) saturate(1.55) contrast(1.15)",
        opacity: 0,
        WebkitMask: "radial-gradient(62% 82% at 62% 56%, #000 22%, rgba(0,0,0,.4) 58%, transparent 82%)",
        mask: "radial-gradient(62% 82% at 62% 56%, #000 22%, rgba(0,0,0,.4) 58%, transparent 82%)",
        animation: "cl-flare var(--cl-flare-dur, 8s) ease-in-out infinite"
      }
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        zIndex: 2,
        inset: 0,
        background: "linear-gradient(90deg, rgb(3 4 3 / 96%), rgb(3 4 3 / 70%) 55%, rgb(3 4 3 / 10%))"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        ...shell,
        position: "relative",
        zIndex: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        marginBottom: 24,
        color: "var(--signal)",
        fontSize: 10,
        fontWeight: 800,
        textTransform: "uppercase"
      }
    }, "A useful first step"), /*#__PURE__*/React.createElement("h2", {
      style: {
        maxWidth: 1020,
        margin: 0,
        fontSize: "clamp(54px, 7.5vw, 106px)",
        fontWeight: 800,
        lineHeight: 0.89,
        textTransform: "uppercase"
      }
    }, "Which workflow costs your team ", /*#__PURE__*/React.createElement("em", {
      style: {
        color: "var(--signal)",
        fontStyle: "normal"
      }
    }, "unnecessary time"), " every day?"), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: 570,
        margin: "26px 0 30px",
        color: "rgb(255 255 255 / 74%)",
        fontSize: 16,
        lineHeight: 1.55
      }
    }, "We look at the specific bottleneck, review the data and systems involved and show what a working workflow could look like."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      arrow: true,
      href: "mailto:thorsten.voigt@cloudlotse.de?subject=CloudLotse%20workflow%20review"
    }, "Review a workflow")));
  }
  function Footer() {
    const shell = window.shellStyle;
    const mark = /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        color: "#fff",
        fontSize: 20,
        fontWeight: 800
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "26",
      height: "26",
      viewBox: "0 0 100 100",
      style: {
        flex: "0 0 auto"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "13",
      y: "13",
      width: "74",
      height: "74",
      rx: "24",
      fill: "none",
      stroke: "#3fbf7a",
      strokeWidth: "5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M33 36 L48 50 L33 64",
      fill: "none",
      stroke: "#b6ed6f",
      strokeWidth: "6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M49 36 L64 50 L49 64",
      fill: "none",
      stroke: "#5fd08f",
      strokeWidth: "6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })), "CloudLotse");
    const col = {
      display: "block",
      fontSize: 13,
      fontWeight: 650,
      padding: "6px 0",
      color: "#aeb6af",
      textDecoration: "none"
    };
    const head = {
      color: "#fff",
      fontSize: 9,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: ".06em",
      marginBottom: 16
    };
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        padding: "70px 0 30px",
        color: "#89918c",
        background: "#050605",
        borderTop: "1px solid #303531"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: shell
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
        gap: 40,
        paddingBottom: 44,
        borderBottom: "1px solid #26302a"
      }
    }, /*#__PURE__*/React.createElement("div", null, mark, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "20px 0 0",
        color: "#aeb6af",
        fontSize: 14,
        lineHeight: 1.55,
        maxWidth: 300
      }
    }, "Intelligent workflows that bring order to the daily data chaos.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: head
    }, "Navigation"), ["Possibilities", "Approach", "Contact"].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#" + l.toLowerCase(),
      style: col
    }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: head
    }, "Contact"), /*#__PURE__*/React.createElement("a", {
      href: "mailto:thorsten.voigt@cloudlotse.de",
      style: col
    }, "thorsten.voigt@cloudlotse.de"), /*#__PURE__*/React.createElement("a", {
      href: "mailto:thorsten.voigt@cloudlotse.de?subject=CloudLotse%20workflow%20review",
      style: col
    }, "Review a workflow")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: head
    }, "Legal"), ["Legal notice", "Privacy", "EU data processing"].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      style: col
    }, l)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 30,
        paddingTop: 26,
        fontSize: 10,
        fontWeight: 650
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 CloudLotse \xB7 Intelligent workflows for business"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        border: "1px solid #3a443d"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        padding: "7px 9px",
        fontSize: 9,
        fontWeight: 800,
        background: "var(--signal)",
        color: "var(--ink)"
      }
    }, "EN"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        padding: "7px 9px",
        fontSize: 9,
        fontWeight: 800,
        color: "#aeb6af",
        textDecoration: "none"
      }
    }, "DE")))));
  }
  Object.assign(window, {
    Trust,
    Final,
    Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Closing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* CloudLotse website — hero + intro sections. */
(() => {
  const {
    Kicker,
    Label,
    Button
  } = window.CloudLotseDesignSystem_b0c356;
  function DocStream() {
    const defs = [{
      img: "../../assets/tender.png",
      sx: 40,
      sy: -40,
      sr: -16,
      tx: 150,
      ty: 0,
      accent: false
    }, {
      img: null,
      sx: 320,
      sy: 300,
      sr: 12,
      tx: 150,
      ty: 80,
      accent: false
    }, {
      img: "../../assets/datasheet.png",
      sx: 60,
      sy: 320,
      sr: 9,
      tx: 150,
      ty: 160,
      accent: false
    }, {
      img: "../../assets/visit-note.png",
      sx: 340,
      sy: -30,
      sr: -10,
      tx: 150,
      ty: 240,
      accent: true
    }];
    return /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        zIndex: 0,
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        width: 380,
        height: 500
      }
    }, /*#__PURE__*/React.createElement("style", null, "@keyframes cl-docmove{0%{transform:translate(var(--sx),var(--sy)) rotate(var(--sr));opacity:0}12%{opacity:1}32%{transform:translate(var(--tx),var(--ty)) rotate(0deg);opacity:1}72%{transform:translate(var(--tx),var(--ty)) rotate(0deg);opacity:1}86%{opacity:0}100%{transform:translate(var(--sx),var(--sy)) rotate(var(--sr));opacity:0}}"), defs.map((d, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 178,
        height: 240,
        background: d.img ? "#fff" : "linear-gradient(180deg,#fff,#eef0ec)",
        boxShadow: "0 20px 50px rgb(0 0 0 / 45%)",
        borderTop: d.accent ? "4px solid var(--signal)" : "none",
        zIndex: i,
        animation: "cl-docmove 8s ease-in-out infinite",
        animationDelay: `${-i * 0.4}s`,
        "--sx": `${d.sx}px`,
        "--sy": `${d.sy}px`,
        "--sr": `${d.sr}deg`,
        "--tx": `${d.tx}px`,
        "--ty": `${d.ty}px`
      }
    }, d.img ? /*#__PURE__*/React.createElement("img", {
      src: d.img,
      alt: "",
      style: {
        display: "block",
        width: "100%"
      }
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 16,
        right: 16,
        top: 20,
        height: 8,
        background: "#d6dbd7",
        boxShadow: "0 20px 0 #d6dbd7, 0 40px 0 #e4e8e3, 0 60px 0 #e4e8e3"
      }
    }))));
  }
  function Hero() {
    const shell = window.shellStyle;
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        height: "calc(100vh - 58px)",
        minHeight: 700,
        maxHeight: 940,
        overflow: "hidden",
        isolation: "isolate",
        color: "#fff",
        background: "#050605"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        zIndex: -1,
        background: "radial-gradient(120% 100% at 78% 42%, #0e130f 0%, #070807 55%, #050605 100%)"
      }
    }), /*#__PURE__*/React.createElement(DocStream, null), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        zIndex: 1,
        inset: 0,
        background: "linear-gradient(90deg, rgb(5 6 5 / 96%) 0%, rgb(5 6 5 / 74%) 42%, rgb(5 6 5 / 10%) 78%)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        zIndex: 1,
        inset: 0,
        background: "linear-gradient(0deg, rgb(5 6 5 / 42%), transparent 42%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        ...shell,
        position: "relative",
        height: "100%",
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        zIndex: 4,
        top: "50%",
        left: 0,
        width: "min(760px, 56vw)",
        transform: "translateY(-45%)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 26
      }
    }, /*#__PURE__*/React.createElement(Kicker, null, "Intelligence for everyday work")), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        color: "#fff",
        fontSize: "clamp(58px, 7.5vw, 112px)",
        fontWeight: 800,
        lineHeight: 0.88,
        textTransform: "uppercase"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block"
      }
    }, "Intelligent"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block"
      }
    }, "workflows."), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block"
      }
    }, "Clear paths.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 30,
        marginTop: 34,
        paddingTop: 20,
        borderTop: "1px solid rgb(255 255 255 / 35%)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        flex: "1 1 auto",
        maxWidth: 560,
        margin: 0,
        color: "rgb(255 255 255 / 80%)",
        fontSize: 16,
        lineHeight: 1.5
      }
    }, "Scattered information becomes an ordered flow \u2014 CloudLotse brings order to the daily data chaos."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      arrow: true,
      href: "mailto:thorsten.voigt@cloudlotse.de?subject=CloudLotse%20workflow%20review"
    }, "Review a workflow"))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        zIndex: 4,
        right: 0,
        bottom: 28,
        maxWidth: 320,
        color: "rgb(255 255 255 / 62%)",
        fontSize: 9,
        fontWeight: 750,
        lineHeight: 1.45,
        textAlign: "right",
        textTransform: "uppercase"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        display: "block",
        marginBottom: 7,
        color: "#fff",
        fontSize: 11
      }
    }, "From clutter to clarity"), "Links, PDFs, photos and notes find their place.")));
  }
  function Intro() {
    const shell = window.shellStyle;
    const rows = [{
      n: "01",
      head: /*#__PURE__*/React.createElement(React.Fragment, null, "Recognise ", /*#__PURE__*/React.createElement("em", {
        style: {
          color: "var(--signal)",
          fontStyle: "normal"
        }
      }, "information")),
      desc: "Requirements, sources and context are captured automatically — nothing has to be searched twice."
    }, {
      n: "02",
      head: "Connect knowledge",
      desc: "Links, PDFs, photos and notes are linked to the right project and made usable."
    }, {
      n: "03",
      head: "Prepare work",
      desc: "A review-ready foundation is assembled. Your team decides — it no longer searches."
    }];
    const [active, setActive] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setActive(a => (a + 1) % rows.length), 1800);
      return () => clearInterval(id);
    }, []);
    return /*#__PURE__*/React.createElement("section", {
      id: "possibilities",
      style: {
        display: "grid",
        alignItems: "center",
        padding: "100px 0",
        background: "var(--paper)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...shell,
        display: "grid",
        gridTemplateColumns: "minmax(220px, .42fr) minmax(0, 1.58fr)",
        gap: 60,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "What becomes possible"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "14px 0 0",
        color: "var(--ink)",
        fontSize: "clamp(40px, 4vw, 62px)",
        fontWeight: 800,
        lineHeight: 0.9,
        textTransform: "uppercase"
      }
    }, "From chaos to ", /*#__PURE__*/React.createElement("em", {
      style: {
        color: "var(--signal)",
        fontStyle: "normal"
      }
    }, "clarity."))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid var(--ink)"
      }
    }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: r.n,
      style: {
        position: "relative",
        display: "grid",
        gridTemplateColumns: "92px 1fr minmax(0, 320px)",
        gap: 30,
        alignItems: "center",
        padding: "34px 0 34px 22px",
        borderBottom: "1px solid var(--line)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        background: "var(--signal)",
        transform: active === i ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: "transform .4s ease"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 44,
        fontWeight: 800,
        color: "var(--signal)",
        lineHeight: 1
      }
    }, r.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "clamp(30px, 3vw, 40px)",
        fontWeight: 800,
        textTransform: "uppercase",
        lineHeight: 0.95,
        color: "var(--ink)"
      }
    }, r.head), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        lineHeight: 1.55,
        color: "#555e58"
      }
    }, r.desc))))));
  }
  Object.assign(window, {
    Hero,
    Intro
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ChapterNav = __ds_scope.ChapterNav;

__ds_ns.GalleryCase = __ds_scope.GalleryCase;

__ds_ns.TrustRow = __ds_scope.TrustRow;

__ds_ns.Brand = __ds_scope.Brand;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.LanguageToggle = __ds_scope.LanguageToggle;

__ds_ns.ProofStep = __ds_scope.ProofStep;

__ds_ns.SystemFlow = __ds_scope.SystemFlow;

__ds_ns.TimeBar = __ds_scope.TimeBar;

})();
