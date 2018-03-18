const express = require("express");
const app = express();

http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");

const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const io = socketIO(server).of('/ws');
io.on("connection", socket => {
    console.log("Websocket Client Connected");
    socket.on("disconnect", data => {
        console.log("Websocket Client Disconnected");
    });
});
module.exports.SOCKETIO = io;

const api = require("./routes/api");

const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/api", api);
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
server.listen(port, () => {
    console.log("Server started on port " + port);
});