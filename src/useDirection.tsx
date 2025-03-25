import { useEffect, useRef, useState } from "react";

export enum DirectionType {
  Up,
  Right,
  Down,
  Left,
}

const initialDirection = DirectionType.Up;

export function useDirection(isLost: boolean) {
  const [direction, setDirection] = useState<DirectionType>(initialDirection);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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

  function handleTouchStart(e: TouchEvent) {
    if (!isLost) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!touchStartRef.current || isLost) return;

    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const startX = touchStartRef.current.x;
    const startY = touchStartRef.current.y;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 30) {
        setDirection((direction) =>
          direction !== DirectionType.Left ? DirectionType.Right : direction
        );
      } else if (diffX < -30) {
        setDirection((direction) =>
          direction !== DirectionType.Right ? DirectionType.Left : direction
        );
      }
    } else {
      if (diffY > 30) {
        setDirection((direction) =>
          direction !== DirectionType.Up ? DirectionType.Down : direction
        );
      } else if (diffY < -30) {
        setDirection((direction) =>
          direction !== DirectionType.Down ? DirectionType.Up : direction
        );
      }
    }

    touchStartRef.current = null;
  }

  function resetDirection() {
    setDirection(initialDirection);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return { direction, resetDirection };
}
