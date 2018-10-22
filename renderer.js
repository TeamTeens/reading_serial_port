// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // All of the Node.js APIs are available in this process.

// const serialport = require('serialport')
// const createTable = require('data-table')

// serialport.list((err, ports) => {

//   if (err) {
//     document.getElementById('error').textContent = err.message
//     return
//   } else {
//     document.getElementById('error').textContent = ''
//   }

//   if (ports.length === 0) {
//     document.getElementById('error').textContent = 'No ports discovered'
//   }

//   const headers = Object.keys(ports[0])
//   const table = createTable(headers)
//   tableHTML = ''
//   table.on('data', data => tableHTML += data)
//   table.on('end', () => document.getElementById('ports').innerHTML = tableHTML)
//   ports.forEach(port => table.write(port))
//   table.end();
// })

// var port = new serialport,('/dev/ttyACM0', {   
//   baudrate: 2400,
//   parser: serialport.parsers.readline("\n") 
// }, false);

// port.on('open', function() {
//   console.log("Hey, está aberto, esteja à vontade.")
//   // Read data that is available but keep the stream from entering "flowing mode"

// });

// const ByteLength = serialport.parsers.ByteLength;
// const parser = port.pipe(new ByteLength({length: 12}));
// parser.on('data', function (data) {
//     console.log('Data: ', data.toString());
// });


const baseApi = "http://201.6.243.44:3827"

// consuming api to display values

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