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
}