import { useRef, useState } from "react";

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const toggleModal = () => {
    if (!modalRef.current) {
      return;
    }
    if (modalRef.current.hasAttribute("open")) {
      modalRef.current.close();
      // Remove focus from the button that opened the modal
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } else {
      modalRef.current.showModal();
    }
  };

  return { modalRef, modalContent, setModalContent, toggleModal };
};

export default useModal;
