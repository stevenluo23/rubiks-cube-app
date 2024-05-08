import { useEffect } from "react";

const useDisableKeys = (condition: boolean, keysToDisable: string[]) => {
  useEffect(() => {
    const disableKeyboardInput = (event: KeyboardEvent) => {
      if (condition && keysToDisable.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("keydown", disableKeyboardInput, true);
    return () => {
      window.removeEventListener("keydown", disableKeyboardInput, true);
    };
  }, [condition, keysToDisable]);
};

export default useDisableKeys;
