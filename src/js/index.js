import { serviceSearch } from './service.js';
import { createMarkup } from './markup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  form: document.querySelector('.search-form'),
  SubmitBtn: document.querySelector('.button-js'),
  inputValue: document.querySelector('input'),
  listGallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

elements.form.addEventListener('submit', handlerSubmit);
elements.loadBtn.addEventListener('click', handlerLoadMore);

async function handlerSubmit(evt) {
  evt.preventDefault();
  const searchValue = evt.currentTarget.searchQuery.value;
  const searchInfo = await serviceSearch(searchValue);
  elements.listGallery.innerHTML = createMarkup(searchInfo);
  elements.loadBtn.classList.remove('invisible');
}


async function handlerLoadMore(page) { 
  page += 1;
  if (page >= 13) {
    elements.loadBtn.classList.add('invisible');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    const searchValue = elements.inputValue.value;
    const searchInfo = await serviceSearch(searchValue);
    elements.listGallery.insertAdjacentHTML(
      'beforeend',
      createMarkup(searchInfo)
    );
  }
}
