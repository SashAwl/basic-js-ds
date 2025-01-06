const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const addNode = (node, value) => {
      if (node === null) {
        return { data: value, left: null, right: null };
      }

      if (value < node.data) {
        node.left = addNode(node.left, value);
      } else if (value > node.data) {
        node.right = addNode(node.right, value);
      }

      return node;
    };

    this.rootNode = addNode(this.rootNode, data);
  }

  has(data) {
    const searchNode = (node, value) => {
      if (node === null) {
        return false;
      }

      if (value === node.data) {
        return true;
      }

      return value < node.data
        ? searchNode(node.left, value)
        : searchNode(node.right, value);
    };

    return searchNode(this.rootNode, data);
  }

  find(data) {
    const findNode = (node, value) => {
      if (node === null) {
        return null;
      }

      if (value === node.data) {
        return node;
      }

      return value < node.data
        ? findNode(node.left, value)
        : findNode(node.right, value);
    };

    return findNode(this.rootNode, data);
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (node === null) {
        return null;
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else {

        if (node.left === null && node.right === null) {
          return null;
        }

        if (node.left === null) {
          return node.right;
        }

        if (node.right === null) {
          return node.left;
        }

        let minRight = this._findMinNode(node.right);
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    };

    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }

    let current = this.rootNode;
    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }

    let current = this.rootNode;
    while (current.right !== null) {
      current = current.right;
    }

    return current.data;
  }

  _findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};