import { useEffect } from "react";

const useDisableKeys = (isDisabled: () => boolean, keysToDisable: string[]) => {
  useEffect(() => {
    const disableKeyboardInput = (event: KeyboardEvent) => {
      if (keysToDisable.includes(event.key) && isDisabled()) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("keydown", disableKeyboardInput, true);
    return () => {
      window.removeEventListener("keydown", disableKeyboardInput, true);
    };
  }, [isDisabled, keysToDisable]);
};

export default useDisableKeys;
