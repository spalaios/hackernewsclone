import React, { Component, PureComponent } from 'react';
import Axios from 'axios';
import _ from 'lodash';
import { API } from '../../../constants';
import Post from '../presentation/Post/PostlistItem';
import Loader from '../presentation/Loader';
import makeBatchCalls from '../../Utilities';
import NavigationBar from './Navigation/index';
import PostList from '../presentation/Post/PostList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [{ title: 'what the hell is purecomponent' }],
    };
    this.url = null;
    this.originalResponse = [];
    this.callNumber = 0;
  }

  componentDidMount() {
    this.url = `${API.URL}${API.VERSION}${API.TOPSTORIES}`;
    Axios({
      method: 'GET',
      url: this.url,
    })
      .then((response) => {
        const { data } = response;
        this.originalResponse = data;
        this.renderItems(this.callNumber, this.originalResponse);
      })
      .catch((error) => {});
  }

  handleMoreBtn = () => {
    this.callNumber = this.callNumber + 1;
    this.renderItems(this.callNumber, this.originalResponse);
  }

  renderItems = (callNumber, responseArray) => {
    const dataArray = makeBatchCalls(callNumber, responseArray);
    dataArray.then((titles) => {
      this.setState(prevState => ({
        ...prevState,
        data: titles,
        isLoading: false,
      }));
    });
  }

  render() {
    return (
      <Loader isLoading={this.state.isLoading}>
        <div className="container">
          <NavigationBar />
          <PostList>
            <Post data={this.state.data} />
            <button type="button" onClick={this.handleMoreBtn}>More</button>
          </PostList>
        </div>
      </Loader>
    );
  }
}

export default Home;
