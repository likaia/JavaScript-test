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
	getLeftIndex(index: number) {
		return 2 * index + 1;
	}

	// 获取右子节点的位置
	getRightIndex(index: number) {
		return 2 * index + 2;
	}

	// 获取父节点的位置
	getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}
}
