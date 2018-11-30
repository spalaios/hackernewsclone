import React, { Component, Fragment } from 'react';
import LandingPage from './components/LandingPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <LandingPage />
      </Fragment>
    );
  }
}

export default App;
