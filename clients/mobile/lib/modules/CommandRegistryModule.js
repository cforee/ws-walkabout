import ReconnectingWebSocket from "reconnecting-websocket";
import Commands from "../../config/commands.json";

const WebsocketUrl = "ws://localhost:6000";

class CommandRegistryModule  {
  constructor(opts = { context: 'player' }) {
    this.socket = new ReconnectingWebSocket(WebsocketUrl);
    this.context = opts.context;
    this.commandSet = Commands;
  }

  send(commandName, status=true) {
    console.log(commandName);
    let cmd = this.commandSet[this.context][commandName];
    if (cmd) {
      cmd["status"] = status;
      this.socket.send(JSON.stringify(cmd));
    }
  }

  register(commandName) {
    this.send(commandName, true);
    return this.commandSet.active.includes(commandName) ? false :
      !!this.commandSet.active.push(commandName);
  }

  unregister(commandName) {
    this.send(commandName, false);
    return !!this.commandSet.active
      .splice(this.commandSet.active.indexOf(commandName), 1)
      .length;
  }

  commandRunner() {

  }

}


export default CommandRegistryModule;
