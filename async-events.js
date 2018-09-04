const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        console.time('execute');
        asyncFunc(...args, (err, data) => {
            if (err) {
                return this.emit('error', err);
            }

            this.emit('data', data);
            // report the time consumed
            console.timeEnd('execute');
        });
    }
}

const withTime = new WithTime();

withTime.on('data', (data) => {
    console.log(`Length:${data.length}`);
});

process.once('uncaughtException', (err) => {
    console.log(err);
    // do some clean up
    process.exit(1);    // exit anyway
});

withTime.execute(fs.readFile, '');
withTime.execute(fs.readFile, __filename);