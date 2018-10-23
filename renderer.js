// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')
const createTable = require('data-table')

var port = new serialport('/dev/ttyACM0', {
  baudRate: 9600,
  parser: new serialport.parsers.Readline('\r\n')
});

port.on('open', onOpen);
port.on('data', onData);

function onOpen(){
    console.log('Open connections!');
}

function onData(data){
    console.log('on Data ' + data);
}

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
      console.log(http.response)
      resolve(http.status == 200) //significa que funcionou
    }
  });

}

module.exports = { values, confirmarPresenca }