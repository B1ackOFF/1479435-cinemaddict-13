import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmListTemplate} from "./view/film-list.js";
import {createTopFilmsTemplate} from "./view/top-films.js";
import {createShowMoreTemplate} from "./view/show-more.js";
import {createStatsTemplate} from "./view/stats.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createPopupTemplate} from "./view/popup.js";
import {generateTask} from "./mock/task.js";
import {generateComment} from "./mock/comment.js";

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const MAX_MOCK_FILMS_COUNT = 14;

const KeyboardKeys = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};

const MouseButtons = {
  MAIN: 0
};

const films = new Array(MAX_MOCK_FILMS_COUNT).fill().map(generateTask);

const renderHtml = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const footerStats = document.querySelector(`.footer__statistics`);

renderHtml(pageHeader, createUserProfileTemplate(), `beforeend`);
renderHtml(pageMain, createMenuTemplate(), `beforeend`);
renderHtml(pageMain, createSortTemplate(), `beforeend`);
renderHtml(pageMain, createFilmListTemplate(), `beforeend`);
renderHtml(footerStats, createStatsTemplate(films), `beforeend`);

const filmsList = pageMain.querySelector(`.films-list`);

renderHtml(filmsList, createTopFilmsTemplate(), `afterend`);
renderHtml(filmsList, createShowMoreTemplate(), `beforeend`);

const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const showMoreButton = filmsList.querySelector(`.films-list__show-more`);

// очистка всех отрисованных фильмов
const clearRenderedFilms = () => {
  while (filmsListContainer.firstChild) {
    filmsListContainer.removeChild(filmsListContainer.lastChild);
  }
};

// стартовая отрисовка фильмов
const renderStartFilmsCards = (array) => {
  showMoreButton.classList.remove(`visually-hidden`);

  if (array.length <= FILMS_COUNT) {
    for (let i = 0; i < array.length; i++) {
      renderHtml(filmsListContainer, createFilmCardTemplate(array[i]), `beforeend`);
    }
    showMoreButton.classList.add(`visually-hidden`);
  } else {
    for (let i = 0; i < FILMS_COUNT; i++) {
      renderHtml(filmsListContainer, createFilmCardTemplate(array[i]), `beforeend`);
    }
  }
};
renderStartFilmsCards(films);

// Отрисовка дополнительной порции фильмов

const renderPortionFilmsCards = () => {
  clearRenderedFilms();
  if (MAX_MOCK_FILMS_COUNT >= FILMS_COUNT * 2) {
    for (let i = 0; i < FILMS_COUNT * 2; i++) {
      renderHtml(filmsListContainer, createFilmCardTemplate(films[i]), `beforeend`);
    }
    showMoreButton.classList.add(`visually-hidden`);
  } else {
    for (let i = 0; i < MAX_MOCK_FILMS_COUNT; i++) {
      renderHtml(filmsListContainer, createFilmCardTemplate(films[i]), `beforeend`);
    }
    showMoreButton.classList.add(`visually-hidden`);
  }
  const filmCardPosterAll = document.querySelectorAll(`.film-card__title`);

  for (let filmCardPoster of filmCardPosterAll) {
    filmCardPoster.setAttribute(`style`, `cursor: pointer;`);
    filmCardPoster.addEventListener(`click`, renderFilmDetail);
  }
};

showMoreButton.addEventListener(`click`, renderPortionFilmsCards);

// отрисовка popup

const filmCardPosterAll = document.querySelectorAll(`.film-card__title`);

const renderFilmDetail = () => {
  renderHtml(pageFooter, createPopupTemplate(films[0]), `afterend`);
  const filmDetailsCloseBtn = document.querySelector(`.film-details__close-btn`);
  filmDetailsCloseBtn.addEventListener(`mousedown`, onPopupClosePress); // добавляет слушатель на кнопку close
  document.addEventListener(`keydown`, onPopupEscPress); // добавляет слушатель на клавишу ESC
};

for (let filmCardPoster of filmCardPosterAll) {
  filmCardPoster.setAttribute(`style`, `cursor: pointer;`);
  filmCardPoster.addEventListener(`click`, renderFilmDetail);
}

// закрытие popup
const removePopupHandler = () => {
  const filmDetails = document.querySelector(`.film-details`);
  if (filmDetails) {
    filmDetails.parentNode.removeChild(filmDetails);
  }
};

const onPopupEscPress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    evt.preventDefault();
    removePopupHandler();
    document.removeEventListener(`keydown`, onPopupEscPress);
  }
};

const onPopupClosePress = (evt) => {
  if (evt.button === MouseButtons.MAIN) {
    evt.preventDefault();
    removePopupHandler();
  }
};

// Whatchlist

