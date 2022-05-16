import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { getRandomHexColor } from './getRandomHexColor';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const listElement = document.querySelector(".country-list");
const infoElement = document.querySelector(".country-info");
const inputElement = document.querySelector('#search-box');

inputElement.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
  if (e.target.value.trim()) {fetchCountries(e.target.value.trim()).then(countries => {
        if (countries.length > 10) {
            listElement.innerHTML = "";
            infoElement.innerHTML = "";
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        }
        else if (countries.length >= 2 && countries.length <= 10) { infoElement.innerHTML = ""; renderCountriesName(countries); }
        else { listElement.innerHTML = ""; renderCountriesInfo(countries)}
        
    }).catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    console.log(error)
    });}
    
    else {
        infoElement.innerHTML = "";
        listElement.innerHTML = "";
        return;
    } 
}

function renderCountriesName(countries) {
        const markup = countries
    .map((country) => {
        return `<li style = 'background-color:${getRandomHexColor()}; box-shadow: 10px 1px 8px 1px rgba(189, 189, 189, 0.97);'>
         <p class="list-item"><span>
          <img width="30px" height="30px"  src="${country.flags.svg}">
                    </span> ${country.name.official}</p>
          </li>`;
    })
    .join("");
    listElement.innerHTML = markup;
}

function renderCountriesInfo(countries) {
       const countriesInfo = countries.map((country) => {
    
        return `<h1 style = 'background-color:${getRandomHexColor()}; box-shadow: 10px 1px 8px 1px rgba(189, 189, 189, 0.97);' class="country_name">
      <span>
          <img width="60px" height="40px"  src="${country.flags.svg}">
                    </span> ${country.name.official}
                  </h1>
    <p class="country_data"> <span class="country_data--title">Capital: </span> ${country.capital}</p>
    <p class="country_data"> <span class="country_data--title">Population: </span> ${country.population} </p>
    <p class="country_data"> <span class="country_data--title">Languages: </span> ${Object.values(country.languages)}</p>`;
    })
    .join("");
    infoElement.innerHTML = countriesInfo;
}


