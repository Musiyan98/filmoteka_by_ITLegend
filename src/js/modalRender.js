import { fetchIMDbId } from './API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import displaySorryMassege from './library';

const mainFilmGalleryEl = document.querySelector('.gallery');
const libraryFilmGalleryEl = document.querySelector('.gallery-lib');
const modalWindowEl = document.querySelector('.modal');
const modalCloseBtnEl = document.querySelector('.button-modal__close');
const LOCALSTORAGE_WATCHED = 'films-to-watched';
const LOCALSTORAGE_QUEUE = 'films-to-queue';

if (mainFilmGalleryEl) {
  mainFilmGalleryEl.addEventListener('click', onRenderModal);
  modalCloseBtnEl.addEventListener('click', onCloseModal);
}
try {
  libraryFilmGalleryEl.addEventListener('click', onRenderModal);
  modalCloseBtnEl.addEventListener('click', onCloseModal);
} catch (error) {
  // console.log(error);
}

function onRenderModal(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  e.preventDefault();

  document.querySelector('body').scroll = 'no';
  document.querySelector('body').classList.add('no-scroll');

  let filmId = e.target.closest('.gallery__card').id;
  let electFilm = getFilmById(filmId);
  try {
    if (localStorage.getItem('current-lang') === 'english') {
      renderModalWindowEng(electFilm);
    }
    if (localStorage.getItem('current-lang') === 'ukrainian') {
      renderModalWindowUA(electFilm);
    }
    if (!electFilm.poster_path) {
      document.querySelector('.button-modal__img').src =
        'https://st2.depositphotos.com/3994049/8290/v/950/depositphotos_82902580-stock-illustration-retro-movie-projector-vector-detailed.jpg';
    }
  } catch (error) {
    // console.log(error);
  }

  document.querySelector('.backdrop').classList.remove('display__none');
  document.querySelector('.backdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  });
  document.addEventListener('keydown', onKeyDownCloseModal);
  const imdbBtnEl = document.querySelector('.imdb-btn');

  imdbBtnEl.addEventListener('click', onGoIMDbPage);
  if (localStorage.getItem('current-lang') === 'english') {
    cheackBtn(electFilm);
  }
  if (localStorage.getItem('current-lang') === 'ukrainian') {
    cheackBtnUA(electFilm);
  }
}

function onKeyDownCloseModal(e) {
  if (e.code === 'Escape') {
    document.removeEventListener('keydown', onKeyDownCloseModal);
    onCloseModal();
  }
}

function cheackBtn(electFilm) {
  let watchedArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));
  let queveArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));
  const addWatched = document.querySelector('.add__watched');
  const addQueue = document.querySelector('.add_queue');

  addWatched.textContent = 'add to Watched';
  if (!addWatched.dataset.add) {
    addWatched.addEventListener(
      'click',
      onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
    );
    addWatched.dataset.add = 'true';
    addWatched.classList.remove('btn__remove');
  }

  try {
    for (let valueFilm of watchedArrLS) {
      if (valueFilm.id === electFilm.id) {
        addWatched.remove();
        addRemoveWathedBtn(electFilm.id);
        document
          .querySelector('.add__watched')
          .addEventListener(
            'click',
            onBtnRemoveClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
          );
        break;
      }
    }
  } catch (error) {
    // console.log(error);
  }

  addQueue.textContent = 'add to Queue';
  if (!addQueue.dataset.add) {
    addQueue.addEventListener(
      'click',
      onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
    );
    addQueue.dataset.add = 'true';
    addQueue.classList.remove('btn__remove');
  }
  try {
    for (let valueFilm of queveArrLS) {
      if (valueFilm.id === electFilm.id) {
        addQueue.remove();
        addRemoveQueueBtn(electFilm.id);
        document
          .querySelector('.add_queue')
          .addEventListener(
            'click',
            onBtnRemoveClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
          );
        return;
      }
    }
  } catch (error) {
    // console.log(error);
  }
}

