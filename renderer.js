// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')
const createTable = require('data-table')

serialport.list((err, ports) => {
  
  if (err) {
    document.getElementById('error').textContent = err.message
    return
  } else {
    document.getElementById('error').textContent = ''
  }

  if (ports.length === 0) {
    document.getElementById('error').textContent = 'No ports discovered'
  }

  const headers = Object.keys(ports[0])
  const table = createTable(headers)
  tableHTML = ''
  table.on('data', data => tableHTML += data)
  table.on('end', () => document.getElementById('ports').innerHTML = tableHTML)
  ports.forEach(port => table.write(port))
  table.end();
})

var port = new serialport('/dev/ttyACM0', { autoOpen: true });

port.on('open', function() {
  console.log("Hey, está aberto, esteja à vontade.")
  // Read data that is available but keep the stream from entering "flowing mode"

});

const ByteLength = serialport.parsers.ByteLength;
const parser = port.pipe(new ByteLength({length: 12}));
parser.on('data', function (data) {
    console.log('Data: ', data.toString());
});