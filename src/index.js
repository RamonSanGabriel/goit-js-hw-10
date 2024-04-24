import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: 'breedSelectEl',
});

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

errorEl.classList.add('is-hidden');

//CREATE OPTIONS
function chooseBreed() {
  fetchBreeds()
    .then(data => {
      loaderEl.classList.replace('is-hidden', 'loader');

      let optionsMarkup = data.map(({ name, id }) => {
        return `<option value=${id}>${name}</option>`;
        //<option value={catId}>Cat Name</option>
      });
      breedSelectEl.insertAdjacentHTML('beforeend', optionsMarkup);
      breedSelectEl.classList.remove('is-hidden');
    })
    .catch(onError);
}

chooseBreed();
//HANDLE CHANGE EVENT ON SELECT
breedSelectEl.addEventListener('change', e => {
  //show loader while loading

  loaderEl.classList.replace('is-hidden', 'loader');

  //hide select element and cat-info while loading
  // breedSelectEl.classList.add('is-hidden');
  catInfoEl.classList.add('is-hidden');

  let breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoEl.innerHTML = `<img src='${url}' alt='${name}'width='400'/>
      <div class='box'>
        <h2>${name}</h2>
        <p>${description}</p>
         <p>${temperament}</p>
      </div>
    `;
      catInfoEl.classList.remove('is-hidden');
      breedSelectEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');
    })
    .catch(onError);
});

function onError() {
  //Show error message
  errorEl.classList.remove('is-hidden');

  //hide select
  breedSelectEl.classList.add('is-hidden');
}
// axios.defaults.headers.common['x-api-key'] =
//   'live_SC8BfHNVyGNYfxzcakCxSqyvCzPlozPMdyDAAbZun9scd7Or7ZXJFd9JXP2T8Gmi';

// const headers = new Headers({
//   'Content-Type': 'application/json',
//   'x-api-key': 'DEMO-API-KEY',
// });

// var requestOptions = {
//   method: 'GET',
//   headers: headers,
//   redirect: 'follow',
// };

// fetch(
//   `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`,
//   requestOptions
// )
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
