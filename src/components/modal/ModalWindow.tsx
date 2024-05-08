import { forwardRef } from "react";

type ModalWindowProps = {
  children: React.ReactNode;
  toggleDialog: () => void;
};

const ModalWindow = forwardRef<HTMLDialogElement, ModalWindowProps>(({ children, toggleDialog }, ref) => {
  return (
    <dialog
      className="rounded-xl bg-white p-0 shadow"
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <div className="p-6">{children}</div>
    </dialog>
  );
});

export default ModalWindow;
