import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// console.log(SimpleLightbox);
// console.log(axios);

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  const searchImg = evt.target.elements.searchQuery.value.trim();
  console.log(searchImg);
  async function fetchImg() {
    const BASE_URL = 'https://pixabay.com/api/';
    const keyApi = '32959525-8b9ed50037adb2599dd065ad6';
    const imageType = 'photo';
    const orientationType = 'horizontal';
    const safeSearch = 'true';
    const perPage = '5';
    const requestArr = await axios.get(
      `${BASE_URL}?key=${keyApi}&per_page=${perPage}&q=${searchImg}&image_type=${imageType}&orientation=${orientationType}&safesearch=${safeSearch}}`
    );

    if (requestArr.data.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    console.log(requestArr);

    const galleryMarkup = createGalleryMarkup(requestArr.data.hits);
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);

    function createGalleryMarkup(array) {
      return array
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) =>
            // `<a class="gallery__item" href="${largeImageURL}">
            `<div class="photo-card">
                       
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300px";/>
              
                <div class="info">
                  <p class="info-item">
                    <b>Likes ${likes}</b>
                  </p>
                  <p class="info-item">
                    <b>Views ${views}</b>
                  </p>
                  <p class="info-item">
                    <b>Comments ${comments}</b>
                  </p>
                  <p class="info-item">
                    <b>Downloads ${downloads}</b>
                  </p>
                </div>
            </div>`
          // </a>`
        )
        .join('');
    }
  }
  fetchImg();
  // .then(resp => console.log(resp))
  // .catch(err => console.log(err));
  // return searchImg;
}
