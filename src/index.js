import 'bootstrap/dist/css/bootstrap.min.css';
let api="https://api.tomorrow.io/v4/weather/forecast?apikey=y2b03NDAIErKqEBjIvvNNVNjsiqwsKv7&location="
var moment= require("moment");

const p=document.querySelector("#json-api-time");
async function getTime(location){
    try{

        let apiLocation= api + location;
        let response= await fetch(apiLocation);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        let time= await response.json();
        p.textContent= JSON.stringify(time);
    }
  catch{
    console.error("Error al obtener el tiempo:", error);
        p.textContent = "Error al obtener los datos";
    }
  }
console.log(moment(Date.now()).format("YYYY-MM-DD"));
getTime("london");