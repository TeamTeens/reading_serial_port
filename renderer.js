const baseApi = "http://201.6.243.44:3827"

function recuperarPalestras () {

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

  console.log("Confirmando presença: " + documentoAluno + "-" + palestraId)

  return new Promise (function (resolve) {

    const http = new XMLHttpRequest();
    const url = `${baseApi}/email/${documentoAluno}-${palestraId}`
    console.log(url)
    http.open('GET', url);
    http.send();
  
    http.onload = (e) => {
      resolve(http.status == 200) //significa que funcionou
    }
  });

}

module.exports = { recuperarPalestras, confirmarPresenca }