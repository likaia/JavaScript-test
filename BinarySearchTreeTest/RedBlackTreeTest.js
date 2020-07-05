import RedBlackTree from "./lib/RedBlackTree.ts";

const redBlackTree = new RedBlackTree();
redBlackTree.insert(1);
redBlackTree.insert(2);
redBlackTree.insert(3);
redBlackTree.insert(4);
redBlackTree.insert(5);
redBlackTree.insert(6);
redBlackTree.insert(7);
redBlackTree.insert(8);
redBlackTree.insert(9);
const printNode = value => console.log(value);
redBlackTree.preOrderTraverse(printNode);