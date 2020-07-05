import AVLTree from "./lib/AVLTree.ts";

const avlTree = new AVLTree();
const printNode = value=>{
    console.log(value);
}
/**
 *  测试树失衡
 *              30
 *             / \
 *           27  60
 *          /
 *         12
 *        /
 *      10
 */
avlTree.insert(30);
avlTree.insert(27);
avlTree.insert(60);
avlTree.insert(12);
avlTree.insert(10);
console.log(avlTree)
// 中序遍历
avlTree.inOrderTraverse(printNode);