// @ts-ignore
import LinkedList from "./LinkedList.ts";
// @ts-ignore
import { defaultEquals } from "../../utils/Util.ts";

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

// 比较两个元素大小，如果a < b则返回-1，否则返回1
function defaultCompare<T>(a: T, b: T) {
    if(a === b){
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// 定义compareFn函数的参数类型以及返回值类型
interface defaultCompareType<T> {
    (a: T,b: T) : number;
}

export default class OrderedList<T> extends LinkedList<T>{
    private readonly compareFn: defaultCompareType<T>;

    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.compareFn = compareFn;
    }

    // 有序插入元素
    insert(element: T, index: number = 0): boolean {
        if(this.isEmpty()){
            // 链表为空直接调用父级的insert方法往0号元素插入元素
            return super.insert(element, 0);
        }
        // 链表不为空，获取插入元素的正确位置
        const pos = this.getIndexNextSortedElement(element);
        // 得到位置后调用父级的插入方法往正确位置插入元素
        return super.insert(element,pos);
    }

    // 获取插入元素正确位置函数
    getIndexNextSortedElement(element: T) {
        let current = this.head;
        let i = 0;
        // 遍历整个链表，直至找到需要插入元素的位置
        for (; i < this.size() && current; i++) {
            // 用compareFn函数比较传入构造函数的元素
            const comp = this.compareFn(element, current.element);
            // 要插入小于current的元素时，我们就找到了插入元素的位置
            if (comp === Compare.LESS_THAN) {
                return i;
            }
            // 继续下一轮遍历
            current = current.next;
        }
        // 迭代完所有的元素没有找到符合条件的，则返回链表的最后一个元素位置
        return i;
    }
}