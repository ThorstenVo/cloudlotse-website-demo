import { CSSProperties, ReactNode } from "react";

export interface TimeBarProps {
  /** Row label, e.g. "before" / "with flow". */
  label: ReactNode;
  /** Fill width 0–100. */
  percent: number;
  /** Value shown at the end, e.g. "130 m". */
  value: ReactNode;
  /** True for the improved "after" row — fills green instead of orange. */
  after?: boolean;
  style?: CSSProperties;
}

/** One row of an illustrative before/after time comparison. */
export function TimeBar(props: TimeBarProps): JSX.Element;
