/**
 * 二叉树的辅助类: 用于存储二叉树的每个节点
 */
export class Node<K> {
    public left: Node<K> | undefined;
    public right: Node<K> | undefined;
    constructor(public key: K) {
        this.left = undefined;
        this.right = undefined;
    }

    toString() {
        return `${this.key}`;
    }
}