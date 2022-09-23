import { Notify } from "notiflix";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhoto } from './fetchPhoto';
import { createPhoto } from './CreatePhoto';
import { NewsApiServise } from './news-service';

const refs = {
  btn: document.querySelector(`.load-more`),
  form: document.querySelector(`.search-form`),
  gallery: document.querySelector(`.gallery`),
};
refs.form.addEventListener(`submit`, onSearch);
refs.btn.addEventListener(`click`, onBtnClick);

const newsApiService = new NewsApiServise();

function onSearch(evt) {
  evt.preventDefault();
  clearGalleryContainer();
  newsApiService.query = evt.target.elements.searchQuery.value;
  if (newsApiService.query === ``) {
     return Notify.failure(`Empty string, please type something`);
  } newsApiService.resetPage();
  newsApiService.fetchArticles().then(photosMarkup);
}
function photosMarkup(hits) {
  refs.gallery.insertAdjacentHTML(`beforeend`, createPhoto(hits));
  
}

function onBtnClick() {
  newsApiService.fetchArticles().then(photosMarkup)
}
function clearGalleryContainer() {
  refs.gallery.innerHTML = ``;
}
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: `bottom`,
  captionDelay: 250,
});