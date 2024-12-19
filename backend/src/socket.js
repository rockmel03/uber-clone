const socketIo = require("socket.io");
const User = require("./models/user.model");

let io;
function IinitializeSocketIo(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a client connected : ", socket.id);

    socket.on("disconnect", () => {
      console.log("a client disconnected : ", socket.id);
    });
  });
}

function sendmessage(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("socket.io not initialize yet....");
  }
}

module.exports = { IinitializeSocketIo, sendmessage };
