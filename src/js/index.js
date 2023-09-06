import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

(function addSelectOptions() {
  loader.classList.remove('notvisible');
  fetchBreeds()
    .then(breeds => createMarkupSelect(breeds))
    .catch(err => {
      console.log(err);
      Notify.failure('Oops, something went wrong!');
    })
    .finally(() => {
      loader.classList.add('notvisible');
      breedSelect.classList.remove('notvisible');
    });
})();

breedSelect.addEventListener('change', handlerChange);

function handlerChange(evt) {
  loader.classList.remove('notvisible');
  catInfo.innerHTML = ' ';
  const breedId = evt.target.value;
  fetchCatByBreed(breedId)
    .then(cat => createMarkupInfo(cat))
    .catch(err => {
      console.log(err);
      Notify.failure('Oops, something went wrong!');
    })
    .finally(() => {
      loader.classList.add('notvisible');
      // error.classList.add('notvisible');
    });
}

function createMarkupSelect(breeds) {
  const markupBreeds = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markupBreeds);
}

function createMarkupInfo(cat) {
  const markupBreeds = cat
    .map(cat => {
      return `<div class="cat-info">
      <div class="cat-container"> <img src="${cat.url}" alt="${cat.breeds[0].name}" class="img-cat"></div>
      
        <div class="cat-desc"> <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p><b>Temperament:</b>${cat.breeds[0].temperament} </p></div>
      </div>`;
    })
    .join('');
  catInfo.innerHTML = markupBreeds;
}