function cheackBtnUA(electFilm) {
  let watchedArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));
  let queveArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));
  const addWatched = document.querySelector('.add__watched');
  const addQueue = document.querySelector('.add_queue');

  addWatched.textContent = 'до Переглянутих';
  if (!addWatched.dataset.add) {
    addWatched.addEventListener(
      'click',
      onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
    );
    addWatched.dataset.add = 'true';
    addWatched.classList.remove('btn__remove');
  }

  try {
    for (let valueFilm of watchedArrLS) {
      if (valueFilm.id === electFilm.id) {
        addWatched.remove();
        addRemoveWathedBtn(electFilm.id);
        document
          .querySelector('.add__watched')
          .addEventListener(
            'click',
            onBtnRemoveClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
          );
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log(addQueue);
  addQueue.textContent = 'До черги';
  if (!addQueue.dataset.add) {
    addQueue.addEventListener(
      'click',
      onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
    );
    addQueue.dataset.add = 'true';
    addQueue.classList.remove('btn__remove');
  }
  try {
    for (let valueFilm of queveArrLS) {
      if (valueFilm.id === electFilm.id) {
        addQueue.remove();
        addRemoveQueueBtn(electFilm.id);
        document
          .querySelector('.add_queue')
          .addEventListener(
            'click',
            onBtnRemoveClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
          );
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function onBtnAddClick(electFilm, currentLocalStorage, evt) {
  evt.preventDefault();

  let arrayAdd = localStorage.getItem(currentLocalStorage);
  try {
    arrayAdd = JSON.parse(arrayAdd);
    if (!Array.isArray(arrayAdd)) {
      arrayAdd = [];
    }
  } catch {
    arrayAdd = [];
  }

  const textMessage =
    currentLocalStorage === LOCALSTORAGE_WATCHED
      ? 'to the watched'
      : 'to the queue';

  arrayAdd.push(electFilm);
  Notify.success(`New film ${electFilm.title} added ${textMessage}!`);
  localStorage.setItem(currentLocalStorage, JSON.stringify(arrayAdd));

  if (localStorage.getItem('current-lang') === 'english') {
    cheackBtn(electFilm);
  }
  if (localStorage.getItem('current-lang') === 'ukrainian') {
    cheackBtnUA(electFilm);
  }
}

function onBtnRemoveClick(electFilm, currentLocalStorage, evt) {
  evt.preventDefault();

  let arrayAdd = localStorage.getItem(currentLocalStorage);
  try {
    arrayAdd = JSON.parse(arrayAdd);
    if (!Array.isArray(arrayAdd)) {
      arrayAdd = [];
    }
  } catch {
    arrayAdd = [];
  }

  const textMessage =
    currentLocalStorage === LOCALSTORAGE_WATCHED
      ? 'in the watched'
      : 'in the queue';

  for (let valueFilm of arrayAdd) {
    if (valueFilm.id === electFilm.id) {
      arrayAdd.splice(arrayAdd.indexOf(valueFilm), 1);
      Notify.info(`This film deleted successfully ${textMessage}!`);
    }
  }

  localStorage.setItem(currentLocalStorage, JSON.stringify(arrayAdd));

  if (localStorage.getItem('current-lang') === 'english') {
    cheackBtn(electFilm);
  }
  if (localStorage.getItem('current-lang') === 'ukrainian') {
    cheackBtnUA(electFilm);
  }

  if (
    document.querySelector('.watched').dataset.active === 'true' &&
    currentLocalStorage === LOCALSTORAGE_WATCHED
  ) {
    displaySorryMassege(JSON.parse(localStorage.getItem(currentLocalStorage)));
  }

  if (
    document.querySelector('.queue').dataset.active === 'true' &&
    currentLocalStorage == LOCALSTORAGE_QUEUE
  ) {
    displaySorryMassege(JSON.parse(localStorage.getItem(currentLocalStorage)));
  }
}

function addRemoveWathedBtn(id) {
  let btn = document.createElement('button');
  btn.type = 'button';
  btn.classList.add('add__watched');
  btn.classList.add('btn__remove');
  if (localStorage.getItem('current-lang') === 'english') {
    btn.textContent = 'remove from Watched';
  }
  if (localStorage.getItem('current-lang') === 'ukrainian') {
    btn.textContent = 'видалити з переглянутих';
  }
  btn.dataset.id = `${id}`;
  document.querySelector('.watched-item').appendChild(btn);
}

function addRemoveQueueBtn(id) {
  let btn = document.createElement('button');
  btn.type = 'button';
  btn.classList.add('add_queue');
  btn.classList.add('btn__remove');
  btn.dataset.id = `${id}`;
  if (localStorage.getItem('current-lang') === 'english') {
    btn.textContent = 'remove from Queue';
  }
  if (localStorage.getItem('current-lang') === 'ukrainian') {
    btn.textContent = 'видалити з черги';
  }
  document.querySelector('.queue-item').appendChild(btn);
}

async function onGoIMDbPage(e) {
  let filmId = e.target.dataset.id;
  //console.log(e.target.dataset.id);
  let idIMDb = await getIMDbId(filmId);
  let getHref = `https://www.imdb.com/title/${idIMDb}`;
  console.log(window.open(getHref));
}

function onCloseModal(e) {
  const addWatched = document.querySelector('.add__watched');
  const addQueue = document.querySelector('.add_queue');
  const imdbBtnEl = document.querySelector('.imdb-btn');

  imdbBtnEl.removeEventListener('click', onGoIMDbPage);
  addWatched.removeEventListener('click', onBtnAddClick);
  addQueue.removeEventListener('click', onBtnAddClick);
  addWatched.removeEventListener('click', onBtnRemoveClick);
  addQueue.removeEventListener('click', onBtnRemoveClick);

  document.querySelector('.backdrop').classList.add('display__none');
  document.querySelector('.button-modal--flex').remove();
  localStorage.removeItem('IMDb_id');
  document.querySelector('body').scroll = 'yes';
  document.querySelector('body').classList.remove('no-scroll');
}

async function getIMDbId(filmId) {
  await fetchIMDbId(filmId).then(responce => {
    localStorage.setItem('IMDb_id', JSON.stringify(responce.imdb_id));
  });

  let idIMDb = await JSON.parse(localStorage.getItem('IMDb_id'));
  return idIMDb;
}

function onReadCurrentArrayFilmLS(arr) {
  let filmReadLocalStorage = localStorage.getItem(arr);
  let currentFilmReadLS = JSON.parse(filmReadLocalStorage);
  return currentFilmReadLS;
}

function getFilmById(id) {
  let arr = ['currentArrayFilm', LOCALSTORAGE_WATCHED, LOCALSTORAGE_QUEUE];
  for (let elem of arr) {
    try {
      let arrayOfFilms = onReadCurrentArrayFilmLS(elem);
      let electFilm = arrayOfFilms.find(el => el.id === Number(id));
      if (electFilm) {
        return electFilm;
      }
    } catch {
      continue;
    }
  }
}

function renderModalWindowEng(filmEl) {
  const {
    id,
    title,
    original_title,
    poster_path,
    popularity,
    vote_average,
    vote_count,
    overview,
    genresName,
  } = filmEl;
  // document.querySelector('.modal').lastChild.remove();
  let modalRenderCod = `    
        <div class="button-modal--flex">
                <picture class='button-modal__img-uk'>
                  <source media="(min-width: 1280px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w780${poster_path} 2x,
                              https://image.tmdb.org/t/p/original${poster_path} 3x
                           " type="image/jpg" />
                  <source media="(min-width: 768px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w500${poster_path} 2x,
                              https://image.tmdb.org/t/p/w780${poster_path} 3x
                           " type="image/jpg" />
                  <source media="(max-width: 767px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w500${poster_path} 2x,
                              https://image.tmdb.org/t/p/w780${poster_path} 3x
                           " type="image/jpg" />
                  <img class="button-modal__img" src="https://image.tmdb.org/t/p/w342${poster_path}" alt="${title} poster" loading="lazy" />
               </picture>
            <div class="modal__about--movie">
                <h2 class="modal__about--title">${title}</h2>
                <p class="modal__about--title--movie">Vote / Votes <span class="modal__about--rating" data-digits-counter>${vote_average}</span><span

                        class="modal__about--title--movie-slech">/</span> <span
                        class="modal__about--text--bleck" data-digits-counter>${vote_count}</span>
                        <button class="imdb-btn" data-id="${id}" type="button">IMDb</button>
                        </p>
                <p class="modal__about--title--movie">Popularity<span
                        class="modal__about--text--popularity" data-digits-counter>${popularity}</span>
                <p class="modal__about--title--movie">Original Title<span class="modal__about--text--original--title">A
                        ${original_title}</span>
                <p class="modal__about--title--movie">Genre<span class="modal__about--text--genre">${genresName}</span>
                </p>
                </p>
                <p class="about__movie--text">About</p>
                <p class="about__movie--text--content">${overview}</p>
                <ul class="list__btn--add">
                    <li class="watched-item"><button class="add__watched" data-id="${id}" type="button">add to Watched</button></li>
                    <li class="queue-item"><button class="add_queue" data-id="${id}" type="button">add to queue</button></li>
                </ul>

            </div>
        </div>
    </div>`;

  // <li class="queue-item"><button class="btn__remove" data-id="${id}" type="button">Remove</button></li>

  // <a target="_blank" class="imdb-btn" href="https://www.imdb.com/title/${idInIMDB}">IMDb</a>;

  modalWindowEl.insertAdjacentHTML('beforeend', modalRenderCod);
}

function renderModalWindowUA(filmEl) {
  const {
    id,
    title,
    original_title,
    poster_path,
    popularity,
    vote_average,
    vote_count,
    overview,
    genresName,
  } = filmEl;
  // document.querySelector('.modal').lastChild.remove();
  let modalRenderCod = `    
        <div class="button-modal--flex">
        <picture class='button-modal__img'>
                  <source media="(min-width: 1280px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w780${poster_path} 2x,
                              https://image.tmdb.org/t/p/original${poster_path} 3x
                           " type="image/jpg" />
                  <source media="(min-width: 768px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w500${poster_path} 2x,
                              https://image.tmdb.org/t/p/w780${poster_path} 3x
                           " type="image/jpg" />
                  <source media="(max-width: 767px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w500${poster_path} 2x,
                              https://image.tmdb.org/t/p/w780${poster_path} 3x
                           " type="image/jpg" />
                  <img class="button-modal__img" src="https://image.tmdb.org/t/p/w342${poster_path}" alt="${title} poster" loading="lazy" />
               </picture>
            <div class="modal__about--movie-uk">
                <h2 class="modal__about--title-uk">${title}</h2>
                <p class="modal__about--title--movie-uk">Оцінка / голоси <span class="modal__about--rating-uk" data-digits-counter>${vote_average}</span><span

                        class="modal__about--title--movie-slech-uk">/</span> <span
                        class="modal__about--text--bleck-uk" data-digits-counter>${vote_count}</span>
                        <button class="imdb-btn" data-id="${id}" type="button">IMDb</button>
                        </p>
                <p class="modal__about--title--movie-uk">Популярність<span
                        class="modal__about--text--popularity-uk" data-digits-counter>${popularity}</span>
                <p class="modal__about--title--movie-uk">Оригінальна назва<span class="modal__about--text--original--title-uk">A
                        ${original_title}</span>
                <p class="modal__about--title--movie-uk">Жанри<span class="modal__about--text--genre-uk">${genresName}</span>
                </p>
                </p>
                <p class="about__movie--text">Сюжет</p>
                <p class="about__movie--text--content">${overview}</p>
                <ul class="list__btn--add">
                    <li class="watched-item watched-item-uk"><button class="add__watched add__watched-uk" data-id="${id}" type="button">до Переглянутих</button></li>
                    <li class="queue-item queue-item-uk"><button class="add_queue add_queue-uk" data-id="${id}" type="button">До черги</button></li>
                </ul>

            </div>
        </div>
    </div>`;

  // <li class="queue-item"><button class="btn__remove" data-id="${id}" type="button">Remove</button></li>

  // <a target="_blank" class="imdb-btn" href="https://www.imdb.com/title/${idInIMDB}">IMDb</a>;

  modalWindowEl.insertAdjacentHTML('beforeend', modalRenderCod);
}

// if (currentLang === 'ukrainian') english {
