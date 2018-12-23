import Axios from 'axios';
import _ from 'lodash';
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
        _.forEach(values, (value) => {
          console.log(value);
          const { title, url } = value.data;
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


export default makeBatchCalls;