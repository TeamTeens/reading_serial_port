var SerialPort = require('serialport')
var createInterface = require('readline').createInterface

var port = new SerialPort('/dev/ttyACM1')

var lineReader = createInterface({
  input: port
});

var events = require('events').EventEmitter;
var emitter = new events.EventEmitter()

var ultimaLinha = ''

lineReader.on('line', function (line) {

    line = line.trim()

    if (ultimaLinha != line) {
        ultimaLinha = line
        emitter.emit('novo-identificador', ultimaLinha)
    }
  
});

module.exports = { emitter}