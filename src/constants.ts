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

export const getSquareAtPath = (square: Square, path: Position[]): Square | null => {
  try {
    return path.reduce((latestBoard, nextPosition) => {
      if (!Array.isArray(latestBoard)) {
        throw new Error('Path is too long!');
      }
      return latestBoard[nextPosition];
    }, square);
  } catch {
    return null;
  }
};

export const checkIsWinner = (player: Player, square: Square): boolean => {
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

export const checkIsPrefix = (prefix: Position[], path: Position[]): boolean => {
  if (prefix.length > path.length) {
    return false;
  }
  for (let i = 0; i < prefix.length; ++i) {
    if (prefix[i] !== path[i]) {
      return false;
    }
  }
  return true;
};

type GameContextType = {
  takeTurn: (path: Position[]) => void;
  activePath: Position[];
};

export const GameContext = createContext<GameContextType>({ takeTurn: noop, activePath: [] });

const flipACoin = (): boolean => {
  const rand = Math.random();
  return rand >= 0.5;
};

export const generateBlankSquare = (depth: number, isRandom = false, isTopLevel = false): Square => {
  if (depth === 0 || (!isTopLevel && isRandom && flipACoin())) {
    return Player._;
  }

  return Array.from({ length: 9 }, () => generateBlankSquare(depth - 1, isRandom)) as Square;
};
