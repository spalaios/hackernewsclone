import React from 'react';
import _ from 'lodash';
import { API } from '../../../../constants';
import WithStoriesApi from '../WithAPIStories';
import MainView from '../../presentation/MainView';
import MainViewContainer from '../../presentation/MainViewContainer';

const HomePostList = WithStoriesApi(MainView, API.TOPSTORIES);

// TODO: //make sure of unmounting implementation in all class declaration

const Home = ({ history }) => {
  return (
    <MainViewContainer history={history}>
      <HomePostList />
    </MainViewContainer>
  );
};

export default Home;
