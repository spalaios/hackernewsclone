import React, { Component } from 'react';
import _ from 'lodash';
import { getComments } from '../../../Utilities';
import CommentList from './CommentsList';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      commentTree: {},
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
          const { root } = tree;
          console.log(root);
          const { childrens } = root;
          console.log(childrens);
          this.setState(prevState => ({
            ...prevState,
            commentTree: tree,
          }));
        }).catch((err) => {
          console.log(err);
        });
    } else {
      // throw error saying id not found
    }
  }

  render() {
    if (_.isEmpty(this.state.commentTree)) {
      return <p>Loading</p>;
    } 
    return ( 
      <CommentList commentTree={this.state.commentTree} />
    );
  }
}
 
export default Comments;