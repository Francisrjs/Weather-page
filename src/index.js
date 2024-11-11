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
    if (days>=61){
      alert("Error: Days>60")
    }else{
      getTime(searchText,days,jsonContainer);
    }
    
})
