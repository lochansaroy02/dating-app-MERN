const http = require("http");
const { Server } = require("socket.io")
require('colors');

const express = require("express")

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ['GET', 'POST']
    }
})


const userSocketMap = {} // { userID: socketID}


io.on("connection", (socket) => {
    console.log("A user Connected".green, socket.id);
    // get the userId
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id
    }

    // io.emit( "function name", keys of socket map) used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        console.log("A user disconnected".red, socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))

    })
})



const getReceiverSocketId = (userId) => {


    return userSocketMap[userId]
}

module.exports = { io, app, server, getReceiverSocketId }