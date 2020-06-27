import {Compare, defaultCompare, ICompareFunction} from "../../utils/Util.ts";
import {Node} from "./Node.ts";
/**
 * 二叉搜索树的实现
 */
export default class BinarySearchTree<T> {
   protected root: Node<T> | undefined;

   constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
       this.root = undefined;
   };

   insert(key: T){
       if (this.root == null){
           // 如果根节点不存在则直接新建一个节点
           this.root = new Node(key);
       }else {
           // 在根节点中找合适的位置插入子节点
           this.insertNode(this.root,key);
       }
   }

   // 节点插入
   insertNode(node: Node<T>, key: T) {
       // 新节点的键小于当前节点的键，则将新节点插入当前节点的左边
       // 新节点的键大于当前节点的键，则将新节点插入当前节点的右边
       if (this.compareFn(key,node.key) === Compare.LESS_THAN){
           if (node.left == null){
               // 当前节点的左子树为null直接插入
               node.left = new Node(key);
           }else {
               // 从当前节点(左子树)向下递归,找到null位置将其插入
               this.insertNode(node.left,key);
           }
       }else{
           if (node.right == null){
               // 当前节点的右子树为null直接插入
               node.right = new Node(key);
           }else {
               // 从当前节点(右子树)向下递归，找到null位置将其插入
               this.insertNode(node.right,key);
           }
       }
   }

    // 中序遍历
    inOrderTraverse(callback: Function){
       this.inOrderTraverseNode(<Node<T>>this.root,callback);
    }

    // 按顺序遍历节点
    inOrderTraverseNode(node: Node<T>,callback: Function){
       if (node !=null){
           this.inOrderTraverseNode(<Node<T>>node.left,callback);
           callback(node.key);
           this.inOrderTraverseNode(<Node<T>>node.right,callback);
       }
    }

    // 先序遍历
    preOrderTraverse(callback: Function){
       this.preOrderTraverseNode(<Node<T>>this.root, callback);
    }

    // 先序遍历结点
    preOrderTraverseNode(node: Node<T>, callback: Function){
       if (node != null){
           callback(node.key);
           this.preOrderTraverseNode(<Node<T>>node.left, callback);
           this.preOrderTraverseNode(<Node<T>>node.right, callback);
       }
    }

    // 后序遍历
    postOrderTraverse(callback: Function){
       this.postOrderTraverseNode(<Node<T>>this.root, callback);
    }

    // 后序遍历节点
    postOrderTraverseNode(node: Node<T>, callback: Function) {
       if (node != null){
           this.postOrderTraverseNode(<Node<T>>node.left, callback);
           this.postOrderTraverseNode(<Node<T>>node.right, callback);
           callback(node.key);
       }
    }

}