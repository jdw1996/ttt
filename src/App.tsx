import React from 'react';
import './App.css';
import Game from './Game';
import { Player } from './constants';

function App() {
  return (
    <div className="App">
      <Game
        path={[]}
        board={[Player._, Player.X, Player.X, Player.O, Player._, Player._, Player.O, Player.X, Player._]}
      />
    </div>
  );
}

export default App;
