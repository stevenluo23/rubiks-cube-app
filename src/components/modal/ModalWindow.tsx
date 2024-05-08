import { forwardRef } from "react";

type ModalWindowProps = {
  children: React.ReactNode;
  toggleModal: () => void;
};

const ModalWindow = forwardRef<HTMLDialogElement, ModalWindowProps>(({ children, toggleModal }, ref) => {
  console.log("modal window");
  return (
    <dialog
      className="rounded-xl bg-white p-0 shadow"
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleModal();
        }
      }}
    >
      <div className="p-6">{children}</div>
    </dialog>
  );
});

export default ModalWindow;
