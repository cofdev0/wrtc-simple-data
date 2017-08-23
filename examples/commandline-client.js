"use strict";
exports.__esModule = true;
var src_1 = require("src");
var readline_1 = require("readline");
var dc = new src_1["default"]({
    roomName: 'chatRoom',
    signallingServer: 'http://45.76.34.60:3000',
    rtcOpts: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] },
    debugMode: true
});
var rl = readline_1["default"].createInterface({
    input: process.stdin,
    output: process.stdout
});
dc.on('ready', function () {
    dc.on('channel:ready', function () {
        console.log('Yeah we got a new data channel with a new peer.');
    });
    dc.on('message', function (data) {
        console.log(data.sender + ': ' + data.text);
    });
    rl.on('line', function (cmd) {
        dc.sendMessage(cmd);
    });
});
