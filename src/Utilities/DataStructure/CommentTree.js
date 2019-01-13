import _ from 'lodash';
import TreeNode from './TreeNode';

class CommentTree {
  constructor(data) {
    if (!_.isNull(data) || !_.isEmpty(data)) {
      this.root = new TreeNode(data);
    }
  }

  insertNode(rootNode, childNode) {
    if (_.isNull(rootNode)) {
      return;
    } if (!_.isNull(childNode) || !_.isEmpty(childNode)) {
      const { parent } = childNode;
      if (parent == rootNode.id) {
        let childrenOfRootNode = rootNode.childrens;
        childrenOfRootNode.push(childNode);
      } else if (rootNode.childrens.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < rootNode.childrens.length; i++) {
          const node = rootNode.childrens[i];
          insertNode(node, childNode);
        }
      }
    }
  }
}

export default CommentTree;