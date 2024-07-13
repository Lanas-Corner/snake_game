import { useState } from "react";
import "./App.css";

function App() {
  const [snake, setSnake] = useState({ x: 5, y: 7 });
  const xGrid = Array.from(Array(20).keys());
  const yGrid = Array.from(Array(20).keys());
  return (
    <div
      style={{
        border: "1px solid rgba(255, 99, 71, 0.5)",
        width: 360,
        height: 440,
        margin: "130px auto",
        padding: 0,
      }}
    >
      <table style={{ borderSpacing: 0 }}>
        <tbody style={{}}>
          {xGrid.map((numX) => (
            <tr style={{ margin: 0, padding: 0 }}>
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
                ></th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
