import React, { Fragment } from 'react';
import _ from 'lodash';

function traverseAndPrintCommentRecursively(rootNode, commentsArray) {
  // console.log(rootNode);
  if (_.isNull(rootNode) || _.isEmpty(rootNode)) {
    console.log('broken..');
    return;
  }
  const { childrens } = rootNode;
  if (!_.isEmpty(childrens)) {
    _.forEach(childrens, (child) => {
      const { text } = child;
      // console.log(text);
      commentsArray.push(<p>{text}</p>);
      // commentsArray.push(<p></p>);
      traverseAndPrintCommentRecursively(child, commentsArray);
      // commentsArray.push(<p className="w-100 border"></p>);
    });
  }
  console.log(commentsArray.length);
  return commentsArray;
}

const CommentList = ({ commentTree }) => {
  console.log(commentTree);
  const { root } = commentTree;
  console.log(root);
  let commentsArray = [];
  return (
    <Fragment>
      {traverseAndPrintCommentRecursively(root, commentsArray)}
    </Fragment>
  );
};
export default CommentList;