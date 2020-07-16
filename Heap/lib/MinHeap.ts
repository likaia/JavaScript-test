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
            // 进行siftUp操作，即上移节点至合适的位置
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }

    // 实现siftUp函数
    siftUp(index: number): void {
        // 获取父节点位置
        let parent = <number>this.getParentIndex(index);
        // 插入的值必须大于0，且它的父节点大于其本身就执行循环里的操作
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
            // 交换元素的位置
            this.swap(this.heap, parent, index);
            // 修改当前插入值的位置为它的父节点，重新获取父节点的位置，即重复这个过程直到堆的根节点也经过了交换
            index = parent;
            parent = <number>this.getParentIndex(index);
        }
    }

    // 实现交换数组元素位置函数
    swap(array: T[], exchangeElement: number, exchangedElement: number): void {
        const temp = array[exchangeElement];
        array[exchangeElement] = array[exchangedElement];
        array[exchangedElement] = temp;
    }

    // 获取堆大小
    size(): number {
        return this.heap.length;
    }

    // 判断堆是否为空
    isEmpty(): boolean {
        return this.size() === 0;
    }

    // 获取堆的最小值
    findMinimum(): T | undefined {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    // 导出堆中的值
    extract(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        if (this.size() === 1) {
            // 返回数组的第一个元素
            return this.heap.shift();
        }

        const removedValue = this.heap.shift();
        // 执行下移操作
        this.shiftDown(0);
        return removedValue;
    }

    // 下移操作
    shiftDown(index: number): void {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) > Compare.BIGGER_THAN) {
            element = left;
        }

        if (right < size && this.compareFn(this.heap[element], this.heap[right]) > Compare.BIGGER_THAN) {
            element = right;
        }

        if (index !== element) {
            this.swap(this.heap, index, element);
            this.shiftDown(element);
        }
    }
}
