import { useEffect } from "react";

interface KeyActions {
  keydownAction: (e: KeyboardEvent) => void;
  keyupAction: (e: KeyboardEvent) => void;
}

export function useKeyEvents({ keydownAction, keyupAction }: KeyActions) {
  useEffect(() => {
    const keydownCallback = (e: KeyboardEvent) => {
      if (!e.repeat) {
        keydownAction(e);
      }
    };

    const keyupCallback = (e: KeyboardEvent) => {
      keyupAction(e);
    };

    document.addEventListener("keydown", keydownCallback);
    document.addEventListener("keyup", keyupCallback);

    return () => {
      document.removeEventListener("keydown", keydownCallback);
      document.removeEventListener("keyup", keyupCallback);
    };
  }, [keydownAction, keyupAction]);
}
