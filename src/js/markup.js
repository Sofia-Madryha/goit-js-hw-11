function createMarkup(data) {
    return data
      .map(
        ({
          webformatURL,
          tags,
          likes,
          comments,
          largeImageURL,
          downloads,
          views,
        }) => {
          return `<div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-img"  />
          <div class="info">
            <p class="info-item">
              <b>Likes <span class="numbers">${likes}</span></b>
            </p>
            <p class="info-item">
              <b>Views <span class="numbers">${views}</span></b>
            </p>
            <p class="info-item">
              <b>Comments <span class="numbers">${comments}</span> </b>
            </p>
            <p class="info-item">
              <b>Downloads  <span class="numbers">${downloads}</span></b>
            </p>
          </div>
        </div>`;
        }
      )
      .join('');
  }

  export{ createMarkup}