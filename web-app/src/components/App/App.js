import React from 'react';
import './App.css';

import Player from '../Player/Player';

function App() {
  return (
    <div className="App">
      <div className="cell header">Header</div>
      <div className="cell left">Left</div>
      <div className="cell middle">
        <Player />
      </div>
      <div className="cell right">Right</div>
      <div className="cell footer">Footer</div>
    </div>
  );
}

export default App;
