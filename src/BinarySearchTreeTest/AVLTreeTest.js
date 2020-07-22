import AVLTree from "./lib/AVLTree.ts";

const avlTree = new AVLTree();
const printNode = value=>{
    console.log(value);
}
/**
 *  测试树失衡
 *              30              30                       30
 *             / \             / \                      / \
 *           27  60   ->     12  60  -> remove(10)    12  60
 *          /               / \                        \
 *         12              10 27                       27
 *        /
 *      10
 */
avlTree.insert(30);
avlTree.insert(27);
avlTree.insert(60);
avlTree.insert(12);
avlTree.insert(10);
avlTree.remove(10);
// 后序遍历
avlTree.preOrderTraverse(printNode);