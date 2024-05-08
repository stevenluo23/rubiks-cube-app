import React from "react";
import { Solve } from "../../lib";
import Button from "../button/Button";
import ModalWindow from "../modal/ModalWindow";
import { calculateAo5 } from "../../utils";
import useDisableKeys from "../../hooks/useDisableKeys";
import useModal from "../../hooks/useModal";
import ConfirmModalContent from "../modal/ConfirmModalContent";
import SolvesTable from "./SolvesTable";

interface TimerTableProps {
  solves: Solve[];
  clearSolves: () => void;
  setSolves: React.Dispatch<React.SetStateAction<Solve[]>>;
}

const TimerTable: React.FC<TimerTableProps> = ({ solves, clearSolves, setSolves }) => {
  const { modalRef, modalContent, setModalContent, toggleModal } = useModal();
  // Disable spacebar starting timer when modal is open and escape key to close modal
  useDisableKeys((modalRef.current && modalRef.current.open) || false, [" ", "Escape"]);

  // Open dialog to confirm clearing all solves
  const handleOpenClearModal = () => {
    setModalContent(<ConfirmModalContent message="Clear all solves?" onConfirm={confirmClear} onCancel={toggleModal} />);
    toggleModal();
  };

  // Open modal to confirm deletion of solve
  const handleOpenDeleteModal = (solve: Solve) => {
    setModalContent(<ConfirmModalContent message="Delete this solve?" onConfirm={() => confirmRemove(solve)} onCancel={toggleModal} />);
    toggleModal();
  };

  // Remove solve from solves array and recalculate ao5 for the last five solves
  const confirmRemove = (solveToRemove: Solve) => {
    const newSolves = solves
      .filter((solve) => solve !== solveToRemove)
      .map((solve, idx, self) => {
        if (idx < 4) {
          return { ...solve, ao5: null };
        }

        const lastFiveSolves = self.slice(idx - 4, idx + 1);
        const ao5 = calculateAo5(lastFiveSolves);

        return { ...solve, ao5 };
      });

    setSolves(newSolves);
    toggleModal();
  };

  const confirmClear = () => {
    clearSolves();
    toggleModal();
  };

  return (
    <>
      {/* Table for displaying solves */}
      <div className="custom-border absolute bottom-0 left-0 top-[13.5rem] z-20 space-y-3 border-orange-200 bg-orange-300 max-[768px]:bottom-[11.8vw] max-[768px]:top-auto">
        <Button onClick={handleOpenClearModal}>Clear Solves</Button>
        <div
          className={`no-scrollbar ${solves.length === 0 ? "h-auto" : "h-[90%] touch-pan-y overflow-x-hidden overflow-y-scroll overscroll-contain max-[768px]:max-h-[9.5rem]"}`}
        >
          <SolvesTable solves={solves} onModalOpen={handleOpenDeleteModal} />
        </div>
      </div>
      <ModalWindow ref={modalRef} toggleModal={toggleModal}>
        {modalContent}
      </ModalWindow>
    </>
  );
};

export default TimerTable;
