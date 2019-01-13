import React, { Component } from 'react';
import _ from 'lodash';
import { getComments } from '../../../Utilities';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      page: 'comments',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (!_.isEmpty(id)) {
      console.log(id);
      console.log(this.props.history);
      const treePromise = getComments(id, 'regular');
      treePromise
        .then((tree) => {
          console.log(tree);
        }).catch((err) => {
          console.log(err);
        });
    } else {
      // throw error saying id not found
    }
  }

  render() { 
    return ( 
      <p>Comments</p>
    );
  }
}
 
export default Comments;