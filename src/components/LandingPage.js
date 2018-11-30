import React, { Component, PureComponent } from 'react';
import Axios from 'axios';
import _ from 'lodash';
import { API } from '../../constants';
import Post from './Post';
import Loader from './Loader';

class LandingPage extends Component {
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
        console.log(data);
        this.originalResponse = data;
        this.makeBatchCalls(this.callNumber);
      })
      .catch((error) => {});
  }

  makeBatchCalls = (callNumber) => {
    const startIndex = 30 * callNumber;
    console.log(typeof callNumber);
    console.log(startIndex);
    const endIndex = (30 * callNumber) + 30;
    console.log(endIndex);
    const initalDataId = _.slice(this.originalResponse, startIndex, endIndex);
    const initalDataArray = [];
    const promise = [];
    const titles = [];

    _.forEach(initalDataId, (value) => {
      promise.push(Axios({
        method: 'GET',
        url: `${API.URL}${API.VERSION}${API.ITEM}/${value}.json`,
      }));
    });
    Promise.all(promise)
      .then((values) => {
        console.log(values);
        _.forEach(values, (value, key) => {
          const { title, url } = value.data;
          titles.push({ title, url });
        });
        this.setState(prevState => ({
          ...prevState,
          data: titles,
          isLoading: false,
        }));
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  handleMoreBtn = () => {
    this.callNumber = this.callNumber + 1;
    this.makeBatchCalls(this.callNumber);
  }

  render() {
    return (
      <Loader isLoading={this.state.isLoading}>
        <Post data={this.state.data} />
        <button type="button" onClick={this.handleMoreBtn}>More</button>
      </Loader>
    );
  }
}

export default LandingPage;
