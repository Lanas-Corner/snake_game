import { SnakeOffset } from "./App";

export function getRandomOffset(
  max: number,
  snake: SnakeOffset[],
  previous?: SnakeOffset
) {
  let x = Math.floor(Math.random() * max);
  let y = Math.floor(Math.random() * max);
  while (x === previous?.x || snake.find((offset) => offset.x === x)) {
    x = Math.floor(Math.random() * max);
  }
  while (y === previous?.y) {
    y = Math.floor(Math.random() * max);
  }
  const result = { x, y };
  return result;
}
