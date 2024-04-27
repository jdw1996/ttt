import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Player, getDisplayVersion } from './constants';

type MenuProps = {
  createNewBoard: (depth: number, isRandom: boolean, isTopLevel: boolean) => void;
  gameWinner: Player | null;
  isGameInProgress: boolean;
  nextPlayer: Player;
  resetBoard: () => void;
};

const Menu = ({ createNewBoard, gameWinner, isGameInProgress, nextPlayer, resetBoard }: MenuProps) => {
  console.log(gameWinner);

  return (
    <div className="menu-wrapper">
      {!isGameInProgress && (
        <>
          <h2>How ultimate do you like your tic-tac-toe?</h2>
          <div className="options">
            <button
              onClick={() => {
                createNewBoard(1, false, true);
              }}
            >
              Not ultimate
            </button>
            <button
              onClick={() => {
                createNewBoard(2, false, true);
              }}
            >
              Ultimate
            </button>
            <button
              onClick={() => {
                createNewBoard(3, false, true);
              }}
            >
              Ultimate Ultimate
            </button>
            <button
              onClick={() => {
                const rand = Math.random();
                createNewBoard(rand < 1 / 3 ? 1 : rand > 2 / 3 ? 3 : 2, false, true);
              }}
            >
              Surprise me
            </button>
            <button
              onClick={() => {
                createNewBoard(3, true, true);
              }}
            >
              Confuse me
            </button>
          </div>
        </>
      )}
      {isGameInProgress && (
        <>
          <button disabled={!isGameInProgress} onClick={resetBoard}>
            Restart game
          </button>
          {gameWinner === null && <div>Next player is {getDisplayVersion(nextPlayer)}</div>}
        </>
      )}
      {gameWinner !== null && <div>The winner is {getDisplayVersion(gameWinner)}!</div>}
    </div>
  );
};

export default Menu;
