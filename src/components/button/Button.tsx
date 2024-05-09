import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, backgroundColor = "bg-slate-300", size = "medium", disabled = false }) => {
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

  const fontSize = size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base";
  const baseButtonClass = `${backgroundColor} ${fontSize} select-none rounded-md p-2 transition-colors duration-200 focus:ring-2 focus:ring-slate-400`;
  const hoverActiveClass = "hover:brightness-110 active:bg-slate-400";
  const disabledClass = "opacity-50";

  return (
    <button
      className={`${baseButtonClass} ${disabled ? disabledClass : hoverActiveClass}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
