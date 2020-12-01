import {getRandomNumber} from "./utils";
import {generateDate, generateDescription, DESCRIPTION_ALL} from "./task";
import {nanoid} from 'nanoid';
// import dayjs from "dayjs";


const FIRST_NAMES = [
  `Ivan`,
  `Maria`,
  `Alex`,
  `Klava`,
  `Vasya`
];

const LAST_NAMES = [
  `Petrov`,
  `Smith`,
  `Sidorov`,
  `White`
];

const generateEmotion = () => {
  const textEmotions = `smile.png; sleeping.png; puke.png; angry.png `;
  const emotions = textEmotions.split(`; `);
  const emotion = emotions[getRandomNumber(emotions)];
  return emotion;
};

const generateAutor = () => {
  const autor = `${FIRST_NAMES[getRandomNumber(FIRST_NAMES)]} ${LAST_NAMES[getRandomNumber(LAST_NAMES)]}`;
  return autor;
};


export const generateComment = () => {
  return {
    id: nanoid(),
    date: generateDate(`YYYY/MM/DD HH:mm`),
    autor: generateAutor(),
    message: generateDescription(DESCRIPTION_ALL),
    emotion: generateEmotion()
  };
};

