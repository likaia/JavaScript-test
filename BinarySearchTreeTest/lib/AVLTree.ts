import BinarySearchTree from "./BinarySearchTree.ts";
import {Compare, defaultCompare, ICompareFunction} from "../../utils/Util.ts";
import {Node} from "./Node.ts";

// 平衡因子的值
enum BalanceFactor {
    UNBALANCED_RIGHT = 1,
    SLIGHTLY_UNBALANCED_RIGHT = 2,
    BALANCED = 3,
    SLIGHTLY_UNBALANCED= 4,
    UNBALANCED_LEFT = 5
}

export default class AVLTree<T> extends BinarySearchTree<T>{
    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
        super(compareFn);
    }

    // 计算节点高度
    getNodeHeight(node: Node<T>): number{
        if (node == null) {
            return -1;
        }
        return Math.max(
          this.getNodeHeight(<Node<T>>node.left), this.getNodeHeight(<Node<T>>node.right) + 1
        );
    }

    // 计算节点的平衡因子:在AVL树中，需要对每个节点计算右子树的高度和左子树的高度的差值，该值应为0 | -1 | 1，如果差值不符合要求则需要平衡该树。
    getBalanceFactor(node: Node<T>) {
        // 计算差值
        const heightDifference = this.getNodeHeight(<Node<T>>node.left) - this.getNodeHeight(<Node<T>>node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    // 向右的单旋转
    rotationLL(node: Node<T>) {
        // 创建tmp变量, 存储node的左子节点
        const tmp = <Node<T>>node.left;
        // node的左子节点修改为tmp的右子节点
        node.left = tmp.right;
        // tmp的右子节点修改为node
        tmp.right = node;
        // 更新节点
        return tmp;
    }

    // 向左的单旋转
    rotationRR(node: Node<T>) {
        // 将节点X置于节点Y
        const tmp = <Node<T>>node.right;
        // 将Y的右子节点置为X的左子节点
        node.left = tmp.right;
        // 将X的左子节点置为Y
        tmp.left = node;
        // 更新节点
        return tmp;
    }

    // 向右的双旋转
    rotationLR(node: Node<T>) {
        node.left = this.rotationRR(<Node<T>>node.left);
        return this.rotationLL(node);
    }

    // 向左的双旋转
    rotationRL(node: Node<T>) {
        node.right = this.rotationLL(<Node<T>>node.right);
        return this.rotationRR(node);
    }
}