import Notiflix from 'notiflix';
const axios = require('axios').default;

console.log(axios);

function fetchImg(name) {
  const BASE_URL = 'https://pixabay.com/api/';
  const keyApi = '32959525-8b9ed50037adb2599dd065ad6';
  const properties = [
    'name',
    'webformatURL',
    'largeImageURL',
    'tags',
    'likes',
    'views',
    'comments',
    'downloads',
  ];
  return fetch(`${BASE_URL}?${keyApi}=${properties.join(',')}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
console.log(fetchImg);
