import { SnakeOffset } from "./App";

export function getRandomOffset(max: number, snake: SnakeOffset[]) {
  let x = Math.floor(Math.random() * max);
  let y = Math.floor(Math.random() * max);
  while (!!snake.find((offset) => offset.x == x && offset.y == y)) {
    x = Math.floor(Math.random() * max);
    y = Math.floor(Math.random() * max);
  }
  const result = { x, y };
  console.log(result);
  return result;
}
