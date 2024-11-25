const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
const log = document.getElementById("log");
let treeType = document.getElementById("treeType").value;

document.getElementById("treeType").addEventListener("change", (e) => {
  treeType = e.target.value;
  resetTree();
});

let tree = null;

function logOperation(message) {
  log.innerHTML += `<p>${message}</p>`;
  log.scrollTop = log.scrollHeight;
}

// Basic Node structure
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = "black"; // Default for Red-Black Trees
  }
}

// Tree base class
class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
    this.render();
    logOperation(`Inserted ${value} into ${treeType}`);
  }

  _insert(node, value) {
    if (node == null) return new Node(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    }
    return node;
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._renderNode(this.root, canvas.width / 2, 50, canvas.width / 4);
  }

  _renderNode(node, x, y, offset) {
    if (node == null) return;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = node.color || "black";
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fillText(node.value, x - 5, y + 5);

    if (node.left) {
      ctx.moveTo(x, y);
      ctx.lineTo(x - offset, y + 70);
      ctx.stroke();
      this._renderNode(node.left, x - offset, y + 70, offset / 2);
    }
    if (node.right) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + offset, y + 70);
      ctx.stroke();
      this._renderNode(node.right, x + offset, y + 70, offset / 2);
    }
  }
}

// Specialized AVL Tree
class AVLTree extends BinaryTree {
  _insert(node, value) {
    if (node == null) return new Node(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    }

    // Balance the tree
    const balance = this._getBalance(node);
    if (balance > 1 && value < node.left.value) {
      return this._rotateRight(node);
    }
    if (balance < -1 && value > node.right.value) {
      return this._rotateLeft(node);
    }
    if (balance > 1 && value > node.left.value) {
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }
    if (balance < -1 && value < node.right.value) {
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }

    return node;
  }

  _getBalance(node) {
    return this._height(node.left) - this._height(node.right);
  }

  _height(node) {
    return node == null ? 0 : 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  _rotateLeft(z) {
    const y = z.right;
    z.right = y.left;
    y.left = z;
    return y;
  }

  _rotateRight(z) {
    const y = z.left;
    z.left = y.right;
    y.right = z;
    return y;
  }
}

// Initialize tree based on selection
function resetTree() {
  switch (treeType) {
    case "redBlack":
      tree = new BinaryTree(); // Red-Black logic can be added
      break;
    case "avl":
      tree = new AVLTree();
      break;
    case "balanced":
      tree = new BinaryTree(); // Placeholder for B-Tree
      break;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  log.innerHTML = "<h3>Operations Log:</h3>";
}

// Insert node
function insertNode() {
  const value = parseInt(document.getElementById("treeInput").value);
  if (isNaN(value)) {
    alert("Please enter a valid number!");
    return;
  }
  tree.insert(value);
  document.getElementById("treeInput").value = "";
}

// Initialize
resetTree();
