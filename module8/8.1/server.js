const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // Loading the big file directly into memory
    /*
    fs.readFile('./big.file', (err, data) => {
        if (err) throw err;

        res.end(data);
    });*/

    // Streaming version
    const src = fs.createReadSteram('./big.file');
    src.pipe(res);
});

server.listen(8000);