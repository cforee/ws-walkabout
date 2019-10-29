let WebSocketServer = require('websocket').server;
let http = require('http');

const PORT = 4000;
let server = http.createServer(function(request, response) { });
server.listen(PORT, function() { });

let wsServer = new WebSocketServer({ httpServer: server });
console.log("Dev WebSocket server running on port " + PORT);

let players = [];

const COMMANDS = {
  registration: {
    handler: () => {
      console.log("HANDLING REGISTRATION");
      return true;
    },
    responses: {
      success: (res) => { return { data: { success: "cool" } } },
      failure: (res) => { return { data: { success: "nope" } } },
    },
  },
  status: {
    handler: () => {
      console.log("GETTIN STATUS");
      return true;
    },
    responses: {
      success: (res) => { return { data: { success: "cool" } } },
      failure: (res) => { return { data: { success: "nope" } } },
    },
  },
  ping: {
    handler: () => {
      console.log("PINGING");
      return true;
    },
    responses: {
      success: (res) => { return { data: { success: "cool" } } },
      failure: (res) => { return { data: { success: "nope" } } },
    },
  },
  move: {
    handler: () => {
      console.log("MOVE")
      return true;
    },
    responses: {
      success: (res) => { return { data: { success: "cool" } } },
      failure: (res) => { return { data: { success: "nope" } } },
    },
  },

}

// WebSocket server
wsServer.on('request', function(request) {
  let self = this;
  self.connection = request.accept(null, request.origin);

  self.connection.on('message', function(message) {
    if (message.type === 'utf8') {
      let req = JSON.parse(message.utf8Data);
      console.log(req);
      let cmd = COMMANDS[req.type];
      if (cmd) {
        if (cmd.handler) {
          let result = cmd.handler(cmd.opts);
          let res = result ? cmd.responses.success(result) :
            cmd.responses.failure(result);
          console.log(res);
          self.connection.sendUTF(JSON.stringify(res))
        }
      }
    }
  });

  self.connection.on('close', function(connection) {
    // close user connection
  });

});

