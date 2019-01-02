import React from 'react';
import _ from 'lodash';
import { API } from '../../../../constants';
import WithStoriesApi from '../WithAPIStories';
import MainView from '../../presentation/MainView';
import MainViewContainer from '../../presentation/MainViewContainer';

const NewPostList = WithStoriesApi(MainView, API.NEW);

const New = ({ history }) => {
  console.log('inside New ');
  return (
    <MainViewContainer history={history}>
      <NewPostList />
    </MainViewContainer>
  );
};

export default New;