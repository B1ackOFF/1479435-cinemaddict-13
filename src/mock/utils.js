export const shuffleArray = (arrays) => {
  const results = [...arrays];
  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = results[i];
    results[i] = results[j];
    results[j] = temp;
  }
  return results;
};

export const shuffle = (arrays) => {
  arrays.sort(() => Math.random() - 0.5);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (arrays) => {
  return arrays[Math.floor(Math.random() * arrays.length)];
};

export const getRandomNumber = (arrays) => {
  return [Math.floor(Math.random() * arrays.length)];
};
