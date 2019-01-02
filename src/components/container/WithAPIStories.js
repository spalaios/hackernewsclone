import React, { Component } from 'react';
import _ from 'lodash';
import Axios from 'axios';
import Loader from '../presentation/Loader';
import { API } from '../../../constants';
import { makeBatchCalls } from '../../Utilities';

function WithAPIStories(WrappedComponent, url) {
  if (!_.isEmpty(url) || !_.isUndefined(url) || !_.isNull(url)) {
    return class extends Component {
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
        // console.log(this.props);
        this.url = `${API.URL}${API.VERSION}${url}`;
        // console.log(this.url);
        console.log('api calls made');
        Axios({
          method: 'GET',
          url: this.url,
        })
          .then((response) => {
            const { data } = response;
            this.originalResponse = data;
            // console.log(data);
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
            <WrappedComponent postData={this.state.data} handleMoreButtonClick={this.handleMoreBtn} {...this.props} />
          </Loader>
        );
      }
    };
  }
}
export default WithAPIStories;