import React, { useState } from 'react';
import './App.css';
import Game from './Game';
import { Player, Position, Square, getSquareAtPath, isWinner } from './constants';

function App() {
  const [nextPlayer, setNextPlayer] = useState<Player.O | Player.X>(Player.O);
  const [board, setBoard] = useState<Square>([
    Player._,
    Player.X,
    Player.X,
    Player.O,
    Player._,
    Player._,
    Player.O,
    Player.X,
    Player._,
  ]);

  const nextTurn = () => {
    // Toggle the next player.
    setNextPlayer((oldNextPlayer) => (oldNextPlayer === Player.O ? Player.X : Player.O));
  };

  const takeTurn = (path: Position[]) => {
    if (path.length === 0) {
      setBoard(nextPlayer);
    }

    setBoard((oldBoard) => {
      const newBoard = structuredClone(oldBoard);
      const parent = getSquareAtPath(newBoard, path.slice(0, -1));
      if (!Array.isArray(parent)) {
        throw new Error('Path is too long!');
      }
      parent[path[path.length - 1]] = nextPlayer;
      if (isWinner(nextPlayer, parent)) {
        if (path.length <= 1) {
          return nextPlayer;
        }
        const grandparent = getSquareAtPath(newBoard, path.slice(0, -2));
        if (!Array.isArray(grandparent)) {
          throw new Error('Path is too long!');
        }
        grandparent[path[path.length - 2]] = nextPlayer;
      }
      return newBoard;
    });

    nextTurn();
  };

  return (
    <div className="App">
      <Game path={[]} board={board} />
    </div>
  );
}

export default App;
