let WebSocketServer = require('websocket').server;
let http = require('http');

const PORT = 6000;
let server = http.createServer(function(request, response) { });
server.listen(PORT, function() { });

let wsServer = new WebSocketServer({ httpServer: server });
console.log("Dev WebSocket server running on port " + PORT);

const COMMANDS = {
  status: {
    handler: null,
    response: function() { return { data: { success: "cool" } } }

  },
  ping: {
    handler: null,
    response: function() { return { data: { success: "pong" } } }
  },

}

// WebSocket server
wsServer.on('request', function(request) {
  let self = this;
  self.connection = request.accept(null, request.origin);

  self.connection.on('message', function(message) {
    if (message.type === 'utf8') {
      let req = message.utf8Data;
      if (COMMANDS[req]) {
        let response = JSON.stringify(COMMANDS[req].response());
        self.connection.sendUTF(response);
      }
    }
  });

  self.connection.on('close', function(connection) {
    // close user connection
  });

});

