import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './postlistitem.css';
import { Link } from 'react-router-dom';
import { distanceInWords } from 'date-fns';
import { getHumanizedTimeDifference, getShortUrlLink } from '../../../Utilities';
import PropsContext from '../../container/ContextAPI/PropsContext';

function getCorrespondingComments(id, history) {
  console.log(id);
  console.log(history);
  // history.push('/comments?suraj');
  history.push(`/comments/${id}`, { id });
}

function renderPost(dataArray, history) {
  return _.map(dataArray, (value, key) => {
    // console.log(value);
    const { 
      title, url, index, by, score, time, descendants, id,
    } = value;
    const post = `${index}. ${title}`;
    const indexClassNames = (index < 10) ? 'd-flex justify-content-end' : '';
    const articleTime = time * 1000;
    const currentTime = new Date().getTime();
    let timeDiffString = getHumanizedTimeDifference(currentTime, articleTime);
    let commentSection = '';
    if (descendants === 0) {
      commentSection = 'discuss';
    } else if (descendants !== 0) {
      commentSection = `${descendants} comments`;
    }
    const shortUrlLink = (url) ? getShortUrlLink(url) : '';
    return (
      <Fragment>
        <div className="mt-1" key={key}>
          <div className="post-block d-flex">
            <p className={`post-index-number mb-0 ${indexClassNames}`}>{index}.</p>
            <img src="/src/assets/images/caret-arrow-up.png" className="post-upvote d-flex align-self-center mx-1" alt="upvote" />
            <a href={url} className="post-article" target="__blank">{title}</a>
            <a className="post-author mb-0 d-flex align-items-end mx-1" href='#' >{shortUrlLink}</a>
          </div>
          <div className="post-lower-block">
            <p className="mb-0 post-lower-block-text">{`${score} points by `}<Link className="post-lower-author" to={`user?id=${by}`}>{by}</Link> <a className="time-link" href="#">{timeDiffString}</a> | <span>hide</span> | <p className="comments-links cursor d-inline-block mb-0" onClick={() => getCorrespondingComments(id, history)}>{commentSection}</p></p>
          </div>
        </div>
      </Fragment>
    );
  });
}

const Post = ({ data }) => <PropsContext.Consumer>
    {(value) => {
      const { history } = value;
      return (
        <Fragment>
          {renderPost(data, history)}
        </Fragment> 
      );
    }}
  </PropsContext.Consumer>;
  // return (
  //   <Fragment>
  //       {renderPost(data, history)}
  //   </Fragment>
  // );
Post.propTypes = {
  data: PropTypes.array,
};

export default Post;
