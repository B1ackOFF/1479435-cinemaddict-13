// Ограничение кол-ва символов в description
const MAX_SYMBOLS_DESCRIPTION = 140;

const limitStr = (descriptionText, maxSymbols) => {
  if (descriptionText.length >= maxSymbols) {
    return `${descriptionText.substring(0, maxSymbols)}...`;
  }
  return descriptionText;
};

export const createFilmCardTemplate = (film) => {
  const {id, title, rating, release, duration, genre, poster, description, comments} = film;

  return `<article class="film-card" id="${id}">
  <h3 class="film-card__title">${title.translation}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${release}</span>
    <span class="film-card__duration">${duration.hour}h ${duration.minute}m</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/${poster}" alt="${title.original}" class="film-card__poster">
  <p class="film-card__description">${limitStr(description, MAX_SYMBOLS_DESCRIPTION)}</p>
  <a class="film-card__comments">${comments} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};
