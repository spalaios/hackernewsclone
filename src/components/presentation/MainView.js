import React from 'react';
import Post from './Post/PostlistItem';
import MoreButton from './Button/Button';
import PostList from './Post/PostList';
import './MainView.css';

const MainView = ({ postData, handleMoreButtonClick }) => (
  <PostList>
    <Post data={postData} />
    <MoreButton handleClick={handleMoreButtonClick} />
  </PostList>
);

export default MainView;