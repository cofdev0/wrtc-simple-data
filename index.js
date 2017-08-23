var dc = require("wrtc-simple-data")({
    roomName: 'chatRoom'
});

dc.on('ready', function () {
    dc.on('channel:ready', function () {
        console.log('Data channel is ready.');
    });

    dc.on('message', function (data) {
        console.log(data.sender + ': ' + data.text);
    });

    dc.sendMessage('First message on this channel');
});
