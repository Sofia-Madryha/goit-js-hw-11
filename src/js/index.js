import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  form: document.querySelector('.search-form'),
  SubmitBtn: document.querySelector('.button-js'),
  inputValue: document.querySelector('input'),
  listGallery: document.querySelector('.gallery'),
};

elements.form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(evt) {
  evt.preventDefault();
  const searchValue = evt.currentTarget.searchQuery.value;
  const searchInfo = await serviceSearch(searchValue);
  console.log(searchInfo);

  elements.listGallery.innerHTML = createMarkup(searchInfo)

}

async function serviceSearch(searchValue) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '39280260-fdc3cfd05b2bfaaf6335e84c8',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: 1
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    if (response.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      const data = response.data.hits;
      return data.map(
        ({
          webformatURL,
          tags,
          largeImageURL,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return {
            webformatURL,
            tags,
            largeImageURL,
            likes,
            views,
            comments,
            downloads,
          };
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

function createMarkup(data) {
    return data.map(({webformatURL, tags, likes, comments, largeImageURL, downloads, views}) => {
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments} </b>
          </p>
          <p class="info-item">
            <b>Downloads  ${downloads}</b>
          </p>
        </div>
      </div>`;
      })
      .join('');

  }
