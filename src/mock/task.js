import {getRandomInteger, shuffleArray, shuffle, getRandomElement} from "./utils";
import {nanoid} from 'nanoid';
import dayjs from "dayjs";

const MAX_COMMENTS = 5;
const MAX_GENRES = 3;
const MAX_RATING = 9;
const MIN_RANDOM_HOUR = 1;
const MAX_RANDOM_HOUR = 3;
const MIN_RANDOM_MINUTE = 1;
const MAX_RANDOM_MINUTE = 59;

const FILMS_ALL = [
  {
    original: `The Man with the Golden Arm`,
    translation: `Человек с золотой рукой`,
  },
  {
    original: `The Dance of Life`,
    translation: `Танец жизни`,
  },
  {
    original: `Sagebrush Trail`,
    translation: `След в полыни`,
  }
];
const POSTERS_ALL = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
export const DESCRIPTION_ALL = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const GENRES_ALL = [
  `Ужас`,
  `Триллер`,
  `Спорт`,
  `Семейное`,
  `Музыка`,
  `Драма`,
  `Комедия`
];

const ACTOR_NAMES_ALL = [
  `Scarlett Johansson`,
  `Amber Heard`,
  `Gal Gadot`,
  `Megan Fox`,
  `Deepika Padukone`,
  `Margot Robbie`,
  `Alexandra Daddario`,
  `Dwayne Johnson`,
  `Ben Affleck`,
  `Will Smith`
];

const DIRECTOR_NAMES_ALL = [
  `WES ANDERSON`,
  `STANLEY KUBRICK`,
  `ALFRED HITCHCOCK`,
  `CHRISTOPHER NOLAN`,
  `TIM BURTON`,
  `MARTIN SCORSESE`,
  `PETER JACKSON`
];

const WRITER_NAMES_ALL = [
  `Billy Wilder`,
  `Robert Towne`,
  `Quentin Tarantino`,
  `William Goldman`,
  `Woody Allen`
];

const COUNTRIES_ALL = [
  `Russia`,
  `Sweden`,
  `Norway`,
  `Germany`,
  `USA`,
  `United Kingdom`,
  `New Zeland`
];

const AGE_RATING_ALL = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`
];

export const generateDate = (format) => {
  const maxDayGap = 18250;
  const daysGap = getRandomInteger(-maxDayGap, 0);
  const date = dayjs().add(daysGap, `day`).toDate();
  return dayjs(date).format(format);
};

const generateAmountComments = () => {
  const comments = new Array(getRandomInteger(0, MAX_COMMENTS));
  return comments.length;
};

export const generateDescription = (arrays) => {
  const randomAmount = [Math.ceil(Math.random() * 6)];
  shuffle(arrays);
  return arrays.slice(0, randomAmount).join(`, `);
};

const generateRating = () => {
  const rating = `${getRandomInteger(1, MAX_RATING)}.${getRandomInteger(1, MAX_RATING)}`;
  return rating;
};

const generateDuration = () => {
  const duration = {
    hour: getRandomInteger(MIN_RANDOM_HOUR, MAX_RANDOM_HOUR),
    minute: getRandomInteger(MIN_RANDOM_MINUTE, MAX_RANDOM_MINUTE),
  };
  return duration;
};

const generateGenre = (arrays) => {
  const randomAmount = [Math.ceil(Math.random() * MAX_GENRES)];
  shuffle(arrays);
  return arrays.slice(0, randomAmount).join(`, `);
};

const generateName = (arrays, count) => {
  const names = shuffleArray(arrays).slice(0, count);
  return names.join(`, `);
};

const generateCountry = (arrays) => {
  const country = shuffleArray(arrays).slice(0, 1);
  return country;
};

const generateAgeRating = (arrays) => {
  const ageRating = shuffleArray(arrays).slice(0, 1);
  return ageRating;
};

const generateRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const generateTask = () => {
  return {
    id: nanoid(),
    title: getRandomElement(FILMS_ALL),
    poster: getRandomElement(POSTERS_ALL),
    description: generateDescription(DESCRIPTION_ALL),
    rating: generateRating(),
    release: generateDate(`YYYY`),
    duration: generateDuration(),
    genre: generateGenre(GENRES_ALL),
    comments: generateAmountComments(),
    director: generateName(DIRECTOR_NAMES_ALL, 1),
    writers: generateName(WRITER_NAMES_ALL, 3),
    actors: generateName(ACTOR_NAMES_ALL, 4),
    country: generateCountry(COUNTRIES_ALL),
    ageRating: generateAgeRating(AGE_RATING_ALL),
    isWatched: generateRandomBoolean(),
    isWatchlist: generateRandomBoolean(),
    isFavorite: generateRandomBoolean(),
  };
};

