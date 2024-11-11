import './style.css';
import moment from 'moment';

const api = "https://archive-api.open-meteo.com/v1/archive?";
const apiLoc = "https://geocoding-api.open-meteo.com/v1/search?&count=1&language=en&format=json&name=";
const apiCurrentBase = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&";

function initApi(api, location, days) {
    return new Promise(async (resolve, reject) => {
        try {
            const apiLocation = apiLoc + location;
            const response = await fetch(apiLocation);
  
            if (!response.ok) {
                throw new Error(`Error fetching location: ${response.status}`);
            }
  
            const data = await response.json();
  
            if (data.results && data.results.length > 0) {
                const firstResult = data.results[0];
                const latitude = firstResult.latitude;
                const longitude = firstResult.longitude;
                
               
                const apiCurrent = `${apiCurrentBase}latitude=${latitude}&longitude=${longitude}`;
                console.log("apiCurrent URL:", apiCurrent);
                putLastTemperature(apiCurrent,location);

                const apiPos = `${api}latitude=${latitude}&longitude=${longitude}&`;
                const endDate = moment().format("YYYY-MM-DD");
                const startDate = moment().subtract(days, 'days').format("YYYY-MM-DD");
  
                const resultApi = `${apiPos}start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean`;
                resolve({ resultApi }); // Devolvemos ambas URLs
            } else {
                reject(new Error("No results found in API response."));
            }
        } catch (error) {
            reject(error);
        }
    });
}

async function getTime(location, days, element) {
    try {
        const { resultApi } = await initApi(api, location, days);
        console.log("Historical API URL:", resultApi);
        
        const response = await fetch(resultApi);
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const timeData = await response.json();
        console.log("Weather Data:", timeData);
        displayWheaterData(timeData.daily, element);
    } catch (error) {
        console.error("Error al obtener el tiempo:", error);
        element.textContent = "Error al obtener los datos";
    }
}

function displayWheaterData(hourlyData, element) {
    element.textContent = "";  

    hourlyData.time.forEach((time, index) => {
        let card = document.createElement("div");
        card.classList.add("card", "mb-3", "p-3");

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let titleIndex = document.createElement("h3");
        let temperatureMaxP = document.createElement("p");
        let temperatureMinP = document.createElement("p");
        let temperatureMidP = document.createElement("p");

        temperatureMidP.classList.add("card-text");
        temperatureMinP.classList.add("card-text");
        temperatureMaxP.classList.add("card-text");
        titleIndex.classList.add("card-title");

        titleIndex.innerHTML = `<i class="bi bi-calendar"></i> ${time}`;
        temperatureMaxP.textContent = `Temperature Max: ${hourlyData.temperature_2m_max[index]} °C`;
        temperatureMinP.textContent = `Temperature Min: ${hourlyData.temperature_2m_min[index]} °C`;
        temperatureMidP.textContent = `Temperature Mid: ${hourlyData.temperature_2m_mean[index]} °C`;
        titleIndex.setAttribute("id", "title-data");

        cardBody.appendChild(titleIndex);
        cardBody.appendChild(temperatureMaxP);
        cardBody.appendChild(temperatureMinP);
        cardBody.appendChild(temperatureMidP);
        card.appendChild(cardBody);
        element.appendChild(card);
    });
}

async function putLastTemperature(api) {
    let titleCity= document.querySelector("#city");
    try {
      const response = await fetch(api);
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`No se encontró la ubicación`);
        } else {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      }
  
      const currentTemperature = await response.json();

      const temperatures = currentTemperature.hourly.temperature_2m;

      const latestTemperature = temperatures[temperatures.length - 1];



      titleCity.innerHTML= `<i class="bi bi-building-fill"></i>${titleCity.textContent}, the last temperature:${latestTemperature}°C`;
    } catch (error) {
      console.error("Error al obtener el tiempo actual:", error);
      titleCity.textContent = `Error: ${error.message}`;
    }
  }

export { getTime };
