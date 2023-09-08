import axios from 'axios';
let page = 1;

async function serviceSearch(searchValue) {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
      key: '39280260-fdc3cfd05b2bfaaf6335e84c8',
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: page,
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
            totalHits,
            total,
          }) => {
            return {
              webformatURL,
              tags,
              largeImageURL,
              likes,
              views,
              comments,
              downloads,
              total,
              totalHits,
            };
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }


  export { serviceSearch}