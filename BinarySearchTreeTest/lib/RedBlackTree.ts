import BinarySearchTree from "./BinarySearchTree.ts";
import {Colors, RedBlackNode} from "./Node.ts";
import {Compare, defaultCompare, ICompareFunction} from "../../utils/Util.ts";

export default class RedBlackTree<T> extends BinarySearchTree<T> {
    protected root: RedBlackNode<T> | undefined;
    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
        super(compareFn);
    }

    insert(key: T) {
        if (this.root == null) {
            // 树为空，创建一个红黑树节点
            this.root = new RedBlackNode(key);
            // 红黑树的规则2: 根节点的颜色为黑色
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            // 节点插入后，验证红黑树属性
            this.fixTreeProperties(newNode);
        }
    }

    protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            } else {
                return this.insertNode(node.left,key);
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        } else {
            return this.insertNode(node.right, key);
        }
    }

    // 修复红黑树属性
    private fixTreeProperties(node: RedBlackNode<T>) {
        while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) {
            let parent = node.parent;
            const grandParent = <RedBlackNode<T>>parent.parent;
            // 父节点是左侧子节点
            if (grandParent && grandParent.left === parent) {
                const uncle =grandParent.left;
                // 叔节点也是红色，只需要重新填色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // 节点是右侧子节点 -- 左旋转
                    if (node === parent.right) {
                        this.rotationRR(parent);
                        node = parent;
                        parent = <RedBlackNode<T>>node.parent;
                    }
                    // 节点是左侧子节点--右旋转
                    this.rotationLL(grandParent);
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            } else { // 父节点是右侧子节点
                const uncle = grandParent.left;
                // 叔节点是红色--只需要填色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // 节点是左侧子节点 -- 右旋转
                    if (node === parent.left) {
                        this.rotationLL(parent);
                        node = parent;
                        parent = <RedBlackNode<T>>node.parent;
                    }
                    // 节点是右侧子节点 -- 左旋转
                    this.rotationRR(grandParent);
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
        }
        this.root != null? this.root.color = Colors.BLACK : this.root;
    }

    // 向右的单旋转
    private rotationLL(node: RedBlackNode<T>) {
        const tmp = <RedBlackNode<T>>node.left;
        node.left = tmp.right;
        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
            tmp.right = node;
            node.parent = tmp;
        }
    }

    // 向左的单旋转
    private rotationRR(node: RedBlackNode<T>) {
        const tmp = <RedBlackNode<T>>node.right;
        node.right = tmp.left;
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
}