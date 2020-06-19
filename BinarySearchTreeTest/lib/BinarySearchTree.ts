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
           // 向根节点中插入子节点
       }
   }

   insertNode(node: Node<T>, key: T) {
       // 如果新节点的键小于当前节点的键
       if (this.compareFn(key,node.key) === Compare.LESS_THAN){
           if (node.left == null){
               node.left = new Node(key);
           }else {
               this.insertNode(node.left,key);
           }
       }else{
           if (node.right == null){
               node.right = new Node(key);
           }else {
               this.insertNode(node.right,key);
           }
       }
   }
}