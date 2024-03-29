import React, { Component } from "react";
import './App.css';

import GameModule from './lib/modules/GameModule';

const Game = new GameModule();

class App extends Component {
  _registerCommand(cmd) {
    Game.player.commands.register(cmd);
  }

  _unregisterCommand(cmd) {
    Game.player.commands.unregister(cmd);
  }

  componentDidMount() {
    window.addEventListener('load', () => Game.initialize());
    window.addEventListener('unload', () => Game.destroy());
  }

  render() {
    return  (
      <div className="App">
        <button
          onMouseDown={ () => this._registerCommand('move/up') }
          onMouseUp={ () => this._unregisterCommand('move/up') }>
          UP
        </button>
        <button
          onMouseDown={ () => this._registerCommand('move/right') }
          onMouseUp={ () => this._unregisterCommand('move/right') }>
          RIGHT
        </button>
        <button
          onMouseDown={ () => this._registerCommand('move/down') }
          onMouseUp={ () => this._unregisterCommand('move/down') }>
          DOWN
        </button>
        <button
          onMouseDown={ () => this._registerCommand('move/left') }
          onMouseUp={ () => this._unregisterCommand('move/left') }>
          LEFT
        </button>
        <div>{ this.props.last_cmd }</div>
      </div>
    );
  }
}

export default App;
