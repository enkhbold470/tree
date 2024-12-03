# This is repo for tree data structure

<img width="1059" alt="image" src="https://github.com/user-attachments/assets/22fbe734-f671-405a-ac1a-6d80513e72be">

This is a minimal JavaScript project for visualizing a **Red-Black Tree** on an HTML canvas. Users can insert nodes and observe the tree's structure and balancing properties in real time.

---

## Features

- **Tree Visualization**: Displays the Red-Black Tree structure on a canvas.
- **Dynamic Updates**: Balances the tree after each insertion according to Red-Black Tree rules.
- **Operation Log**: Shows a list of actions performed on the tree.

---

## How to Use

1. **Setup**:
   - Include this JavaScript file in your HTML.
   - Ensure your HTML has:
     - A `<canvas>` element (`id="treeCanvas"`)
     - An input field (`id="treeInput"`)
     - A dropdown for tree types (`id="treeType"`)
     - A log container (`id="log`).

2. **Run**:
   - Open the HTML file in a web browser.
   - Use the input field to add values to the tree.
   - Watch the tree update on the canvas and logs display operations.

---

## Key Functions

- `Node`: Represents a tree node with a value, color, and links to parent and children.
- `RedBlackTree`: Handles insertion, balancing, and rendering of the tree.
- `resetTree`: Initializes the tree based on the selected type.
- `insertNode`: Inserts a value into the tree and updates the visualization.

---

## Example Usage

### Insert a Node
```javascript
const value = parseInt(document.getElementById("treeInput").value);
tree.insert(value);
```

---

## Future Enhancements

- Add support for AVL and Balanced Trees.
- Implement deletion with rebalancing.
- Provide interactive controls for better customization.

---

This project is a simple starting point for understanding Red-Black Trees. Have fun exploring!
