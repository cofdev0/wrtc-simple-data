"use strict";
exports.__esModule = true; 
var service_1 = require("./src/service");
var src_1 = require("./src");
var io, caller, responder, channelsCount, evlog;
var params = {
    roomName: 'chatRoom',
    signallingServer: 'http://localhost:3000',
    rtcOpts: { iceServers: [{ urls: 'stun:stun.l.google.com:19301' }] },
    debugMode: false
};
var responder_message = 'Hello caller! I am responder.';
var caller_message = 'Hello responder! I am caller.';
// sequence of channel ready is not guaranted (so use variables)
var responder_see_channel = false;
var caller_see_channel = false;


function launching() {
    io = service_1["default"]();
    caller = new src_1["default"](params);
    responder = new src_1["default"](params);
    evlog = [];
    channelsCount = 0;
}
function shutdown() {
    responder.close();
    caller.close();
    io.close();
}
function log(event) {
    evlog.push(event);
}
function communication(done) {
    log('begin communication');
    responder.on('ready', function () {
        responder.on('channel:ready', function () {
            responder_see_channel = true;
        });
        responder.on('message', function (data) {
            log('responder received: ' + data.text);
            log('responder send: ' + responder_message);
            responder.sendMessage(responder_message);
        });
    });
    caller.on('ready', function () {
        caller.on('channel:ready', function () {
            caller_see_channel = true;
            log('caller send: ' + caller_message);
            caller.sendMessage(caller_message);
        });
        caller.on('message', function (data) {
            log('caller received: ' + data.text);
            log('end communication');
            done();
        });
    });
}
beforeAll(function () {
    launching();
});
afterAll(function () {
    shutdown();
});
test('client may be created without options', function () {
    var conn = new src_1["default"]();
    conn.close();
});
test('client is debuggable', function () {
    var conn = new src_1["default"]({ debugMode: true });
    conn.close();
});
test('perform bidirectional communications', function (done) {
    communication(done);
});
test('begin communication', function () {
    expect(evlog[0]).toBe('begin communication');
});
test('responder receive event channel:ready', function () {
    expect(responder_see_channel).toBe(true);
});
test('caller receive event channel:ready', function () {
    expect(caller_see_channel).toBe(true);
});
test('caller send: ' + caller_message, function () {
    expect(evlog[1]).toBe('caller send: ' + caller_message);
});
test('responder received: ' + caller_message, function () {
    expect(evlog[2]).toBe('responder received: ' + caller_message);
});
test('responder send: ' + responder_message, function () {
    expect(evlog[3]).toBe('responder send: ' + responder_message);
});
test('caller received: ' + responder_message, function () {
    expect(evlog[4]).toBe('caller received: ' + responder_message);
});
test('end communication', function () {
    expect(evlog[5]).toBe('end communication');
});
