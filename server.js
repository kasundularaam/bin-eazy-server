const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);
  socket.join("map");

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

let latitude = 6.9271;

setInterval(() => {
  latitude = parseFloat(latitude) + parseFloat(0.001);
  io.to("map").emit("truck", {
    id: "truck1",
    latitude: latitude.toFixed(4),
    longitude: 79.8612,
  });
}, 1000);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
