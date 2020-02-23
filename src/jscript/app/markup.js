import resultCountry from '../templates/resultCountry.hbs';
import resultCountryList from '../templates/resultCountryList.hbs';
import fetchCountries from './fetchCountries';
import PNotify from 'pnotify/dist/es/PNotify';
const debounce = require('lodash.debounce');

const jsResult = document.querySelector('.js-result');
const input = document.getElementById('search-input');
const countryList = document.querySelector('.list-of-countries');

function markup(e) {
  const textInInput = e.target.value;

  fetchCountries(textInInput)
    .then(res => res.json())
    .then(data => {
      jsResult.innerHTML = '';
      countryList.innerHTML = '';
      if (data.length >= 2 && data.length <= 10) {
        countryList.innerHTML = data
          .map(item => resultCountryList(item))
          .join('');
      } else if (data.length === 1) {
        jsResult.innerHTML = resultCountry(...data);
      } else {
        return PNotify.error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
    });
}

input.addEventListener('input', debounce(markup, 500));
