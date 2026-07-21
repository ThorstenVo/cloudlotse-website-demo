import { ReactNode, CSSProperties } from "react";

export interface KickerProps {
  children?: ReactNode;
  onDark?: boolean;
  style?: CSSProperties;
}

/** Orange eyebrow with a short leading rule — introduces a hero or section. */
export function Kicker(props: KickerProps): JSX.Element;
