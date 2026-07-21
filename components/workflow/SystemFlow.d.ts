import { CSSProperties, ReactNode } from "react";

export interface SystemFlowNode {
  /** Small uppercase tag, e.g. "01 / Input". */
  tag: ReactNode;
  /** Node title, e.g. "Customer enquiry". */
  title: ReactNode;
}

export interface SystemFlowProps {
  nodes: SystemFlowNode[];
  style?: CSSProperties;
}

/**
 * Horizontal process-flow diagram — bordered paper nodes joined by orange CSS arrows.
 * @startingPoint section="Workflow" subtitle="Node → node process flow diagram" viewport="700x260"
 */
export function SystemFlow(props: SystemFlowProps): JSX.Element;
