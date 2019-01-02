const API = Object.freeze({
  URL: 'https://hacker-news.firebaseio.com',
  VERSION: '/v0',
  TOPSTORIES: '/topstories.json',
  ITEM: '/item',
  NEW: '/newstories.json',
});

const NAME = Object.freeze({
  name: 'Suraj',
});

const BATCHSIZE = 30;

export { API, NAME, BATCHSIZE };
