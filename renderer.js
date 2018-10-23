// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var SerialPort = require('serialport');
var createInterface = require('readline').createInterface;

var port = new SerialPort('/dev/ttyACM1');

var lineReader = createInterface({
  input: port
});

lineReader.on('line', function (line) {
  console.log(line);
});


// consuming api to display values
const baseApi = "http://201.6.243.44:3827"

function values () {

  return new Promise ( function (resolve) {

    const http = new XMLHttpRequest();
    const url = `${baseApi}/palestra/api/show`;
    http.open('GET', url);
    http.send();
  
    http.onload = (e) => {
      palestras = JSON.parse(http.response);
      resolve(palestras)
    }

  });

}

function confirmarPresenca (documentoAluno,palestraId) {

  return new Promise (function (resolve) {

    const http = new XMLHttpRequest();
    const url = `${baseApi}/email/${documentoAluno}-${palestraId}`
    http.open('GET', url);
    http.send();
  
    http.onload = (e) => {
      resolve(http.status == 200) //significa que funcionou
    }
  });

}

module.exports = { values, confirmarPresenca }