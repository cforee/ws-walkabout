import Player from './Player.js';
import World from './World.js';

class GameModule  {
  constructor() {
    this.player = new Player();
    this.world = new World();
  }

  initialize() {
    this.player.create();
  }

  destroy() {
    this.player.destroy();
  }

}


export default GameModule;
