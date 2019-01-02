import Axios from 'axios';
import _ from 'lodash';
import { distanceInWords } from 'date-fns';
import { BATCHSIZE, API } from '../../constants';

function getBatchSizeIndex(batchSize, callNumber) {
  const startIndex = batchSize * callNumber;
  const endIndex = startIndex + batchSize;
  return { startIndex, endIndex };
}

function fetchItemJSON(value) {
  return Axios({
    method: 'GET',
    url: `${API.URL}${API.VERSION}${API.ITEM}/${value}.json`,
  });
}

function makeBatchCalls(callNumber, responseArray) {
  const indexObject = getBatchSizeIndex(BATCHSIZE, callNumber);
  let { startIndex, endIndex } = indexObject;
  const initalDataId = _.slice(responseArray, startIndex, endIndex);
  const promise = [];
  const titles = [];

  _.forEach(initalDataId, (value) => {
    promise.push(fetchItemJSON(value));
  });
  const dataPromise = new Promise((resolve, reject) => {
    Promise.all(promise)
      .then((values) => {
        console.log(values);
        _.forEach(values, (value) => {
          // console.log(value);
          // const { title, url } = value.data;
          titles.push({ index: startIndex + 1, ...value.data });
          startIndex = startIndex + 1;
        });
        resolve(titles);
      })
      .catch((errors) => {
        // console.log(errors);
        reject(errors);
      });
  });
  return dataPromise;
}

function getHumanizedTimeDifference(currentTimeInMilliseconds, articleTimeInMilliseconds) {
  let timeInWords = distanceInWords(currentTimeInMilliseconds, articleTimeInMilliseconds);
  if (timeInWords.includes('about')) {
    timeInWords = timeInWords.substr(6);
  }
  return `${timeInWords} ago`;
}

function getShortUrlLink(urlLink) {
  let shortUrlLink = urlLink.split('//')[1].split('/')[0];
  // console.log(shortUrlLink);
  if (shortUrlLink.includes('www')) {
    return `(${shortUrlLink.substr(4)})`;
  }
  return `(${shortUrlLink})`;
}

export { makeBatchCalls, getHumanizedTimeDifference, getShortUrlLink };