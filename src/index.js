import 'bootstrap/dist/css/bootstrap.min.css';
let api="https://api.open-meteo.com/v1/forecast?"
var moment= require("moment");

const p=document.querySelector("#json-api-time");
function getPos(location,latitude){
    switch(location){
        case "buenos-aires":
           return  (latitude)? -34.6131 : -58.3772; //latitude / longitude
        case "london":
            return (latitude)? 51.50: -0.12;//latitude / longitude
    }
    
}
function initApi(api,location,days){
    let positionLatitude=getPos(location,1);
    let positionLongitude=getPos(location,0);
    let apiPos= api + "latitude=" + positionLatitude +"&"+"longitude="+positionLongitude+"&";
    let endDate=moment().format("YYYY-MM-DD");
    let startDate= moment().subtract(days,'days').format("YYYY-MM-DD");
    return apiPos + "start_date="+startDate+"&"+"end_date="+endDate+"&"+ "hourly="+"temperature_2m,relative_humidity_2m";
}

async function getTime(location,days){
    try{
        let apiLocation=initApi(api,location,days);
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
  getTime("london",7);
