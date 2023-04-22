import Notiflix from 'notiflix';



const countryName = document.querySelector('.country-name');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(value) {
  if (value !== '') {
    fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`)
      .then(response => {
        if (!response.ok) {
          clearCountryName();
          clearCountryInfo();
          
          throw new Error(
            Notiflix.Notify.failure('Oops, there is no country with that name')
          );
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 8) {
          clearCountryName();
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 3 && data.length <= 8) {
          createCountryName(data);
          clearCountryInfo();
        } else {
          createCountryInfo(data);
          clearCountryName();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    clearCountryName();
  }
}

function clearCountryName() {
  countriesName.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}

function createCountryName(arrayCountriesName) {
  const markup = arrayCountriesName
    .map(({ name, flags }) => {
      return `<li class="country-item">
      <img class="country-image" src="${flags.svg}"
       alt="${flags.alt}" width="25" height="25">
       <span>${name.common}</span></li>`;
    })
    .join('');
  countryName.innerHTML = markup;
}

function createCountryInfo(countryName) {
  const markup = countryName
    .map(({ name, flags, capital, population, languages }) => {
      return `
      <p><img class="country-image" src="${flags.svg}" alt="${
        flags.alt
      }" width="25" height="15">${name.common}</p>
      <p><class="country">Capital:</class=>${capital}</p>
      <p><class="country">Population:</class=>${population}</p>
      <p><class="country">Languages:</class=>${Object.values(languages).join(
        ', '
      )}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

export { fetchCountries };
