import { CSSProperties, ReactNode } from "react";

export interface TrustRowProps {
  /** Orange index, e.g. "01". */
  n: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}

/** Numbered assurance row — bold claim over a supporting line, on a hairline. */
export function TrustRow(props: TrustRowProps): JSX.Element;
