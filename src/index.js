import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getTime } from './api';

const button= document.querySelector("#btn-search");
const jsonContainer=document.querySelector("#json-api-time");
button.addEventListener("click",()=>{
    jsonContainer.textContent=''; 
    let search= document.querySelector("#input-search");
    let searchText= search.value.toUpperCase();
    let titleCity= document.querySelector("#city");
    titleCity.innerHTML = `<i class="bi bi-building-fill"></i> ${searchText}`;
    let searchDay= document.querySelector("#days-input");
    let days=searchDay.value;
    if (!search || isNaN(days) || days <= 0 || days >= 61||searchText=='') {
      alert("Error: Ingrese una ubicación válida y un número de días entre 1 y 60.");
    } else {
      getTime(searchText, days, jsonContainer);
    }
  });