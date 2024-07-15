import { useEffect, useState } from "react";
import "./App.css";
import { DirectionType, useDirection } from "./useDirection";

type SnakeOffset = {
  x: number;
  y: number;
};

const initialSnake = { x: 7, y: 7 };
const maxLength = 20;

function App() {
  const [snake, setSnake] = useState<SnakeOffset>(initialSnake);
  const [isLost, setIsLost] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<number | undefined>();
  const direction = useDirection(isLost);
  const xGrid = Array.from(Array(maxLength).keys());
  const yGrid = Array.from(Array(maxLength).keys());

  function handleDirection() {
    console.log(direction);
    if (direction === DirectionType.Up) {
      setSnake((oldSnake) => {
        if (oldSnake.x <= 0) {
          setIsLost(true);
          return { ...oldSnake, x: 0 };
        } else {
          return { ...oldSnake, x: oldSnake.x-- };
        }
      });
    } else if (direction === DirectionType.Down) {
      setSnake((oldSnake) => {
        if (oldSnake.x >= maxLength) {
          setIsLost(true);
          return { ...oldSnake, x: maxLength };
        } else {
          return { ...oldSnake, x: oldSnake.x++ };
        }
      });
    } else if (direction === DirectionType.Left) {
      setSnake((oldSnake) => {
        if (oldSnake.y <= 0) {
          setIsLost(true);
          return { ...oldSnake, y: 0 };
        } else {
          return { ...oldSnake, y: oldSnake.y-- };
        }
      });
    } else if (direction === DirectionType.Right) {
      setSnake((oldSnake) => {
        if (oldSnake.y >= maxLength) {
          setIsLost(true);
          return { ...oldSnake, y: maxLength };
        } else {
          return { ...oldSnake, y: oldSnake.y++ };
        }
      });
    }
  }

  function handleStart() {
    setSnake(initialSnake);
    setTimerId(undefined);
    setIsLost(false);
  }

  useEffect(() => {
    if (isLost) {
      clearInterval(timerId);
      setTimerId(undefined);
    }
  }, [isLost]);

  useEffect(() => {
    let interval: number | undefined;
    if (!isLost) {
      interval = setInterval(handleDirection, 300);
    }
    if (!timerId && interval && !isLost) {
      setTimerId(interval);
    }
    return () => {
      if (timerId !== interval) {
        clearInterval(interval);
      }
    };
  }, [timerId, isLost, snake, direction]);

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
                      snake.x === numX && snake.y === numY
                        ? "blink_animation"
                        : ""
                    }
                    style={{
                      border: "0.1px solid rgba(0, 0, 0, 0.2)",
                      width: "20px",
                      height: "20px",
                      margin: 0,
                      padding: 0,
                      background:
                        snake.x === numX && snake.y === numY
                          ? "rgba(255, 99, 71, 0.9)"
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
