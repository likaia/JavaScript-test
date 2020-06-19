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