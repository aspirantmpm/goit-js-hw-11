import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(SimpleLightbox);
// console.log(axios);

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const keyApi = '32959525-8b9ed50037adb2599dd065ad6';
const imageType = 'photo';
const orientationType = 'horizontal';
const safeSearch = 'true';
const perPage = '40';

searchForm.addEventListener('submit', onSearch);


function onSearch(event) {
  event.preventDefault();
  let page = 1;
  buttonLoadMore.hidden = false;
  const searchImg = event.target.elements.searchQuery.value.trim();
  if (!searchImg) {
    return;
  }
  // resetSearch();
  console.log(searchImg);

  fetchImg(searchImg, page)
    .then(data => {
      const requestGallery = createGalleryMarkup(data.hits);
      lightboxMarkup(requestGallery);
      // gallery.insertAdjacentHTML('beforeend', requestGallery);
    })
    .catch(error => console.log(error));

  buttonLoadMore.addEventListener('click', onClick);
  function onClick(event) {
    event.preventDefault();
    page += 1;
    fetchImg(searchImg, page)
      .then(data => {
        const requestGallery = createGalleryMarkup(data.hits);
        newLightbox()
          gallery.insertAdjacentHTML('beforeend', requestGallery);
        console.log('page', page);
        
        if (perPage * page > data.totalHits) {
          buttonLoadMore.hidden = true;
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        }
      })
      .catch(error => console.log(error));    
  }  
}

async function fetchImg(searchImg, page) {
  const requestArr = await axios.get(
    `${BASE_URL}?key=${keyApi}&per_page=${perPage}&page=${page}&q=${searchImg}&image_type=${imageType}&orientation=${orientationType}&safesearch=${safeSearch}}`
  );
  console.log(requestArr);
  
  if (requestArr.data.hits.length === 0) {
    buttonLoadMore.hidden = true;
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  page += 1;
  return requestArr.data;
}

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
        `
            <a class="gallery__item" href="${largeImageURL}">
            <div class="photo-card">

                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="300px";/>

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
            </div>
          </a>
          `
    )
    .join('');
}

function resetSearch(ref) {
  if (ref.children.length) {
    // reload();
    ref.innerHTML = '';
    page = 1;
  }
  return;
}

function newLightbox() {
  let lightbox = new SimpleLightbox('.gallery .gallery__item', {
    scrollZoom: false,
    
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  // lightbox.refresh();
}

function lightboxMarkup(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);

  newLightbox();
}