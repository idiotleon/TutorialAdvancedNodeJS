const dgram = require('dgram');

const PORT = 3333;
const HOST = '127.0.0.1';

// Server
const server = dgram.createSocket('udp4');

server.on('listening', () => console.log('UDP Server Listening'));

server.on('message', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
});

server.bind(PORT, HOST);

// Client
// Every time one creates a new socket, it will use a different port
/*
setInterval(function () {
    const client = dgram.createSocket('udp4');

    client.send('PluralSight rocks', PORT, HOST, (err) => {
        if (err) throw err;

        console.log('UDP message sent');
        client.close();
    });
}, 1000);
*/

const client = dgram.createSocket('udp4');
const msg = Buffer.from('PluralSight rocks');

// With 1st argument as a buffer
client.send(msg, 0, msg.length, PORT, HOST, (err) => {
    if (err) throw err;

    console.log('UDP message sent');
    // client.close();
});

// Send messages in more than one packets
client.send(msg, 0, 11, PORT, HOST, (err) => {
    if (err) throw err;

    console.log('UDP message sent, 1st part.');
    // client.close();
});

client.send(msg, 11, 6, PORT, HOST, (err) => {
    if (err) throw err;

    console.log('UDP message sent, 2nd part.');
    client.close();
});

// The 1st argument can be an array of messages as well
