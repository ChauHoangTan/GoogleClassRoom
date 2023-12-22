const socketIO = require("socket.io");
const NotificationModel = require("./Models/NotificationModel.js");

const registerSocketServer = (server) => {
    const addNewUser = (userInfo, socketId) => {
      !onlineUsers.some((user) => user._id === userInfo._id) &&
        onlineUsers.push({ ...userInfo, socketId });
    };
    
    const removeUser = (socketId) => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
    };
    
    const getUser = (receiverId) => {
      return onlineUsers.find((user) => user._id === receiverId);
    };
    const io = socketIO(server, {
        cors: {
          origin: [process.env.CLIENT_URL, "https://accounts.google.com/", "http://localhost:5000"],
          credentials: true
        }
      });
      
      let onlineUsers = [];

      
    io.on("connection", (socket) => {
    io.emit("sendAll","Hello all client!")
  socket.on("newUser", (userInfo) => {
    // console.log(userInfo)
    addNewUser(userInfo, socket.id);
  });

  socket.on("sendNotification", ({ userInfo, receiverId, type }) => {
      console.log(userInfo, receiverId)
    const receiver = getUser(receiverId);
    console.log(receiver)
    io.to(receiver.socketId).emit("getNotification", {
      userInfo,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });
  console.log(onlineUsers)

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
})


}

module.exports = {
    registerSocketServer,
};