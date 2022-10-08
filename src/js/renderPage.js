import { fetchSearchFilm, fetchTrending, fetchGenres } from './API.js';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');

form.addEventListener('input', inputFilterFilm);
form.addEventListener('submit', onSubmitFilterFilm);

let page = 1;
let searchNameFilm = '';

let currentArrFilmLS = [];
let currentFilmReadLS = [];

// Получение с бэкэнда массива жанров фильмов и сохраниние его в LocalStorage для дальнейшей работы

fetchGenres().then(responce => {
  localStorage.setItem('Genres', JSON.stringify(responce.genres));
});


// Чтение перед загрузкой стартовой страницы сохраненного массива жанров фильмов

const gen = localStorage.getItem('Genres');

function inputFilterFilm(event) {
  searchNameFilm = event.target.value;
}

function onSubmitFilterFilm(event) {
  event.preventDefault();
  clearGallery();
  fetchSearchFilm(searchNameFilm, page).then(responce => {
    renderFilmoteka(responce);
  });
}

fetchTrending(page).then(responce => {
  renderFilmoteka(responce);
});

function renderFilmoteka(films) {
  const arrayFilms = films.results;
  const totalFilms = films.total_results;
  const totalPage = films.total_pages;
  makeGallery(arrayFilms);
}

// Чтение из LocalStorage массива текущей страницы галереи
function onReadCurrentArrayFilmLS() {
  let filmReadLocalStorage = localStorage.getItem('currentArrayFilm');
  currentFilmReadLS = JSON.parse(filmReadLocalStorage);

  console.log(currentFilmReadLS);

}

onReadCurrentArrayFilmLS();

function makeGallery(arrayCards) {
  const API_IMAGE = 'https://image.tmdb.org/t/p';
  currentArrFilmLS = [];
  const markup = arrayCards
    .map(card => {
      // Формирование массива текущей страницы для записи в LocalStorage для последующего использования в модальном окне
      currentArrFilmLS.push(card);
      //
      let genres = '';
      const genresLocalStorage = localStorage.getItem('Genres');
      const gen = JSON.parse(genresLocalStorage);
      if (card.genre_ids.length !== 0) {
        Object.values(gen).forEach(value => {
          if (card.genre_ids.includes(value.id)) {
            genres = genres.concat(value.name, ', ');
          }
        });
      }
      genres = genres.slice(0, genres.length - 2);
      return `<div class="card">
      <img class="gallery__image" src="${API_IMAGE}/w300${card.poster_path}" alt="Постер не найден" loading="lazy" />
    <p class="genres">${genres}</p>
  </div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  // Удаление из LocalStorage массива жанров фильмов
  localStorage.removeItem('Genres');
  // Сохранение в LocalStorage массива фильмов текущей страницы
  localStorage.setItem('currentArrayFilm', JSON.stringify(currentArrFilmLS));
}

// Очистка галереи

function clearGallery() {
  gallery.innerHTML = '';
}