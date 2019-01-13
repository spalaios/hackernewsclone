import _ from 'lodash';
import { TreeNodeType } from '../../../constants';

class TreeNode {
  constructor(node, type) {
    this.by = (node['by']) ? node['by'] : null;
    this.id = (node['id']) ? node['id'] : null;
    this.kids = (!_.isEmpty(node['kids'])) ? node['kids'] : [];
    this.time = (node['time']) ? node['time'] : null;
    this.type = (node['type']) ? node['type'] : null;
    this.childrens = [];

    switch (type) {
      case TreeNodeType.COMMENT: 
        this.parent = (node['parent']) ? node['parent'] : null;
        this.text = (node['text']) ? node['text'] : null;
        break;
      default:
        this.descendants = (node['descendants']) ? node['descendants'] : null;
        this.score = (node['score']) ? node['score'] : null;
        this.title = (node['title']) ? node['title'] : null;
        this.url = (node['url']) ? node['url'] : null;
        break;
    }
  }
}

export default TreeNode;