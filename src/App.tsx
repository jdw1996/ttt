import React from 'react';
import './App.css';
import Game from './Game';
import { Player } from './gameClasses';

function App() {
  return (
    <div className="App">
      <Game board={[Player.X, Player.O, Player.X, Player.O, Player.X, Player.X, Player.X, Player.X, Player.O]} />
    </div>
  );
}

export default App;
