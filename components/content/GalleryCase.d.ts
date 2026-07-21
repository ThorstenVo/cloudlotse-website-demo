import { CSSProperties, ReactNode } from "react";

export interface GalleryCaseProps {
  /** Background image URL. */
  src: string;
  alt?: string;
  /** Orange eyebrow, e.g. "Sales". */
  eyebrow?: ReactNode;
  title: ReactNode;
  minHeight?: number;
  style?: CSSProperties;
}

/** Full-bleed use-case image tile with a darkening scrim and bottom caption. */
export function GalleryCase(props: GalleryCaseProps): JSX.Element;
