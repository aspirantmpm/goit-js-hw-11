import Notiflix from 'notiflix';
import axios from 'axios';

console.log(axios);

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
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
    const perPage = '40';
    const requestArr = await axios.get(
      `${BASE_URL}?key=${keyApi}&q=${searchImg}&image_type=${imageType}&orientation=${orientationType}&safesearch=${safeSearch}&per_page=${perPage}}`
    );

    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    // const data = await response.json();
    // //
    //   return data;
    console.log(requestArr);
    // return requestArr;

    console.log(requestArr);

    const galleryMarkup = createGalleryMarkup(requestArr.data.hits);
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);

    function createGalleryMarkup(array) {
      return array
        .map(
          ({ webformatURL, largeImageURL, tags }) =>
            `<a class="gallery__item" href="${largeImageURL}">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
          </a>`
        )
        .join('');
    }
  }
  fetchImg();
  // .then(resp => console.log(resp))
  // .catch(err => console.log(err));
  // return searchImg;
}
