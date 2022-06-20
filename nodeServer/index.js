// Impoting SocketIO
const io = require("socket.io")(8000);

// Creating Users Object
const users = {};

// Listening To Built-in Event "connection"
io.on("connection", (socket) => {
  // Listening To "newUserJoined" Event
  socket.on("newUserJoined", (name) => {
    users[socket.id] = name;
    // Listening To "userJoined" Event
    socket.broadcast.emit("userJoined", name);
  });

  // Listening To "send" Event
  socket.on("send", (message) => {
    // Listening To "recieve" Event
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  // Listening To Built-in Event "disconnect"
  socket.on("disconnect", (message) => {
    // Listening To "left" Event
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
