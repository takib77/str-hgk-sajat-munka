// Egy webes alkalmazás során mindig szükség van Logger-re. Ennek a megvalósításhoz készítened kell
// egy Logger class-t, ami kiterjeszti az EventEmitter osztályt! A Logger 2 metódussal rendelkezzen:
// error, success! Mindegyik metódus egy paraméterként kapott string-et ír ki a konzolra.
// Az error-t piros, a success-t zöld színnel!

const EventEmitter = require('events')

class Logger extends EventEmitter {
    error(message) {
        this.emit('error')
        console.log('\x1b[31m', message, '\x1b[0m')
    }
    success(message) {
        this.emit('success')
        console.log('\x1b[32m', message, '\x1b[0m')
    }
}

module.exports = Logger