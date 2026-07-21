import { ReactNode, CSSProperties } from "react";

export interface LabelProps {
  children?: ReactNode;
  /** Text colour; defaults to muted grey. Use var(--signal) for orange. */
  color?: string;
  style?: CSSProperties;
}

/** Tiny uppercase eyebrow label used to name a block ("What becomes possible"). */
export function Label(props: LabelProps): JSX.Element;
