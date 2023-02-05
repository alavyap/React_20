const express = require("express");
const path = require("path");


const app = express();
const http = require("http");


const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data })
    });

    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id)
    });
});


app.get("/", async (req, res) => {
    res.render("index");
});


// app.listen(3000, () => console.log("Server running at port 3000"));
// server.listen(3000);
server.listen(3000, '0.0.0.0', () => {
    console.log("Server running at port 3000");
});
