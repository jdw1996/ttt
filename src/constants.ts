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

// export class Board {
//   winner: Player | null;
//   depth: number;
//   grid?: Grid;

//   constructor(depth: number = 0) {
//     this.winner = null;
//     this.depth = depth;

//     if (depth > 0) {
//       this.grid = Array.from({ length: 9 }, () => new Board(depth - 1)) as Grid;
//     }
//   }

//   checkWinner() {
//     if (this.depth === 0 || !this.grid) {
//       return;
//     }
//     for (const line of LINES) {
//       const [o1, o2, o3] = Array.from(line, (position) => getBoardFromGrid(this.grid as Grid, position).winner);
//       if (o1 === o2 && o2 === o3) {
//         this.winner = o1;
//         return;
//       }
//     }
//   }

//   play(player: Player, move: Position[]) {
//     if (this.winner) {
//       throw new Error('Attempting to play in a completed board!');
//     }

//     if (this.depth === 0) {
//       this.winner = player;
//     }

//     if (move.length === 0) {
//       throw new Error('Attempting to play without specifying a position!');
//     }
//     if (!this.grid) {
//       throw new Error('Attempting to play in a board with no squares!');
//     }

//     const [sector, ...restOfMove] = move;
//     const board = getBoardFromGrid(this.grid, sector);
//     board.play(player, restOfMove);
//     this.checkWinner();
//   }
// }
