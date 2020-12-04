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
// import {generateComment} from "./mock/comment.js";

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

const filmsListContainer = document.querySelector(`.films-list__container`);
const filmsListContainerAll = document.querySelectorAll(`.films-list__container`);
const showMoreButton = filmsList.querySelector(`.films-list__show-more`);


// очистка всех отрисованных фильмов

const clearRenderedFilms = () => {
  for (let film of filmsListContainerAll) {
    while (film.firstChild) {
      film.removeChild(film.lastChild);
    }
  }
};
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
      films.sort(sortByFieldAscending(`id`));
      renderStartFilmsCards(films);
      // openFilmDetailPopup();

      break;
    case `Sort by date`:
      films.sort(sortByFieldDescending(`release`));
      renderStartFilmsCards(films);
      // openFilmDetailPopup();

      break;
    case `Sort by rating`:
      films.sort(sortByFieldDescending(`rating`));
      renderStartFilmsCards(films);
      // openFilmDetailPopup();

      break;
    default:
      break;
  }
};

sortMenuButtons.forEach((item) => {
  item.addEventListener(`click`, onSortMenuItemClick);
});

// отрисовка Top rated & Most commented
const renderFilmsListExtraElements = () => {
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
};
// отрисовка popup
const renderFilmDetail = () => {
  renderHtml(pageFooter, createPopupTemplate(films[0]), `afterend`);
  const filmDetailsCloseBtn = document.querySelector(`.film-details__close-btn`);
  filmDetailsCloseBtn.addEventListener(`mousedown`, onPopupClosePress); // добавляет слушатель на кнопку close
  document.addEventListener(`keydown`, onPopupEscPress); // добавляет слушатель на клавишу ESC
};

const openFilmDetailPopup = () => {
  const filmCardPosterAll = document.querySelectorAll(`.film-card__title`);
  for (let filmCardPoster of filmCardPosterAll) {
    filmCardPoster.setAttribute(`style`, `cursor: pointer;`);
    filmCardPoster.addEventListener(`click`, renderFilmDetail);
  }
};
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
// кнопки Watchlist & History & Favorites
const addFilmCardControlsItemActive = (/*  arrays  */) => {
  const pageFilms = document.querySelector(`.films`);
  const filmCardControlsItems = pageFilms.querySelectorAll(`.film-card__controls-item`);

  // этот участок кода выполняется(иконка избраное изначально отрисовывается с активныйм CSS классом, если в моках сгенерировано isFavorite:true) , но выдает ошибку.

  /* arrays.forEach((elem, index) => {
    if (elem.isFavorite === true) {
      favoriteButtons[index].classList.add(`film-card__controls-item--active`);
    } else {
      favoriteButtons[index].classList.remove(`film-card__controls-item--active`);
    }
  });*/

  filmCardControlsItems.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      filmCardControlsItems[index].classList.toggle(`film-card__controls-item--active`);
    });
  });
};

// стартовая отрисовка фильмов
const renderStartFilmsCards = (array) => {
  clearRenderedFilms();
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
  renderFilmsListExtraElements();
  addFilmCardControlsItemActive();
  openFilmDetailPopup();
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
  renderFilmsListExtraElements();
  addFilmCardControlsItemActive();
  openFilmDetailPopup();
};

showMoreButton.addEventListener(`click`, renderPortionFilmsCards);

// Whatchlist

const watchlistFilms = films.filter((item) => {
  return item.isWatchlist === true;
});

const watchlistElement = pageMain.querySelector(`a[href="#watchlist"]`);
watchlistElement.children[0].textContent = `${watchlistFilms.length}`;

const onWatchlistElementClick = () => {
  renderStartFilmsCards(watchlistFilms);
  // openFilmDetailPopup();
  showMoreButton.classList.add(`visually-hidden`);
};

watchlistElement.addEventListener(`click`, onWatchlistElementClick);

// History

const historyFilms = films.filter((item) => {
  return item.isWatched === true;
});

const historyElement = pageMain.querySelector(`a[href="#history"]`);
historyElement.children[0].textContent = `${historyFilms.length}`;

const onHistoryElementClick = () => {
  renderStartFilmsCards(historyFilms);
  // openFilmDetailPopup();
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
  renderStartFilmsCards(favoritesFilms);
  // openFilmDetailPopup();
  showMoreButton.classList.add(`visually-hidden`);
};

favoritesElement.addEventListener(`click`, onFavoritesElementClick);

// All movie
const allMovieElement = pageMain.querySelector(`a[href="#all"]`);

const onAllMovieElementClick = () => {
  renderStartFilmsCards(films);
  // openFilmDetailPopup();
};

allMovieElement.addEventListener(`click`, onAllMovieElementClick);
