import Axios from 'axios';
import _ from 'lodash';
import { distanceInWords } from 'date-fns';
import { BATCHSIZE, API, TreeNodeType } from '../../constants';
import TreeNode from './DataStructure/TreeNode';
import CommentTree from './DataStructure/CommentTree';

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

function getKidsRecursively(kids, promise, commentTree) {
  if (_.isEmpty(kids)) {
    return;
  }
  _.forEach(kids, (kidId) => {
    promise.push(fetchItemJSON(kidId));
  });
  const CommentTreePromise = new Promise((resolve, reject) => {
    Promise.all(promise)
      .then((values) => {
        _.forEach(values, (value) => {
          const { data } = value;
          const commentNode = new TreeNode(data, TreeNodeType.COMMENT);
          commentTree.insertNode(root, commentNode);
        });
        promise = [];
        console.log(commentTree);
      }).catch((err) => {
        console.log(err);
      });
  });
}

function generateCommentTree(commentTreeRootNode) {
  console.log(commentTreeRootNode);
  let promise = [];
  const commentTree = new CommentTree(commentTreeRootNode);
  const { root } = commentTree;
  if (!_.isNull(root) || !_.isEmpty(root)) {
    const { kids } = root;
    getKidsRecursively(kids, promise);
  }
}

function getComments(postId, storyType) {
  const Post = fetchItemJSON(postId);
  let commentTreeRootNode;
  const CommentTreePromise = new Promise((resolve, reject) => {
    Post.then((result) => {
      console.log(result);
      if (!_.isEmpty(result)) {
        const { data } = result;
        if (!_.isNull(data) || !_.isEmpty(data)) {
          if (storyType === 'regular') {
            commentTreeRootNode = new TreeNode(data);
            generateCommentTree(commentTreeRootNode);          
            resolve(commentTreeRootNode);
          }
        }
      }
    })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
  return CommentTreePromise;
}

export {
  makeBatchCalls, getHumanizedTimeDifference, getShortUrlLink, getComments,
};