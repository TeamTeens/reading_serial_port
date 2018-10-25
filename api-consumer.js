const baseApi = "http://201.6.243.44:3827"

function recuperarPalestras () {

  return new Promise ( function (resolve) {

    const http = new XMLHttpRequest();
    const url = `${baseApi}/palestra/api/show`;
    http.open('GET', url);
    http.send();
  
    http.onload = (e) => {
      palestras = JSON.parse(http.response);
      resolve(palestras);
    }

  });

}

function confirmarPresenca (documentoAluno,palestraId) {

  console.log("Confirmando presença: " + documentoAluno + "-" + palestraId);

  return new Promise (function (resolve) {

    const http = new XMLHttpRequest();
    const url = `${baseApi}/email/${documentoAluno}-${palestraId}`;
    console.log(url);
    http.open('GET', url);
    http.send();
  
    http.onload = (e) => {
      let statusResultado = http.status;
      console.log(statusResultado);
      resolve (statusResultado);
    }
  });

}

const NAO_REGISTRADO = 404;
const BEM_SUCEDIDO = 200;
const ERRO_REGISTRO = 500;

module.exports = { recuperarPalestras, confirmarPresenca, NAO_REGISTRADO, BEM_SUCEDIDO, ERRO_REGISTRO }