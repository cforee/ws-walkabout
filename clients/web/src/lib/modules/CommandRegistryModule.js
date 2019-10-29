import ReconnectingWebSocket from "reconnecting-websocket";
import Commands from "../../config/commands.json";

const WebsocketUrl = "ws://localhost:4000";

class CommandRegistryModule  {
  constructor(opts = { playerId: {} }) {
    this.socket = new ReconnectingWebSocket(WebsocketUrl);
    this.playerId = opts.playerId;
    this.commandSet = Commands;
  }

  send(commandName, status=true) {
    console.log(commandName);
    let cmd = this.commandSet.player[commandName];
    if (cmd) {
      cmd["playerId"] = this.playerId;
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
