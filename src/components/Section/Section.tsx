import type { ReactNode } from "react";
import style from "./Section.module.css";

interface SectionsProps {
  children: ReactNode;
}

export default function Section({ children }: SectionsProps) {
  return <section className={style.section}>{children}</section>;
}
