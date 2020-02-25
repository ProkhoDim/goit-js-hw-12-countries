import resultCountry from '../templates/resultCountry.hbs';
import resultCountryList from '../templates/resultCountryList.hbs';
import fetchCountries from './fetchCountries';
import PNotify from 'pnotify/dist/es/PNotify';

const debounce = require('lodash.debounce');

const markupRef = {
  jsResult: document.querySelector('.js-result'),
  input: document.getElementById('search-input'),
  countryList: document.querySelector('.list-of-countries'),
};

function markup(e) {
  const textInInput = e.target.value;

  fetchCountries(textInInput)
    .then(data => {
      markupRef.jsResult.innerHTML = '';
      markupRef.countryList.innerHTML = '';

      if (data.length > 1 && data.length <= 10) {
        markupRef.countryList.innerHTML = data
          .map(item => resultCountryList(item))
          .join('');
        return;
      }

      if (data.length === 1) {
        markupRef.jsResult.innerHTML = resultCountry(...data);
        return;
      }

      return PNotify.error({
        text: 'Too many matches found. Please enter a more specific query!',
      });
    })
    .catch(err => {
      console.log(err);
      markupRef.countryList.innerHTML = '';
      return PNotify.error({
        text: 'No text in input. Please, write some letters!',
      });
    });
}

markupRef.input.addEventListener('input', debounce(markup, 500));
