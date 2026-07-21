import { CSSProperties, ReactNode } from "react";

export interface Chapter {
  id: string;
  /** Two-digit number, e.g. "01". */
  no: ReactNode;
  title: ReactNode;
  href?: string;
}

export interface ChapterNavProps {
  chapters: Chapter[];
  /** Active chapter id; defaults to the first. */
  active?: string;
  onSelect?: (id: string) => void;
  style?: CSSProperties;
}

/** Sticky dark service-tab bar; the active tab flips to orange. */
export function ChapterNav(props: ChapterNavProps): JSX.Element;
