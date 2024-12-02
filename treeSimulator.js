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
  constructor(value, color = "red") {
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = color; // Default to red
    this.parent = null; // Keep track of the parent for balancing
  }

  isRed() {
    return this.color === "red";
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      this.root.color = "black"; // Root is always black
    } else {
      this._insert(this.root, newNode);
    }
    this.fixInsert(newNode);
    this.render();
    logOperation(`Inserted ${value} into Red-Black Tree`);
  }

  _insert(current, newNode) {
    if (newNode.value < current.value) {
      if (current.left === null) {
        current.left = newNode;
        newNode.parent = current;
      } else {
        this._insert(current.left, newNode);
      }
    } else if (newNode.value > current.value) {
      if (current.right === null) {
        current.right = newNode;
        newNode.parent = current;
      } else {
        this._insert(current.right, newNode);
      }
    }
  }

  fixInsert(node) {
    while (node !== this.root && node.parent.isRed()) {
      const parent = node.parent;
      const grandparent = parent.parent;

      if (parent === grandparent.left) {
        const uncle = grandparent.right;

        // Case 1: Uncle is red
        if (uncle && uncle.isRed()) {
          parent.color = "black";
          uncle.color = "black";
          grandparent.color = "red";
          node = grandparent;
        } else {
          // Case 2: Node is a right child
          if (node === parent.right) {
            this.rotateLeft(parent);
            node = parent;
          }

          // Case 3: Node is a left child
          parent.color = "black";
          grandparent.color = "red";
          this.rotateRight(grandparent);
        }
      } else {
        const uncle = grandparent.left;

        // Case 1: Uncle is red
        if (uncle && uncle.isRed()) {
          parent.color = "black";
          uncle.color = "black";
          grandparent.color = "red";
          node = grandparent;
        } else {
          // Case 2: Node is a left child
          if (node === parent.left) {
            this.rotateRight(parent);
            node = parent;
          }

          // Case 3: Node is a right child
          parent.color = "black";
          grandparent.color = "red";
          this.rotateLeft(grandparent);
        }
      }
    }
    this.root.color = "black"; // Ensure root is always black
  }

  rotateLeft(node) {
    const newParent = node.right;
    node.right = newParent.left;

    if (newParent.left) {
      newParent.left.parent = node;
    }

    newParent.parent = node.parent;

    if (node.parent === null) {
      this.root = newParent;
    } else if (node === node.parent.left) {
      node.parent.left = newParent;
    } else {
      node.parent.right = newParent;
    }

    newParent.left = node;
    node.parent = newParent;
  }

  rotateRight(node) {
    const newParent = node.left;
    node.left = newParent.right;

    if (newParent.right) {
      newParent.right.parent = node;
    }

    newParent.parent = node.parent;

    if (node.parent === null) {
      this.root = newParent;
    } else if (node === node.parent.right) {
      node.parent.right = newParent;
    } else {
      node.parent.left = newParent;
    }

    newParent.right = node;
    node.parent = newParent;
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._renderNode(this.root, canvas.width / 2, 50, canvas.width / 4);
  }

  _renderNode(node, x, y, offset) {
    if (node === null) return;

    // Draw node
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(node.value, x - 7, y + 5);

    // Draw edges
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
      tree = new AVLTree(); // Placeholder for AVL Tree
      break;
    case "balanced":
      tree = new BinaryTree(); // Placeholder for generic balanced tree
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
