import { Compare, ICompareFunction, defaultCompare } from "../../utils/Util.ts";

/**
 * 堆是一颗完全二叉树
 *  1. 左子节点的位置: 2 * index + 1
 *  2. 右子节点的位置: 2 * index + 2
 *  3. 父节点的位置: index / 2
 */
export default class MinHeap<T> {
    // 用数组来描述一个堆
    protected heap: T[];

    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
        this.heap = [];
    }

    // 获取左子节点的位置
    getLeftIndex(index: number): number {
        return 2 * index + 1;
    }

    // 获取右子节点的位置
    getRightIndex(index: number): number {
        return 2 * index + 2;
    }

    // 获取父节点的位置
    getParentIndex(index: number): number | undefined {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }

    // 实现插入函数
    insert(value: T): boolean {
        if (value != null) {
            // 向堆的叶结点添加元素，即数组的尾部
            this.heap.push(value);
            // 进行heapify操作，即上移节点至合适的位置
        }
        return false;
    }

    // 实现heapify函数
    heapify(index: number): void {
        // 获取当前节点的父节点
        let parent = this.getParentIndex(index);
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
            // 交换元素的位置
        }
    }
    // 实现交换数组元素位置函数
    swap(array: T[], exchangeElement: T, exchangedElement: T): void {
        const temp = exchangedElement;
        exchangedElement = exchangeElement;
        exchangeElement = temp;
    }
}
