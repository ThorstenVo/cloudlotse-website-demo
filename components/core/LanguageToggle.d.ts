import { CSSProperties } from "react";

export interface LanguageToggleProps {
  /** Language codes, uppercase. */
  languages?: string[];
  /** Currently active code (rendered filled orange). */
  active?: string;
  onChange?: (code: string) => void;
  style?: CSSProperties;
}

/** CloudLotse bilingual DE/EN switch. Sits on dark chrome; active cell is orange. */
export function LanguageToggle(props: LanguageToggleProps): JSX.Element;
