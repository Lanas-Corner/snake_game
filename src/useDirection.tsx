import { useEffect, useState } from "react";

export enum DirectionType {
  Up,
  Right,
  Down,
  Left,
}

export function useDirection(isLost: boolean) {
  const [direction, setDirection] = useState<DirectionType>(DirectionType.Up);

  function handleKeyDown(e: KeyboardEvent) {
    if (!isLost) {
      if (e.key === "ArrowUp") {
        setDirection(DirectionType.Up);
      } else if (e.key === "ArrowDown") {
        setDirection(DirectionType.Down);
      } else if (e.key === "ArrowLeft") {
        setDirection(DirectionType.Left);
      } else if (e.key === "ArrowRight") {
        setDirection(DirectionType.Right);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return direction;
}
