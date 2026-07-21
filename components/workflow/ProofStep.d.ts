import { CSSProperties, ReactNode } from "react";

export interface ProofStepProps {
  /** Step number shown in the orange dot. */
  n: ReactNode;
  /** Step description. */
  label: ReactNode;
  /** Trailing status tag, e.g. "recognised". */
  status?: ReactNode;
  style?: CSSProperties;
}

/** One numbered step of a CloudLotse "Recognise · Connect · Prepare" workflow list. */
export function ProofStep(props: ProofStepProps): JSX.Element;
