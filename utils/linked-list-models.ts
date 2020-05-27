/* 链表需要的模块类 */

// 助手类: 用于表示链表中的第一个以及其他元素
export class Node{
    element: any;
    next: any;
    // 默认传一个元素进来
    constructor (element: any) {
        this.element = element;
        this.next = undefined;
    }
}