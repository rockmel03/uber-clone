const socketIo = require("socket.io");
const User = require("./models/user.model");
const Captain = require("./models/captain.model");
const rideServices = require("./services/ride.services");

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

    socket.on("join", async (data) => {
      if (!data) return;
      const { userId, roles } = data;
      try {
        if (roles.includes("captain")) {
          const captain = await User.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });
        } else if (roles.includes("user")) {
          const user = await User.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });
        }
      } catch (error) {
        console.error(error);
      }
      socket.emit("message", "joined successfully");
    });

    socket.on("update-location", async (userId, location) => {
      // update captain's location
      if (!(userId && location?.ltd && location?.lng)) return;

      const newLocation = {
        ltd: location.ltd,
        lng: location.lng,
      };
      await Captain.findOneAndUpdate({ userId }, { location: newLocation });
    });

    socket.on("search-ride", async (rideData) => {
      // find captains with geolocation range and vehicle type
      if (!rideData)
        return socket.emit(
          "message",
          "ride data is require while searching for a vehicle"
        );

      await rideServices.sendRideMessageToCaptains(rideData);
    });

    socket.on("disconnect", () => {
      console.log("a client disconnected : ", socket.id);
    });
  });
}

function sendmessage(eventname, socketId, message) {
  if (io) {
    console.log(eventname, socketId, message);
    io.to(socketId).emit(eventname, message);
  } else {
    console.log("socket.io not initialize yet....");
  }
}

module.exports = { IinitializeSocketIo, sendmessage };
