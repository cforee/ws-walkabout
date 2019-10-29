import CommandRegistryModule from './CommandRegistryModule';
import Helpers from '../Helpers';

class PlayerModule  {
  constructor(opts) {
    this.id = new Helpers().generateHex(12);
    this.commands = new CommandRegistryModule({
      playerId: this.id
    });

  }

  create() {
    console.log(this.id);
    this.commands.send('create');
  }

  destroy() {
    this.commands.send('destroy');
  }


}


export default PlayerModule;
