class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }

    setLeft(node) {
        this.left = node
    }

    setRight(node) {
        this.right = node
    }
}

class Tree {
    constructor(array) {
        this.array = array
        this.sorted = this.sortArray()
        this.tree = this.root()
    }

    sortArray() {
        let unqiue = [...new Set(this.array)];
        unqiue.sort((a, b) => a - b)
        return unqiue
    }

    //builds initial tree and stores in this.tree for insert functions
    root() {
        return buildTree(this.sorted, 0, this.sorted.length - 1)
    }

    insert(data) {
        this.insertRec(this.tree, data)
    }

    insertRec(root, key) {
        if (root == null) {
            root = new Node(key)
            return root
        }
        if (key < root.data) {
            root.setLeft(this.insertRec(root.left, key))
        } else if (key > root.data) {
            root.setRight(this.insertRec(root.right, key))
        }
        return this.tree = root
    }

    delete(key) {
        this.deleteRec(this.tree, key)
    }

    deleteRec(root, key) {
        if (root === null) {
            return root
        }

        if (root.data > key) {
            root.setLeft(this.deleteRec(root.left, key))
            return root
        } else if (root.data < key) {
            root.setRight(this.deleteRec(root.right, key))
            return root
        }

        if (root.left === null) {
            let temp = root.right
            root = null
            return temp
        } else if (root.right === null) {
            let temp = root.left
            root = null
            return temp
        } else {
            let succParent = root
            let succ = root.right
            while (succ.left !== null) {
                succParent = succ
                succ = succ.left
            }
            if (succParent !== root) {
                succParent.left = succ.right
            } else {
                succParent.right = succ.right
            }
            root.data = succ.data
            succ = null
            return root
        }
    }

    find(value, root = this.tree) {
        if (root.data == value) {
            return root
        }
        if (value > root.data) {
            return this.find(value, root.right)
        } else if (value < root.data) {
            return this.find(value, root.left)
        }
    }

    levelOrder(tree, queue = [tree]) {
        if (!queue.length) {
            return tree
        }
        if (!tree) {
            return this.array
        }

        console.log(tree.data)
        queue.splice(0, 1)

        if (tree.left == null && tree.right == null) {
            return this.levelOrder(queue[0], queue)
        }
        if (tree.left == null) {
            queue.push(tree.right)
            return this.levelOrder(queue[0], queue)
        }
        if (tree.right == null) {
            queue.push(tree.left)
            return this.levelOrder(queue[0], queue)
        }

        queue.push(tree.left, tree.right)
        return this.levelOrder(queue[0], queue)
    }

    inorder(tree, final = []) {
        if (tree == null) {
            return []
        }
        if (tree.left !== null) { this.inorder(tree.left, final) }
        final.push(tree.data)
        if (tree.right !== null) { this.inorder(tree.right, final) }
        return final
    }

    preorder(tree) {
        if (!tree) {
            return this.array
        }
        if (tree == null) {
            return
        }
        console.log(tree.data)
        this.preorder(tree.left)
        this.preorder(tree.right)
    }

    postorder(tree) {
        if (!tree) {
            return this.array
        }
        if (tree == null) {
            return
        }
        this.postorder(tree.left)
        this.postorder(tree.right)
        console.log(tree.data)
    }

    height(node) {
        return this.heightRec(this.tree, node)
    }

    heightRec(tree, node, found = false) {
        if (found == false) {
            tree = this.find(node)
            found = true
            return this.heightRec(tree, node, found)
        }
        if (tree == null || (tree.left == null && tree.right == null)) {
            return 1
        }
        let left = this.heightRec(tree.left, node, found)
        let right = this.heightRec(tree.right, node, found)
        if (left > right) {
            return left + 1
        } else {
            return right + 1
        }
    }

    depth(node) {
        return this.depthRec(this.tree, node)
    }

    depthRec(tree, node, counter = 0) {
        if (tree == null) {
            return 0
        }
        if (tree.data == node) {
            return console.log(counter + 1)
        }
        this.depthRec(tree.left, node, counter + 1)
        this.depthRec(tree.right, node, counter + 1)
        return
    }

    isBalanced() {
        const left = this.heightRec(this.tree, this.tree.left.data)
        const right = this.heightRec(this.tree, this.tree.right.data)
        if (Math.abs(left - right) < 1) {
            return true
        } else {
            return false
        }
    }

    rebalance() {
        let sorted = this.inorder(this.tree)
        this.sorted = sorted
        return this.tree = this.root()
    }
}


function buildTree(array, start, end) {
    let mid = parseInt((start + end) / 2)
    let node = new Node(array[mid])

    if (start > end) {
        return null
    }
    node.setLeft(buildTree(array, start, mid - 1))
    node.setRight(buildTree(array, mid + 1, end))

    return node
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

export { Tree, prettyPrint }