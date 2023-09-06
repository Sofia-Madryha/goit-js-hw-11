import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_VDJSMJPG2m48BcCykoUZMpUcPLXl6OLIir4W5GDRotTQALTA6O9sdi92sADBJGdi';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(err => console.log(err));
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(err => console.log(err))}

export { fetchBreeds, fetchCatByBreed };
