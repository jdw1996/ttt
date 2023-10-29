import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export enum Player {
  O,
  X,
  _,
}
export type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type Square = Player | [Square, Square, Square, Square, Square, Square, Square, Square, Square];

export const getSquareAtPath = (square: Square, path: Position[]): Square =>
  path.reduce((latestBoard, nextPosition) => {
    if (!Array.isArray(latestBoard)) {
      throw new Error('Path is too long!');
    }
    return latestBoard[nextPosition];
  }, square);

export const isWinner = (player: Player, square: Square): boolean => {
  if (!Array.isArray(square)) {
    return square === player;
  }

  for (const line of LINES) {
    const lineValues = Array.from(line, (position) => square[position]);
    if (lineValues.every((val) => val === player)) {
      return true;
    }
  }
  return false;
};

type GameContextType = {
  takeTurn: (path: Position[]) => void;
};

export const GameContext = createContext<GameContextType>({ takeTurn: noop });
