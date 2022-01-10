export default class ImagesApiService {
  constructor() {
    this.searchTag = '';
    this.page = 1;
    this.hits = null;
  }

  async fetchImagesByTag() {
    const axios = require('axios').default;
    const options = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '25151398-d1679d24a13d5d70733aed927',
        q: this.searchTag,
        image_type: 'photo',
        per_page: 40,
        page: this.page,
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    const serchResult = await axios(options);
    this.incrementHits();
    this.incrementPage();
    return serchResult.data;
  }

  incrementHits() {
    this.hits = this.page * 40;
  }

  incrementPage() {
    this.page += 1;
  }

  resetSerch(tag) {
    this.page = 1;
    this.hits = null;
    this.searchTag = tag;
  }

  get tag() {
    return this.searchTag;
  }

  set tag(newTag) {
    this.searchTag = newTag;
  }
}

// function fetchImagesByTag(tag) {
//   const URL = 'https://pixabay.com';
//   const API_KEY = '25151398-d1679d24a13d5d70733aed927&';

//   return fetch(`${URL}/api/?key=${API_KEY}&q=${tag}&image_type=photo&per_page=40&page=1`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => { return data.hits });
// }
