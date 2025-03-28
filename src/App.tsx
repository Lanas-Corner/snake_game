import { useEffect, useState } from "react";
import "./App.css";
import { DirectionType, useDirection } from "./useDirection";
import { getRandomOffset } from "./utils";
import Logo from "./assets/Logo.png";

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

  function handleSnake() {
    setSnake((oldSnake) => {
      const firstEl = oldSnake[0];
      if (
        (direction === DirectionType.Up && firstEl.x <= 0) ||
        (direction === DirectionType.Down && firstEl.x >= maxLength - 1) ||
        (direction === DirectionType.Left && firstEl.y <= 0) ||
        (direction === DirectionType.Right && firstEl.y >= maxLength - 1)
      ) {
        setIsLost(true);
        return oldSnake;
      } else {
        let x = firstEl.x;
        let y = firstEl.y;
        switch (direction) {
          case DirectionType.Up:
            x = x - 1;
            break;
          case DirectionType.Down:
            x = x + 1;
            break;
          case DirectionType.Left:
            y = y - 1;
            break;
          default:
            y = y + 1;
            break;
        }
        const newOffset = { x, y };
        if (
          oldSnake.find(
            (offset) => offset.x === newOffset.x && offset.y === newOffset.y
          )
        ) {
          setIsLost(true);
          return oldSnake;
        } else {
          if (newOffset.x == apple?.x && newOffset.y == apple?.y) {
            updateApple([newOffset, ...oldSnake]);
            return [newOffset, ...oldSnake];
          } else {
            const snake = oldSnake.slice(0, oldSnake.length - 1);
            return [newOffset, ...snake];
          }
        }
      }
    });
  }

  function handleStart() {
    setSnake([firstOffset, secondOffset, thirdOffset]);
    resetDirection();
    setTimerId(undefined);
    setIsLost(false);
  }

  function updateApple(newSnake: SnakeOffset[]) {
    let newApple = getRandomOffset(maxLength, newSnake, apple);
    setApple(newApple);
  }

  useEffect(() => {
    if (isLost) {
      clearInterval(timerId);
      setTimerId(undefined);
    } else if (!apple) {
      updateApple(snake);
    }
  }, [isLost]);

  useEffect(() => {
    let interval: number | undefined;
    if (!isLost) {
      interval = setInterval(handleSnake, 200);
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <img src={Logo} alt="logo" width={387} />
      <div
        style={{
          display: "inline-flex",
          margin: "30px auto",
          padding: 0,
          position: "relative",
          touchAction: "none",
        }}
      >
        <div
          style={{
            opacity: isLost ? "0.3" : "1",
            display: "flex",
            border: "1px solid rgba(255, 99, 71, 0.5)",
          }}
        >
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
    </div>
  );
}

export default App;
