var SerialPort = require('serialport')
var createInterface = require('readline').createInterface

var port = new SerialPort('/dev/ttyACM1')

var events = require('events').EventEmitter;
var emitter = new events.EventEmitter()

var lineReader = createInterface({
  input: port
});

var ultimaLinha = ''

lineReader.on('line', function (line) {

    if (ultimaLinha != line) {
        ultimaLinha = line
        emitter.emit('novo-identificador', ultimaLinha)
    }
  
});

module.exports = { emitter }