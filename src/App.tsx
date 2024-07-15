import { useEffect, useState } from "react";
import "./App.css";

enum DirectionType {
  Up,
  Right,
  Down,
  Left,
}

type SnakeOffset = {
  x: number;
  y: number;
};

const initialSnake = { x: 7, y: 7 };
function App() {
  const [snake, setSnake] = useState<SnakeOffset>(initialSnake);
  const [direction, setDirection] = useState<DirectionType>(DirectionType.Up);
  const [isLost, setIsLost] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<number | undefined>();
  const xGrid = Array.from(Array(20).keys());
  const yGrid = Array.from(Array(20).keys());

  function handleDirection() {
    if (direction === DirectionType.Up) {
      setSnake((oldSnake) => {
        if (oldSnake.x <= 0) {
          setIsLost(true);
          return { ...oldSnake, x: 0 };
        } else {
          return { ...oldSnake, x: oldSnake.x - 1 };
        }
      });
    } else if (direction === DirectionType.Down) {
    } else if (direction === DirectionType.Left) {
    } else if (direction === DirectionType.Right) {
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
  }, [timerId, isLost, snake]);

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
