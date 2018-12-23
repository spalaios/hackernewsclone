import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './postlistitem.css';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

function renderPost(dataArray) {
  return _.map(dataArray, (value, key) => {
    const { 
      title, url, index, by, score, time,
    } = value;
    const post = `${index}. ${title}`;
    const indexClassNames = (index < 10) ? 'd-flex justify-content-end' : '';
    let timeDiff = null;
    // const now = Moment().format();
    const articleTime = time;
    console.log(Date.now());
    console.log(articleTime * 1000);
    console.log(Date.now() - (articleTime * 1000));
    // timeDiff = Moment([articleTime]).fromNow();
    timeDiff = format((Date.now() / 1000) - (articleTime));
    return (
      <Fragment>
        <div className="mt-3">
          <div className="post-block d-flex" key={key}>
            <p className={`post-index-number mb-0 ${indexClassNames}`}>{index}.</p>
            <img src="/src/assets/images/caret-arrow-up.png" className="post-upvote d-flex align-self-center mx-1" alt="upvote" />
            <a href={url} className="post-article" target="__blank">{title}</a>
            <p className="post-author mb-0 d-flex align-items-end mx-2">({by})</p>
          </div>
          <div className="post-lower-block">
            <p className="mb-0 post-lower-block-text">{`${score} points by `}<Link className="post-lower-author" to={`user?id=${by}`}>{by}</Link> | <span>{timeDiff}</span></p>
          </div>
        </div>
      </Fragment>
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
