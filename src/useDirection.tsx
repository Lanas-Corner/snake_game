import { useEffect, useState } from "react";

export enum DirectionType {
  Up,
  Right,
  Down,
  Left,
}

const initialDirection = DirectionType.Up;

export function useDirection(isLost: boolean) {
  const [direction, setDirection] = useState<DirectionType>(initialDirection);

  function handleKeyDown(e: KeyboardEvent) {
    if (!isLost) {
      if (e.key === "ArrowUp") {
        setDirection((direction) =>
          direction !== DirectionType.Down ? DirectionType.Up : direction
        );
      } else if (e.key === "ArrowDown") {
        setDirection((direction) =>
          direction !== DirectionType.Up ? DirectionType.Down : direction
        );
      } else if (e.key === "ArrowLeft") {
        setDirection((direction) =>
          direction !== DirectionType.Right ? DirectionType.Left : direction
        );
      } else if (e.key === "ArrowRight") {
        setDirection((direction) =>
          direction !== DirectionType.Left ? DirectionType.Right : direction
        );
      }
    }
  }

  function resetDirection() {
    setDirection(initialDirection);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { direction, resetDirection };
}
