import { Notify } from "notiflix";
import 'simplelightbox/dist/simple-lightbox.min.css';
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

async function onSearch(evt) {
  evt.preventDefault();
  clearGalleryContainer();
  newsApiService.query = evt.target.elements.searchQuery.value.trim();
  if (newsApiService.query === ``) {
    refs.btn.classList.add(`is-hidden`);
    return Notify.failure(`Empty string, please type something`);
  }
  newsApiService.resetPage();
  const res = await newsApiService.fetchArticles();
    refs.btn.classList.remove(`is-hidden`);
  if (res.hits.length === 0) {
    Notify.warning(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    refs.btn.classList.add(`is-hidden`);
    return
  }
   Notify.info(`Hooray! We found ${res.totalHits} images.`); 
  photosMarkup(res.hits);
  
     
}
  
  function photosMarkup(data) {
    refs.gallery.insertAdjacentHTML(`beforeend`, createPhoto(data));
    var lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionPosition: `bottom`,
      captionDelay: 250,
    });
  
  }

async function onBtnClick(evt) {
  const res = await newsApiService.fetchArticles();
  photosMarkup(res.hits);
  if (res.totalHits - 40 * (newsApiService.page - 1) <= 0) {
    refs.btn.classList.add('is-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
  function clearGalleryContainer() {
    refs.gallery.innerHTML = ``;
  }

