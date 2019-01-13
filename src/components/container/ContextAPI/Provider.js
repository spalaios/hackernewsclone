import React, { Component } from 'react';
import PropsContext from './PropsContext';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() { 
    return ( 
      <PropsContext.Provider value={{ history: this.props.history }}>
        {this.props.children}
      </PropsContext.Provider>
    );
  }
}
 
export default Provider;