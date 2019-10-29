let WebSocketServer = require('websocket').server;
let http = require('http');

const PORT = 4000;
let server = http.createServer(function(request, response) { });
server.listen(PORT, function() { });

let wsServer = new WebSocketServer({ httpServer: server });
console.log("Dev WebSocket server running on port " + PORT);

const COMMANDS = {
  status: {
    handler: null,
    response: () => { return { data: { success: "cool" } } }

  },
  ping: {
    handler: null,
    response: () => { return { data: { success: "pong" } } }
  },
  move: {
    handler: null,
    response: () => { return { data: { moving: true } } }
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
      switch (req.type) {
        case 'move':
          console.log("We gonna move");
          break;
        case 'registerPlayer':
          console.log("We gonna register a player");
          break;
      }

      if (COMMANDS[req.type]) {
        let response = JSON.stringify(COMMANDS[req.type].response());
        self.connection.sendUTF(response);
      }
    }
  });

  self.connection.on('close', function(connection) {
    // close user connection
  });

});

