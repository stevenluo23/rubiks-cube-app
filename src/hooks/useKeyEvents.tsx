import { useEffect } from "react";

interface KeyActions {
  key: string;
  keydownAction: () => void;
  keyupAction: () => void;
}

export function useKeyEvents({ key, keydownAction, keyupAction }: KeyActions) {
  useEffect(() => {
    const keydownCallback = (e: KeyboardEvent) => {
      if (!e.repeat && (key.toLowerCase() === "any" || e.key.toLowerCase() === key.toLowerCase())) {
        keydownAction();
      }
    };

    const keyupCallback = (e: KeyboardEvent) => {
      if (key.toLowerCase() === "any" || e.key.toLowerCase() === key.toLowerCase()) {
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
