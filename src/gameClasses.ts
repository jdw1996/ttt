export {};

export enum Player {
  O,
  X,
  _,
}

export enum Position {
  NW,
  N,
  NE,
  W,
  C,
  E,
  SW,
  S,
  SE,
}
const ORDERED_POSITIONS = [
  Position.NW,
  Position.N,
  Position.NE,
  Position.W,
  Position.C,
  Position.E,
  Position.SW,
  Position.S,
  Position.SE,
];
const MAP_OF_POSITION_INDICES = new Map<Position, number>([
  [Position.NW, 0],
  [Position.N, 1],
  [Position.NE, 2],
  [Position.W, 3],
  [Position.C, 4],
  [Position.E, 5],
  [Position.SW, 6],
  [Position.S, 7],
  [Position.SE, 8],
]);
const LINES = [
  [Position.NW, Position.N, Position.NE],
  [Position.W, Position.C, Position.E],
  [Position.SW, Position.S, Position.SE],
  [Position.NW, Position.W, Position.SW],
  [Position.N, Position.C, Position.S],
  [Position.NE, Position.E, Position.SE],
  [Position.NW, Position.C, Position.SE],
  [Position.SW, Position.C, Position.NE],
];

export type Square = Player | [Square, Square, Square, Square, Square, Square, Square, Square, Square];

function getBoardFromGrid(square: Square, position: Position) {
  if (Array.isArray(square)) {
    switch (position) {
      case Position.NW:
        return square[0];
      case Position.N:
        return square[1];
      case Position.NE:
        return square[2];
      case Position.W:
        return square[3];
      case Position.C:
        return square[4];
      case Position.E:
        return square[5];
      case Position.SW:
        return square[6];
      case Position.S:
        return square[7];
      case Position.SE:
        return square[8];
    }
  } else {
  }
}

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
