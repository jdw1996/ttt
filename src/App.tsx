import React, { useState } from 'react';
import './App.css';
import Game from './Game';
import {
  GameContext,
  Player,
  Position,
  Square,
  getSquareAtPath,
  checkIsWinner,
  generateBlankSquare,
} from './constants';
import Menu from './Menu';

const takeTurnHelper = (player: Player, square: Square, pathAcc: Position[]): Square => {
  if (pathAcc.length === 0 || !Array.isArray(square)) {
    return player;
  }

  square[pathAcc[0]] = takeTurnHelper(player, square[pathAcc[0]], pathAcc.slice(1));

  if (checkIsWinner(player, square)) {
    return player;
  }
  return square;
};

function App() {
  const [nextPlayer, setNextPlayer] = useState<Player.O | Player.X>(Player.O);
  const [activePath, setActivePath] = useState<Position[]>([]);
  const [board, setBoard] = useState<Square | null>(null);

  const nextTurn = () => {
    // Toggle the next player.
    setNextPlayer((oldNextPlayer) => (oldNextPlayer === Player.O ? Player.X : Player.O));
  };

  const takeTurn = (path: Position[]) => {
    if (path.length === 0) {
      setBoard(nextPlayer);
    }

    setBoard((oldBoard) => {
      if (oldBoard === null) {
        return null;
      }

      const newBoard = takeTurnHelper(nextPlayer, structuredClone(oldBoard), path);

      let prospectiveActivePath = path.slice(1);
      while (!Array.isArray(getSquareAtPath(newBoard, prospectiveActivePath)) && prospectiveActivePath.length > 0) {
        prospectiveActivePath = prospectiveActivePath.slice(0, -1);
      }
      // I am calling a setter within another setter here, which might not be
      // the best pattern to follow. In theory I could do this in an effect
      // that fires after board is changed, but then I wouldn't have access to
      // the path. Maybe there's a cleaner solution, but this is the best I've
      // got at the moment.
      setActivePath(prospectiveActivePath);

      return newBoard;
    });

    nextTurn();
  };

  return (
    <GameContext.Provider value={{ takeTurn, activePath }}>
      <div className="App">
        <Menu
          createNewBoard={(depth, isRandom, isTopLevel) => {
            setNextPlayer(Player.O);
            setActivePath([]);
            setBoard(generateBlankSquare(depth, isRandom, isTopLevel));
          }}
          gameWinner={board === Player.X || board === Player.O ? board : null}
          isGameInProgress={board !== null}
          nextPlayer={nextPlayer}
          resetBoard={() => {
            setNextPlayer(Player.O);
            setActivePath([]);
            setBoard(null);
          }}
        />
        {board !== null && (
          <div className="game-wrapper">
            <Game path={[]} board={board} />
          </div>
        )}
      </div>
    </GameContext.Provider>
  );
}

export default App;
