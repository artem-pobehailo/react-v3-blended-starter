import { ReactNode } from "react";
import css from "./Modal.module.css";
<<<<<<< Updated upstream
interface ModalProps {
  children: ReactNode;
}
export default function Modal({ children }: ModalProps) {
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{children}</div>
    </div>
  );
=======

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children }: ModalProps) {
  <div className={css.backdrop} role="dialog" aria-modal="true">
    <div className={css.modal}>{children}</div>
  </div>;
>>>>>>> Stashed changes
}
