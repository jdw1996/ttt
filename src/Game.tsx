import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GameContext, Player, Position, Square, checkIsPrefix, noop } from './constants';
import './Game.css';

type GameProps = {
  board: Square;
  path: Position[];
};

function Game({ board, path }: GameProps) {
  const [winner, setWinner] = useState<Player>(Player._);
  const { takeTurn, activePath } = useContext(GameContext);

  const isMultiSquare = useMemo(() => Array.isArray(board), [board]);
  const isClickable = useMemo(
    () => !isMultiSquare && winner === Player._ && checkIsPrefix(activePath, path),
    [isMultiSquare, winner, activePath, path],
  );
  const isActiveBoard = useMemo(
    () => checkIsPrefix(activePath, path) && activePath.length === path.length,
    [activePath, path],
  );

  useEffect(() => {
    if (board === Player.X || board === Player.O) {
      setWinner(board);
    }
  }, [board]);

  const positionToSquare = (position: Position) => {
    // Typescript isn't smart enough to let me use isMultiSquare here.
    if (!Array.isArray(board)) {
      return null;
    }

    return <Game path={[...path, position]} board={board[position]} />;
  };

  return (
    <div
      className={`sector ${isMultiSquare ? 'board' : 'square'} ${path.length === 0 ? 'topSector' : ''} ${
        !isMultiSquare && winner === Player._ ? 'blank' : ''
      } ${isClickable ? 'clickable' : ''} s${path[path.length - 1]} ${isActiveBoard ? 'activeBoard' : ''}`}
      onClick={isClickable ? () => takeTurn(path) : noop}
    >
      {isMultiSquare
        ? Array.from({ length: 9 }, (_, i) => positionToSquare(i as Position))
        : winner === Player.X
        ? 'X'
        : winner === Player.O
        ? 'O'
        : '.'}
    </div>
  );
}

export default Game;
