import { Node } from "../../BinarySearchTreeTest/lib/Node.ts";

export class TreeOperate<T> {
    /**
     * 重建二叉树
     * 规则：
     *  1. 输入某二叉树前序遍历和中序遍历的结果，输入的值中不包含重复的数字
     *  2. 根据输入的值重建该二叉树
     *
     * 例如：
     *       8
     *      / \
     *     6   13
     *    / \  / \
     *   3  7 9  15
     *
     * 前序遍历: 8 -> 6 -> 3 -> 7 -> 13 -> 9 -> 15
     * 中序遍历: 3 -> 6 -> 7 -> 8 -> 9 -> 13 -> 15
     *
     * 根据前序遍历的特点我们可知道下述信息：
     *  1. 树根结点的值是8
     *  2. 8位于中序遍历组合的第3号位置
     *  3. 中序遍历组合中，8的左边是它的左子节点，剩余的就是8的右子节点。
     *  4. 前序遍历组合中，8的右边3个元素是它的左子节点，剩余的元素是它的右子节点。
     *
     * @param prologueArr 前序遍历的结果
     * @param middleOrderArr 中序遍历的结果
     */
    buildBinaryTree(prologueArr: T[], middleOrderArr: T[]): Node<T> | null {
        // 递归基线条件
        if (prologueArr.length === 0 || middleOrderArr.length === 0) {
            return null;
        }
        // 根结点元素
        const root = prologueArr[0];
        // 根据根结点元素构建树节点
        const tree = new Node(root);
        // 获取根结点在中序遍历中的位置
        let index = 0;
        for (let i = 0; i < middleOrderArr.length; i++) {
            if (middleOrderArr[i] === root) {
                break;
            }
            index++;
        }

        // 递归填充它的左子树
        // 在前序遍历中，根节点后面的index个元素就是它的左子树，剩余的就是它的右子树
        // 在中序遍历中，根结点左边的节点就是左子树，剩余的就是它的右子树
        // 因此，当前节点的前序遍历结果为前序遍历的1号位置到index位置(包含index)的元素
        // 因此，当前节点的中序遍历结果为中序遍历的0号位置index位置
        tree.left = <Node<T>>this.buildBinaryTree(prologueArr.slice(1, index + 1), middleOrderArr.slice(0, index));
        // 递归填充它的右子树，左子树已经填充完成剩余的就是右子树，index+1到它的末尾
        tree.right = <Node<T>>this.buildBinaryTree(prologueArr.slice(index + 1), middleOrderArr.slice(index + 1));
        // 返回tree，出栈，直至栈内元素被清空，二叉树重建完毕，问题解决。
        return tree;
    }
}
