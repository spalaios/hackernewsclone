import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function renderPost(dataArray) {
  return _.map(dataArray, (value, key) => {
    console.log(value);
    const { title, url } = value;
    const post = `${key + 1}). ${title}`;
    return (
      <div className="post-block" key={key}>
        <a href={url} target="__blank">{post}</a>
      </div>
    );
  });
}


const Post = ({ data }) => (
  <Fragment>
      {renderPost(data)}
  </Fragment>
);
Post.propTypes = {
  data: PropTypes.array,
};

export default Post;
