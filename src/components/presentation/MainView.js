import React from 'react';
import Post from './Post/PostlistItem';
import MoreButton from './Button/Button';
import PostList from './Post/PostList';
import './MainView.css';

const MainView = ({ postData, handleMoreButtonClick, history }) => {
  return (
    <PostList>
      <Post data={postData} history={history} />
      <MoreButton handleClick={handleMoreButtonClick} />
    </PostList>
  ); 
};

export default MainView;