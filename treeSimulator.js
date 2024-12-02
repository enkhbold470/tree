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
  const logEntry = document.createElement("p");
  logEntry.textContent = message;
  log.appendChild(logEntry);
  log.scrollTop = log.scrollHeight;
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = "red"; // Red by default for Red-Black Tree
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
    this.root.color = "black"; // Ensure root is black
    this.render();
    logOperation(`Inserted ${value} into Red-Black Tree`);
  }

  _insert(node, value) {
    if (node == null) return new Node(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    }

    return node; // Balancing logic can be added
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._renderNode(this.root, canvas.width / 2, 50, canvas.width / 4);
  }

  _renderNode(node, x, y, offset) {
    if (node == null) return;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(node.value, x - 7, y + 5);

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

function resetTree() {
  switch (treeType) {
    case "redBlack":
      tree = new RedBlackTree();
      break;
    case "avl":
      tree = new AVLTree(); // Implementation for AVL Tree
      break;
    case "balanced":
      tree = new BinaryTree(); // Generic balanced tree
      break;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  log.innerHTML = "<h3>Operations Log:</h3>";
}

function insertNode() {
  const value = parseInt(document.getElementById("treeInput").value);
  if (isNaN(value)) {
    alert("Please enter a valid number!");
    return;
  }
  tree.insert(value);
  document.getElementById("treeInput").value = "";
}

resetTree();
