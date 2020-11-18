import {createMenuTemplate} from "./view/menu.js";

const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

