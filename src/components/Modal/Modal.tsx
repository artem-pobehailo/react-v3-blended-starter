import { ReactNode } from "react";
import css from "./Modal.module.css";
interface ModalProps {
  children: ReactNode;
}
export default function Modal({ children }: ModalProps) {
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{children}</div>
    </div>
  );
}
