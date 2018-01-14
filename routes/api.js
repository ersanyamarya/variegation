const express = require("express");
const router = express.Router();
const config = require("../config/utils");
const fs = require("fs");
const IO = require("../app").SOCKETIO;
const path = require("path");
const statusFile = path.join(__dirname, "../config/status.json");
var status = JSON.parse(fs.readFileSync(statusFile));

//Get status
router.get("/status", (req, res) => {
    res.json({
        success: true,
        msg: status
    });
});

//Post Status
router.post("/status", (req, res, next) => {
    IO.emit("status", req.body);
    fs.writeFileSync(statusFile, JSON.stringify(req.body, null, 4));
    res.json({
        success: true,
        msg: "status changed"
    });
});

module.exports = router;