import React, { useEffect, useState } from 'react';
import { Player, Square } from './gameClasses';

type GameProps = {
  board: Square;
};

function Game({ board }: GameProps) {
  const [winner, setWinner] = useState<Player>(Player._);

  useEffect(() => {
    if (board === Player.X || board === Player.O) {
      setWinner(board);
    }
  }, [board]);

  if (Array.isArray(board)) {
    return (
      <table>
        <tr>
          <td>
            <Game board={board[0]} />
          </td>
          <td>
            <Game board={board[1]} />
          </td>
          <td>
            <Game board={board[2]} />
          </td>
        </tr>
        <tr>
          <td>
            <Game board={board[3]} />
          </td>
          <td>
            <Game board={board[4]} />
          </td>
          <td>
            <Game board={board[5]} />
          </td>
        </tr>
        <tr>
          <td>
            <Game board={board[6]} />
          </td>
          <td>
            <Game board={board[7]} />
          </td>
          <td>
            <Game board={board[8]} />
          </td>
        </tr>
      </table>
    );
  }

  return <div>{winner === Player.X ? 'X' : winner === Player.O ? 'O' : ' '}</div>;
}

export default Game;
