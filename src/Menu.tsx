import React, { useEffect, useState } from 'react';
import './Menu.css';

type MenuProps = {
  createNewBoard: (depth: number, isRandom: boolean, isTopLevel: boolean) => void;
  isGameOver: boolean;
  resetBoard: () => void;
};

function Menu({ createNewBoard, isGameOver, resetBoard }: MenuProps) {
  const [isSelectionMade, setIsSelectionMade] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      setIsSelectionMade(false);
    }
  }, [isGameOver]);

  return (
    <div className="menu-wrapper">
      <h2>How ultimate do you like your tic-tac-toe?</h2>
      <div className="options">
        <button
          disabled={isSelectionMade}
          onClick={() => {
            createNewBoard(1, false, true);
            setIsSelectionMade(true);
          }}
        >
          Not ultimate
        </button>
        <button
          disabled={isSelectionMade}
          onClick={() => {
            createNewBoard(2, false, true);
            setIsSelectionMade(true);
          }}
        >
          Ultimate
        </button>
        <button
          disabled={isSelectionMade}
          onClick={() => {
            createNewBoard(3, false, true);
            setIsSelectionMade(true);
          }}
        >
          Ultimate Ultimate
        </button>
        <button
          disabled={isSelectionMade}
          onClick={() => {
            const rand = Math.random();
            createNewBoard(rand < 1 / 3 ? 1 : rand > 2 / 3 ? 3 : 2, false, true);
            setIsSelectionMade(true);
          }}
        >
          Surprise me
        </button>
        <button
          disabled={isSelectionMade}
          onClick={() => {
            createNewBoard(3, true, true);
            setIsSelectionMade(true);
          }}
        >
          Confuse me
        </button>
        <button
          disabled={!isSelectionMade}
          onClick={() => {
            resetBoard();
            setIsSelectionMade(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Menu;
