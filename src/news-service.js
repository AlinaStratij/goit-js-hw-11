import axios from 'axios';


export class NewsApiServise {
  constructor() {
    this.searchQuery = ``;
    this.page = 1;
  }

  async fetchArticles() {
    const URL = `https://pixabay.com/api/`;
    try {
      const response = await axios.get(
      `${URL}?key=30054468-f769e1e50273c32faab9ea2db&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      this.incrementPage();
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }  
  get query() {
    return this.searchQuery;
  }
  set query(newQery) {
    this.searchQuery = newQery;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
// return fetch(
    //   `${URL}?key=30054468-f769e1e50273c32faab9ea2db&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    // )
    //   .then(response => response.json())
    //   .then(({ hits }) => {
    //     this.page += 1;
    //     return hits;
    //   });