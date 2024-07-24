import { useEffect, useState } from "react";
import "./App.css";
import { DirectionType, useDirection } from "./useDirection";
import { getRandomOffset } from "./utils";

export type SnakeOffset = {
  x: number;
  y: number;
};

const firstOffset = { x: 7, y: 7 };
const secondOffset = { x: 8, y: 7 };
const thirdOffset = { x: 9, y: 7 };
const maxLength = 20;

function App() {
  const [snake, setSnake] = useState<SnakeOffset[]>([
    firstOffset,
    secondOffset,
    thirdOffset,
  ]);
  const [isLost, setIsLost] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<number | undefined>();
  const [apple, setApple] = useState<SnakeOffset>();
  const { direction, resetDirection } = useDirection(isLost);
  const xGrid = Array.from(Array(maxLength).keys());
  const yGrid = Array.from(Array(maxLength).keys());

  function handleDirection() {
    if (direction === DirectionType.Up) {
      setSnake((oldSnake) => {
        const firstEl = oldSnake[0];
        if (firstEl.x <= 0) {
          setIsLost(true);
          return oldSnake;
        } else {
          const newOffset = {
            x: firstEl.x - 1,
            y: firstEl.y,
          };
          const snake = oldSnake.slice(0, oldSnake.length - 1);
          return [newOffset, ...snake];
        }
      });
    } else if (direction === DirectionType.Down) {
      setSnake((oldSnake) => {
        const firstEl = oldSnake[0];
        if (firstEl.x >= maxLength - 1) {
          setIsLost(true);
          return oldSnake;
        } else {
          const newOffset = {
            x: firstEl.x + 1,
            y: firstEl.y,
          };
          const snake = oldSnake.slice(0, oldSnake.length - 1);
          return [newOffset, ...snake];
        }
      });
    } else if (direction === DirectionType.Left) {
      setSnake((oldSnake) => {
        const firstEl = oldSnake[0];
        if (firstEl.y <= 0) {
          setIsLost(true);
          return oldSnake;
        } else {
          const newOffset = {
            x: firstEl.x,
            y: firstEl.y - 1,
          };
          const snake = oldSnake.slice(0, oldSnake.length - 1);
          return [newOffset, ...snake];
        }
      });
    } else if (direction === DirectionType.Right) {
      setSnake((oldSnake) => {
        const firstEl = oldSnake[0];
        if (firstEl.y >= maxLength - 1) {
          setIsLost(true);
          return oldSnake;
        } else {
          const newOffset = {
            x: firstEl.x,
            y: firstEl.y + 1,
          };
          const snake = oldSnake.slice(0, oldSnake.length - 1);
          return [newOffset, ...snake];
        }
      });
    }
  }

  function handleStart() {
    setSnake([firstOffset, secondOffset, thirdOffset]);
    resetDirection();
    setTimerId(undefined);
    setIsLost(false);
  }

  useEffect(() => {
    if (isLost) {
      clearInterval(timerId);
      setTimerId(undefined);
    } else if (!apple) {
      let newApple = getRandomOffset(maxLength, snake);
      setApple(newApple);
    }
  }, [isLost]);

  useEffect(() => {
    let interval: number | undefined;
    if (!isLost) {
      interval = setInterval(handleDirection, 1000);
    }
    if (!timerId && interval && !isLost) {
      setTimerId(interval);
    }
    return () => {
      if (timerId !== interval) {
        clearInterval(interval);
      }
    };
  }, [timerId, isLost, direction]);

  return (
    <div
      style={{
        border: "1px solid rgba(255, 99, 71, 0.5)",
        width: 360,
        height: 440,
        margin: "130px auto",
        padding: 0,
        position: "relative",
      }}
    >
      <div style={{ opacity: isLost ? "0.3" : "1" }}>
        <table style={{ borderSpacing: 0 }}>
          <tbody style={{}}>
            {xGrid.map((numX) => (
              <tr style={{ margin: 0, padding: 0 }} key={numX}>
                {yGrid.map((numY) => (
                  <th
                    className={
                      !!snake.find((pos) => pos.x == numX && pos.y == numY)
                        ? "blink_animation"
                        : ""
                    }
                    style={{
                      border: "0.1px solid rgba(0, 0, 0, 0.2)",
                      width: "20px",
                      height: "20px",
                      margin: 0,
                      padding: 0,
                      background: snake.find(
                        (pos) => pos.x == numX && pos.y == numY
                      )
                        ? "rgba(255, 99, 71, 0.9)"
                        : apple?.x === numX && apple?.y === numY
                        ? "rgba(238, 172, 74, 0.828)"
                        : "",
                    }}
                    key={numY}
                  ></th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLost && (
        <div
          style={{
            position: "absolute",
            background: "rgba(255, 99, 71, 1)",
            top: 130,
            color: "white",
            width: "100%",
            boxSizing: "border-box",
            padding: "20px",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: "28px",
            }}
          >
            Game over
          </h1>
          <button
            style={{
              backgroundColor: "white",
              padding: "8px 40px",
              outline: "none",
              border: "none",
              borderRadius: "20px",
              color: "rgba(255, 99, 71, 1)",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={handleStart}
          >
            play
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
