import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick();
    }
    // Prevent accidental button selection
    e.currentTarget.blur();
  };

  return (
    <button
      className="select-none rounded-md bg-slate-300 p-2 transition-colors duration-200 hover:bg-slate-200 focus:outline-none active:bg-slate-400"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
