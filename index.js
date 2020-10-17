const express = require("express");
const socket = require("socket.io");

// App Setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () { 
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// Static Files
app.use(express.static("public"))

// Socket setup
const io = socket(server)

const activeUsers = new Set();

io.on("connection", function (socket) {
    console.log("Made socket connection");

    socket.on("new user", function (data) {
        socket.userId = data
        activeUsers.add(data)
        io.emit("new user", [...activeUsers])
    })

    socket.on("disconnect", () => {
        activeUsers.delete(socket.userId)
        io.emit("user disconnected", socket.userId)
    })
})