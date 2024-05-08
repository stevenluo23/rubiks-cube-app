import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, backgroundColor = "bg-slate-300" }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick();
    }
    // Prevent accidental button selection
    e.currentTarget.blur();
  };

  // Prevent starting a timer when pressing the space bar on a button
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const buttonClass = `${backgroundColor} select-none rounded-md p-2 transition-colors duration-200 hover:brightness-110 focus:ring-2 focus:ring-slate-400 active:bg-slate-400`;

  return (
    <button className={buttonClass} onClick={handleClick} onKeyDown={handleKeyDown}>
      {children}
    </button>
  );
};

export default Button;
