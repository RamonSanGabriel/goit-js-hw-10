import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_SC8BfHNVyGNYfxzcakCxSqyvCzPlozPMdyDAAbZun9scd7Or7ZXJFd9JXP2T8Gmi';

const headers = new Headers({
  'Content-Type': 'application/json',
  'x-api-key': 'DEMO-API-KEY',
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

fetch(
  'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1',
  requestOptions
)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
