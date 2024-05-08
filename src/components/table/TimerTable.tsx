import React, { useEffect, useRef, useState } from "react";
import { Solve } from "../../lib";
import SolveRow from "./SolveRow";
import Button from "../button/Button";
import ModalWindow from "../modal/ModalWindow";
import { calculateAo5 } from "../../utils";

interface TimerTableProps {
  solves: Solve[];
  clearSolves: () => void;
  setSolves: React.Dispatch<React.SetStateAction<Solve[]>>;
}

const TimerTable: React.FC<TimerTableProps> = ({ solves, clearSolves, setSolves }) => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open dialog to confirm clearing all solves
  const handleOpenClearModal = () => {
    setDialogContent(
      <>
        <span>Clear all solves?</span>
        <div className="mt-4 flex justify-evenly">
          <Button onClick={() => toggleDialog()}>No</Button>
          <Button backgroundColor="bg-blue-300" onClick={confirmClear}>
            Yes
          </Button>
        </div>
      </>,
    );
    toggleDialog();
  };

  // Open dialog to confirm deletion of solve
  const handleOpenDeleteModal = (solve: Solve) => {
    setDialogContent(
      <>
        <span>Delete this solve?</span>
        <div className="mt-4 flex justify-evenly">
          <Button onClick={() => toggleDialog()}>No</Button>
          <Button backgroundColor="bg-blue-300" onClick={() => confirmRemove(solve)}>
            Yes
          </Button>
        </div>
      </>,
    );
    toggleDialog();
  };

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
      // Remove focus from the button that opened the dialog
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } else {
      dialogRef.current.showModal();
    }
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
    toggleDialog();
  };

  const confirmClear = () => {
    clearSolves();
    toggleDialog();
  };

  // Disable spacebar starting timer when dialog is open
  useEffect(() => {
    const disableKeyboardInput = (event: KeyboardEvent) => {
      if (dialogRef.current && dialogRef.current.open) {
        const keysToDisable = [" "];
        if (keysToDisable.includes(event.key)) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };

    window.addEventListener("keydown", disableKeyboardInput, true);
    return () => {
      window.removeEventListener("keydown", disableKeyboardInput, true);
    };
  }, [dialogRef]);

  return (
    <>
      {/* Table for displaying solves */}
      <div className="custom-border absolute bottom-0 left-0 top-[13.5rem] z-20 space-y-3 border-orange-200 bg-orange-300 max-[768px]:bottom-[11.8vw] max-[768px]:top-auto">
        <Button onClick={handleOpenClearModal}>Clear Solves</Button>
        <div
          className={`no-scrollbar ${solves.length === 0 ? "h-auto" : "h-[90%] touch-pan-y overflow-x-hidden overflow-y-scroll overscroll-contain max-[768px]:max-h-[9.5rem]"}`}
        >
          <table className="w-full max-w-[13.5rem] table-fixed">
            <thead>
              <tr>
                <th colSpan={3}>Solves: {solves.length}</th>
              </tr>
              <tr>
                <th className="text-blue-600">#</th>
                <th className="text-blue-600">time</th>
                <th className="text-blue-600">ao5</th>
              </tr>
            </thead>
            <tbody>
              {[...solves].reverse().map((solve, idx, self) => (
                <SolveRow key={idx} index={self.length - idx} solve={solve} onModalOpen={() => handleOpenDeleteModal(solve)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalWindow ref={dialogRef} toggleDialog={toggleDialog}>
        {dialogContent}
      </ModalWindow>
    </>
  );
};

export default TimerTable;
