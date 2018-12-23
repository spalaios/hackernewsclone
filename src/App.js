import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/container/Home';
import '../styles/styles.css';

class App extends Component {  
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
