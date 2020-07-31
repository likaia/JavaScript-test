import { ICompareFunction, defaultCompare, Compare } from "../../../../utils/Util.ts";

export class Sort<T> {
    /**
     * 排序算法
     * @param array 需要进行排序的数组
     * @param compareFn 比对函数
     */
    constructor(private array: T[] = [], private compareFn: ICompareFunction<T> = defaultCompare) {}

    // 冒泡排序
    bubbleSort(): void {
        // 获取数组长度
        const { length } = this.array;
        for (let i = 0; i < length; i++) {
            // 从数组的0号元素遍历到数组的倒数第2号元素，然后减去外层已经遍历的轮数
            for (let j = 0; j < length - 1 - i; j++) {
                // 如果j > j + 1位置的元素就交换他们两个元素的位置
                if (this.compareFn(this.array[j], this.array[j + 1]) === Compare.BIGGER_THAN) {
                    this.swap(this.array, j, j + 1);
                }
            }
        }
    }

    // 选择排序
    selectionSort(): void {
        const { length } = this.array;
        // 声明一个变量用于存储最小元素的位置
        let indexMin = 0;
        for (let i = 0; i < length; i++) {
            // 初始值为外层循环当前遍历到的位置i
            indexMin = i;
            for (let j = i; j < length; j++) {
                // 如果当前遍历到元素小于indexMin位置的元素，就将当前遍历到的位置j赋值给indexMin
                if (this.compareFn(this.array[indexMin], this.array[j]) === Compare.BIGGER_THAN) {
                    indexMin = j;
                }
            }
            if (i !== indexMin) {
                this.swap(this.array, i, indexMin);
            }
        }
    }

    // 插入排序
    insertionSort(): void {
        const { length } = this.array;
        let temp;
        // 假设0号元素已经排好序，从1号元素开始遍历数组
        for (let i = 1; i < length; i++) {
            // 声明辅助变量存储当前i的位置以及其对应的值
            let j = i;
            temp = this.array[i];
            // j大于0且j-1位置的元素大于i号位置的元素就把j-1处的值移动到j处，最后j--
            while (j > 0 && this.compareFn(this.array[j - 1], temp) === Compare.BIGGER_THAN) {
                this.array[j] = this.array[j - 1];
                j--;
            }
            // 将temp放到正确的位置
            this.array[j] = temp;
        }
    }

    // 归并排序
    mergeSort(array: T[] = this.array): T[] {
        if (array.length > 1) {
            const { length } = array;
            // 获取中间值
            const middle = Math.floor(length / 2);
            // 递归填充左右数组
            const left = this.mergeSort(array.slice(0, middle));
            const right = this.mergeSort(array.slice(middle, length));
            // 合并左右数组
            array = this.merge(left, right);
        }
        return array;
    }

    private merge(left: T[], right: T[]) {
        let i = 0;
        let j = 0;
        const result: T[] = [];
        while (i < left.length && j < right.length) {
            result.push(this.compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
        }
        return result.concat(i < left.length ? left.slice(i) : right.slice(j));
    }

    // 快速排序
    quickSort(): T[] {
        return this.quick(this.array, 0, this.array.length - 1);
    }

    private quick(array: T[], left: number, right: number) {
        // 改变量用于将子数组分离为较小值数组和较大值数组
        let index;
        if (array.length > 1) {
            // 对给定子数组执行划分操作，得到正确的index
            index = this.partition(array, left, right);
            // 如果子数组存在较小值的元素，则对该数组重复这个过程
            if (left < index - 1) {
                this.quick(array, left, index - 1);
            }
            // 如果子数组存在较大值的元素，也对该数组重复这个过程
            if (index < right) {
                this.quick(array, index, right);
            }
        }
        return array;
    }

    // 划分函数
    private partition(array: T[], left: number, right: number): number {
        // 从数组中选择一个值做主元，此处选择数组的中间值
        const pivot = array[Math.floor((right + left) / 2)];
        // 创建数组引用，分别指向左边数组的第一个值和右边数组的第一个值
        let i = left;
        let j = right;

        // left指针和right指针没有相互交错，就执行划分操作
        while (i <= j) {
            // 移动left指针直至找到一个比主元大的元素
            while (this.compareFn(array[i], pivot) === Compare.LESS_THAN) {
                i++;
            }

            // 移动right指针直至找到一个比主元小的元素
            while (this.compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
                j--;
            }

            // 当左指针指向的元素比主元大且右指针指向的元素比主元小，并且左指针索引没有右指针索引大时就交换i和j号元素的位置，随后移动两个指针
            if (i <= j) {
                this.swap(array, i, j);
                i++;
                j--;
            }
        }
        // 划分结束，返回左指针索引
        return i;
    }

    // 计数排序
    countingSort() {
        if (this.array.length < 2) {
            return this.array;
        }
        const maxValue = this.findMaxValue(this.array);

        const counts = new Array(maxValue + 1);
    }

    // 寻找数组中的最大值
    private findMaxValue(array: T[]): number {
        let max: number = array[0];
        for (let i = 0; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }

        return max;
    }

    /**
     * 交换数组元素位置
     * @param array 需要进行操作的数组
     * @param a 交换的位置
     * @param b 被交换的位置
     */
    private swap = (array: T[], a: number, b: number): void => {
        const temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    };
}
