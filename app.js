const express = require("express");
const app = express();

http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");

const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/utils");

//mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
    console.log("Connected to database " + config.database);
});
mongoose.connection.on("error", err => {
    console.log("Database error: " + err);
});

const io = socketIO(server).of('/ws');
io.on("connection", socket => {
    console.log("Websocket Client Connected");
    socket.on("disconnect", data => {
        console.log("Websocket Client Disconnected");
    });
});
module.exports.SOCKETIO = io;

// module.exports.ios = function(topic, data) {
//     msg = {
//         payload: data
//     };
//     io.emit(topic, msg);
//     console.log("topic is: " + topic + " msg: " + msg.payload);
// };


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
