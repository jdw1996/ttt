import React, { useContext, useEffect, useState } from 'react';
import { GameContext, Player, Position, Square, noop } from './constants';
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

  const positionToSquare = (position: Position) => {
    if (!Array.isArray(board)) {
      return null;
    }

    return <Game path={[...path, position]} board={board[position]} />;
  };

  if (Array.isArray(board)) {
    return (
      <div className={`board sector ${path.length === 0 ? 'topSector' : ''}`}>
        {Array.from({ length: 9 }, (_, i) => positionToSquare(i as Position))}
      </div>
    );
  }

  return (
    <div
      className={`square sector ${path.length === 0 ? 'topSector' : ''} ${winner === Player._ ? 'blank' : ''} s${
        path[path.length - 1]
      }`}
      onClick={() => (winner === Player._ ? takeTurn(path) : noop)}
    >
      {winner === Player.X ? 'X' : winner === Player.O ? 'O' : '.'}
    </div>
  );
}

export default Game;
