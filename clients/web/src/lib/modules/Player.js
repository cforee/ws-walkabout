import CommandRegistryModule from './CommandRegistryModule';
import Helpers from '../Helpers';

class PlayerModule  {
  constructor(opts) {
    this.id = 'unregistered';
    this.helpers = new Helpers();
    this.commands = new CommandRegistryModule({
      context: 'player'
    });
  }

  create() {
    this.id = this.helpers.generateHex(12);
    console.log(this.id);
    this.commands.send('create');
  }

  destroy() {
    this.commands.send('destroy');
  }


}


export default PlayerModule;
