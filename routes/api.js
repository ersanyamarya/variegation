const express = require("express");
const router = express.Router();
const config = require("../config/utils");
const fs = require("fs");
const IO = require("../app").SOCKETIO;
const path = require("path");
var toHex = require("colornames");
const hexRgb = require("hex-rgb");
const statusFile = path.join(__dirname, "../../config/status.json");
const dataFile = path.join(__dirname, "../../config/data.json");

//get Status
router.get("/status", (req, res) => {
    var status = JSON.parse(fs.readFileSync(statusFile));
    res.json({
        success: true,
        msg: status
    });
});

//Post Status
router.post("/status", (req, res, next) => {
    var Status = req.body;
    Status.mode = Status.mode.replace(/\s+/g, "").toUpperCase();
    IO.emit("status", Status);
    fs.writeFileSync(statusFile, JSON.stringify(Status, null, 4));
    res.json({
        success: true,
        msg: "status changed"
    });
});


router.post("/color", (req, res, next) => {
    var color = req.body.color;
    var nameToHex = toHex(color);
    var payload = {};
    if (nameToHex) {
        var rgbColor = hexRgb(nameToHex);
        var mode = JSON.parse(fs.readFileSync(statusFile, "utf8")).mode.replace(/\s+/g, "").toUpperCase();
        if (mode == "READMODE" || mode == "PARTYMODE") mode = "COLORMYROOM";
        payload = {
            led: {
                red: rgbColor.red,
                green: rgbColor.green,
                blue: rgbColor.blue,
                white: 0,
                yellow: 0
            },
            mode: mode
        };
        fs.writeFileSync(statusFile, JSON.stringify(payload, null, 4));
        IO.emit("status", payload);
        res.json({
            success: true,
            msg: "enjoy the lights"
        });
    } else {
        res.json({
            success: false,
            msg: "can't find that color"
        });
    }
});

router.post("/mode", (req, res, next) => {
    var mode = req.body.mode.replace(/\s+/g, "").toUpperCase();
    var payload = JSON.parse(fs.readFileSync(statusFile, "utf8"));
    payload.mode = mode;
    if (payload.mode == "READMODE")
        payload = {
            led: {
                red: 0,
                green: 0,
                blue: 0,
                white: 120,
                yellow: 255
            },
            mode: mode
        };
    fs.writeFileSync(statusFile, JSON.stringify(payload, null, 4));
    IO.emit("status", payload);
    res.json({
        success: true,
        msg: "enjoy the lights"
    });
});

//Get data
router.get("/data", (req, res) => {
    var data = JSON.parse(fs.readFileSync(dataFile));
    res.json({
        success: true,
        msg: data
    });
});
router.post("/data", (req, res, next) => {
    var data = req.body;
    IO.emit("data", data);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 4));
    res.json({
        success: true,
        msg: "data changed"
    });
});
router.post("/setSpeakers", (req, res, next) => {
    var data = req.body;
    IO.emit("setSpeakers", data);
    console.log(data);
    res.json({
        success: true,
        msg: "data changed"
    });
});
module.exports = router;