import axios from 'axios';

export class NewsApiServise {
  constructor() {
    this.searchQuery = ``;
    this.page = 1;
  }

  fetchArticles() {
    const URL = `https://pixabay.com/api/`;

   return fetch(
      `${URL}?key=30054468-f769e1e50273c32faab9ea2db&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    )
      .then(response => response.json())
       .then(data => {
            this.page += 1;
            return data.hits;
      });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQery) {
    this.searchQuery = newQery;
  }
}