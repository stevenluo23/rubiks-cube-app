import React from "react";
import Button from "../button/Button";

interface ConfirmModalContentProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModalContent: React.FC<ConfirmModalContentProps> = ({ message, onConfirm, onCancel }) => (
  <>
    <span>{message}</span>
    <div className="mt-4 flex justify-evenly">
      <Button onClick={onCancel}>No</Button>
      <Button backgroundColor="bg-blue-300" onClick={onConfirm}>
        Yes
      </Button>
    </div>
  </>
);

export default ConfirmModalContent;
