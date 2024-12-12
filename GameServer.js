const { Server } = require("socket.io");
const cfg = require('./config');
const server = new Server(9001, {
  cors: cfg.cors,
});

class GameServer {
  constructor(id, options = {}) {
    this.ws = server.of(`/${id}`);
    this.ws.on("connect", socket => {
      console.log("works");
    });
  }
}

module.exports = GameServer;