const watchlistFilms = films.filter((item) => {
  return item.isWatched === true;
});

const watchlistElement = pageMain.querySelector(`a[href="#watchlist"]`);
watchlistElement.children[0].textContent = `${watchlistFilms.length}`;

const onWatchlistElementClick = () => {
  clearRenderedFilms();
  renderStartFilmsCards(watchlistFilms);
  showMoreButton.classList.add(`visually-hidden`);
};

watchlistElement.addEventListener(`click`, onWatchlistElementClick);

// History

const historyFilms = films.filter((item) => {
  return item.isWatchlist === true;
});

const historyElement = pageMain.querySelector(`a[href="#history"]`);
historyElement.children[0].textContent = `${historyFilms.length}`;

const onHistoryElementClick = () => {
  clearRenderedFilms();
  renderStartFilmsCards(historyFilms);
  showMoreButton.classList.add(`visually-hidden`);
};

historyElement.addEventListener(`click`, onHistoryElementClick);

// Favorites

const favoritesFilms = films.filter((item) => {
  return item.isFavorite === true;
});

const favoritesElement = pageMain.querySelector(`a[href="#favorites"]`);
favoritesElement.children[0].textContent = `${ favoritesFilms.length}`;

const onFavoritesElementClick = () => {
  clearRenderedFilms();
  renderStartFilmsCards(favoritesFilms);
  showMoreButton.classList.add(`visually-hidden`);
};

favoritesElement.addEventListener(`click`, onFavoritesElementClick);

// All movie
const allMovieElement = pageMain.querySelector(`a[href="#all"]`);

const onAllMovieElementClick = () => {
  clearRenderedFilms();
  renderStartFilmsCards(films);
};

allMovieElement.addEventListener(`click`, onAllMovieElementClick);

// Sort

const sortMenuButtons = document.querySelectorAll(`.sort__button`);

const removeActiveClass = (array, className) => {
  array.forEach((item) => {
    item.classList.remove(className);
  });
};

export const sortByFieldAscending = (field) => {
  return (a, b) => a[field] > b[field] ? 1 : -1;
};

export const sortByFieldDescending = (field) => {
  return (a, b) => a[field] > b[field] ? -1 : 1;
};

const onSortMenuItemClick = (evt) => {
  evt.preventDefault();
  removeActiveClass(sortMenuButtons, `sort__button--active`);
  evt.target.classList.toggle(`sort__button--active`);

  switch (evt.target.textContent) {
    case `Sort by default`:
      clearRenderedFilms();
      films.sort(sortByFieldAscending(`id`));
      renderStartFilmsCards(films);

      break;
    case `Sort by date`:
      clearRenderedFilms();
      films.sort(sortByFieldDescending(`release`));

      renderStartFilmsCards(films);

      break;
    case `Sort by rating`:
      clearRenderedFilms();
      films.sort(sortByFieldDescending(`rating`));
      renderStartFilmsCards(films);

      break;
    default:
      break;
  }
};

sortMenuButtons.forEach((item) => {
  item.addEventListener(`click`, onSortMenuItemClick);
});

// отрисовка Top rated & Most commented
/*
const renderTopFilmsCards = (array) => {
  for (let topFilm of topFilmsList) {
    for (let i = 0; i < TOP_FILMS_COUNT; i++) {
      renderHtml(topFilm, createFilmCardTemplate(array[i]), `beforeend`);
    }
  }
};
renderTopFilmsCards(films);
*/
const filmsListExtraElements = document.querySelectorAll(`.films-list--extra`);
const extraFilms = films.slice();

const topRatedFilms = extraFilms.sort(sortByFieldDescending(`rating`)).slice(0, EXTRA_FILMS_COUNT);
const mostCommentedFilms = extraFilms.sort(sortByFieldDescending(`comments`)).slice(0, EXTRA_FILMS_COUNT);

filmsListExtraElements.forEach((element, index) => {
  const filmsListExtraContainerElement = element.querySelector(`.films-list__container`);

  if (index === 0) {
    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      renderHtml(filmsListExtraContainerElement, createFilmCardTemplate(topRatedFilms[i]), `beforeend`);
    }
  } else {
    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      renderHtml(filmsListExtraContainerElement, createFilmCardTemplate(mostCommentedFilms[i]), `beforeend`);
    }
  }
});

// кнопки Watchlist & History & Favorites
/*
const pageFilms = document.querySelector(`.films`);
const addToWatchlistButton = pageFilms.querySelectorAll(`.film-card__controls-item--add-to-watchlist`);
const addToHistoryButton = pageFilms.querySelectorAll(`.film-card__controls-item--mark-as-watched`);
const addToFavoriteButton = pageFilms.querySelectorAll(`.film-card__controls-item--favorite`);
*/

