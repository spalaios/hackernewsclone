import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/container/Home/Home';
import New from './components/container/New/New';
import '../styles/styles.css';

class App extends Component {  
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/newest" component={New} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
