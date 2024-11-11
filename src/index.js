import 'bootstrap/dist/css/bootstrap.min.css';
let api="https://archive-api.open-meteo.com/v1/archive?"
var moment= require("moment");

const jsonContainer=document.querySelector("#json-api-time");
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
    console.log(startDate);
    console.log(endDate);
    let resultApi=apiPos + "start_date=" + startDate + "&" + "end_date=" + endDate + "&" + "daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean";
    console.log(resultApi);
    return resultApi;
}

async function getTime(location,days){
    try{
        let apiLocation=initApi(api,location,days);
        let response= await fetch(apiLocation);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        let timeData = await response.json();
        displayWheaterData(timeData.daily);
    }
  catch(error){
    console.error("Error al obtener el tiempo:", error);
    jsonContainer.textContent = "Error al obtener los datos";
    }
  }
  function displayWheaterData(hourlyData){
    jsonContainer.textContent = "";  

    hourlyData.time.forEach((time, index) => {
        let titleIndex = document.createElement("p");
        let timeP = document.createElement("p");
        let temperatureMaxP = document.createElement("p");
        let temperatureMinP = document.createElement("p");
        let temperatureMidP =document.createElement("p");
       
    
        titleIndex.textContent = `Register ${index + 1} ${time}`;
        timeP.textContent = `Time: ${time}`;
        temperatureMaxP.textContent = `Temperatura Max: ${hourlyData.temperature_2m_max[index]} °C`;
        temperatureMinP.textContent = `Temperatura Min: ${hourlyData.temperature_2m_min[index]} °C`;
        temperatureMidP.textContent = `Temperatura Mid: ${hourlyData.temperature_2m_mean[index]} °C`;
        titleIndex.setAttribute("id","title-data")
       
        jsonContainer.appendChild(titleIndex);
        titleIndex.appendChild(temperatureMaxP);
        titleIndex.appendChild(temperatureMinP);
        titleIndex.appendChild(temperatureMidP);
    });
}
  getTime("london",7);
