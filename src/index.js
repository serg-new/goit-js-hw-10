import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputField = document.querySelector('input#search-box');

inputField.addEventListener('input', debounce(inputForm, DEBOUNCE_DELAY));

function inputForm() {
  fetchCountries(inputField.value.trim());
}

