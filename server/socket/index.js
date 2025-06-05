const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  },
});

//online user 
const onlineUser = new Set();
 
io.on("connection", async (socket) => {
  try {
    const token = socket.handshake.auth.token;
    const user = await getUserDetailsFromToken(token);
    
    if (!user || user.logout) {
      socket.emit('error', { message: 'Authentication failed. Please login again.' });
      socket.disconnect();
      return;
    }
    
    //create a new room with the user id
    const userId = user?._id?.toString();
    socket.join(userId);
    onlineUser.add(userId);

    io.emit("onlineUsers", Array.from(onlineUser));

    socket.on("messagePage", async (userId) => {
      const userDetails = await UserModel.findById(userId);
      const payload = {
        _id: userDetails?._id,
        name: userDetails?.name,
        profilePicture: userDetails?.profile_pic,
        email: userDetails?.email,
        online: onlineUser.has(userId),
      }

      socket.emit("messageUser", payload);
    });

    socket.on("disconnect", () => {
      onlineUser.delete(userId);
      console.log("a user disconnected", socket.id);
    });
  } catch (error) {
    console.error('Socket connection error:', error);
    socket.emit('error', { message: 'Authentication failed. Please login again.' });
    socket.disconnect();
  }
});

module.exports = {
    app,
    server,
    io
}

