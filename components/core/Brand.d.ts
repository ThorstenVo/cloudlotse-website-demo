import { CSSProperties } from "react";

export interface BrandProps {
  /** Mark edge length in px; the wordmark scales from it. */
  size?: number;
  /** True on dark chrome (lighter green tones); false on light. */
  onDark?: boolean;
  /** Wordmark text. "CloudLotse" gets the two-tone Cloud/Lotse split; any other string renders in the dark-green tone. */
  wordmark?: string;
  /** Set false to render the mark alone. */
  showWordmark?: boolean;
  href?: string;
  style?: CSSProperties;
}

/** CloudLotse brand lockup — the navigator double-chevron mark beside the two-tone wordmark. */
export function Brand(props: BrandProps): JSX.Element;
