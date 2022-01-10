export default function markupForDOM (images) {
    return images.map(image => {
        return `<a href="${image.largeImageURL}"><div class="photo-card">
            <img class="img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b><br>
                <span>${image.likes}</span> 
              </p>
              <p class="info-item">
                <b>Views</b><br>
                <span>${image.views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b><br>
                <span>${image.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b><br>
                <span>${image.downloads}</span>
              </p>
            </div>
            </div></a>`
      
    }).join('');
}