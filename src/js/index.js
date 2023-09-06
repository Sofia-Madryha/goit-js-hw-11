import axios from 'axios';

const elements = {
    form: document.querySelector(".search-form"),
    SubmitBtn: document.querySelector(".button-js")
    
}

elements.form.addEventListener("submit", handlerSubmit);

function handlerSubmit(evt){
evt.preventDefault()
const searchValue = evt.currentTarget;
console.log(searchValue);
}