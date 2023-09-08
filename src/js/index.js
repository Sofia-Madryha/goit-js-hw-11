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

let currentPage = 1;
elements.form.addEventListener('submit', handlerSubmit);
elements.loadBtn.addEventListener('click', handlerLoadMore);

async function handlerSubmit(evt) {
  evt.preventDefault();
  elements.loadBtn.classList.add('invisible');
  elements.listGallery.innerHTML = '';
  const searchValue = evt.currentTarget.searchQuery.value;
  const searchInfo = await serviceSearch(searchValue);
  
  elements.listGallery.innerHTML = createMarkup(searchInfo);
  elements.loadBtn.classList.remove('invisible');
  currentPage=1;
}


async function handlerLoadMore() { 
  currentPage += 1;
    const searchValue = elements.inputValue.value;
    const searchInfo = await serviceSearch(searchValue, currentPage);
    if(searchInfo.length < 40){
      elements.loadBtn.classList.add('invisible');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    } else {
    elements.listGallery.insertAdjacentHTML(
      'beforeend',
      createMarkup(searchInfo)
    );
  }
}
