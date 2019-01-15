/* eslint-disable consistent-return */
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

// function getKidsRecursively(root, kids, promise, commentTree) {
//   // recursive strategy to be used here
//   if (_.isEmpty(kids)) {
//     return;
//   }
//   // take kids of root
//   _.forEach(kids, (kidId) => {
//     promise.push(fetchItemJSON(kidId));
//   });
//   const CommentTreePromise = new Promise((resolve, reject) => {
//     Promise.all(promise)
//       .then((values) => {
//         _.forEach(values, (value) => {
//           const { data } = value;
//           const commentNode = new TreeNode(data, TreeNodeType.COMMENT);
//           commentTree.insertNode(root, commentNode);
//         });
//         promise = [];
//         console.log(commentTree);
//       }).catch((err) => {
//         console.log(err);
//       });
//   });
// }

function getKidsRecursively(root, commentTree) {
  // if root is none return
  if (_.isNull(root)) {
    return;
  }
  let promise = [];
  let CommentTreePromise;
  const { kids } = root;
  if (!_.isEmpty(kids)) {
    _.forEach(kids, (kidId) => {
      promise.push(fetchItemJSON(kidId));
    });
    CommentTreePromise = new Promise((resolve, reject) => {
      Promise.all(promise)
        .then((values) => {
          _.forEach(values, (value) => {
            const { data } = value;
            const commentNode = new TreeNode(data, TreeNodeType.COMMENT);
            commentTree.insertNode(root, commentNode);
            getKidsRecursively(commentNode, commentTree, promise);
          });
          // console.log(commentTree);
          resolve(commentTree);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return CommentTreePromise;
  }
  return null;
}

function generateCommentTree(commentTreeRootNode) {
  console.log(commentTreeRootNode);
  let promise = [];
  const commentTree = new CommentTree(commentTreeRootNode);
  const { root } = commentTree;
  if (!_.isNull(root) || !_.isEmpty(root)) {
    return getKidsRecursively(root, commentTree, promise);
  }
  return null;
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
            let commentTree = generateCommentTree(commentTreeRootNode);          
            resolve(commentTree);
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