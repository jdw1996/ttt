import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GameContext, Player, Position, Square, checkIsPrefix, getDisplayVersion, noop } from './constants';
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

  const positionToSquare = (position: Position) => {
    // Typescript isn't smart enough to let me use isMultiSquare here.
    if (!Array.isArray(board)) {
      return null;
    }

    return <Game key={position} path={[...path, position]} board={board[position]} />;
  };

  useEffect(() => {
    if (board === Player.X || board === Player.O) {
      setWinner(board);
    }
  }, [board]);

  return (
    <div
      className={`sector ${isMultiSquare ? 'board' : 'square'} ${path.length === 0 ? 'topSector' : ''} ${
        !isMultiSquare && winner === Player._ ? 'blank' : ''
      } ${isClickable ? 'clickable' : ''} s${path[path.length - 1]} d${path.length} ${isActiveBoard ? 'activeBoard' : ''}`}
      onClick={isClickable ? () => takeTurn(path) : noop}
    >
      {isMultiSquare ? Array.from({ length: 9 }, (_, i) => positionToSquare(i as Position)) : getDisplayVersion(winner)}
    </div>
  );
}

export default Game;
