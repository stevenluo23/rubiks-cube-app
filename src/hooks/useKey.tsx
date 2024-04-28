import { useEffect, useRef } from "react";

interface KeyActions {
  key: string;
  keydownAction: () => void;
  keyupAction: () => void;
}

function useKey({ key, keydownAction, keyupAction }: KeyActions) {
  const keyHeldRef = useRef(false);

  useEffect(() => {
    const keydownCallback = (e: KeyboardEvent) => {
      if (key.toLowerCase() === "any" || (e.key.toLowerCase() === key.toLowerCase() && !keyHeldRef.current)) {
        keyHeldRef.current = true;
        keydownAction();
      }
    };

    const keyupCallback = (e: KeyboardEvent) => {
      if (key.toLowerCase() === "any" || e.key.toLowerCase() === key.toLowerCase()) {
        keyHeldRef.current = false;
        keyupAction();
      }
    };

    document.addEventListener("keydown", keydownCallback);
    document.addEventListener("keyup", keyupCallback);

    return () => {
      document.removeEventListener("keydown", keydownCallback);
      document.removeEventListener("keyup", keyupCallback);
    };
  }, [key, keydownAction, keyupAction]);
}

export default useKey;
