import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilmListTemplate} from "./view/film-list.js";
import {createTopFilmsTemplate} from "./view/top-films.js";
import {createShowMoreTemplate} from "./view/show-more.js";
import {createStatsTemplate} from "./view/stats.js";
import {createFilmCardTemplate} from "./view/film-card.js";


const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;

const renderHtml = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const footerStats = document.querySelector(`.footer__statistics`);

renderHtml(pageHeader, createUserProfileTemplate(), `beforeend`);
renderHtml(pageMain, createMenuTemplate(), `beforeend`);
renderHtml(pageMain, createFilmListTemplate(), `beforeend`);
renderHtml(footerStats, createStatsTemplate(), `beforeend`);

const filmsList = pageMain.querySelector(`.films-list`);

renderHtml(filmsList, createTopFilmsTemplate(), `afterend`);
renderHtml(filmsList, createShowMoreTemplate(), `beforeend`);

////////////

const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const topFilmsList = pageMain.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  renderHtml(filmsListContainer, createFilmCardTemplate(), `beforeend`);
}

for (let topFilm of topFilmsList) {
  for (let i = 0; i < TOP_FILMS_COUNT; i++) {
    renderHtml(topFilm, createFilmCardTemplate(), `beforeend`);
  }
}
