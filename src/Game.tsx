import { useContext, useEffect, useState } from 'react';
import { GameContext, Player, Position, Square } from './constants';
import './Game.css';

type GameProps = {
  board: Square;
  path: Position[];
};

function Game({ board, path }: GameProps) {
  const [winner, setWinner] = useState<Player>(Player._);
  const { takeTurn } = useContext(GameContext);

  useEffect(() => {
    if (board === Player.X || board === Player.O) {
      setWinner(board);
    }
  }, [board]);

  const positionToTD = (position: Position) => {
    if (!Array.isArray(board)) {
      return null;
    }

    return (
      <td>
        <Game path={[...path, position]} board={board[position]} />
      </td>
    );
  };

  if (Array.isArray(board)) {
    return (
      <div>
        <table>
          <tr>{([0, 1, 2] as Position[]).map(positionToTD)}</tr>
          <tr>{([3, 4, 5] as Position[]).map(positionToTD)}</tr>
          <tr>{([6, 7, 8] as Position[]).map(positionToTD)}</tr>
        </table>
      </div>
    );
  }

  return (
    <div className={winner === Player._ ? 'blank' : ''} onClick={() => takeTurn(path)}>
      {winner === Player.X ? 'X' : winner === Player.O ? 'O' : '.'}
    </div>
  );
}

export default Game;
