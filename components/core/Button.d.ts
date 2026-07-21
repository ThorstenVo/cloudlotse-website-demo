import { ReactNode, CSSProperties, MouseEventHandler } from "react";

export interface ButtonProps {
  /** Visual style. `primary` = orange fill; `outline` = white border on dark; `ghost` = ink border on light. */
  variant?: "primary" | "outline" | "ghost";
  /** Render as a link when set, otherwise a <button>. */
  href?: string;
  children?: ReactNode;
  /** Append the CloudLotse `→` glyph. */
  arrow?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
}

/**
 * CloudLotse call-to-action button. Square corners, uppercase, weight 800.
 * @startingPoint section="Core" subtitle="Primary, outline & ghost CTA buttons" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
